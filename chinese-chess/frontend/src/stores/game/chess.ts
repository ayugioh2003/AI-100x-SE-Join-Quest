import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ChessGame, Position, type MoveResult } from '../../game-logic'
import type { ChessPiece } from '../../types/chess'

export const useChessStore = defineStore('chess', () => {
  // State - now using actual ChessGame instance
  const game = ref<ChessGame>(new ChessGame())
  const selectedPosition = ref<Position | null>(null)

  // Actions
  const selectPosition = (position: Position) => {
    selectedPosition.value = position
  }

  const clearSelection = () => {
    selectedPosition.value = null
  }

  const makeMove = (from: Position, to: Position): MoveResult => {
    const result = game.value.makeMove(from, to)
    return result
  }

  const resetGame = () => {
    game.value = new ChessGame()
    selectedPosition.value = null
  }

  // Getters (computed values derived from the game state)
  const currentPlayer = computed(() => {
    return game.value.getCurrentPlayer()
  })

  const isGameOver = computed(() => {
    return game.value.isGameOver()
  })

  const getPieceAt = (position: Position): ChessPiece | null => {
    const piece = game.value.getBoard().getPieceAt(position)
    if (!piece) return null
    
    // Convert game logic piece to UI piece format
    return {
      type: piece.type,
      color: piece.color,
      position: piece.position
    }
  }

  const getValidMoves = (position: Position): Position[] => {
    const piece = game.value.getBoard().getPieceAt(position)
    if (!piece) return []
    
    return piece.getPossibleMoves(game.value.getBoard())
  }

  const getBoard = computed(() => {
    return game.value.getBoard()
  })

  const getWinner = computed(() => {
    return game.value.getWinner()
  })

  return {
    // State
    selectedPosition,
    
    // Actions
    selectPosition,
    clearSelection,
    makeMove,
    resetGame,
    
    // Getters
    currentPlayer,
    isGameOver,
    getPieceAt,
    getBoard,
    getWinner,
    getValidMoves
  }
})