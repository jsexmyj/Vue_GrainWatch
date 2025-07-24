<!-- 右侧地图区域 -->
<script setup lang="ts">
import { inject } from 'vue'
import { useMap } from '@/service/useMap'
import type { AppState } from '@/types'

const appState = inject<AppState>('appState')!
const resultPath = appState.resultPath.value
const { initMap, loadResultOnMap } = useMap(appState.resultPath)
</script>
<template>
    <!-- 右侧地图显示区域 -->
    <div class="map-container">
        <div class="map-header">
            <div class="map-title">结果可视化</div>
            <div v-if="resultPath" style="font-size: 12px; color: #6b7280;">
                结果已加载
            </div>
        </div>
        <div id="map"></div>
        <div class="status-info">
            <div v-if="!resultPath">
                请上传数据并点击"开始识别"来查看结果
            </div>
            <div v-else>
                识别结果已在地图上显示，您可以缩放和平移查看详细信息
            </div>
        </div>
    </div>
</template>

<style>
.map-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.map-header {
    padding: 16px 24px;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.map-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
}

#map {
    height: 600px;
    width: 100%;
}
</style>