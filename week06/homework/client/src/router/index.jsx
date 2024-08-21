import { createBrowserRouter } from "react-router-dom"
import MainLayout from '@/pages/MainLayout'
import Login from '@/pages/Login'
import Details from '@/pages/Details'
import FontFrame from '@/pages/FontFrame'
import Studys from '@/pages/Studys'
import Register from '@/pages/Register'
import Tags from '@/pages/Tags'
import { AuthRoute } from "@/components/AuthRoute"

const router = createBrowserRouter([
    {
        path:'/',
        element: <AuthRoute> <MainLayout></MainLayout> </AuthRoute>,
        children: [
            {
                path:'/',
                element:<Studys></Studys>
            },
            {
                path:'/details',
                element:<Details></Details>
            },
            {
                path:'/tags',
                element:<Tags></Tags>
            },
            {
                path:'/fontframe',
                element:<FontFrame></FontFrame>
            }
        ]
    },
    {
        path:'/login',
        element: <Login></Login>,
    },
    {
        path:'/register',
        element: <Register></Register>,
    }
])

export default router