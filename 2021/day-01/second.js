// Mission: count the number of times the sum of measurements in this sliding window increases
const { makeNumbersArray } = require('./utils.js');

makeNumbersArray('second.txt').then((array) => {
  const total = countNumberOfIncreases(array);
  console.log(total);
});

function sum(array) {
  return array.reduce((prev, val) => prev + val, 0);
}

function getSlice(array, i) {
  return [array[i], array[i + 1], array[i + 2]];
}

function countNumberOfIncreases(array) {
  let total = 0;
  let prevSum = null;
  for (let i = 0; i < array.length - 2; i++) {
    const subArray = getSlice(array, i);
    const subArraySum = sum(subArray);
    if (prevSum) {
      if (subArraySum > prevSum) total++;
    }
    prevSum = subArraySum;
  }

  return total;
}
