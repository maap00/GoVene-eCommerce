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
    <header className='bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
      <Logo />
      <nav className='space-x-5 hidden md:flex '>
        {
          navbarLinks.map(link => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                `${isActive ? 'text-cyan-600 underline' : ''
                } transition-all duration-300 font-medium hover:text-cyan-600 hover:underline`}>
              {link.title}
            </NavLink>
          ))}
      </nav>

      <div className='flex  gap-5 items-center'>
        <button className="relative" aria-label="Limpiar datos locales" title="Limpiar datos locales" onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}>
          <HiOutlineTrash size={25} />
        </button>

        <button className="relative" aria-label="Buscar productos" onClick={() => openSheet('search')}>
          <HiOutlineSearch size={25} />
        </button>

        {isLoading && !customerError ? (

          <Loading />

        ) : session && !customerError ? (
          <div className="relative">
            <Link
              to="/account"
              className="border-2 border-slade-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
            >
              {customer && upperCase(customer.full_name[0])}
            </Link>
          </div>
        ) : (
          <Link to='/login' aria-label="Iniciar sesión">
            <HiOutlineUser size={25} />
          </Link>
        )

        }

        <button
          className='relative'
          aria-label="Abrir pedido"
          onClick={() => openSheet('cart')}
        >
          <span className='absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full'>
            {totalItemsInCart}
          </span>
          <HiOutlineShoppingBag size={25} />
        </button>

      </div>
    </header>
  )
}
