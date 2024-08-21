import request from "@/utils/request"

// 获取study数据
export const getStudyApi = () => {
    return request({
        url:'/study',
        method:'GET',
    })
}

// 添加study数据
export const addStudyApi = (data) => {
    return request({
        url:'/study',
        method:'POST',
        data,
    })
}

// 修改study数据
export const changeStudyApi = (data) => {
    return request({
        url:'/study',
        method:'PUT',
        data,
    })
}

// 删除study数据
export const deleteStudyApi = (data) => {
    return request({
        url:'/study?id=' + data,
        method:'DELETE',
    })
}