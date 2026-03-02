// 图片上传API
import axios from 'axios'

// 上传图片到免费图床
export async function uploadImage(file) {
  try {
    // 使用SM.MS API
    const formData = new FormData()
    formData.append('smfile', file)
    
    const response = await axios.post('https://sm.ms/api/v2/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data.success) {
      return response.data.data.url
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    console.error('图片上传失败:', error)
    throw error
  }
}

// 生成Markdown图片链接
export function generateMarkdownImageLink(url, alt = '') {
  return `![${alt}](${url})`
}