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
  up: (pos, depth, aim, val) => {
    aim = aim - val;
    return [pos, depth, aim];
  },
  down: (pos, depth, aim, val) => {
    aim = aim + val;
    return [pos, depth, aim];
  },
  forward: (pos, depth, aim, val) => {
    pos = pos + val;
    depth = depth + aim * val;
    return [pos, depth, aim];
  },
};

getInstructions('second.txt').then((instructions) => {
  let hPosition = 0;
  let depth = 0;
  let aim = 0;
  instructions.forEach((instruction) => {
    const key = Object.keys(instruction)[0];
    const [pos, dep, a] = methods[key](hPosition, depth, aim, instruction[key]);
    [hPosition, depth, aim] = [pos, dep, a];
  });
  console.log(hPosition * depth);
});
