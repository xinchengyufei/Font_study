import request from "@/utils/request"

// 获取data数据
export const getDataApi = (data) => {
    return request({
        url:'/data',
        method:'GET',
        params: data,
    })
}

// 添加data数据
export const addDataApi = (data) => {
    return request({
        url:'/data',
        method:'POST',
        data,
    })
}

// 修改data数据
export const changeDataApi = (data) => {
    return request({
        url:'/data',
        method:'PUT',
        data,
    })
}

// 删除data数据
export const deleteDataApi = (data) => {
    return request({
        url:'/data?id=' + data,
        method:'DELETE',
    })
}