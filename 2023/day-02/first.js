// Mission: calculate the sum of all the number in the file first.txt
const { readLines } = require('./utils.js');

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

readLines('input.txt').then((array) => {
  const games = formatData(array);
  const possibleGames = [];

  for (let i = 0; i < games.length; i++) {
    const gameSets = games[i];
    let possible = true;

    for (let j = 0; j < gameSets.length; j++) {
      const set = gameSets[j];

      if (
        set.red > LIMITS.red ||
        set.green > LIMITS.green ||
        set.blue > LIMITS.blue
      ) {
        possible = false;
        break;
      }
    }

    if (possible) {
      possibleGames.push(i + 1);
    }
  }

  console.log(possibleGames.reduce((acc, val) => acc + val, 0));
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
      });

    GAMES.push(sets);
  });

  return GAMES;
}
