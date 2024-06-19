import request from '@/utils/request'

export const uploadText = (formData) => {
    const path = '/user/upload'
    // 用formData作为POST请求的body
    return request.post(path, formData)
}

// 文本上传
export const checkText = (info) => {
    return request.post('/check/text', info)
}


// 文本记录
export const recordText = (info) => {
    return request.post('/record/text', info)
}

// 删除文件
export const delFile = (fileId) => {
    return request.delete('/record/text' + fileId)
}