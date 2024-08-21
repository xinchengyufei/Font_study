import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import languageReducer from './lang' 

export default configureStore({
    reducer: {
        user:userReducer,
        language: languageReducer,
    }
})