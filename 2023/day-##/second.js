// Mission: find the max number in the file second.txt
const { makeNumbersArray } = require('./utils.js');

makeNumbersArray('input.txt').then((array) => {
  const max = findMax(array);
  console.log(max);
});

function findMax(array) {
  return array.reduce((max, val) => {
    if (val > max) return val;
    return max;
  }, -Infinity);
}
