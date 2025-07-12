<template>
  <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
    <div class="flex items-center justify-between">
      <!-- Current Player -->
      <div class="flex items-center gap-3">
        <span class="text-lg font-medium text-gray-700">當前回合:</span>
        <div 
          class="flex items-center gap-2 px-3 py-2 rounded-full border-2"
          :class="currentPlayerClasses"
        >
          <div 
            class="w-4 h-4 rounded-full"
            :class="currentPlayerColor"
          ></div>
          <span class="font-bold">{{ currentPlayerName }}</span>
        </div>
      </div>
      
      <!-- Game Status -->
      <div class="flex items-center gap-4">
        <div v-if="chessStore.isGameOver" class="text-center">
          <div class="text-lg font-bold text-green-600">遊戲結束</div>
          <div class="text-sm text-gray-600">{{ winnerMessage }}</div>
        </div>
        <button 
          @click="resetGame"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          重新開始
        </button>
      </div>
    </div>
    
    <!-- Move History (optional) -->
    <div v-if="showMoveHistory" class="mt-4 pt-4 border-t border-gray-200">
      <div class="text-sm font-medium text-gray-700 mb-2">移動記錄:</div>
      <div class="text-sm text-gray-600">
        <!-- TODO: Implement move history display -->
        暫未實作移動記錄
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChessStore } from '../../stores/game/chess'
import { Color } from '../../game-logic'

const chessStore = useChessStore()

const showMoveHistory = false // Can be made reactive later

const currentPlayerName = computed(() => {
  return chessStore.currentPlayer === Color.RED ? '紅方' : '黑方'
})

const currentPlayerClasses = computed(() => {
  if (chessStore.currentPlayer === Color.RED) {
    return 'border-red-500 bg-red-50'
  } else {
    return 'border-gray-700 bg-gray-50'
  }
})

const currentPlayerColor = computed(() => {
  if (chessStore.currentPlayer === Color.RED) {
    return 'bg-red-500'
  } else {
    return 'bg-gray-700'
  }
})

const winnerMessage = computed(() => {
  // TODO: Get winner from game logic
  return '紅方獲勝!' // Placeholder
})

const resetGame = () => {
  chessStore.resetGame()
}
</script>