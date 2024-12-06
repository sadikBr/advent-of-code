async function readFileHelper(path: string) {
  const decoder = new TextDecoder("utf-8");
  const fileBuffer = await Deno.readFile(path);

  return decoder.decode(fileBuffer);
}

async function formatInput(path: string) {
  const file = await readFileHelper(path);

  return file.split('\n').filter(item => item !== '').map(line => line.split(/\s+/).filter(item => item !== '').map(item => Number(item)));
}

// Part I of the challenge.

function isSafe(line: number[], isDecreasing: boolean) {
  for (let i = 0; i < line.length - 1; i += 1) {
    const current = line[i];
    const next = line[i + 1];

    if (current === next || Math.abs(current - next) > 3) {
      return false;
    }

    if (isDecreasing) {
      if (next > current) {
        return false;
      }
    } else {
      if (next < current) {
        return false;
      }
    }
  }

  return true;
}

async function AdventOfCodeDay2Part1(path: string) {
  const data = await formatInput(path);
  
  const safeLines = data.map(line => isSafe(line, line[0] - line[1] > 0));

  return safeLines.filter(item => item).length;
}

// Part II of the challenge.

function isSafePart2(line: number[], isDecreasing: boolean) {
  for (let i = 0; i < line.length - 1; i += 1) {
    const current = line[i];
    const next = line[i + 1];

    if (current === next || Math.abs(current - next) > 3) {
      return calculateIsSafe(line, i);
    }

    if (isDecreasing) {
      if (next > current) {
        return calculateIsSafe(line, i);
      }
    } else {
      if (next < current) {
        return calculateIsSafe(line, i);
      }
    }
  }

  return true;
}

function calculateIsSafe(line: number[], index: number) {
  const newLine = line.toSpliced(index, 1);
  const newLine1 = line.toSpliced(index + 1, 1);
  const newLine2 = index - 1 >= 0 ? line.toSpliced(index - 1, 1) : undefined;

  if (newLine2 !== undefined) {
    return (isSafe(newLine, newLine[0] - newLine[1] > 0) || isSafe(newLine1, newLine1[0] - newLine1[1] > 0) || isSafe(newLine2, newLine2[0] - newLine2[1] > 0));
  } else {
    return (isSafe(newLine, newLine[0] - newLine[1] > 0) || isSafe(newLine1, newLine1[0] - newLine1[1] > 0));
  }
}

async function AdventOfCodeDay2Part2(path: string) {
  const data = await formatInput(path);

  const safeLines = data.map(line => isSafePart2(line, line[0] - line[1] > 0));

  return safeLines.filter(item => item).length;
}

if (import.meta.main) {
  AdventOfCodeDay2Part1("input.txt").then(console.log);
  AdventOfCodeDay2Part2("input.txt").then(console.log);
}
