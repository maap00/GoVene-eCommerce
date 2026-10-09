import { NavLink } from 'react-router-dom'
import { HiOutlineHome, HiOutlineTag, HiOutlineCube, HiOutlineShoppingBag } from 'react-icons/hi'
import { useGlobalStore } from '../../store/global.store'

const navigationItems = [
    { label: 'Inicio', to: '/home', icon: HiOutlineHome, end: true },
    // The existing /socios screen is the only implemented product category/catalog view.
    { label: 'Categorías', to: '/socios', icon: HiOutlineTag },
    { label: 'Productos', to: '/products', icon: HiOutlineCube, end: true },
]

export const NavbarMobile = () => {
    const openSheet = useGlobalStore((state) => state.openSheet)

    return (
        <nav
            aria-label="Navegación principal móvil"
            className="fixed inset-x-0 bottom-0 z-40 px-3 pt-2 md:hidden"
            style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
            <div className="mx-auto flex max-w-md items-stretch justify-around rounded-2xl border border-slate-200/80 bg-white/95 px-1 py-2 shadow-[0_-4px_24px_rgba(15,23,42,0.10)] backdrop-blur">
                {navigationItems.map(({ label, to, icon: Icon, end }) => (
                    <NavLink
                        key={label}
                        to={to}
                        end={end}
                        className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 text-[10px] font-medium transition-colors ${isActive ? 'text-cyan-700' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`grid h-7 w-10 place-items-center rounded-full ${isActive ? 'bg-cyan-50' : ''}`}>
                                    <Icon size={21} strokeWidth={1.7} />
                                </span>
                                <span className="truncate">{label}</span>
                                {isActive && <span className="h-0.5 w-4 rounded-full bg-cyan-600" />}
                            </>
                        )}
                    </NavLink>
                ))}

               

                <button
                    type="button"
                    onClick={() => openSheet('cart')}
                    className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 text-[10px] font-medium text-slate-500 transition-colors hover:text-slate-900"
                    aria-label="Abrir pedido"
                >
                    <span className="grid h-7 w-10 place-items-center rounded-full">
                        <HiOutlineShoppingBag size={21} strokeWidth={1.7} />
                    </span>
                    <span className="truncate">Pedido</span>
                </button>
            </div>
        </nav>
    )
}
