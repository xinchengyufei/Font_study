import { createSlice } from '@reduxjs/toolkit'
import { getLangApi, setLangApi } from '../services/lang'

const languageStore = createSlice({
  name: 'language',
  initialState: {
    lang: 'zh'
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload
    },
  },
})

const {setLanguage} = languageStore.actions
const languageReducer = languageStore.reducer

// 异步方法 获取后端的语言设置
const fetchLang = () => {
    return async (dispatch) => {
      const result = await getLangApi()
      if (result.code === 200) {
        await dispatch(setLanguage(result.data))
      }
    }
}

// 异步方法 向后端更新语言设置
const updateLang = (value) => {
  return async (dispatch) => {
      const res = await setLangApi({lang: value})
      if (res.code === 201){
        dispatch(fetchLang())
      }
  }
}

export default languageReducer
export { fetchLang, updateLang, setLanguage }