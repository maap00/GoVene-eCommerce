
import { Logo } from '../shared/Logo'
import { dashboardLinks } from '../../constants/links'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../actions'
import { IoLogInOutline } from 'react-icons/io5'

export const Sidebar = () => {

    const handleLogout = async () => {
        await signOut();
    }
    return (
        <div className="fixed flex h-screen w-[68px] flex-col items-center gap-7 bg-stone-800 p-2 text-white sm:w-[120px] sm:gap-10 sm:p-5 lg:w-[250px]">
            <Logo isDashboard />
            <nav className="w-full space-y-5 flex-1">
                {dashboardLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.href}
                        className={({ isActive }) => `flex items-center justify-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md 
                    ${isActive
                                ? 'text-white bg-cyan-600'
                                : 'hover:text-white hover:bg-cyan-600'
                            } lg:pl-5 lg:justify-start`
                        }
                    >
                        {link.icon}
                        <p className="font-semibold hidden lg:block">
                            {link.title}
                        </p>
                    </NavLink>
                ))}
            </nav>

            <button className="bg-red-500 w-full py-[10px] rounded-md flex items-center justify-center gap-2 font-semibold text-sm hover:underline" onClick={handleLogout}>
                <span className="hidden lg:block">Cerrar sesión</span>
                <IoLogInOutline size={20} className='inline-block' />
            </button>


        </div>
    )
}
