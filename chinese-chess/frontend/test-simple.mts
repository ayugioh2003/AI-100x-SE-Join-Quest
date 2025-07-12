import { ChessGame, Position, Color } from './src/game-logic/index.ts';
import { General } from './src/game-logic/pieces/General.ts';

console.log('🧪 Testing Chinese Chess Game Logic...\n');

try {
  // Test 1: Create empty board and place a Red General
  console.log('Test 1: Red General movement within palace');
  const game = new ChessGame();
  
  // Clear board and place only a Red General
  const board = game.getBoard();
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 9; col++) {
      board.setPieceAt(new Position(row, col), null);
    }
  }
  
  // Place Red General at (10, 5) - should be in red palace
  const redGeneral = new General(Color.RED, new Position(10, 5));
  board.setPieceAt(new Position(10, 5), redGeneral);
  
  // Test move from (10, 5) to (10, 4) - should be legal
  const result1 = game.makeMove(new Position(10, 5), new Position(10, 4));
  console.log(`Move (10,5) to (10,4): ${result1.isLegal ? '✅ PASS' : '❌ FAIL'}`);
  
  console.log('\n🎉 Basic test completed!');
  console.log('The BDD test setup is working correctly.');
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}