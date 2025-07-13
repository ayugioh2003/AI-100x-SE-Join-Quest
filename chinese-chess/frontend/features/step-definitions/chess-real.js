const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { ChessGame, Position, Color } = require('../../dist/index.js');
const { General } = require('../../dist/pieces/General.js');
const { Guard } = require('../../dist/pieces/Guard.js');

let currentGame;
let moveResult;

// Helper function to create empty board
function createEmptyBoard() {
  const game = new ChessGame();
  const board = game.getBoard();
  
  // Clear all pieces from the board
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 9; col++) {
      board.setPieceAt(new Position(row, col), null);
    }
  }
  
  return { game, board };
}

Given('the board is empty except for a Red General at \\({int}, {int})', function (row, col) {
  const { game, board } = createEmptyBoard();
  currentGame = game;
  
  // Place Red General at specified position
  const generalPosition = new Position(row, col);
  const redGeneral = new General(Color.RED, generalPosition);
  board.setPieceAt(generalPosition, redGeneral);
});

When('Red moves the General from \\({int}, {int}) to \\({int}, {int})', function (fromRow, fromCol, toRow, toCol) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Given('the board is empty except for a Red Guard at \\({int}, {int})', function (row, col) {
  const { game, board } = createEmptyBoard();
  currentGame = game;
  
  const guardPosition = new Position(row, col);
  const redGuard = new Guard(Color.RED, guardPosition);
  board.setPieceAt(guardPosition, redGuard);
});

When('Red moves the Guard from \\({int}, {int}) to \\({int}, {int})', function (fromRow, fromCol, toRow, toCol) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = currentGame.makeMove(from, to);
});

Given('the board has:', function (dataTable) {
  const { game, board } = createEmptyBoard();
  currentGame = game;
  
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
    }
  }
});

Then('the move is legal', function () {
  expect(moveResult.isLegal).to.be.true;
});

Then('the move is illegal', function () {
  expect(moveResult.isLegal).to.be.false;
});