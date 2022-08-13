const { readLines } = require('./utils.js');

readLines('./input.txt').then((values) => {
  const { gamaRate, epsilonRate } = getRates(values);

  console.log(gamaRate * epsilonRate);
});

function getRates(values) {
  const median = Math.floor(values.length / 2);
  let gamaRate = '';
  let epsilonRate = '';

  for (let j = 0; j < values[0].length; j++) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
      sum += Number(values[i][j]);
    }

    if (sum > median) {
      gamaRate += 1;
      epsilonRate += 0;
    } else {
      gamaRate += 0;
      epsilonRate += 1;
    }
  }

  return {
    gamaRate: parseInt(gamaRate, 2),
    epsilonRate: parseInt(epsilonRate, 2),
  };
}
