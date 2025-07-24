import type { Ref } from "vue"

export interface RecognitionRequest {
  input_path: string
  raster_path: string
  model_path: null
  output_root: string | null
}

export interface RecognitionResponse {
  result_path: string
}

export interface AppState {
  isProcessing: Ref<boolean>
  resultPath: Ref<string>
  statusMessage: Ref<string>
  statusType: Ref<'success' | 'error' | 'info' | 'warning'>
  handleRecognitionRequest: (data: RecognitionRequest) => Promise<string>
}

export interface FileUploadInfo {
  name: string
  raw: File
}

export type InputType = 'url' | 'file'

export type StatusType = 'success' | 'error' | 'info' | 'warning'