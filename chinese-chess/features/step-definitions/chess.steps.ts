import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ChessGameService } from '../../src/ChessGameService';
import { Position } from '../../src/models/Position';
import { Color } from '../../src/models/enums';
import { General } from '../../src/models/pieces/General';

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
    }
    // Add other piece types as needed
  }
});