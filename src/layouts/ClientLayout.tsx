import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from '../actions'
import { useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';

export const ClientLayout = () => {

    const handleLogout = async () => {
       await signOut();
    }

    const {session , isLoading: isLoadingSession } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange( async (event,session) => {
            if(event === 'SIGNED_OUT' || !session ) {
                navigate('/login');
            }
        });
    }, [navigate]);

    if(isLoadingSession) return <Loader/>

  return (
    <div className="flex flex-col gap-5">
        <nav className="flex justify-center gap-10 text-sm font-medium">
            <NavLink 
                to='/account/orders'
                className={({ isActive }) => `
                ${isActive ? 'underline' : 'hover:underline'}`} >
                Orders
            </NavLink>
            <button className="hover:underline" onClick={handleLogout}>
                Close session
            </button>
        </nav>

        <main className="container mt-12 flex-1">
            <Outlet/>
        </main>
    </div>
  )
}
