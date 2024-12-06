// Mission: calculate the sum of all the number in the file first.txt
const { readLines } = require('./utils.js');

const NUMBERS_CONSTANT = [
  {
    value: 'one',
    letter: '1',
    step: 3,
  },
  {
    value: 'two',
    letter: '2',
    step: 3,
  },
  {
    value: 'three',
    letter: '3',
    step: 5,
  },
  {
    value: 'four',
    letter: '4',
    step: 4,
  },
  {
    value: 'five',
    letter: '5',
    step: 4,
  },
  {
    value: 'six',
    letter: '6',
    step: 3,
  },
  {
    value: 'seven',
    letter: '7',
    step: 5,
  },
  {
    value: 'eight',
    letter: '8',
    step: 5,
  },
  {
    value: 'nine',
    letter: '9',
    step: 4,
  },
];

readLines('input.txt').then((array) => {
  const numbers = [];
  array.forEach((line) => {
    let number = [];
    line.split('').forEach((letter, i) => {
      if (!isNaN(letter)) {
        number.push({
          value: letter,
          index: i,
        });
      }
    });

    NUMBERS_CONSTANT.forEach(({ value, letter, step }) => {
      for (let j = 0; j <= line.length - step; j++) {
        const lineSubString = line.substring(j, j + step);
        if (lineSubString === value) {
          number.push({
            value: letter,
            index: j,
          });
        }
      }
    });

    const sortedNumber = number.sort((a, b) => a.index - b.index);

    numbers.push(
      sortedNumber[0].value + sortedNumber[sortedNumber.length - 1].value
    );
  });

  console.log(numbers.reduce((acc, val) => acc + +val, 0));
});
