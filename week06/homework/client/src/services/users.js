import request from "@/utils/request"

// 用户注册
export const registerApi = (data) => {
    return request({
        url:'/user/register',
        method:'POST',
        data,
    })
}

// 用户登录
export const loginApi = (data) => {
    return request({
        url:'/user/login',
        method:'POST',
        data,
    })
}