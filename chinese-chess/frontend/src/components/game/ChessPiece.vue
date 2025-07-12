<template>
  <div 
    class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-3 shadow-lg cursor-pointer select-none transform transition-all duration-300 ease-in-out hover:scale-105"
    :class="[pieceClasses, { 
      'z-50 scale-110 shadow-2xl': isDragging,
      'animate-pulse': isCurrentPlayerPiece
    }]"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    {{ pieceSymbol }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ChessPiece } from '../../types/chess'
import { Color, Position } from '../../game-logic'
import { useChessStore } from '../../stores/game/chess'

interface Props {
  piece: ChessPiece
  position: Position
}

const props = defineProps<Props>()
const chessStore = useChessStore()
const isDragging = ref(false)

const pieceSymbol = computed(() => {
  const symbols = {
    [Color.RED]: {
      GENERAL: '帥',
      GUARD: '仕',
      ROOK: '車',
      HORSE: '馬',
      CANNON: '炮',
      ELEPHANT: '相',
      SOLDIER: '兵'
    },
    [Color.BLACK]: {
      GENERAL: '將',
      GUARD: '士',
      ROOK: '車',
      HORSE: '馬',
      CANNON: '砲',
      ELEPHANT: '象',
      SOLDIER: '卒'
    }
  }
  
  return symbols[props.piece.color][props.piece.type]
})

const isCurrentPlayerPiece = computed(() => {
  return props.piece.color === chessStore.currentPlayer
})

const pieceClasses = computed(() => {
  if (props.piece.color === Color.RED) {
    return 'bg-red-600 text-white border-red-800 shadow-red-300'
  } else {
    return 'bg-gray-900 text-white border-gray-700 shadow-gray-500'
  }
})

const handleDragStart = (event: DragEvent) => {
  // Only allow dragging if it's the current player's piece
  if (props.piece.color !== chessStore.currentPlayer) {
    event.preventDefault()
    return
  }
  
  isDragging.value = true
  
  // Store the source position in the drag data
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({
      from: props.position,
      piece: props.piece
    }))
    event.dataTransfer.effectAllowed = 'move'
  }
}

const handleDragEnd = () => {
  isDragging.value = false
}
</script>