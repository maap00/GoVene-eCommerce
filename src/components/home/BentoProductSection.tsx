import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { PrepareProductData } from '../../interface'
import { formatPrice } from '../../helpers'

interface Props {
    products: PrepareProductData[];
}

const cardLayouts = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
]

export const BentoProductSection = ({ products }: Props) => {
    const gridRef = useRef<HTMLDivElement>(null)
    const productIds = products.map((product) => product.id).join('|')

    useEffect(() => {
        const grid = gridRef.current
        if (!grid || !('IntersectionObserver' in window)) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-bento-card]'))
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return
                entry.target.classList.remove('opacity-0', 'translate-y-3')
                entry.target.classList.add('opacity-100', 'translate-y-0')
                observer.unobserve(entry.target)
            })
        }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' })

        cards.forEach((card) => {
            card.classList.add('opacity-0', 'translate-y-3')
            observer.observe(card)
        })

        return () => observer.disconnect()
    }, [productIds])

    if (products.length === 0) return null

    return (
        <section className="py-12 sm:py-16 md:py-20" aria-labelledby="bento-products-title">
            <div className="mb-7 max-w-2xl sm:mb-9">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Selección GoVene</p>
                <h2 id="bento-products-title" className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    Descubre productos que inspiran
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                    Encuentra lo que necesitas en cada categoría de GoVene.
                </p>
            </div>

            <div ref={gridRef} className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[195px] sm:gap-4 md:grid-cols-4 xl:auto-rows-[205px] xl:grid-cols-6">
                {products.slice(0, 6).map((product, index) => {
                    const isLead = index === 0
                    const isWide = index === 5
                    const layout = cardLayouts[index] ?? 'col-span-1 row-span-1'

                    return (
                        <Link
                            key={product.id}
                            to={`/products/${product.slug}`}
                            data-bento-card
                            aria-label={`Ver ${product.name}, ${formatPrice(product.price)} USD`}
                            className={`group relative isolate min-w-0 overflow-hidden rounded-[1.35rem] border border-[#E7E8EB] bg-[#F7F8FA] text-left shadow-sm transition-[opacity,transform,box-shadow,background-color] duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none ${layout} ${isLead ? 'bg-[#EEF2F1]' : ''} ${isWide ? 'md:col-span-2' : ''}`}
                        >
                            <div className={`absolute inset-0 ${isLead ? 'bg-gradient-to-br from-[#EEF2F1] via-[#F7F8FA] to-[#E9F0EF]' : index % 2 === 0 ? 'bg-[#F2F5F2]' : 'bg-[#F2F4FA]'}`} />
                            <div className={`absolute ${isLead ? 'inset-x-2 top-1 h-[67%] sm:inset-x-5 sm:top-3' : isWide ? 'inset-y-2 right-1 w-[44%] sm:right-3' : 'inset-x-2 top-2 bottom-[88px] sm:bottom-[90px]'}`}>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-full w-full object-contain drop-shadow-[0_12px_14px_rgba(23,24,26,0.10)] transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none motion-reduce:transition-none"
                                />
                            </div>

                            <div className={`absolute z-10 ${isLead ? 'inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-5' : isWide ? 'inset-y-0 left-0 flex w-[54%] flex-col justify-center p-3 sm:p-5' : 'inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4'}`}>
                                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">GoVene Tecnología</p>
                                <h3 className={`line-clamp-2 font-semibold leading-tight text-[#17181A] ${isLead ? 'text-lg sm:text-2xl' : 'text-xs sm:text-sm'}`}>
                                    {product.name}
                                </h3>
                                <div className={`mt-2 flex items-center justify-between gap-2 ${isLead ? 'sm:mt-3' : ''}`}>
                                    <span className="text-[11px] font-semibold text-slate-700 sm:text-sm">{formatPrice(product.price)} USD</span>
                                    <span aria-hidden="true" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-sm text-slate-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-slate-500 group-hover:bg-white motion-reduce:transition-none">
                                        ↗
                                    </span>
                                </div>
                                <span className="sr-only">Ver producto</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
