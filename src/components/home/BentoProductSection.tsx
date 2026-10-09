import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { PrepareProductData } from '../../interface'
import { formatPrice } from '../../helpers'

interface Props {
    products: PrepareProductData[]
}

const cardLayouts = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
]

const cardSurfaces = [
    'bg-[#EEF2F1]',
    'bg-[#EAF5F8]',
    'bg-[#F3F1FA]',
    'bg-[#F8F1EC]',
    'bg-[#EDF5EE]',
    'bg-[#F1F2F7]',
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
            <div className="mb-8 max-w-2xl sm:mb-10">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C8CFF]">Descubre GoVene</p>
                <h2 id="bento-products-title" className="text-3xl font-semibold tracking-[-0.04em] text-[#17181A] sm:text-4xl md:text-5xl">
                    Productos que inspiran.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#74777C] sm:text-base">
                    Explora una selección de productos para tu hogar, tus proyectos y tu negocio.
                </p>
            </div>

            <div ref={gridRef} className="grid auto-rows-[185px] grid-cols-2 gap-3 sm:auto-rows-[205px] sm:gap-4 md:grid-cols-4 xl:auto-rows-[220px] xl:grid-cols-6">
                {products.slice(0, 6).map((product, index) => {
                    const isLead = index === 0
                    const isWide = index === 5

                    return (
                        <Link
                            key={product.id}
                            to={`/products/${product.slug}`}
                            data-bento-card
                            aria-label={`Ver ${product.name}, ${formatPrice(product.price)}`}
                            className={`group relative isolate min-w-0 overflow-hidden rounded-[1.35rem] border border-[#E7E8EB] ${cardSurfaces[index]} text-left opacity-100 shadow-[0_8px_24px_rgba(23,24,26,0.05)] transition-[opacity,transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(23,24,26,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C8CFF] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none ${cardLayouts[index] ?? 'col-span-1 row-span-1'} ${isWide ? 'md:col-span-2' : ''}`}
                        >
                            <div className={`absolute ${isLead ? 'inset-x-3 top-2 h-[64%] sm:inset-x-7 sm:top-4' : isWide ? 'inset-y-3 right-2 w-[45%] sm:right-4' : 'inset-x-3 top-3 bottom-[78px] sm:bottom-[86px]'}`}>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-full w-full object-contain drop-shadow-[0_14px_16px_rgba(23,24,26,0.12)] transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
                                />
                            </div>

                            <div className={`absolute z-10 ${isLead ? 'inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6' : isWide ? 'inset-y-0 left-0 flex w-[56%] flex-col justify-center p-4 sm:p-6' : 'inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5'}`}>
                                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#74777C] sm:text-[10px]">GoVene Tecnología</p>
                                <h3 className={`line-clamp-2 font-semibold leading-tight tracking-[-0.02em] text-[#17181A] ${isLead ? 'text-xl sm:text-3xl' : 'text-xs sm:text-sm'}`}>
                                    {product.name}
                                </h3>
                                <div className={`mt-2 flex items-center justify-between gap-2 ${isLead ? 'sm:mt-3' : ''}`}>
                                    <span className="text-[11px] font-semibold text-[#17181A] sm:text-sm">{formatPrice(product.price)}</span>
                                    <span aria-hidden="true" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D9DBDF] bg-white/75 text-[#17181A] transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-[#17181A] group-hover:bg-white motion-reduce:transition-none">
                                        <span className="text-sm leading-none">↗</span>
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
