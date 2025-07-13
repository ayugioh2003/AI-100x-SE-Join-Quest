<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Current Player Header -->
    <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-4 text-center border-b">
      <h2 class="text-lg font-semibold text-gray-700 mb-2">當前玩家</h2>
      <div 
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-xl shadow-md"
        :class="currentPlayerClasses"
      >
        <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        {{ currentPlayerText }}
      </div>
    </div>

    <!-- Game Info Section with Fixed Height -->
    <div class="p-6 space-y-4">
      <!-- Game Status -->
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span class="text-sm font-medium text-gray-700">遊戲狀態</span>
        <span class="text-sm font-bold" :class="gameStatusClasses">{{ gameStatusText }}</span>
      </div>

      <!-- Selected Piece Info - Fixed Height Container -->
      <div class="h-24 p-3 bg-blue-50 rounded-lg transition-all duration-300"
           :class="{ 'opacity-40': !selectedPosition }">
        <div v-if="selectedPosition">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">已選擇</span>
            <span class="text-sm font-mono font-bold text-gray-900">
              ({{ selectedPosition.row }}, {{ selectedPosition.col }})
            </span>
          </div>
          <div class="text-xs text-gray-600">
            <span class="font-medium">可移動至：</span>
            <div class="mt-1 max-h-10 overflow-y-auto">
              <span class="font-mono">{{ getValidMovesText() }}</span>
            </div>
          </div>
        </div>
        <div v-else class="h-full flex items-center justify-center">
          <p class="text-sm text-gray-500">請選擇棋子</p>
        </div>
      </div>

      <!-- Game Controls - Always at same position -->
      <div class="grid grid-cols-2 gap-3 pt-2">
        <button 
          @click="clearSelection"
          class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
          :disabled="!selectedPosition"
        >
          取消選擇
        </button>
        
        <button 
          @click="resetGame"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm"
        >
          重新開始
        </button>
      </div>
    </div>

    <!-- Move History Footer -->
    <div class="border-t bg-gray-50 p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-semibold text-gray-700">棋譜</h3>
        <span class="text-xs text-gray-500">{{ moveCount }} 步</span>
      </div>
      <div class="h-20 overflow-y-auto bg-white border border-gray-200 rounded p-2 text-xs">
        <p class="text-gray-500 text-center" v-if="moveCount === 0">暫無棋譜</p>
        <!-- TODO: Implement move history -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChessStore } from '../../stores/game/chess'
import { Color } from '../../game-logic'

const chessStore = useChessStore()

const currentPlayerClasses = computed(() => {
  return chessStore.currentPlayer === Color.RED 
    ? 'bg-gradient-to-r from-red-500 to-red-600' 
    : 'bg-gradient-to-r from-gray-700 to-gray-900'
})

const currentPlayerText = computed(() => {
  return chessStore.currentPlayer === Color.RED ? '紅方' : '黑方'
})

const gameStatusText = computed(() => {
  if (chessStore.isGameOver) {
    const winner = chessStore.getWinner
    if (winner) {
      const winnerName = winner === Color.RED ? '紅方' : '黑方'
      return `${winnerName}獲勝！`
    }
    return '遊戲結束'
  }
  return '進行中'
})

const gameStatusClasses = computed(() => {
  if (chessStore.isGameOver) {
    return 'text-green-700'
  }
  return 'text-blue-700'
})

const moveCount = computed(() => {
  // TODO: Get from actual move history
  return 0
})

const selectedPosition = computed(() => chessStore.selectedPosition)

const resetGame = () => {
  chessStore.resetGame()
}

const clearSelection = () => {
  chessStore.clearSelection()
}

const getValidMovesText = () => {
  if (!selectedPosition.value) return ''
  
  const validMoves = chessStore.getValidMoves(selectedPosition.value)
  if (validMoves.length === 0) return '無可移動位置'
  
  return validMoves.map(move => `(${move.row},${move.col})`).join(', ')
}
</script>