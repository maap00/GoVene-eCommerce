import { Link } from 'react-router-dom'
import type { PrepareProductData } from '../../interface'
import { CardProduct } from '../products/CardProduct'

interface Props {
    title: string;
    eyebrow?: string;
    description?: string;
    products: PrepareProductData[];
}

export const ProductGrid = ({ title, eyebrow, description, products }: Props) => {
    if (products.length === 0) return null

    return (
        <section className="py-14 md:py-20">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                    {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">{eyebrow}</p>}
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
                    {description && <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">{description}</p>}
                </div>
                <Link to="/socios" className="shrink-0 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-900">
                    Ver catálogo <span aria-hidden="true">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
                {products.map((product) => (
                    <article className="min-w-0" key={product.id}>
                        <p className="mb-2 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{product.brand}</p>
                        <CardProduct
                            img={product.images[0]}
                            name={product.name}
                            price={product.price}
                            slug={product.slug}
                            colors={product.colors}
                            variants={product.variants}
                        />
                    </article>
                ))}
            </div>
        </section>
    )
}
