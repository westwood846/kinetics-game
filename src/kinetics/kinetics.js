const G = 6.674e-11; // [N * m * kg^-2]

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo = other => Math.sqrt(Math.abs((other.x - this.x)**2 + (other.y - this.y)**2));

  directionTo = other => {
    let distanceToOther = this.distanceTo(other);
    return distanceToOther > 0 ? new Vector((other.x - this.x)/distanceToOther, (other.y - this.y)/distanceToOther) : new Vector(0, 0);
  }

  add = other => new Vector(this.x + other.x, this.y + other.y);

  scale = scalar => new Vector(this.x * scalar, this.y * scalar);

  toString = () => `[${this.x.toPrecision(3)}, ${this.y.toPrecision(3)}]`;
}

class Body {
  constructor(position, velocity, mass, size=0) {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.size = size;
  }

  forceWith = other => G * this.mass * other.mass / this.position.distanceTo(other.position)**2; // [N] or [kg * m * s^-2]

  accelerationTowards = other => this.mass > 0 && this.position.distanceTo(other.position) > 0 ? this.forceWith(other)/this.mass : 0; // [m * s^-2]

  updateVelocityWith = (other, delta) => {
    let directionToOther = this.position.directionTo(other.position);
    let accelerationTowardsOther = this.accelerationTowards(other);
    let accelerationVector = directionToOther.scale(accelerationTowardsOther).scale(delta / 1000);
    this.velocity = this.velocity.add(accelerationVector);
  }

  updatePosition = delta => this.position = this.position.add(this.velocity.scale(delta / 1000));

  toString = () => `pos: ${this.position}, vel: ${this.velocity}, m: ${this.mass.toPrecision(3)}`;
}

class World {
  constructor(width, height) {
    this.bodies = [];
    this.width = width;
    this.height = height;
  }

  add = body => this.bodies.push(body);

  update = delta => {
    for (let bodyA of this.bodies) {
      for (let bodyB of this.bodies) {
        if (bodyA !== bodyB) {
          bodyA.updateVelocityWith(bodyB, delta);
          bodyA.updatePosition(delta);
        }
      }

      if (this.width && this.height) {
        if (bodyA.position.x - bodyA.size/2 <= 0) { 
          bodyA.velocity.x = bodyA.velocity.x * -1;
          bodyA.position.x = bodyA.position.x - bodyA.position.x + bodyA.size/2 + 1;
          bodyA.velocity = bodyA.velocity.scale(.8);
        }
        if (bodyA.position.y - bodyA.size/2 <= 0) {
          bodyA.velocity.y = bodyA.velocity.y * -1;
          bodyA.position.y = bodyA.position.y - bodyA.position.y + bodyA.size/2 + 1;
          bodyA.velocity = bodyA.velocity.scale(.8);
        }
        if (bodyA.position.x + bodyA.size/2 >= this.width) {
          bodyA.velocity.x = bodyA.velocity.x * -1;
          bodyA.position.x = bodyA.position.x + this.width - bodyA.position.x - bodyA.size/2 - 1;
          bodyA.velocity = bodyA.velocity.scale(.8);
        }
        if (bodyA.position.y + bodyA.size/2 >= this.height) {
          bodyA.velocity.y = bodyA.velocity.y * -1;
          bodyA.position.y = bodyA.position.y + this.height - bodyA.position.y - bodyA.size/2 - 1;
          bodyA.velocity = bodyA.velocity.scale(.8);
        }
        // if (bodyA.position.y  bodyA.size/2 <= 0) { bodyA.velocity.y = bodyA.velocity.y * -1; bodyA.velocity = bodyA.velocity.scale(.5); }
      }
    }
  }

  toString = () => this.bodies.join("\n");
}

module.exports = { Vector, Body, World };