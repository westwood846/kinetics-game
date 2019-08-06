const { Vector, Body, World } = require('./kinetics.js');


let world = new World();
world.add(new Body(new Vector(0, 0), new Vector(0, 0), 6e12));
world.add(new Body(new Vector(0, 8), new Vector(2, 0), 1));


console.log('-------------------------');
console.log(world.toString());
world.update(10);
console.log('-------------------------');
console.log(world.toString());
world.update(10);
console.log('-------------------------');
console.log(world.toString());
world.update(10);