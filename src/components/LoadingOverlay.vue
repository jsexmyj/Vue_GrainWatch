<!-- 加载遮罩 -->
<script setup lang="ts">
import { inject } from 'vue'
import type { AppState } from '@/types'

const appState = inject<AppState>('appState')!
const isProcessing = appState.isProcessing.value
</script>
<template>
    <!-- 加载遮罩 -->
    <div class="loading-overlay" v-show="isProcessing">
        <div class="loading-content">
            <el-icon size="32px" style="margin-bottom: 16px;">
                <loading></loading>
            </el-icon>
            <div style="font-size: 16px; color: #1f2937;">正在进行耕地识别分析...</div>
            <div style="font-size: 14px; color: #6b7280; margin-top: 8px;">请耐心等待，这可能需要几分钟时间</div>
        </div>
    </div>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.loading-icon {
  font-size: 32px;
  margin-bottom: 16px;
  color: #1e40af;
}

.loading-title {
  font-size: 16px;
  color: #1f2937;
  margin-bottom: 8px;
}

.loading-desc {
  font-size: 14px;
  color: #6b7280;
}
</style>
