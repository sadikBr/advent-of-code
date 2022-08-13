// Mission: What do you get if you multiply your final horizontal position by your final depth?
const { read } = require('./utils.js');

function getInstructions(path) {
  return read(path).then((fileContent) => {
    const instructions = [];
    fileContent.split('\n').forEach((instruction) => {
      const instructionObj = {};
      const [direction, val] = instruction.trim().split(' ');
      instructionObj[direction] = parseInt(val);
      instructions.push(instructionObj);
    });

    return instructions;
  });
}

const methods = {
  up: (pos, depth, val) => {
    depth = depth - val;
    return [pos, depth];
  },
  down: (pos, depth, val) => {
    depth = depth + val;
    return [pos, depth];
  },
  forward: (pos, depth, val) => {
    pos = pos + val;
    return [pos, depth];
  },
};

getInstructions('./input.txt').then((instructions) => {
  let hPosition = 0;
  let depth = 0;
  instructions.forEach((instruction) => {
    const key = Object.keys(instruction)[0];
    const [pos, dep] = methods[key](hPosition, depth, instruction[key]);
    [hPosition, depth] = [pos, dep];
  });
  console.log(hPosition * depth);
});
