// 获取React、Vue、Angular的下载量数据
import request from "@/utils/request/"

// 获取data数据
export const getFrameApi = (data) => {
    return request({
        url:'/down?frame=' + data,
        method:'GET',
    })
}