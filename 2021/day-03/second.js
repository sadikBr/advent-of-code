const { readLines } = require('./utils.js');

readLines('./input.txt').then((values) => {
  const { oxygenGeneratorRating, co2ScrubberRating } = getRatings(values);

  console.log(oxygenGeneratorRating * co2ScrubberRating);
});

function getRatings(values) {
  const oxygenGeneratorRating = getRating(values, '1', '0');
  const co2ScrubberRating = getRating(values, '0', '1');

  return {
    oxygenGeneratorRating,
    co2ScrubberRating,
  };
}

function getRating(array, val1, val2) {
  let count = 0;
  let newArray = [...array];

  while (newArray.length > 1) {
    const median = Math.ceil(newArray.length / 2);

    let sum = 0;
    for (let i = 0; i < newArray.length; i++) {
      sum += Number(newArray[i][count]);
    }

    if (sum >= median) {
      newArray = newArray.filter((item) => item[count] === val1);
    } else {
      newArray = newArray.filter((item) => item[count] === val2);
    }

    count += 1;
  }

  return parseInt(newArray[0], 2);
}
