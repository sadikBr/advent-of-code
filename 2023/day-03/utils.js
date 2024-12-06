const { readFile } = require('fs/promises');

async function read(path) {
  const buffer = await readFile(path);
  return buffer.toString();
}

async function readLines(path) {
  const lines = await read(path);
  return lines.split('\n').map(val => val.trim());
}

async function makeNumbersArray(path) {
  const lines = await read(path);
  return lines.split('\n').map(val => Number(val.trim()));
}

module.exports = { read, readLines, makeNumbersArray };
