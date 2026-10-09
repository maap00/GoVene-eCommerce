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
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login');
            }
        });
    }, [navigate]);

    if (isLoading) return <Loader />

    return (
        <div className="min-h-screen bg-[#F7F8FA]">
            <header className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                    <Logo />
                </div>
            </header>

            <main className="mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 py-6 sm:px-6 md:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:gap-8 lg:px-8 lg:py-10">
                {totalItems === 0 ? (
                    <div className="col-span-full flex min-h-[60vh] flex-col items-center justify-center gap-5 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-lg font-semibold tracking-tight text-slate-900">Tu pedido está vacío</p>
                        <Link to={'/ '} className="rounded-full bg-slate-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-slate-800">
                            Explorar productos
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="min-w-0">
                            <FormCheckout />
                        </div>
                        <aside className="sticky top-6 hidden min-w-0 lg:block">
                            <ItemsCheckout />
                        </aside>
                    </>
                )}
            </main>
        </div>
    )
}
