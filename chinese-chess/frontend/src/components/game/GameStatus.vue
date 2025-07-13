<template>
  <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
    <div class="flex items-center justify-between">
      <!-- Current Player -->
      <div class="flex items-center gap-3">
        <span class="text-lg font-medium text-gray-900">當前回合:</span>
        <div 
          class="flex items-center gap-2 px-3 py-2 rounded-full border-2"
          :class="currentPlayerClasses"
        >
          <div 
            class="w-4 h-4 rounded-full"
            :class="currentPlayerColor"
          ></div>
          <span class="font-bold" :class="currentPlayerTextColor">{{ currentPlayerName }}</span>
        </div>
      </div>
      
      <!-- Game Status -->
      <div class="flex items-center gap-4">
        <div v-if="chessStore.isGameOver" class="text-center">
          <div class="text-lg font-bold text-green-700">遊戲結束</div>
          <div class="text-sm text-gray-800 font-medium">{{ winnerMessage }}</div>
        </div>
        
        <!-- History Toggle -->
        <button 
          @click="showMoveHistory = !showMoveHistory"
          class="p-2 rounded-lg transition-colors"
          :class="showMoveHistory ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          :title="showMoveHistory ? '隱藏移動記錄' : '顯示移動記錄'"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <!-- Sound Toggle -->
        <button 
          @click="toggleSound"
          class="p-2 rounded-lg transition-colors"
          :class="soundEnabled ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
          :title="soundEnabled ? '關閉音效' : '開啟音效'"
        >
          <svg v-if="soundEnabled" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.766L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.766A1 1 0 019.383 3.076zM12 6.414A1 1 0 0113.414 5l1.586 1.586L16.586 5A1 1 0 0118 6.414L16.414 8 18 9.586A1 1 0 0116.586 11L15 9.414 13.414 11A1 1 0 0112 9.586L13.586 8 12 6.414z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.766L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.766A1 1 0 019.383 3.076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
          </svg>
        </button>
        
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
      <div class="text-sm font-semibold text-gray-900 mb-2">移動記錄:</div>
      <div class="text-sm text-gray-800 font-medium">
        <!-- TODO: Implement move history display -->
        暫未實作移動記錄
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useChessStore } from '../../stores/game/chess'
import { Color } from '../../game-logic'
import { soundService } from '../../services/soundService'

const chessStore = useChessStore()
const soundEnabled = ref(soundService.isEnabled())

const showMoveHistory = ref(false)

const currentPlayerName = computed(() => {
  return chessStore.currentPlayer === Color.RED ? '紅方' : '黑方'
})

const currentPlayerClasses = computed(() => {
  if (chessStore.currentPlayer === Color.RED) {
    return 'border-red-600 bg-red-100'
  } else {
    return 'border-gray-800 bg-gray-100'
  }
})

const currentPlayerTextColor = computed(() => {
  if (chessStore.currentPlayer === Color.RED) {
    return 'text-red-800'
  } else {
    return 'text-gray-900'
  }
})

const currentPlayerColor = computed(() => {
  if (chessStore.currentPlayer === Color.RED) {
    return 'bg-red-600'
  } else {
    return 'bg-gray-800'
  }
})

const winnerMessage = computed(() => {
  const winner = chessStore.getWinner
  if (winner === Color.RED) {
    return '紅方獲勝!'
  } else if (winner === Color.BLACK) {
    return '黑方獲勝!'
  }
  return '遊戲結束'
})

const resetGame = () => {
  chessStore.resetGame()
}

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
  soundService.setEnabled(soundEnabled.value)
  
  // Play a test sound when enabling
  if (soundEnabled.value) {
    soundService.playSelectSound()
  }
}
</script>