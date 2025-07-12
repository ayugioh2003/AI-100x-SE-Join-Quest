import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Color, GameState } from '../../types/chess'
import type { Position, MoveResult, ChessPiece } from '../../types/chess'

export const useChessStore = defineStore('chess', () => {
  // State
  const currentPlayer = ref<Color>(Color.RED)
  const gameState = ref<GameState>(GameState.IN_PROGRESS)
  const selectedPosition = ref<Position | null>(null)
  const board = ref<(ChessPiece | null)[][]>([])
  const moveHistory = ref<any[]>([])

  // Initialize empty 9x10 board
  const initializeBoard = () => {
    board.value = Array(10).fill(null).map(() => Array(9).fill(null))
  }

  // Actions
  const selectPosition = (position: Position) => {
    selectedPosition.value = position
  }

  const clearSelection = () => {
    selectedPosition.value = null
  }

  const makeMove = (from: Position, to: Position): MoveResult => {
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

  // Initialize
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