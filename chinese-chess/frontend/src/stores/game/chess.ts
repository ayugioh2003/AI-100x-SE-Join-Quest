import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Color, GameState, PieceType } from '../../types/chess'
import type { Position, MoveResult, ChessPiece } from '../../types/chess'

export const useChessStore = defineStore('chess', () => {
  // State
  const currentPlayer = ref<Color>(Color.RED)
  const gameState = ref<GameState>(GameState.IN_PROGRESS)
  const selectedPosition = ref<Position | null>(null)
  const board = ref<(ChessPiece | null)[][]>([])
  const moveHistory = ref<any[]>([])

  // Initialize board with starting positions
  const initializeBoard = () => {
    board.value = Array(10).fill(null).map(() => Array(9).fill(null))
    
    // Black pieces (top rows 1-2)
    // Row 1: Rook, Horse, Elephant, Guard, General, Guard, Elephant, Horse, Rook
    board.value[0][0] = { type: PieceType.ROOK, color: Color.BLACK, position: { row: 1, col: 1 } }
    board.value[0][1] = { type: PieceType.HORSE, color: Color.BLACK, position: { row: 1, col: 2 } }
    board.value[0][2] = { type: PieceType.ELEPHANT, color: Color.BLACK, position: { row: 1, col: 3 } }
    board.value[0][3] = { type: PieceType.GUARD, color: Color.BLACK, position: { row: 1, col: 4 } }
    board.value[0][4] = { type: PieceType.GENERAL, color: Color.BLACK, position: { row: 1, col: 5 } }
    board.value[0][5] = { type: PieceType.GUARD, color: Color.BLACK, position: { row: 1, col: 6 } }
    board.value[0][6] = { type: PieceType.ELEPHANT, color: Color.BLACK, position: { row: 1, col: 7 } }
    board.value[0][7] = { type: PieceType.HORSE, color: Color.BLACK, position: { row: 1, col: 8 } }
    board.value[0][8] = { type: PieceType.ROOK, color: Color.BLACK, position: { row: 1, col: 9 } }
    
    // Row 3: Cannons
    board.value[2][1] = { type: PieceType.CANNON, color: Color.BLACK, position: { row: 3, col: 2 } }
    board.value[2][7] = { type: PieceType.CANNON, color: Color.BLACK, position: { row: 3, col: 8 } }
    
    // Row 4: Soldiers
    for (let col = 0; col < 9; col += 2) {
      board.value[3][col] = { type: PieceType.SOLDIER, color: Color.BLACK, position: { row: 4, col: col + 1 } }
    }
    
    // Red pieces (bottom rows 6-10)
    // Row 7: Soldiers  
    for (let col = 0; col < 9; col += 2) {
      board.value[6][col] = { type: PieceType.SOLDIER, color: Color.RED, position: { row: 7, col: col + 1 } }
    }
    
    // Row 8: Cannons
    board.value[7][1] = { type: PieceType.CANNON, color: Color.RED, position: { row: 8, col: 2 } }
    board.value[7][7] = { type: PieceType.CANNON, color: Color.RED, position: { row: 8, col: 8 } }
    
    // Row 10: Rook, Horse, Elephant, Guard, General, Guard, Elephant, Horse, Rook
    board.value[9][0] = { type: PieceType.ROOK, color: Color.RED, position: { row: 10, col: 1 } }
    board.value[9][1] = { type: PieceType.HORSE, color: Color.RED, position: { row: 10, col: 2 } }
    board.value[9][2] = { type: PieceType.ELEPHANT, color: Color.RED, position: { row: 10, col: 3 } }
    board.value[9][3] = { type: PieceType.GUARD, color: Color.RED, position: { row: 10, col: 4 } }
    board.value[9][4] = { type: PieceType.GENERAL, color: Color.RED, position: { row: 10, col: 5 } }
    board.value[9][5] = { type: PieceType.GUARD, color: Color.RED, position: { row: 10, col: 6 } }
    board.value[9][6] = { type: PieceType.ELEPHANT, color: Color.RED, position: { row: 10, col: 7 } }
    board.value[9][7] = { type: PieceType.HORSE, color: Color.RED, position: { row: 10, col: 8 } }
    board.value[9][8] = { type: PieceType.ROOK, color: Color.RED, position: { row: 10, col: 9 } }
  }

  // Actions
  const selectPosition = (position: Position) => {
    selectedPosition.value = position
  }

  const clearSelection = () => {
    selectedPosition.value = null
  }

  const makeMove = (_from: Position, _to: Position): MoveResult => {
    // This will integrate with the backend logic later
    return {
      isLegal: false,
      gameOver: false,
      reason: 'Not implemented yet'
    }
  }

  const switchPlayer = () => {
    currentPlayer.value = currentPlayer.value === Color.RED ? Color.BLACK : Color.RED
  }

  const resetGame = () => {
    initializeBoard()
    currentPlayer.value = Color.RED
    gameState.value = GameState.IN_PROGRESS
    selectedPosition.value = null
    moveHistory.value = []
  }

  // Getters
  const isGameOver = computed(() => {
    return gameState.value === GameState.CHECKMATE || 
           gameState.value === GameState.STALEMATE || 
           gameState.value === GameState.DRAW
  })

  const getPieceAt = (position: Position): ChessPiece | null => {
    if (position.row < 1 || position.row > 10 || 
        position.col < 1 || position.col > 9) {
      return null
    }
    return board.value[position.row - 1][position.col - 1]
  }

  // Initialize board
  initializeBoard()

  return {
    // State
    currentPlayer,
    gameState,
    selectedPosition,
    board,
    moveHistory,
    
    // Actions
    selectPosition,
    clearSelection,
    makeMove,
    switchPlayer,
    resetGame,
    
    // Getters
    isGameOver,
    getPieceAt
  }
})