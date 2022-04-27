// Mission: calculate the sum of all the number in the file first.txt
const { makeNumbersArray } = require('./utils.js');

makeNumbersArray('first.txt').then((array) => {
  const total = sum(array);
  console.log(total);
});

function sum(array) {
  return array.reduce((prev, val) => prev + val, 0);
}
