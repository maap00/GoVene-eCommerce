import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { AboutPage, CheckoutPage, DashboardNewProductPage, DashboardProductsPage, HomePage, LoginPage, OrdersUserPage, OrderUserPage, ProductPage, RegisterPage, SocioSingleProduct, ThanksyouPage, WelcomePage } from '../pages'
import { SocioPage } from '../pages/SocioPage'
import { ClientLayout } from '../layouts/ClientLayout'
import { DashboardLayout } from '../layouts/DashboardLayout'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage />
    },
    {
        element: <RootLayout />,
        children: [{
            path: 'home',
            element: <HomePage />,
        }, {
            path: 'products',
            element: <ProductPage />,
        }, {
            path: 'socios',
            element: <SocioPage /> // Assuming you have a SociosPage component, replace ProductPage with it
        }, {
            path: 'products/:slug',
            element: <SocioSingleProduct /> // Assuming you have a SociosPage component, replace ProductPage with it
        }, {
            path: 'about',
            element: <AboutPage />,
        }, {
            path: 'login',
            element: <LoginPage />,
        }, {
            path: 'register',
            element: <RegisterPage />,
        }, {
            path: 'account',
            element: <ClientLayout />,
            children: [
                {
                    path: '',
                    element: <Navigate to='/account/orders' />,
                },
                {
                    path: 'orders',
                    element: <OrdersUserPage />
                },
                {
                    path: 'orders/:id',
                    element: <OrderUserPage />
                }
            ]
        }
        ]
    },
    {
        path: '/checkOut',
        element: <CheckoutPage />
    },
    {
        path: '/checkOut/:id/thanks-you',
        element: <ThanksyouPage />
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/products' />
            },
            {
                path: 'products',
                element: <DashboardProductsPage />
            },
            {
                path: 'products/new',
                element: <DashboardNewProductPage />
            }
        ]
    }
])