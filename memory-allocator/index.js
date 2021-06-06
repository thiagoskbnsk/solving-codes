// memory allocator
// [0, 1, 1, 0, 0, 1, 0, 1, 0, 0]
// [[0, 1], [0, 2], [1, 3], [0, 1]]

const memoryAlloc = (memory, allocations) => {
  return allocations.map(alloc => {
    const arr = [];

    for (let i = 0; i < memory.length; i++) {
      let isTrue = true;

      for (let k = i; k < i + alloc[1]; k++) {
        if (!memory[k]) {
          arr.push(-1);
  
          return;
        }

        if (memory[k] === alloc[0]) {
          isTrue = false;
        }
      }

      if (isTrue) {
        arr.push(i);

        for (let k = i; k < i + alloc[1]; k++) {
          memory[k] = alloc[1];
        }
      }
    }

    return arr;
  });
}

console.time('1');
const v = memoryAlloc([0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [[0, 1], [0, 2], [1, 3], [0, 1]]);
console.timeEnd('1');

console.log(v);