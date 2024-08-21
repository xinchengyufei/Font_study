import request from "@/utils/request"

// 获取tags数据
export const getTagsApi = () => {
    return request({
        url:'/tags',
        method:'GET',
    })
}

// 添加tags数据
export const addTagsApi = (data) => {
    return request({
        url:'/tags',
        method:'POST',
        data,
    })
}

// 修改tags数据
export const changeTagsApi = (data) => {
    return request({
        url:'/tags',
        method:'PUT',
        data,
    })
}

// 删除tags数据
export const deleteTagsApi = (data) => {
    return request({
        url:'/tags?id=' + data,
        method:'DELETE',
    })
}

// 批量删除tags数据
export const deleteAllTagsApi = (data) => {
    return request({
        url:'/tags/allDel',
        method:'POST',
        data,
    })
}