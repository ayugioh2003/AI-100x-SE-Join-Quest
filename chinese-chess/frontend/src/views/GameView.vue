<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">中國象棋</h1>
      
      <div class="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <!-- Game Board -->
        <div class="flex-1 max-w-2xl">
          <ChessBoard />
        </div>
        
        <!-- Game Info Panel -->
        <div class="w-full lg:w-80">
          <GamePanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessBoard from '../components/game/ChessBoard.vue'
import GamePanel from '../components/game/GamePanel.vue'
</script>