import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Narbar } from '../components/shared/Narbar'
import { Footer } from '../components/shared/Footer'
import { Banner } from '../components/home/Banner'
import { Newletters } from '../components/home/Newsletters'

export const RootLayout = () => {

    const {pathname} = useLocation();

  return (
    <div className='h-screen flex flex-col font-montserrat'>
        <Narbar/>

        {pathname === '/' && (
            <Banner/>
        )}

        <main className="container my-8 flex-1">
            <Outlet/> {/* Componente para renderizar rutas hijas */}
        </main>

        {pathname === '/' && (
            <Newletters/>
        )}

        <Footer/>  
    </div>
  )
}
