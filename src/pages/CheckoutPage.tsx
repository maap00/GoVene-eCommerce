import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components/shared/Logo'
import { useCartStore } from '../store/cart.store';
import { FormCheckout } from '../components/checkout/FormCheckout';
import { ItemsCheckout } from '../components/checkout/ItemsCheckout';
import { useUser } from '../hooks';
import { supabase } from '../supabase/client';
import { Loader } from '../components/shared/Loader';

export const CheckoutPage = () => {
    const totalItems = useCartStore((state) => state.totalItemsInCart);

    const navigate = useNavigate();

    const { isLoading } = useUser()

    useEffect(() => {
            supabase.auth.onAuthStateChange( async (event,session) => {
                if(event === 'SIGNED_OUT' || !session ) {
                    navigate('/login');
                }
            });
        }, [navigate]);

    if(isLoading) return <Loader/>
    
return (
<div style={{
        minHeight: 'calc(100vh - 100px)'
    }}>
    <header className='px-10 border-b border-slate-200'>
        <Logo />
    </header>
    <main className="w-full h-full flex relative">
        {
        totalItems === 0 ? (
        <div className='flex flex-col items-center justify-center gap-5 w-full' 
             style={{ height: 'calc(100vh - 100px)' }}>
            <p className="text-sm font-medium tracking-tight">
                Your cart is empty
            </p>
            <Link to={'/ '}
                className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold">
            Shop products
            </Link>
        </div>
        ) : (
        <>
            <div className="w-full md:w-[50%] p-10">
                <FormCheckout/>
            </div>
            <div className="bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block" style={{
                            minHeight: 'calc(100vh - 100px)'
                        }}>

                <ItemsCheckout/>

            </div>
        </>
        )
        }

    </main>
</div>
)
}