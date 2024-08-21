import ReactDOM from 'react-dom/client'
import router from "@/router"
import { RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
