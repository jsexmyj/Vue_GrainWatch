<!-- 状态提示 -->
<script setup lang="ts">
import { inject } from 'vue'
import type { AppState } from '@/types'

const appState = inject<AppState>('appState')!
const statusMessage = appState.statusMessage.value
const statusType = appState.statusType.value

</script>

<template>
  <div class="status-container" v-if="statusMessage">
    <el-alert :title="statusMessage" :type="statusType" :closable="false"> </el-alert>
  </div>
</template>

<style scoped>
.status-container {
  margin-top: 16px;
}
</style>
