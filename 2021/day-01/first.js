// Task: count the number of times a depth measurement increases
const { makeNumbersArray } = require('./utils.js');

makeNumbersArray('./input.txt').then((array) => {
  const total = countNumberOfIncreases(array);
  console.log(total);
});

function countNumberOfIncreases(array) {
  let prev = null;
  return array.reduce((count, val) => {
    if (prev) {
      if (val > prev) {
        count = count + 1;
      } else {
        count = count;
      }
    }
    prev = val;
    return count;
  }, 0);
}
