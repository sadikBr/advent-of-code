async function readFileHelper(path: string) {
  const decoder = new TextDecoder("utf-8");
  const fileBuffer = await Deno.readFile(path);

  return decoder.decode(fileBuffer);
}

async function formatInput(path: string) {
  const file = await readFileHelper(path);

  return file.split('\n').filter(item => item !== '').map(item => item.trim()).map(line => line.split(''));
}

function getRow(table, index) {
  return table[index].join('');
}

function getCol(table, index) {
  const row = [];
  for (let i = 0; i < table.length; i++) {
    row.push(table[i][index]);
  }
  return row.join('');
}

function getDiagonals(table, index) {
  const reverseIndex = table.length - 1 - index;
  const diag1 = [], diag2 = [], diag3 = [], diag4 = [];

  for (let i = 0; i <= index; i++) {
    diag1.push(table[index - i][i]);
    diag3.push(table[i][reverseIndex + i]);
  }

  for (let i = 0; i <= index; i++) {
    diag2.push(table[table.length - 1 - i][reverseIndex + i]);
    diag4.push(table[reverseIndex + i][i]);
  }

  return [diag1.join(''), diag2.join(''), diag3.join(''), diag4.join('')];
}

function getAllUniqueLines(inputTable) {
  const data = [];

  // We should traverse the whole matrix and find all the `XMAS` instances
  for (let i = 0; i < inputTable.length; i++) {
    data.push(getCol(inputTable, i));
    data.push(getRow(inputTable, i));
    data.push(...getDiagonals(inputTable, i));
  }

  return Array.from(new Set(data)).filter(line => line.length >= 4);
}

function getAllChunks(inputTable) {
  const chunks = [];
  
  for (let i = 0; i < inputTable.length - 2; i += 1) {
    for (let j = 0; j < inputTable.length - 2; j += 1) {
      chunks.push(`${inputTable[i][j]}${inputTable[i][j+1]}${inputTable[i][j+2]}${inputTable[i+1][j]}${inputTable[i+1][j+1]}${inputTable[i+1][j+2]}${inputTable[i+2][j]}${inputTable[i+2][j+1]}${inputTable[i+2][j+2]}`);
    }
  }

  return chunks;
}

// Part I of the Challenge.

async function AdventOfCodeDay1Part1(path: string) {
  const inputTable = await formatInput(path);
  const uniqueLines = getAllUniqueLines(inputTable);

  const regularExpression = new RegExp(/XMAS/g);
  let numberOfMatches = 0;

  for (let i = 0; i < uniqueLines.length; i += 1) {
    const line = uniqueLines[i];
    const reversedLine = line.split('').toReversed().join('');

    const lineMatches = line.match(regularExpression);
    const reversedLineMatches = reversedLine.match(regularExpression);

    if (lineMatches != null) {
      numberOfMatches += lineMatches.length;
    }
    if (reversedLineMatches != null) {
      numberOfMatches += reversedLineMatches.length;
    }
  }

  return numberOfMatches;
}

// Part II of the Challenge.

async function AdventOfCodeDay1Part2(path: string) {
  const inputTable = await formatInput(path);
  const chunks = getAllChunks(inputTable);

  const regularExpression = new RegExp(/(M.M.A.S.S)|(S.M.A.S.M)|(S.S.A.M.M)|(M.S.A.M.S)/);
  const filteredChunks = chunks.filter(chunk => regularExpression.test(chunk));

  return filteredChunks.length;
}

if (import.meta.main) {
  AdventOfCodeDay1Part1("input.txt").then(console.log);
  AdventOfCodeDay1Part2("input.txt").then(console.log);
}
