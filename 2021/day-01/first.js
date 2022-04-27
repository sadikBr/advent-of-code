// Mission: count the number of times a depth measurement increases
const { makeNumbersArray } = require('./utils.js');

makeNumbersArray('first.txt').then((array) => {
  const total = countNumberOfIncreases(array);
  console.log(total);
});

function countNumberOfIncreases(array) {
  let prev = null;
  return array.reduce((count, val) => {
    let returnVal = 0;
    if (prev) {
      if (val > prev) {
        returnVal = count + 1;
      } else {
        returnVal = count;
      }
    }
    prev = val;
    return returnVal;
  }, 0);
}
