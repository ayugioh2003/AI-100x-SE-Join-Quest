import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ChessGameService } from '../../src/ChessGameService';
import { Position } from '../../src/models/Position';
import { Color, PieceType } from '../../src/models/enums';

const gameService = new ChessGameService();
let currentGame: any;
let moveResult: any;

Given('the board is empty except for a Red General at \\({int}, {int})', function (row: number, col: number) {
  currentGame = gameService.createGame('test-game');
  // Implementation will be added
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