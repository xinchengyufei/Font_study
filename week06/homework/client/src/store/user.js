// 和用户相关的状态管理：token和info
import { getToken, setToken as _setToken } from '@/utils/token'
import { createSlice } from '@reduxjs/toolkit'
import { loginApi } from '@/services/users'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload 
            _setToken(action.payload)
        }
    }
})

const {setToken} = userStore.actions
const userReducer = userStore.reducer

// 异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const {result} = await loginApi(loginForm)
        if (result.code === 200) {
            dispatch(setToken(result.data.token))
        }
    }
}

export default userReducer
export { fetchLogin, setToken }