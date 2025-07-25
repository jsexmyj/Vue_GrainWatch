import axios from 'axios'
import { ElMessage } from 'element-plus'
// 文件上传函数
export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await axios.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        
        if (response.data.success) {
        return response.data.file_path
        } else {
        throw new Error('文件上传失败')
        }
    } catch (error) {
        console.error('文件上传失败:', error)
        ElMessage.error('文件上传失败，请重试')
        throw error
    }
}

