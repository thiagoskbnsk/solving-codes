// somar numeros primos até 1000

console.time('conta');
for (let i = 0; i < 1000; i++) {
  console.log(i);
}
console.timeEnd('conta');

console.time('conta2');
new Array(1000).fill(null).map((v, i) => console.log(i));
console.timeEnd('conta2');