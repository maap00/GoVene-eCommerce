import { useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineSparkles } from 'react-icons/hi'
import { prepareProductData } from '../helpers'
import { useFilteredProducts } from '../hooks'
import { Pagination } from '../components/shared/Pagination'
import { CardProduct } from '../components/products/CardProduct'
import { ContainerFilter } from '../components/products/ContainerFilter'
import { Loader } from '../components/shared/Loader'

export const SocioPage = () => {
    const [page, setPage] = useState(1)
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])

    const {
        data: products = [],
        isLoading,
        totalProducts,
    } = useFilteredProducts({
        page,
        brands: selectedBrands,
    })

    if (isLoading || !products) return <Loader />

    const preparedProducts = prepareProductData(products)

    return (
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:px-8 lg:pb-24">
            <header className="relative isolate mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_14px_45px_rgba(15,23,42,0.06)] sm:px-10 sm:py-10 lg:mb-12 lg:px-14 lg:py-12">
                <div aria-hidden="true" className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-cyan-100/70 blur-3xl" />
                <div aria-hidden="true" className="absolute -bottom-36 right-1/4 -z-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
                <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-800">
                            <HiOutlineSparkles size={15} aria-hidden="true" /> Catálogo GoVene
                        </p>
                        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            Explora nuestros productos
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                            Encuentra opciones de marcas reconocidas y filtra el catálogo según tus preferencias.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-cyan-200">
                            <HiOutlineShoppingBag size={20} aria-hidden="true" />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-lg font-semibold leading-5 text-slate-950">{totalProducts}</span>
                            <span className="text-xs font-medium text-slate-500">productos</span>
                        </span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
                <ContainerFilter
                    seletedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                />

                <section aria-label="Catálogo de productos" className="min-w-0">
                    {preparedProducts.length > 0 ? (
                        <>
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Selección GoVene</p>
                                    <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">Productos disponibles</h2>
                                </div>
                                {selectedBrands.length > 0 && (
                                    <span className="shrink-0 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-800">
                                        {selectedBrands.length} {selectedBrands.length === 1 ? 'marca' : 'marcas'}
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-4">
                                {preparedProducts.map(product => (
                                    <CardProduct
                                        key={product.id}
                                        name={product.name}
                                        price={product.price}
                                        colors={product.colors}
                                        img={product.images[0]}
                                        slug={product.slug}
                                        variants={product.variants}
                                        presentation="catalog"
                                    />
                                ))}
                            </div>

                            <div className="mt-10 border-t border-slate-200 pt-6">
                                <Pagination
                                    totalItems={totalProducts}
                                    page={page}
                                    setPage={setPage}
                                    appearance="catalog"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
                                <HiOutlineShoppingBag size={23} aria-hidden="true" />
                            </span>
                            <h2 className="text-lg font-semibold text-slate-900">No hay productos para mostrar</h2>
                            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Prueba con otra selección de marcas para revisar el catálogo.</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
