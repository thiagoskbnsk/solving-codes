// lightning 
// objects [-9, -2, 0, 4, 11], 
// radius 4 

// how many objects are in radius lightning?

const lightning = (objects, radius) => {
  const values = objects.reduce((acc, current, index) => {
    const leftSide = current - radius;
    const rightSide = current + radius;

    const objectsInRadius = objects.filter(object => {
      return object >= leftSide && object <= rightSide;
    }).length;

    console.log(current, leftSide, rightSide, objectsInRadius)

    return objectsInRadius > acc[1] ? [index, objectsInRadius] : acc;
  }, [objects[0], 0]);

  return values[0];
}

console.time('1')
const v = lightning([-9, -7, -5, -3, -2, -1, 1, 2, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21, 22], 3);
console.timeEnd('1');
console.log(v);