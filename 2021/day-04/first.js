// Mission: calculate the sum of all the number in the file first.txt
const { read } = require('./utils.js');

class BoardCell {
  constructor(value) {
    this.value = value;
    this.marked = false;
  }
}

class Board {
  constructor(string) {
    this.string = string;
    this.cells = this.string.split('\n').map((row) => {
      return row.trim().split(/\s+/).map((value) => new BoardCell(+value));
    });
  }

  rowMarked(index) {
    for (let i = 0; i < 5; i++) {
      const cell = this.cells[index][i];
      if (!cell.marked) return false;
    }
    return true;
  }

  columnMarked(index) {
    for (let i = 0; i < 5; i++) {
      const cell = this.cells[i][index];
      if (!cell.marked) return false;
    }
    return true;
  }

  checkWin() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.columnMarked(i) || this.rowMarked(i)) {
        return true;
      }
    }

    return false;
  }

  markValueAndCheckWin(value_to_check) {
    this.cells = this.cells.map((row) => {
      return row.map((cell) => {
        if (cell.value === value_to_check) {
          const newCell = new BoardCell(value_to_check);
          newCell.marked = true;

          return newCell;
        }

        return cell;
      });
    });

    if (this.checkWin()) {
      return {
        number: value_to_check,
        board: this,
      };
    }
  }
}

function getScore() {
  return read('input-sample.txt').then((input) => {
    let [numbers, ...boards] = input.split('\r\n\r\n');

    boards = boards.map((board) => new Board(board));
    numbers = numbers.split(',').map((value) => +value);

    let winnerBoard = false;
    let number;

    while (!winnerBoard) {
      number = numbers.shift();

      for (let i = 0; i < boards.length; i++) {
        const board = boards[i];

        winnerBoard = board.markValueAndCheckWin(number);
      }
    }

    const nonMarkedValuesSum = winnerBoard.board.cells.reduce((acc, row) => {
      return (
        acc +
        row.reduce((sum, cell) => {
          if (!cell.marked) return sum + cell.value;
          else return sum;
        }, 0)
      );
    }, 0);

    return {
      number: winnerBoard.number,
      nonMarkedValuesSum,
      score: nonMarkedValuesSum * winnerBoard.number
    };
  });
}

getScore().then(console.log);
