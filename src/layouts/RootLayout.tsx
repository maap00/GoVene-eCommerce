
import { Outlet, useLocation } from 'react-router-dom'
import { Narbar } from '../components/shared/Navbar'
import { Footer } from '../components/shared/Footer'
import { Banner } from '../components/home/Banner'
import { Newletters } from '../components/home/Newsletters'
import { Sheet } from '../components/shared/Sheet'
import { useGlobalStore } from '../store/global.store'
import { NavbarMobile } from '../components/shared/NavbarMobile'

export const RootLayout = () => {

    const { pathname } = useLocation();

    const isSheetOpen = useGlobalStore((state) => state.isSheetOpen);

    const activeNavMobile = useGlobalStore((state) => state.activeNavMobile);

    return (
        <div className='h-screen flex flex-col font-montserrat'>
            <Narbar />

            {pathname === '/home' && (
                <Banner />
            )}

            <main className="container my-8 flex-1">
                <Outlet /> {/* Componente para renderizar rutas hijas */}
            </main>

            {pathname === '/' && (
                <Newletters />
            )}

            {isSheetOpen && <Sheet />}

            {activeNavMobile && <NavbarMobile />}

            <Footer />
        </div>
    )
}
