<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col">
    <!-- Header -->
    <header class="text-center py-4 sm:py-6">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">中國象棋</h1>
    </header>
    
    <!-- Main Game Area -->
    <main class="flex-1 flex items-center justify-center px-4 py-4 sm:py-8">
      <div class="w-full max-w-6xl">
        <div class="flex flex-col xl:flex-row gap-4 sm:gap-8 items-center xl:items-start justify-center">
          <!-- Game Board -->
          <div class="flex-shrink-0 flex justify-center">
            <ChessBoard />
          </div>
          
          <!-- Game Info Panel -->
          <div class="w-full xl:w-80 flex-shrink-0 max-w-md xl:max-w-none">
            <GamePanel />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ChessBoard from '../components/game/ChessBoard.vue'
import GamePanel from '../components/game/GamePanel.vue'
</script>