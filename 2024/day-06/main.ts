async function readFileHelper(path: string) {
  const decoder = new TextDecoder("utf-8");
  const fileBuffer = await Deno.readFile(path);

  return decoder.decode(fileBuffer);
}

const DIRECTIONS = {
  'UP': { x: 0, y: -1 },
  'DOWN': { x: 0, y: 1 },
  'LEFT': { x: -1, y: 0 },
  'RIGHT': { x: 1, y: 0 },
}

async function formatInput(path: string) {
  const file = await readFileHelper(path);

  return file.split('\n').filter(line => line != '').map(line => {
    const trimmedLine = line.trim();

    return trimmedLine.split('').filter(item => item != '');
  });
}

function getGuardInitialPosition(map) {
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map.length; x += 1) {
      const cell = map[y][x];

      if (cell === '^') {
        return { x, y }
      }
    }
  }
}

function inBounds({ x, y }, map) {
  return x >= 0 && x < map.length && y >= 0 && y < map.length;
}

function add(a, b) {
   return { x: a.x + b.x, y: a.y + b.y };
}

function getNewDirection(current) {
  switch (current) {
    case 'UP':
      return 'RIGHT';
    case 'DOWN':
      return 'LEFT';
    case 'RIGHT':
      return 'DOWN';
    case 'LEFT':
      return 'UP';
  }
}

function walk(map, firstPosition, initialDirection) {
  let direction = initialDirection;
  let position = { ...firstPosition };

  let steps = [];

  while (inBounds(position, map)) {
    const newPosition = add(position, DIRECTIONS[direction]);
    if (!inBounds(newPosition, map)) {
      return steps;
    }

    const cell = map[newPosition.y][newPosition.x];

    if (cell === '#') {
      direction = getNewDirection(direction);
    } else {
      position = newPosition;
      steps.push(JSON.stringify(position));
    }
  }

  return steps;
}

function getNumberOfDistinctValues(array) {
  return new Set(array).size;
}

async function AdventOfCodeDay1Part1(path: string) {
  const map = await formatInput(path);
  let direction = 'UP';
  const firstPosition = getGuardInitialPosition(map);

  const steps = walk(map, firstPosition, direction);

  return getNumberOfDistinctValues(steps);
}

async function AdventOfCodeDay1Part2(path: string) {
 const map = await formatInput(path);

  return map;
}

if (import.meta.main) {
  AdventOfCodeDay1Part1("input.txt").then(console.table);
  // AdventOfCodeDay1Part2("input.txt").then(console.table);
}
