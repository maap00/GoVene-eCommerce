import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from '../actions'
import { useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useRoleUser, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { HiOutlineExternalLink } from 'react-icons/hi';

export const ClientLayout = () => {



    const handleLogout = async () => {
        await signOut();
    }

    const { session, isLoading: isLoadingSession } = useUser();

    const { data: role, isLoading: isLoadingRole } = useRoleUser(session?.user.id as string);

    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login', { replace: true });
            }
        });
    }, [navigate]);

    if (isLoadingSession || isLoadingRole) return <Loader />

    return (
        <div className="flex flex-col gap-5">
            <nav className="flex justify-center gap-10 text-sm font-medium">
                <NavLink
                    to='/account/orders'
                    className={({ isActive }) => `
                ${isActive ? 'underline' : 'hover:underline'}`} >
                    Pedidos
                </NavLink>

                {role?.role === 'admin' && (
                    <NavLink
                        to='/dashboard/products'
                        className='flex items-center gap-1 hover:underline' >
                        Administración
                        <HiOutlineExternalLink
                            size={16}
                            className='inline-block' />
                    </NavLink>
                )}



                <button className="hover:underline" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </nav>

            <main className="container mt-12 flex-1">
                <Outlet />
            </main>
        </div>
    )
}
