import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ChessGame, ChessBoard, Position, Color } from '../../src/game-logic';
import { General } from '../../src/game-logic/pieces/General';
import { Guard } from '../../src/game-logic/pieces/Guard';
import { Rook } from '../../src/game-logic/pieces/Rook';
import { Soldier } from '../../src/game-logic/pieces/Soldier';
import { Horse } from '../../src/game-logic/pieces/Horse';
import { Cannon } from '../../src/game-logic/pieces/Cannon';
import { Elephant } from '../../src/game-logic/pieces/Elephant';

let currentGame: ChessGame;
let moveResult: any;

// Helper function to create empty board
function createEmptyBoard(): ChessBoard {
  const board = new ChessBoard();
  // Clear all pieces from the board
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 9; col++) {
      board.setPieceAt(new Position(row, col), null);
    }
  }
  return board;
}

Given('the board is empty except for a Red General at \\({int}, {int})', function (row: number, col: number) {
  currentGame = new ChessGame();
  // Replace the board with an empty one
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  // Place Red General at specified position
  const generalPosition = new Position(row, col);
  const redGeneral = new General(Color.RED, generalPosition);
  board.setPieceAt(generalPosition, redGeneral);
});

When('Red moves the General from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

When('Red moves the Guard from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Then('the move is legal', function () {
  expect(moveResult.isLegal).to.be.true;
});

Then('the move is illegal', function () {
  expect(moveResult.isLegal).to.be.false;
});

Given('the board has:', function (dataTable: DataTable) {
  currentGame = new ChessGame();
  // Replace the board with an empty one
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  const rows = dataTable.hashes();
  for (const row of rows) {
    const piece = row['Piece'];
    const positionStr = row['Position'];
    
    // Parse position (row, col)
    const match = positionStr.match(/\((\d+), (\d+)\)/);
    if (!match) {
      throw new Error(`Invalid position format: ${positionStr}`);
    }
    
    const position = new Position(parseInt(match[1]), parseInt(match[2]));
    
    // Create appropriate piece
    if (piece === 'Red General') {
      const redGeneral = new General(Color.RED, position);
      board.setPieceAt(position, redGeneral);
    } else if (piece === 'Black General') {
      const blackGeneral = new General(Color.BLACK, position);
      board.setPieceAt(position, blackGeneral);
    } else if (piece === 'Red Guard') {
      const redGuard = new Guard(Color.RED, position);
      board.setPieceAt(position, redGuard);
    } else if (piece === 'Black Guard') {
      const blackGuard = new Guard(Color.BLACK, position);
      board.setPieceAt(position, blackGuard);
    } else if (piece === 'Red Rook') {
      const redRook = new Rook(Color.RED, position);
      board.setPieceAt(position, redRook);
    } else if (piece === 'Black Rook') {
      const blackRook = new Rook(Color.BLACK, position);
      board.setPieceAt(position, blackRook);
    } else if (piece === 'Red Soldier') {
      const redSoldier = new Soldier(Color.RED, position);
      board.setPieceAt(position, redSoldier);
    } else if (piece === 'Black Soldier') {
      const blackSoldier = new Soldier(Color.BLACK, position);
      board.setPieceAt(position, blackSoldier);
    } else if (piece === 'Red Horse') {
      const redHorse = new Horse(Color.RED, position);
      board.setPieceAt(position, redHorse);
    } else if (piece === 'Black Horse') {
      const blackHorse = new Horse(Color.BLACK, position);
      board.setPieceAt(position, blackHorse);
    } else if (piece === 'Red Cannon') {
      const redCannon = new Cannon(Color.RED, position);
      board.setPieceAt(position, redCannon);
    } else if (piece === 'Black Cannon') {
      const blackCannon = new Cannon(Color.BLACK, position);
      board.setPieceAt(position, blackCannon);
    } else if (piece === 'Red Elephant') {
      const redElephant = new Elephant(Color.RED, position);
      board.setPieceAt(position, redElephant);
    } else if (piece === 'Black Elephant') {
      const blackElephant = new Elephant(Color.BLACK, position);
      board.setPieceAt(position, blackElephant);
    }
  }
});

Given('the board is empty except for a Red Guard at \\({int}, {int})', function (row: number, col: number) {
  currentGame = new ChessGame();
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  const guardPosition = new Position(row, col);
  const redGuard = new Guard(Color.RED, guardPosition);
  board.setPieceAt(guardPosition, redGuard);
});

Given('the board is empty except for a Red Rook at \\({int}, {int})', function (row: number, col: number) {
  currentGame = new ChessGame();
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  const rookPosition = new Position(row, col);
  const redRook = new Rook(Color.RED, rookPosition);
  board.setPieceAt(rookPosition, redRook);
});

When('Red moves the Rook from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Given('the board is empty except for a Red Horse at \\({int}, {int})', function (row: number, col: number) {
  currentGame = new ChessGame();
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  const horsePosition = new Position(row, col);
  const redHorse = new Horse(Color.RED, horsePosition);
  board.setPieceAt(horsePosition, redHorse);
});

When('Red moves the Horse from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Given('the board is empty except for a Red Cannon at \\({int}, {int})', function (row: number, col: number) {
  currentGame = new ChessGame();
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  const cannonPosition = new Position(row, col);
  const redCannon = new Cannon(Color.RED, cannonPosition);
  board.setPieceAt(cannonPosition, redCannon);
});

When('Red moves the Cannon from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Given('the board is empty except for a Red Elephant at \\({int}, {int})', function (row: number, col: number) {
  currentGame = new ChessGame();
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  const elephantPosition = new Position(row, col);
  const redElephant = new Elephant(Color.RED, elephantPosition);
  board.setPieceAt(elephantPosition, redElephant);
});

When('Red moves the Elephant from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Given('the board is empty except for a Red Soldier at \\({int}, {int})', function (row: number, col: number) {
  currentGame = new ChessGame();
  (currentGame as any).board = createEmptyBoard();
  const board = currentGame.getBoard();
  
  const soldierPosition = new Position(row, col);
  const redSoldier = new Soldier(Color.RED, soldierPosition);
  board.setPieceAt(soldierPosition, redSoldier);
});

When('Red moves the Soldier from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Then('Red wins immediately', function () {
  expect(moveResult.isLegal).to.be.true;
  expect(moveResult.gameOver).to.be.true;
  expect(moveResult.winner).to.equal(Color.RED);
});

Then('the game is not over just from that capture', function () {
  expect(moveResult.isLegal).to.be.true;
  expect(moveResult.gameOver).to.be.false;
  expect(moveResult.winner).to.be.undefined;
});