<script setup lang="ts">
import { ref, provide } from 'vue'
import Header from './components/Header.vue'
import { useRecognition } from '@/service/useRecognition'
import type { AppState } from '@/types/index'

import ControlPanel from './components/ControlPanel.vue'
import MapView from './views/MapView.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import axios from 'axios'


const {
  isProcessing,
  resultPath,
  statusMessage,
  statusType,
  handleRecognitionRequest
} = useRecognition()

const appState: AppState = {
  isProcessing,
  resultPath,
  statusMessage,
  statusType,
  handleRecognitionRequest
}

// 提供给子组件的数据和方法
provide('appState', appState)
    
</script>

<template>
  <div id="app">
    <Header />
    <div class="container">
      <ControlPanel />
      <MapView />
    </div>
    <LoadingOverlay v-show="isProcessing" />
  </div>
</template>

<style scoped>
.container {
    max-width: 1400px;
    margin: 20px auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 20px;
    height: calc(100vh - 120px);
}

@media (max-width: 1200px) {
  .container {
    grid-template-columns: 1fr;
    height: auto;
  }
}
</style>
