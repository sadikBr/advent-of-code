// Mission: calculate the sum of all the number in the file first.txt
const { readLines } = require('./utils.js');

readLines('input.txt').then((array) => {
  const games = formatData(array);

  const total = games.reduce(
    (acc, val) => (acc = acc + val.blue * val.green * val.red),
    0
  );

  console.log(total);
});

function formatData(array) {
  const GAMES = [];

  array.forEach((line) => {
    const [_, setsCombined] = line.split(':');

    const sets = setsCombined
      .trim()
      .split(';')
      .map((setCombined) => {
        const set = {};
        setCombined
          .trim()
          .split(',')
          .forEach((part) => {
            const [number, color] = part.trim().split(' ');
            set[color] = +number;
          });

        return set;
      })
      .reduce(
        (acc, val) => {
          return {
            blue: [...acc.blue, val.blue === undefined ? 0 : val.blue],
            green: [...acc.green, val.green === undefined ? 0 : val.green],
            red: [...acc.red, val.red === undefined ? 0 : val.red],
          };
        },
        {
          blue: [],
          red: [],
          green: [],
        }
      );

    GAMES.push({
      blue: Math.max(...sets.blue),
      green: Math.max(...sets.green),
      red: Math.max(...sets.red),
    });
  });

  return GAMES;
}
