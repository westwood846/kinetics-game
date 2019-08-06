const G = 6.674e-11; // [N * m * kg^-2]

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo = other => Math.abs(Math.sqrt((other.x - this.x)**2 + (other.y - this.y)**2));

  directionTo = other => {
    let distanceToOther = this.distanceTo(other);
    return new Vector((other.x - this.x)/distanceToOther, (other.y - this.y)/distanceToOther);
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

  accelerationTowards = other => this.forceWith(other)/this.mass; // [m * s^-2]

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
  constructor() {
    this.bodies = [];
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
    }
  }

  toString = () => this.bodies.join("\n");
}

module.exports = { Vector, Body, World };