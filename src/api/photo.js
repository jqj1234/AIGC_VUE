import request from '@/utils/request'

export const uploadImage = (formData) => {
    const path = '/user/upload'
    // 用formData作为POST请求的body
    return request.post(path, formData)
}

// 文本上传
export const checkImage = (info) => {
    return request.post('/check/image', info)
}


// 图片记录
export const recordImage = (info) => {
    return request.post('/record/image', info)
}

// 删除图片
export const delImage = (fileId) => {
    return request.delete('/record/image' + fileId)
}