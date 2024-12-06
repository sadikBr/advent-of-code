async function readFileHelper(path: string) {
  const decoder = new TextDecoder("utf-8");
  const fileBuffer = await Deno.readFile(path);

  return decoder.decode(fileBuffer);
}

async function formatInput(path: string) {
  const file = await readFileHelper(path);
  const lines = file.split('\n');

  const rules = lines.filter(line => line.includes('|')).map(item => item.trim());
  const prints = lines.filter(line => line.includes(',')).map(item => item.split(',')).map(line => line.map(item => item.trim()));

  const rulesMap = new Map();
  for (let i = 0; i < rules.length; i += 1) {
    const [page, next] = rules[i].split('|');

    if (rulesMap.has(page)) {
      rulesMap.get(page).push(next);
    } else {
      rulesMap.set(page, [next]);
    }
  }

  return {
    rulesMap, prints
  }
}

function validateOrder(printOrder, rules) {
  if (printOrder.length === 0) return true;

  const [first, ...nextPages] = printOrder;
  const rule = rules.get(first)
  
  if (!rule && nextPages.length > 0) {
    return false;
  }

  const validPrint = nextPages.every(page => rule.includes(page));

  if (validPrint) {
    return validateOrder(nextPages, rules);
  }

  return false;
}

function getMedianValue(array) {
  return Number(array[Math.floor(array.length / 2)]);
}

// Part I of the Challenge.

async function AdventOfCodeDay1Part1(path: string) {
  const { rulesMap, prints } = await formatInput(path);

  const validPrints = prints.filter(print => validateOrder(print, rulesMap));

  return validPrints.reduce((acc, print) => acc + getMedianValue(print), 0);
}

// Part II of the Challenge.

function makeTheOrderValid(printOrder, rules) {
  while (!validateOrder(printOrder, rules)) {
    for (let i = 0; i < printOrder.length - 1; i++) {
      const page = printOrder[i];
      const rule = rules.get(page);

      if (!rule && i < printOrder.length - 1) {
        const temp = printOrder[i];
        printOrder[i] = printOrder[i + 1];
        printOrder[i + 1] = temp;

        break;
      }

      for (let j = i + 1; j < printOrder.length; j++) {
        if (!rule.includes(printOrder[j])) {
          const temp = printOrder[i];
          printOrder[i] = printOrder[j];
          printOrder[j] = temp;

          break;
        }
      }
    }
  }

  return printOrder;
}

async function AdventOfCodeDay1Part2(path: string) {
  const { rulesMap, prints } = await formatInput(path);

  const invalidPrints = prints.filter(print => !validateOrder(print, rulesMap));
  const validPrints = invalidPrints.map(print => makeTheOrderValid(print, rulesMap));
 
  return validPrints.reduce((acc, print) => acc + getMedianValue(print), 0);
}

if (import.meta.main) {
  AdventOfCodeDay1Part1("input.txt").then(console.log);
  AdventOfCodeDay1Part2("input.txt").then(console.log);
}
