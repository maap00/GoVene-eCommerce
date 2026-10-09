
import { Outlet, useLocation } from 'react-router-dom'
import { Narbar } from '../components/shared/Navbar'
import { Footer } from '../components/shared/Footer'
import { Newletters } from '../components/home/Newsletters'
import { Sheet } from '../components/shared/Sheet'
import { useGlobalStore } from '../store/global.store'
import { NavbarMobile } from '../components/shared/NavbarMobile'

export const RootLayout = () => {

    const { pathname } = useLocation();

    const isSheetOpen = useGlobalStore((state) => state.isSheetOpen);

    return (
        <div className='min-h-screen flex flex-col pb-24 font-montserrat md:pb-0'>
            <Narbar />

            <main className="container my-8 flex-1">
                <Outlet /> {/* Componente para renderizar rutas hijas */}
            </main>

            {pathname === '/' && (
                <Newletters />
            )}

            {isSheetOpen && <Sheet />}

            <NavbarMobile />

            <Footer />
        </div>
    )
}
