<template>
  <div 
    class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 shadow-md cursor-pointer select-none"
    :class="pieceClasses"
  >
    {{ pieceSymbol }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChessPiece, Position } from '../../types/chess'
import { Color } from '../../types/chess'

interface Props {
  piece: ChessPiece
  position: Position
}

const props = defineProps<Props>()

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

const pieceClasses = computed(() => {
  const baseClasses = 'transition-all duration-200 hover:scale-110'
  
  if (props.piece.color === Color.RED) {
    return `${baseClasses} bg-red-500 text-white border-red-700`
  } else {
    return `${baseClasses} bg-gray-800 text-white border-gray-900`
  }
})
</script>