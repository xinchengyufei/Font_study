import request from "@/utils/request"

// lang获取
export const getLangApi = () => {
    return request({
        url:'/lang',
        method:'GET',
    })
}

// lang设置
export const setLangApi = (data) => {
    return request({
        url:'/lang',
        method:'POST',
        data,
    })
}