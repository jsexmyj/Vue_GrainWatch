<!-- 状态提示 -->
<script setup lang="ts">
import { inject } from 'vue'
import type { AppState } from '@/types'

const appState = inject<AppState>('appState')!
const statusMessage = appState.statusMessage.value
const statusType = appState.statusType.value

</script>

<template>
  <div v-if="statusMessage" class="status-info">
    <el-alert :title="statusMessage" :type="statusType" :closable="false"> </el-alert>
  </div>
</template>

<style>
.status-info {
  padding: 16px 24px;
  background: #f8fafc;
  border-top: 1px solid #e5e7eb;
  font-size: 14px;
  color: #6b7280;
}
</style>
