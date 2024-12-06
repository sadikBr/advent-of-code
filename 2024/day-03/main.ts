async function readFileHelper(path: string) {
  const decoder = new TextDecoder("utf-8");
  const fileBuffer = await Deno.readFile(path);

  return decoder.decode(fileBuffer);
}

async function formatInput(path: string) {
  return await readFileHelper(path);
}

function parseString(str: string) {
  const regularExpression = new RegExp(/mul\((\d+),(\d+)\)/);
  const matches = str.match(regularExpression);

  return [Number(matches[1]), Number(matches[2])];
}

// Part I of the challenge.

async function AdventOfCodeDay1Part1(path: string) {
  const fileInput = await formatInput(path);
  
  const regularExpression = new RegExp(/mul\(\d+,\d+\)/g);
  const matches = fileInput.match(regularExpression);

  return matches.map(match => parseString(match)).reduce((acc, [a, b]) => acc + a * b, 0);
}


// Part II of the Challenge.

async function AdventOfCodeDay1Part2(path: string) {
  const fileInput = await formatInput(path);

  const regularExpression = new RegExp(/(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))/g);
  const matches = fileInput.match(regularExpression);

  const stringsToEvaluate = [];
  let insert = true;
  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];

    if (match === 'do()') {
      insert = true;
    } else if (match === 'don\'t()') {
      insert = false;
    } else {
      if (insert) stringsToEvaluate.push(match);
    }
  }

  return stringsToEvaluate.map(match => parseString(match)).reduce((acc, [a, b]) => acc + a * b, 0);
}

if (import.meta.main) {
  AdventOfCodeDay1Part1("input.txt").then(console.log);
  AdventOfCodeDay1Part2("input.txt").then(console.log);
}
