import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { AboutPage, HomePage, ProductPage } from '../pages'
import { SocioPage } from '../pages/SocioPage'

export const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout />,
        children: [{
            index: true,
            element: <HomePage/>,
        },{
            path: 'products',
            element: <ProductPage/>,
        },{
            path: 'socios',
            element: <SocioPage/> // Assuming you have a SociosPage component, replace ProductPage with it
        }
        ,{
            path: 'about',
            element: <AboutPage/>,
        }
        ],
    },
])