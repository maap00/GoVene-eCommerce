import { LuMinus, LuPlus } from "react-icons/lu"
import { Separator } from "../components/shared/Separator"
import { formatPrice } from "../helpers"
import { CiDeliveryTruck } from "react-icons/ci"
import { BsChatLeftText } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProductDescription } from "../components/one-product/ProductDescription"
import { GridImages } from "../components/one-product/GridImages"
import { useEffect, useMemo, useState } from "react"
import { useProduct } from "../hooks/index"
import type { VariantsProducts } from "../interface"
import { Loader } from "../components/shared/Loader"
import { userCounterStore } from "../store/counter.store"
import { useCartStore } from "../store/cart.store"
import toast from "react-hot-toast"

interface Acc {
    [key: string]: {
        name: string;
        storages: string[];
    };
}

export const SocioSingleProduct = () => {
    const { slug } = useParams<{ slug: string }>();
    const [currentSlug, setCurrentSlug] = useState(slug)
    const { product, isLoading, isError } = useProduct(currentSlug || '');
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<VariantsProducts | null>(null)
    const count = userCounterStore((state) => state.count);
    const increment = userCounterStore((state) => state.increment);
    const decrement = userCounterStore((state) => state.decrement);
    const addItem = useCartStore((state) => state.addItem)
    const navigate = useNavigate();

    const colors = useMemo(() => {
        return product?.variants.reduce(
            (acc: Acc, variant: VariantsProducts) => {
                const { color, color_name, storage } = variant;
                if (!acc[color]) acc[color] = { name: color_name, storages: [] };
                if (!acc[color].storages.includes(storage)) acc[color].storages.push(storage);
                return acc;
            }, {} as Acc
        ) || {};
    }, [product?.variants]);

    const availableColors = Object.keys(colors);
    useEffect(() => {
        if (availableColors.length > 0 && !selectedColor) setSelectedColor(availableColors[0]);
    }, [availableColors, selectedColor]);

    useEffect(() => {
        if (selectedColor !== null && colors[selectedColor] && !selectedStorage) {
            setSelectedStorage(colors[selectedColor].storages[0]);
        }
    }, [selectedColor, colors, selectedStorage]);

    useEffect(() => {
        if (selectedColor !== null && selectedStorage) {
            const variant = product?.variants.find(variant =>
                variant.color === selectedColor && variant.storage === selectedStorage
            );
            setSelectedVariant(variant as VariantsProducts);
        }
    }, [selectedColor, selectedStorage, product?.variants]);

    const isOutOffStock = selectedVariant?.stock === 0;

    const addToCar = () => {
        if (selectedVariant) {
            addItem({
                variantId: selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0] || '',
                color: selectedVariant.color_name,
                storage: selectedVariant.storage,
                price: selectedVariant.price,
                quantity: count,
            });
            toast.success('Producto agregado al pedido', { position: 'bottom-right' });
        }
    }

    const buyNow = () => {
        if (selectedVariant) {
            addItem({
                variantId: selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0] || '',
                color: selectedVariant.color_name,
                storage: selectedVariant.storage,
                price: selectedVariant.price,
                quantity: count,
            });
            navigate('/checkout')
        }
    }

    useEffect(() => {
        setCurrentSlug(slug);
        setSelectedColor(null);
        setSelectedStorage(null);
        setSelectedVariant(null);
    }, [slug])

    if (isLoading) return <Loader />
    if (!product || isError) {
        return <div className="flex min-h-[70vh] items-center justify-center px-6"><p className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-slate-600 shadow-sm">Producto no encontrado</p></div>
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:px-8">
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                <Link to="/products" className="transition-colors hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700">Productos</Link>
                <span aria-hidden="true">/</span>
                <span className="truncate text-slate-800">{product.name}</span>
            </div>

            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-14">
                <GridImages images={product.images} productName={product.name} />

                <div className="flex min-w-0 flex-col rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.28)] sm:p-8 lg:p-9">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                        {product.brand && <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-900">{product.brand}</span>}
                        {isOutOffStock && <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">Agotado</span>}
                    </div>
                    <h1 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">{product.name}</h1>

                    <div className="mt-6 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50/80 to-white p-5 sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Precio</p>
                        <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950 sm:text-[2.1rem]">
                            {formatPrice(selectedVariant?.price || product.variants[0].price)}
                        </p>
                    </div>

                    {product.features.length > 0 && <>
                        <div className="my-6"><Separator /></div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900">Detalles del producto</h2>
                            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                {product.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3 rounded-xl bg-slate-50 px-3.5 py-3 text-sm leading-5 text-slate-700">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-700" />{feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>}

                    {availableColors.length > 0 && availableColors[0] !== "" && <div className="mt-7 space-y-3">
                        <p className="text-sm font-medium text-slate-800">Color{selectedColor && <span className="text-slate-500">: {colors[selectedColor].name}</span>}</p>
                        <div className="flex flex-wrap gap-3">
                            {availableColors.map(color => (
                                <button key={color} aria-label={`Seleccionar color ${colors[color].name}`} aria-pressed={selectedColor === color}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 ${selectedColor === color ? 'ring-2 ring-slate-900 ring-offset-2' : 'hover:scale-105'}`}
                                    onClick={() => { setSelectedColor(color); setSelectedStorage(null); }}>
                                    <span className="h-8 w-8 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                                </button>
                            ))}
                        </div>
                    </div>}

                    {selectedColor !== null && colors[selectedColor] && <label className="mt-6 flex flex-col gap-2 text-sm font-medium text-slate-800">
                        Capacidad o presentación
                        <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15 sm:max-w-xs"
                            value={selectedStorage || ''} onChange={(e) => setSelectedStorage(e.target.value)}>
                            {colors[selectedColor].storages.map(storage => <option key={storage} value={storage}>{storage}</option>)}
                        </select>
                    </label>}

                    {!isOutOffStock && <div className="mt-6 flex items-center justify-between gap-4">
                        <p className="text-sm font-medium text-slate-800">Cantidad</p>
                        <div className="flex items-center gap-4 rounded-full border border-slate-200 bg-white px-3 py-2">
                            <button aria-label="Disminuir cantidad" onClick={decrement} disabled={count === 1} className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-slate-100 disabled:opacity-40"><LuMinus size={15} /></button>
                            <span className="min-w-5 text-center text-sm font-semibold text-slate-900">{count}</span>
                            <button aria-label="Aumentar cantidad" onClick={increment} className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-slate-100"><LuPlus size={15} /></button>
                        </div>
                    </div>}

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {isOutOffStock ? <button className="cursor-not-allowed rounded-full bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-500 sm:col-span-2" disabled>Agotado</button> : <>
                            <button className="rounded-full border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition duration-200 hover:border-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2" onClick={addToCar}>Agregar al pedido</button>
                            <button className="rounded-full bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2" onClick={buyNow}>Comprar ahora</button>
                        </>}
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5">
                            <CiDeliveryTruck className="shrink-0 text-cyan-900" size={27} />
                            <p className="text-xs font-semibold leading-5 text-slate-700 sm:text-sm">Envío gratis</p>
                        </div>
                        <Link to="#" className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700">
                            <BsChatLeftText className="shrink-0 text-cyan-900" size={23} />
                            <p className="text-xs leading-5 text-slate-600 sm:text-sm"><span className="block font-semibold text-slate-800">¿Necesitas ayuda?</span>Contáctanos aquí</p>
                        </Link>
                    </div>
                </div>
            </section>

            <ProductDescription content={product.description} />
        </main>
    )
}
