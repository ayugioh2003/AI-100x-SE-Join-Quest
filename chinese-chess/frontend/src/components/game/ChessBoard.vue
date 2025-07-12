<template>
  <div class="bg-amber-200 p-4 rounded-lg shadow-lg">
    <div class="grid grid-cols-9 gap-0 border-2 border-gray-800 bg-amber-100">
      <!-- Chess Board Grid -->
      <div
        v-for="row in 10"
        :key="`row-${row}`"
        class="contents"
      >
        <div
          v-for="col in 9"
          :key="`${row}-${col}`"
          class="relative w-12 h-12 border border-gray-600 flex items-center justify-center cursor-pointer hover:bg-amber-200 transition-colors"
          :class="{
            'bg-yellow-200': isSelected(row, col),
            'bg-green-200': isValidMove(row, col)
          }"
          @click="handleCellClick(row, col)"
        >
          <!-- Chess Piece -->
          <ChessPiece 
            v-if="getPieceAt(row, col)"
            :piece="getPieceAt(row, col)!"
            :position="{ row, col }"
          />
          
          <!-- River Divider -->
          <div 
            v-if="row === 5"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
          />
          <div 
            v-if="row === 6"
            class="absolute top-0 left-0 right-0 h-0.5 bg-blue-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChessStore } from '../../stores/game/chess'
import ChessPiece from './ChessPiece.vue'
import type { Position } from '../../types/chess'

const chessStore = useChessStore()

const isSelected = (row: number, col: number): boolean => {
  const selected = chessStore.selectedPosition
  return selected?.row === row && selected?.col === col
}

const isValidMove = (row: number, col: number): boolean => {
  // TODO: Implement valid move highlighting
  return false
}

const getPieceAt = (row: number, col: number) => {
  return chessStore.getPieceAt({ row, col })
}

const handleCellClick = (row: number, col: number) => {
  const position: Position = { row, col }
  const piece = chessStore.getPieceAt(position)
  
  if (chessStore.selectedPosition) {
    // Try to make a move
    const result = chessStore.makeMove(chessStore.selectedPosition, position)
    if (result.isLegal) {
      chessStore.switchPlayer()
    }
    chessStore.clearSelection()
  } else if (piece && piece.color === chessStore.currentPlayer) {
    // Select piece if it belongs to current player
    chessStore.selectPosition(position)
  }
}
</script>