<template>
  <div class="bg-amber-200 p-6 rounded-lg shadow-lg">
    <!-- Board Container -->
    <div class="relative bg-amber-100 border-4 border-amber-800 rounded-lg p-4">
      <!-- Main Board Grid -->
      <div class="relative bg-amber-100" style="width: 432px; height: 528px;">
        <!-- Board Lines -->
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 432 528">
          <!-- Horizontal Lines (10 lines total) -->
          <g stroke="#8B4513" stroke-width="2" fill="none">
            <!-- Lines 1-10 -->
            <line v-for="row in 10" :key="`h-${row}`" 
                  :x1="24" :y1="(row-1) * 48 + 24" 
                  :x2="408" :y2="(row-1) * 48 + 24" />
          </g>
          
          <!-- Vertical Lines -->
          <g stroke="#8B4513" stroke-width="2" fill="none">
            <!-- Vertical lines for Black side (lines 1-5) -->
            <line v-for="col in 9" :key="`v-top-${col}`" 
                  :x1="(col-1) * 48 + 24" :y1="24" 
                  :x2="(col-1) * 48 + 24" :y2="216" />
            <!-- Vertical lines for Red side (lines 6-10) -->
            <line v-for="col in 9" :key="`v-bottom-${col}`" 
                  :x1="(col-1) * 48 + 24" :y1="264" 
                  :x2="(col-1) * 48 + 24" :y2="456" />
          </g>
          
          <!-- Palace Diagonal Lines -->
          <g stroke="#8B4513" stroke-width="2" fill="none">
            <!-- Black Palace (lines 1-3) -->
            <line x1="168" y1="24" x2="264" y2="120" />
            <line x1="264" y1="24" x2="168" y2="120" />
            <!-- Red Palace (lines 8-10) -->
            <line x1="168" y1="360" x2="264" y2="456" />
            <line x1="264" y1="360" x2="168" y2="456" />
          </g>
        </svg>
        
        <!-- River Text -->
        <div class="absolute flex items-center justify-center" style="top: 216px; left: 120px; right: 120px; height: 48px;">
          <div class="flex gap-8">
            <span class="text-lg font-bold text-amber-800">楚河</span>
            <span class="text-lg font-bold text-amber-800">漢界</span>
          </div>
        </div>
        
        <!-- Chess Pieces and Click Areas -->
        <!-- Black side pieces (rows 1-5) -->
        <div
          v-for="row in 5"
          :key="`black-row-${row}`"
          class="absolute"
          :style="{ top: `${(row-1) * 48 + 8}px` }"
        >
          <div
            v-for="col in 9"
            :key="`${row}-${col}`"
            class="absolute w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300 ease-in-out"
            :class="{
              'bg-yellow-300 bg-opacity-50': isSelected(row, col),
              'bg-green-300 bg-opacity-50': isValidMove(row, col),
              'hover:bg-gray-200 hover:bg-opacity-30': !isSelected(row, col),
              'bg-blue-300 bg-opacity-50': isDragOver(row, col)
            }"
            :style="{ left: `${(col-1) * 48 + 8}px` }"
            @click="handleCellClick(row, col)"
            @dragover.prevent="handleDragOver(row, col, $event)"
            @dragleave="handleDragLeave(row, col)"
            @drop="handleDrop(row, col, $event)"
          >
            <!-- Chess Piece -->
            <ChessPiece 
              v-if="getPieceAt(row, col)"
              :piece="getPieceAt(row, col)!"
              :position="createPosition(row, col)"
            />
          </div>
        </div>
        
        <!-- Red side pieces (rows 6-10) -->
        <div
          v-for="row in 5"
          :key="`red-row-${row + 5}`"
          class="absolute"
          :style="{ top: `${(row + 4) * 48 + 8}px` }"
        >
          <div
            v-for="col in 9"
            :key="`${row + 5}-${col}`"
            class="absolute w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300 ease-in-out"
            :class="{
              'bg-yellow-300 bg-opacity-50': isSelected(row + 5, col),
              'bg-green-300 bg-opacity-50': isValidMove(row + 5, col),
              'hover:bg-gray-200 hover:bg-opacity-30': !isSelected(row + 5, col),
              'bg-blue-300 bg-opacity-50': isDragOver(row + 5, col)
            }"
            :style="{ left: `${(col-1) * 48 + 8}px` }"
            @click="handleCellClick(row + 5, col)"
            @dragover.prevent="handleDragOver(row + 5, col, $event)"
            @dragleave="handleDragLeave(row + 5, col)"
            @drop="handleDrop(row + 5, col, $event)"
          >
            <!-- Chess Piece -->
            <ChessPiece 
              v-if="getPieceAt(row + 5, col)"
              :piece="getPieceAt(row + 5, col)!"
              :position="createPosition(row + 5, col)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChessStore } from '../../stores/game/chess'
import ChessPiece from './ChessPiece.vue'
import { Position } from '../../game-logic'

const chessStore = useChessStore()
const dragOverPosition = ref<Position | null>(null)

const isSelected = (row: number, col: number): boolean => {
  const selected = chessStore.selectedPosition
  return selected?.row === row && selected?.col === col
}

const isValidMove = (row: number, col: number): boolean => {
  if (!chessStore.selectedPosition) return false
  
  const validMoves = chessStore.getValidMoves(chessStore.selectedPosition)
  return validMoves.some(move => move.row === row && move.col === col)
}

const getPieceAt = (row: number, col: number) => {
  return chessStore.getPieceAt(new Position(row, col))
}

const createPosition = (row: number, col: number) => {
  return new Position(row, col)
}

const isDragOver = (row: number, col: number): boolean => {
  const dragPos = dragOverPosition.value
  return dragPos?.row === row && dragPos?.col === col
}

const handleDragOver = (row: number, col: number, event: DragEvent) => {
  event.preventDefault()
  dragOverPosition.value = new Position(row, col)
  
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const handleDragLeave = (_row: number, _col: number) => {
  dragOverPosition.value = null
}

const handleDrop = (row: number, col: number, event: DragEvent) => {
  event.preventDefault()
  dragOverPosition.value = null
  
  if (event.dataTransfer) {
    try {
      const dragData = JSON.parse(event.dataTransfer.getData('application/json'))
      const from: Position = dragData.from
      const to: Position = new Position(row, col)
      
      // Try to make the move
      const result = chessStore.makeMove(from, to)
      console.log('Move result:', result)
    } catch (error) {
      console.error('Error parsing drag data:', error)
    }
  }
}

const handleCellClick = (row: number, col: number) => {
  const position: Position = new Position(row, col)
  const piece = chessStore.getPieceAt(position)
  
  if (chessStore.selectedPosition) {
    // Try to make a move
    const result = chessStore.makeMove(chessStore.selectedPosition, position)
    console.log('Move result:', result)
    chessStore.clearSelection()
  } else if (piece && piece.color === chessStore.currentPlayer) {
    // Select piece if it belongs to current player
    chessStore.selectPosition(position)
  }
}
</script>