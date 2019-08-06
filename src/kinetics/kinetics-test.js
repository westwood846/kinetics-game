const assert = require('assert');
const { Vector, Body, World } = require('./kinetics.js');

assert.strictEqual(new Vector(0, 0).add(new Vector(1, 1)).toString(), new Vector(1, 1).toString());
assert.strictEqual(new Vector(1, 2).scale(2).toString(), new Vector(2, 4).toString());
assert.strictEqual(new Vector(1, 2).scale(2).scale(2).toString(), new Vector(4, 8).toString());
assert.strictEqual(new Vector(0, 0).distanceTo(new Vector(0, 1)), 1);
assert.strictEqual(new Vector(0, 0).directionTo(new Vector(0, 1)).toString(), new Vector(0, 1).toString());

let bodyA = new Body(new Vector(0, 0),   new Vector(0, 0), 6e24);
let bodyB = new Body(new Vector(0, 8e6), new Vector(2, 0), 1);
assert.strictEqual(bodyB.forceWith(bodyA), 6.256874999999999);
assert.strictEqual(bodyB.accelerationTowards(bodyA), 6.256874999999999);

let world = new World();
world.add(bodyA);
world.add(bodyB);

world.update(1000);
// console.log(world.toString())