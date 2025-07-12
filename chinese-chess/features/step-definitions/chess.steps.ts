import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ChessGameService } from '../../src/ChessGameService';
import { Position } from '../../src/models/Position';
import { Color } from '../../src/models/enums';
import { General } from '../../src/models/pieces/General';
import { Guard } from '../../src/models/pieces/Guard';
import { Rook } from '../../src/models/pieces/Rook';
import { Soldier } from '../../src/models/pieces/Soldier';
import { Horse } from '../../src/models/pieces/Horse';
import { Cannon } from '../../src/models/pieces/Cannon';

const gameService = new ChessGameService();
let currentGame: any;
let moveResult: any;

Given('the board is empty except for a Red General at \\({int}, {int})', function (row: number, col: number) {
  currentGame = gameService.createGame('test-game');
  const board = currentGame.getBoard();
  
  // Place Red General at specified position
  const generalPosition = new Position(row, col);
  const redGeneral = new General(Color.RED, generalPosition);
  board.setPieceAt(generalPosition, redGeneral);
});

When('Red moves the General from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = gameService.makeMove('test-game', from, to);
});

When('Red moves the Guard from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = gameService.makeMove('test-game', from, to);
});

Then('the move is legal', function () {
  expect(moveResult.isLegal).to.be.true;
});

Then('the move is illegal', function () {
  expect(moveResult.isLegal).to.be.false;
});

Given('the board has:', function (dataTable: DataTable) {
  currentGame = gameService.createGame('test-game');
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
    }
    // Add other piece types as needed
  }
});

Given('the board is empty except for a Red Guard at \\({int}, {int})', function (row: number, col: number) {
  currentGame = gameService.createGame('test-game');
  const board = currentGame.getBoard();
  
  // Place Red Guard at specified position
  const guardPosition = new Position(row, col);
  const redGuard = new Guard(Color.RED, guardPosition);
  board.setPieceAt(guardPosition, redGuard);
});

Given('the board is empty except for a Red Rook at \\({int}, {int})', function (row: number, col: number) {
  currentGame = gameService.createGame('test-game');
  const board = currentGame.getBoard();
  
  // Place Red Rook at specified position
  const rookPosition = new Position(row, col);
  const redRook = new Rook(Color.RED, rookPosition);
  board.setPieceAt(rookPosition, redRook);
});

When('Red moves the Rook from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = gameService.makeMove('test-game', from, to);
});

Given('the board is empty except for a Red Horse at \\({int}, {int})', function (row: number, col: number) {
  currentGame = gameService.createGame('test-game');
  const board = currentGame.getBoard();
  
  // Place Red Horse at specified position
  const horsePosition = new Position(row, col);
  const redHorse = new Horse(Color.RED, horsePosition);
  board.setPieceAt(horsePosition, redHorse);
});

When('Red moves the Horse from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = gameService.makeMove('test-game', from, to);
});

Given('the board is empty except for a Red Cannon at \\({int}, {int})', function (row: number, col: number) {
  currentGame = gameService.createGame('test-game');
  const board = currentGame.getBoard();
  
  // Place Red Cannon at specified position
  const cannonPosition = new Position(row, col);
  const redCannon = new Cannon(Color.RED, cannonPosition);
  board.setPieceAt(cannonPosition, redCannon);
});

When('Red moves the Cannon from \\({int}, {int}) to \\({int}, {int})', function (fromRow: number, fromCol: number, toRow: number, toCol: number) {
  const from = new Position(fromRow, fromCol);
  const to = new Position(toRow, toCol);
  moveResult = gameService.makeMove('test-game', from, to);
});