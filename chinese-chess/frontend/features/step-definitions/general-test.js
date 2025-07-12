import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';

// Test with simplified mock first to verify BDD setup
class TestGeneral {
  constructor(color, position) {
    this.color = color;
    this.type = 'GENERAL';
    this.position = position;
  }
  
  isValidMove(board, from, to) {
    // Simple mock logic for Red General
    if (this.color === 'RED') {
      // Within palace: row 8-10, col 4-6
      if (to.row < 8 || to.row > 10 || to.col < 4 || to.col > 6) {
        return false;
      }
      
      // One step orthogonal
      const rowDiff = Math.abs(to.row - from.row);
      const colDiff = Math.abs(to.col - from.col);
      
      if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
        return false;
      }
      
      // Check for facing generals
      if (this.wouldFaceOpponentGeneral(board, to)) {
        return false;
      }
      
      return true;
    }
    return false;
  }
  
  wouldFaceOpponentGeneral(board, to) {
    // Find Black General
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 9; col++) {
        const pos = new TestPosition(row, col);
        const piece = board.getPieceAt(pos);
        if (piece && piece.type === 'GENERAL' && piece.color === 'BLACK') {
          // Check if on same column
          if (to.col === col) {
            // Check if no pieces between
            const startRow = Math.min(to.row, row) + 1;
            const endRow = Math.max(to.row, row) - 1;
            
            for (let checkRow = startRow; checkRow <= endRow; checkRow++) {
              if (board.getPieceAt(new TestPosition(checkRow, to.col))) {
                return false; // There's a piece between, so OK
              }
            }
            return true; // No pieces between, would face
          }
        }
      }
    }
    return false;
  }
}

class TestPosition {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  
  equals(other) {
    return this.row === other.row && this.col === other.col;
  }
}

class TestBoard {
  constructor() {
    this.pieces = new Map();
  }
  
  setPieceAt(position, piece) {
    this.pieces.set(`${position.row},${position.col}`, piece);
  }
  
  getPieceAt(position) {
    return this.pieces.get(`${position.row},${position.col}`) || null;
  }
}

class TestGame {
  constructor() {
    this.board = new TestBoard();
    this.currentPlayer = 'RED';
  }
  
  getBoard() {
    return this.board;
  }
  
  makeMove(from, to) {
    const piece = this.board.getPieceAt(from);
    if (!piece) {
      return { isLegal: false, reason: 'No piece at source' };
    }
    
    if (piece.color !== this.currentPlayer) {
      return { isLegal: false, reason: 'Not your piece' };
    }
    
    const isValid = piece.isValidMove(this.board, from, to);
    
    if (!isValid) {
      return { isLegal: false, reason: 'Invalid move' };
    }
    
    // Move is valid
    this.board.setPieceAt(from, null);
    this.board.setPieceAt(to, piece);
    piece.position = to;
    
    return { isLegal: true, gameOver: false };
  }
}

let currentGame;
let moveResult;

Given('the board is empty except for a Red General at \\({int}, {int})', function (row, col) {
  currentGame = new TestGame();
  const board = currentGame.getBoard();
  
  const generalPosition = new TestPosition(row, col);
  const redGeneral = new TestGeneral('RED', generalPosition);
  board.setPieceAt(generalPosition, redGeneral);
});

When('Red moves the General from \\({int}, {int}) to \\({int}, {int})', function (fromRow, fromCol, toRow, toCol) {
  const from = new TestPosition(fromRow, fromCol);
  const to = new TestPosition(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Then('the move is legal', function () {
  expect(moveResult.isLegal).to.be.true;
});

Then('the move is illegal', function () {
  expect(moveResult.isLegal).to.be.false;
});

Given('the board has:', function (dataTable) {
  currentGame = new TestGame();
  const board = currentGame.getBoard();
  
  const rows = dataTable.hashes();
  for (const row of rows) {
    const piece = row['Piece'];
    const positionStr = row['Position'];
    
    const match = positionStr.match(/\((\d+), (\d+)\)/);
    if (!match) {
      throw new Error(`Invalid position format: ${positionStr}`);
    }
    
    const position = new TestPosition(parseInt(match[1]), parseInt(match[2]));
    
    if (piece === 'Red General') {
      const redGeneral = new TestGeneral('RED', position);
      board.setPieceAt(position, redGeneral);
    } else if (piece === 'Black General') {
      const blackGeneral = new TestGeneral('BLACK', position);
      board.setPieceAt(position, blackGeneral);
    }
  }
});