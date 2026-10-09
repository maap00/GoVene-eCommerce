import { navbarLinks } from '../../constants/links'
import { NavLink, Link } from 'react-router-dom'
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser, HiOutlineTrash } from 'react-icons/hi'
import { Logo } from './Logo'
import { useGlobalStore } from '../../store/global.store'
import { useCartStore } from '../../store/cart.store'
import { useCustomer, useUser } from '../../hooks'
import { Loading } from './Loading'
import { upperCase } from '../../helpers'

export const Narbar = () => {
  const openSheet = useGlobalStore((state) => state.openSheet);
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart)

  const { session, isLoading } = useUser();

  const userId = session?.user.id;

  const { data: customer, error: customerError } = useCustomer(userId!);

  return (
    <header className='bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 md:min-h-[76px] md:gap-8 md:bg-white/95 md:shadow-[0_6px_24px_rgba(15,23,42,0.045)] lg:px-12'>
      <Logo />
      <nav className='hidden md:flex md:items-center md:gap-1 md:space-x-0 md:rounded-full md:border md:border-slate-200/80 md:bg-slate-50/70 md:p-1'>
        {
          navbarLinks.map(link => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 ${isActive
                  ? 'bg-white text-cyan-900 shadow-sm after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-cyan-600'
                  : 'text-slate-600 hover:bg-white hover:text-cyan-900 hover:shadow-sm'
                }`}>
              {link.title}
            </NavLink>
          ))}
      </nav>

      <div className='flex gap-5 items-center md:gap-2'>
        <button className="relative md:grid md:h-10 md:w-10 md:place-items-center md:rounded-full md:transition-colors md:hover:bg-slate-100 md:focus-visible:outline-none md:focus-visible:ring-2 md:focus-visible:ring-cyan-700" aria-label="Limpiar datos locales" title="Limpiar datos locales" onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}>
          <HiOutlineTrash size={25} />
        </button>

        <button className="relative md:grid md:h-10 md:w-10 md:place-items-center md:rounded-full md:transition-colors md:hover:bg-slate-100 md:focus-visible:outline-none md:focus-visible:ring-2 md:focus-visible:ring-cyan-700" aria-label="Buscar productos" onClick={() => openSheet('search')}>
          <HiOutlineSearch size={25} />
        </button>

        {isLoading && !customerError ? (

          <Loading />

        ) : session && !customerError ? (
          <div className="relative">
            <Link
              to="/account"
              className="border-2 border-slade-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold md:border-slate-200 md:bg-slate-50 md:text-slate-700 md:transition-colors md:hover:border-cyan-200 md:hover:bg-cyan-50"
            >
              {customer && upperCase(customer.full_name[0])}
            </Link>
          </div>
        ) : (
          <Link to='/login' aria-label="Iniciar sesión" className="md:grid md:h-10 md:w-10 md:place-items-center md:rounded-full md:transition-colors md:hover:bg-slate-100 md:focus-visible:outline-none md:focus-visible:ring-2 md:focus-visible:ring-cyan-700">
            <HiOutlineUser size={25} />
          </Link>
        )

        }

        <button
          className='relative md:grid md:h-10 md:w-10 md:place-items-center md:rounded-full md:transition-colors md:hover:bg-slate-100 md:focus-visible:outline-none md:focus-visible:ring-2 md:focus-visible:ring-cyan-700'
          aria-label="Abrir pedido"
          onClick={() => openSheet('cart')}
        >
          <span className='absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full md:-bottom-0.5 md:-right-0.5 md:h-4 md:w-4 md:text-[10px] md:ring-2 md:ring-white'>
            {totalItemsInCart}
          </span>
          <HiOutlineShoppingBag size={25} />
        </button>

      </div>
    </header>
  )
}
