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
