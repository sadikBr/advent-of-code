// Mission: calculate the sum of all the number in the file first.txt
import { makeNumbersArray } from './utils.js';

makeNumbersArray('input.txt').then((array) => {
  const total = sum(array);
  console.log(total);
});

function sum(array) {
  return array.reduce((prev, val) => prev + val, 0);
}
