import { ref, type Ref } from 'vue'
import axios from 'axios'
import type { RecognitionRequest, RecognitionResponse, StatusType } from '@/types'

export function useRecognition() {
  const isProcessing: Ref<boolean> = ref(false)
  const resultPath: Ref<string> = ref('')
  const statusMessage: Ref<string> = ref('')
  const statusType: Ref<StatusType> = ref('info')

  const handleRecognitionRequest = async (requestData: RecognitionRequest): Promise<string> => {
    isProcessing.value = true
    statusMessage.value = ''
    
    try {
      const response = await axios.put<RecognitionResponse>('/api/grain_ask', requestData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 300000
      })
      
      console.log("返回结果路径为：",response.data.result_path)
      if (response.data?.result_path) {
        resultPath.value = response.data.result_path
        statusMessage.value = '耕地识别完成！结果已在地图上显示。'
        statusType.value = 'success'
        return response.data.result_path
      } else {
        throw new Error('服务器未返回有效的结果路径')
      }
    } catch (error: any) {
      console.error('识别处理失败:', error)
      
      let errorMsg = '识别处理失败，请检查输入数据并重试。'
      if (error.response) {
        errorMsg = `服务器错误: ${error.response.status}`
      } else if (error.request) {
        errorMsg = '网络连接失败，请检查网络连接。'
      }
      
      statusMessage.value = errorMsg
      statusType.value = 'error'
      throw error
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    resultPath,
    statusMessage,
    statusType,
    handleRecognitionRequest
  }
}