const numbers = Array.from({ length: 500}, (j, k) => 1 + (k * 2));

const sum = numbers.reduce((acc, currentValue) => {
  if ((currentValue !== 3 && currentValue !== 5) && (currentValue % 3 === 0 || currentValue % 5 === 0)) {
    return acc;
  }
  
  return acc + currentValue;
}, 0);

return sum;
