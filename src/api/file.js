import agricultureRequest from '../utils/agricultureRequest'

// ==================== 文件上传接口 ====================

/**
 * 单文件上传
 * @param {File} file - 上传的文件
 * @returns {Promise} 返回上传结果
 */
export const uploadFile = (file) => {
  const formData = new FormData()
  formData.append('file', file)

  return agricultureRequest({
    url: '/doc/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 多文件上传
 * @param {File[]} files - 上传的文件数组
 * @returns {Promise} 返回上传结果数组
 */
export const uploadFiles = (files) => {
  const formData = new FormData()
  files.forEach(file => {
    formData.append('files', file)
  })

  return agricultureRequest({
    url: '/doc/uploads',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// ==================== 文件下载接口 ====================

/**
 * 通用文件下载
 * @param {String} fileId - 文件ID
 * @returns {Promise} 返回文件流
 */
export const downloadFile = (fileId) => {
  return agricultureRequest({
    url: '/doc/download',
    method: 'get',
    params: { fileId },
    responseType: 'blob'
  })
}

/**
 * 本地资源下载
 * @param {String} resource - 资源路径
 * @returns {Promise} 返回文件流
 */
export const downloadResource = (resource) => {
  return agricultureRequest({
    url: '/doc/download/resource',
    method: 'get',
    params: { resource },
    responseType: 'blob'
  })
}

// ==================== 文件预览接口 ====================

/**
 * 获取文件预览链接
 * @param {String} fileId - 文件ID
 * @returns {Promise} 返回预览URL
 */
export const getFilePreviewUrl = (fileId) => {
  return agricultureRequest({
    url: `/doc/preview/${fileId}`,
    method: 'get'
  })
}

// ==================== 辅助函数 ====================

/**
 * 下载文件辅助函数
 * @param {String} fileId - 文件ID
 * @param {String} fileName - 文件名称（可选，用于保存时的文件名）
 */
export const handleDownloadFile = async (fileId, fileName = 'download') => {
  try {
    const response = await downloadFile(fileId)

    // 从响应头中获取文件名（如果有）
    const contentDisposition = response.headers?.['content-disposition']
    let finalFileName = fileName

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (fileNameMatch && fileNameMatch[1]) {
        finalFileName = fileNameMatch[1].replace(/['"]/g, '')
        // 解码文件名
        finalFileName = decodeURIComponent(finalFileName)
      }
    }

    // 创建blob URL并触发下载
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = finalFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('File download failed:', error)
    throw error
  }
}

/**
 * 在新窗口预览文件
 * @param {String} fileId - 文件ID
 */
export const previewFileInNewWindow = async (fileId) => {
  try {
    const res = await getFilePreviewUrl(fileId)
    if (res.code === 200 && res.data) {
      window.open(res.data, '_blank')
    }
  } catch (error) {
    console.error('File preview failed:', error)
    throw error
  }
}
