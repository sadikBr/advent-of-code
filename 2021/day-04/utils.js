const { readFile } = require('fs/promises');

function read(path) {
  return readFile(path).then((buffer) => buffer.toString());
}

function readLines(path) {
  return read(path).then((string) => {
    return string.split('\n').map((val) => val.trim());
  });
}

function makeNumbersArray(path) {
  return read(path).then((string) => {
    return string.split('\n').map((val) => parseInt(val.trim()));
  });
}

module.exports = { read, readLines, makeNumbersArray };
