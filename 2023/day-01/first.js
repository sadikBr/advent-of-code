// Mission: calculate the sum of all the number in the file first.txt
const { readLines } = require('./utils.js');

readLines('input.txt').then((array) => {
  const numbers = [];
  array.forEach((line) => {
    let number = '';
    line.split('').forEach((letter) => {
      if (!isNaN(letter)) {
        number += letter;
      }
    });

    numbers.push(number[0] + number[number.length - 1]);
  });

  console.log(numbers.reduce((acc, val) => acc + +val, 0));
});
