<!-- 左侧控制面板 -->
<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { AppState, InputType, FileUploadInfo, RecognitionRequest } from '@/types'
import StatusInfo from './StatusInfo.vue'

const router = useRouter()
const appState = inject<AppState>('appState')!
const isProcessing = appState.isProcessing.value
const resultPath = appState.resultPath.value
const statusMessage = appState.statusMessage.value

// 表单数据
const inputType = ref<InputType>('url')
const inputUrl = ref<string>('')
const inputFile = ref<File | null>(null)
const rasterFile = ref<File | null>(null)
const outputRoot = ref<string>('')

// 计算属性
const canSubmit = computed<boolean>(() => {
  const hasInput =
    inputType.value === 'url' ? inputUrl.value.trim() !== '' : inputFile.value !== null
  const hasRaster = rasterFile.value !== null
  return hasInput && hasRaster && !appState.isProcessing.value
})

// 方法定义
const handleInputTypeChange = (): void => {
  inputUrl.value = ''
  inputFile.value = null
}

const handleInputFileChange = (file: FileUploadInfo): void => {
  inputFile.value = file.raw
}

const handleInputFileRemove = (): void => {
  inputFile.value = null
}

const handleRasterFileChange = (file: FileUploadInfo): void => {
  rasterFile.value = file.raw
}

const handleRasterFileRemove = (): void => {
  rasterFile.value = null
}

const startRecognition = async (): Promise<void> => {
  if (!canSubmit.value) return

  try {
    let inputPath = ''

    if (inputType.value === 'url') {
      inputPath = inputUrl.value.trim()
    } else if (inputFile.value) {
      inputPath = `/uploads/${inputFile.value.name}`
    }

    const rasterPath = rasterFile.value ? `/uploads/${rasterFile.value.name}` : ''

    const requestData: RecognitionRequest = {
      input_path: inputPath,
      raster_path: rasterPath,
      model_path: null,
      output_root: outputRoot.value.trim() || null,
    }

    await appState.handleRecognitionRequest(requestData)
  } catch (error) {
    ElMessage.error('识别处理失败')
  }
}

const downloadResult = (): void => {
  if (!appState.resultPath.value) return

  try {
    const link = document.createElement('a')
    link.href = appState.resultPath.value
    link.download = `grain_recognition_result_${Date.now()}.tif`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    ElMessage.success('开始下载结果文件')
  } catch (error) {
    ElMessage.error('文件下载失败，请稍后重试')
  }
}
</script>

<template>
  <div class="control-panel">
    <div class="panel-title">参数配置</div>

    <!-- 文本输入/文件上传 -->
    <div class="form-group">
      <label class="form-label">输入数据</label>
      <el-radio-group v-model="inputType" @change="handleInputTypeChange">
        <el-radio label="url">链接输入</el-radio>
        <el-radio label="file">文件上传</el-radio>
      </el-radio-group>

      <div v-if="inputType === 'url'" style="margin-top: 12px">
        <el-input v-model="inputUrl" placeholder="请输入HTTP/HTTPS链接" clearable> </el-input>
      </div>

      <div v-if="inputType === 'file'" style="margin-top: 12px">
        <el-upload
          ref="inputFileUpload"
          :auto-upload="false"
          :show-file-list="true"
          :limit="1"
          :on-change="handleInputFileChange"
          :on-remove="handleInputFileRemove"
        >
          <el-button type="primary" plain>选择文件</el-button>
        </el-upload>
        <div class="upload-tip">支持各种文档格式</div>
      </div>
    </div>

    <!-- GeoTIFF文件上传 -->
    <div class="form-group">
      <label class="form-label">GeoTIFF栅格数据</label>
      <el-upload
        ref="rasterFileUpload"
        :auto-upload="false"
        :show-file-list="true"
        :limit="1"
        accept=".tif,.tiff"
        :on-change="handleRasterFileChange"
        :on-remove="handleRasterFileRemove"
      >
        <el-button type="primary" plain>上传GeoTIFF</el-button>
      </el-upload>
      <div class="upload-tip">仅支持 .tif 和 .tiff 格式</div>
    </div>

    <!-- 输出路径 -->
    <div class="form-group">
      <label class="form-label">输出路径（可选）</label>
      <el-input v-model="outputRoot" placeholder="留空使用默认路径" clearable> </el-input>
    </div>

    <!-- 操作按钮 -->
    <div class="form-group">
      <el-button
        type="primary"
        size="large"
        style="width: 100%; margin-bottom: 12px"
        :loading="isProcessing"
        :disabled="!canSubmit"
        @click="startRecognition"
      >
        {{ isProcessing ? '识别中...' : '开始识别' }}
      </el-button>

      <el-button
        v-if="resultPath"
        type="success"
        size="large"
        style="width: 100%"
        @click="downloadResult"
      >
        下载结果文件
      </el-button>
    </div>

    <!-- 状态信息（单独抽出） -->
    <StatusInfo v-if="statusMessage" :message="statusMessage" />
  </div>
</template>

<style scoped>
.control-panel {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e5e7eb;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.upload-tip {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

@media (max-width: 1200px) {
  .control-panel {
    margin-bottom: 20px;
  }
}
</style>
