<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="text-center space-y-8">
      <!-- Icon -->
      <div class="relative">
        <div class="w-32 h-32 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
          <i class="ri-file-unknow-line text-6xl text-yellow-500"></i>
        </div>
        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          404
        </div>
      </div>
      
      <!-- Message -->
      <div class="space-y-3">
        <h1 class="text-3xl font-bold text-gray-800">{{ $t('common.pageNotFound') }}</h1>
        <p class="text-gray-500 max-w-md mx-auto">{{ $t('common.pageNotFoundDesc') }}</p>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center justify-center gap-4">
        <button 
          @click="goBack"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
        >
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.goBack') }}
        </button>
        <button 
          @click="goHome"
          class="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
        >
          <i class="ri-home-line"></i>
          {{ $t('common.backToHome') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/home')
}
</script>
