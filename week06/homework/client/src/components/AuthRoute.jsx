import { getToken } from '@/utils/token'
import { Navigate } from 'react-router-dom'

// 是否成功登录获得token并保存到了本地存储中
// 是---> 进入主页面； 否---> 统统跳转登录页面
export function AuthRoute ({children}) {
    const token = getToken()
    if(token) {
        return <>{children}</>
    }
    else{
        return <Navigate to={'/login'} replace></Navigate>
    }
}