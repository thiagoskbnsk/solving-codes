// lightning 
// objects [-9, -2, 0, 4, 11], 
// radius 4 

// how many objects are in radius lightning?

const lightning = (objects, radius) => {
  let value = [objects[0], 0];

  for (let i = objects[0]; i < objects[objects.length - 1]; i++) {
    const leftSide = objects[i] - radius;
    const rightSide = objects[i] + radius;

    const objectsInRadius = objects.filter(object => {
      return object >= leftSide && object <= rightSide;
    }).length;

    if (objectsInRadius > value[1]) {
      value[0] = i;
      value[1] = objectsInRadius;
    }
  }

  return value[0];
}

console.time('1')
const v = lightning([-9, -7, -5, -3, -2, 0, 1, 2, 4, 7, 8, 9, 10, 11, 14, 18, 19, 20, 21, 22], 0);
console.timeEnd('1');
console.log(v);