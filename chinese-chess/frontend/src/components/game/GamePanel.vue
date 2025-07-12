<template>
  <div class="bg-white rounded-lg shadow-lg p-6 space-y-6">
    <!-- Current Player -->
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-2">當前玩家</h2>
      <div 
        class="inline-flex items-center px-4 py-2 rounded-full text-white font-bold"
        :class="currentPlayerClasses"
      >
        {{ currentPlayerText }}
      </div>
    </div>

    <!-- Game Status -->
    <div class="text-center">
      <h3 class="text-lg font-semibold mb-2">遊戲狀態</h3>
      <p class="text-gray-600">{{ gameStatusText }}</p>
    </div>

    <!-- Selected Piece Info -->
    <div v-if="selectedPosition" class="text-center">
      <h3 class="text-lg font-semibold mb-2">已選擇</h3>
      <p class="text-gray-600">
        位置: ({{ selectedPosition.row }}, {{ selectedPosition.col }})
      </p>
    </div>

    <!-- Game Controls -->
    <div class="space-y-3">
      <button 
        @click="resetGame"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        重新開始
      </button>
      
      <button 
        @click="clearSelection"
        class="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        :disabled="!selectedPosition"
      >
        取消選擇
      </button>
    </div>

    <!-- Move History (placeholder) -->
    <div>
      <h3 class="text-lg font-semibold mb-2">棋譜</h3>
      <div class="max-h-32 overflow-y-auto bg-gray-50 p-2 rounded text-sm">
        <p class="text-gray-500 text-center">暫無棋譜</p>
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
    ? 'bg-red-500' 
    : 'bg-gray-800'
})

const currentPlayerText = computed(() => {
  return chessStore.currentPlayer === Color.RED ? '紅方' : '黑方'
})

const gameStatusText = computed(() => {
  if (chessStore.isGameOver) {
    const winner = chessStore.getWinner
    if (winner) {
      const winnerName = winner === Color.RED ? '紅方' : '黑方'
      return `遊戲結束 - ${winnerName}獲勝！`
    }
    return '遊戲結束'
  }
  return '進行中'
})

const selectedPosition = computed(() => chessStore.selectedPosition)

const resetGame = () => {
  chessStore.resetGame()
}

const clearSelection = () => {
  chessStore.clearSelection()
}
</script>