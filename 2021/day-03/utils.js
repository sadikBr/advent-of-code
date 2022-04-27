const { readFile } = require('fs/promises');

function read(path) {
  return readFile(path).then((buffer) => buffer.toString());
}

function makeNumbersArray(path) {
  return read(path).then((string) => {
    return string.split('\n').map((val) => parseInt(val.trim()));
  });
}

module.exports = { read, makeNumbersArray };
