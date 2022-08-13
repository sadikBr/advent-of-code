const { readLines } = require('./utils.js');

readLines('./input.txt').then((values) => {
  const { oxygenGeneratorRating, co2ScrubberRating } = getRatings(values);

  console.log(oxygenGeneratorRating * co2ScrubberRating);
});

function getRatings(values) {
  let oxygenGeneratorRatingArray = [...values];
  let co2ScrubberRatingArray = [...values];

  let median;
  let count = 0;

  while (oxygenGeneratorRatingArray.length > 1) {
    median = Math.ceil(oxygenGeneratorRatingArray.length / 2);

    let sum = 0;
    for (let i = 0; i < oxygenGeneratorRatingArray.length; i++) {
      sum += Number(oxygenGeneratorRatingArray[i][count]);
    }

    if (sum >= median) {
      oxygenGeneratorRatingArray = oxygenGeneratorRatingArray.filter(
        (item) => item[count] === '1'
      );
    } else {
      oxygenGeneratorRatingArray = oxygenGeneratorRatingArray.filter(
        (item) => item[count] === '0'
      );
    }

    count += 1;
  }

  count = 0;

  while (co2ScrubberRatingArray.length > 1) {
    median = Math.ceil(co2ScrubberRatingArray.length / 2);

    let sum = 0;
    for (let i = 0; i < co2ScrubberRatingArray.length; i++) {
      sum += Number(co2ScrubberRatingArray[i][count]);
    }

    if (sum >= median) {
      co2ScrubberRatingArray = co2ScrubberRatingArray.filter(
        (item) => item[count] === '0'
      );
    } else {
      co2ScrubberRatingArray = co2ScrubberRatingArray.filter(
        (item) => item[count] === '1'
      );
    }

    count += 1;
  }

  return {
    oxygenGeneratorRating: parseInt(oxygenGeneratorRatingArray[0], 2),
    co2ScrubberRating: parseInt(co2ScrubberRatingArray[0], 2),
  };
}
