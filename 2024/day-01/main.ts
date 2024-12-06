async function readFileHelper(path: string) {
  const decoder = new TextDecoder("utf-8");
  const fileBuffer = await Deno.readFile(path);

  return decoder.decode(fileBuffer);
}

async function getData(path: string) {
  const data: { list1: number[], list2: number[] } = {
    list1: [],
    list2: []
  }
  const file = await readFileHelper(path);

  file.split("\n").forEach(item => {
    if (item !== "") {
      const [a, b] = item.split(/\s+/);
      data.list1.push(Number(a));
      data.list2.push(Number(b));
    }
  });

  return data;
}

async function AdventOfCodeDay1Part1(path: string) {
  const data = await getData(path);

  const sortedData = {
    list1: data.list1.sort(),
    list2: data.list2.sort(),
  }

  const diff = sortedData.list1.map((item, index) => {
    return Math.abs(item - sortedData.list2[index])
  });

  return diff.reduce((acc, value) => acc + value, 0);
}

async function AdventOfCodeDay1Part2(path: string) {
  const data = await getData(path);

  const appearanceObject = {};

  data.list1.forEach(number => {
    let appearedNumber = 0;
    data.list2.forEach(other => {
      if (number === other) appearedNumber += 1;
    });

    if (appearanceObject.hasOwnProperty(number)) {
      appearanceObject[number] = appearanceObject[number] + appearedNumber;
    } else {
      appearanceObject[number] = appearedNumber;
    }
  });

  return Object.entries(appearanceObject).reduce((acc: number, [key, value]) => acc + Number(key) * value, 0)
}

if (import.meta.main) {
  AdventOfCodeDay1Part1("input.txt").then(console.log);
  AdventOfCodeDay1Part2("input.txt").then(console.log);
}
