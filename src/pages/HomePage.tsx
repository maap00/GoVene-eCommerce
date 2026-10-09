import { Link } from 'react-router-dom'
import { BentoProductSection } from '../components/home/BentoProductSection'
import { Brands } from '../components/home/Brands'
import { ProductGrid } from '../components/home/ProductGrid'
import { ProductGridSkeleton } from '../components/skeletons/ProductGridSkeleton'
import { prepareProductData } from '../helpers'
import { useHomeProducts } from '../hooks'

export const HomePage = () => {
  const { recentProducts, popularProducts, isLoading } = useHomeProducts()
  const productsById = new Map([...popularProducts, ...recentProducts].map((product) => [product.id, product]))
  const products = prepareProductData(Array.from(productsById.values()))
  const heroProducts = products.slice(0, 3)
  const leadProduct = heroProducts[0]

  return (
    <div className="mx-auto max-w-7xl">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl shadow-slate-900/10">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 w-full bg-cover bg-[center_36%] opacity-50 md:w-3/4"
          style={{ backgroundImage: 'url(/img/about_bgs.jpg)' }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/30" />

        <div className="grid min-h-[500px] items-center gap-8 px-6 py-12 sm:px-10 md:grid-cols-[1.05fr_0.95fr] md:px-14 md:py-16">
          <div className="max-w-xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.19em] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Marketplace venezolano
            </p>
            <p className="mb-3 text-lg font-semibold tracking-tight text-white">Go<span className="text-cyan-300">Vene</span></p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Todo lo que buscas.<br />
              <span className="text-cyan-300">En un solo lugar.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
              Descubre marcas y productos de tecnología en un marketplace hecho para conectar a Venezuela con lo que necesita.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#categorias" className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300">
                Explorar categorías
              </a>
              <Link to="/socios" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Ver catálogo <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[270px] w-full max-w-lg items-center justify-center sm:min-h-[330px]">
            {leadProduct ? (
              <Link
                to={`/products/${leadProduct.slug}`}
                className="relative z-10 grid h-64 w-52 place-items-center rounded-3xl border border-white/60 bg-white p-5 shadow-2xl shadow-black/40 transition-transform duration-300 hover:-translate-y-1 sm:h-72 sm:w-60"
              >
                <img src={leadProduct.images[0]} alt={leadProduct.name} className="h-full w-full object-contain" />
                <span className="absolute inset-x-3 bottom-3 truncate rounded-xl bg-white/95 px-3 py-2 text-center text-xs font-semibold text-slate-800">
                  {leadProduct.name}
                </span>
              </Link>
            ) : (
              <div className="relative z-10 grid h-64 w-52 place-items-center rounded-3xl border border-white/60 bg-white p-5 shadow-2xl shadow-black/40 sm:h-72 sm:w-60">
                <img src="/img/brands/samsung.webp" alt="Marcas de tecnología disponibles en GoVene" className="max-h-32 max-w-full object-contain" />
                <span className="absolute inset-x-3 bottom-3 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-semibold text-slate-700">Tecnología para todos los días</span>
              </div>
            )}
            {heroProducts.slice(1, 3).map((product, index) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className={`absolute grid h-28 w-24 place-items-center rounded-2xl border border-white/70 bg-white p-2 shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:h-36 sm:w-32 ${index === 0 ? 'left-0 top-2 -rotate-6' : 'bottom-0 right-0 rotate-6'}`}
              >
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain" />
              </Link>
            ))}
            <div className="absolute -right-2 top-5 rounded-full border border-white/15 bg-slate-950/75 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-cyan-100 backdrop-blur sm:right-1">
              GoVene Tecnología
            </div>
          </div>
        </div>
      </section>

      <section id="categorias" className="scroll-mt-8 py-16 md:py-24">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Compra por sector</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">Explora nuestras categorías</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">Encuentra la selección de productos que ya forma parte de GoVene.</p>
        </div>

        <Link to="/socios" className="group relative flex min-h-64 overflow-hidden rounded-3xl bg-slate-900 text-white sm:min-h-72">
          {leadProduct?.images[0] && (
            <img src={leadProduct.images[0]} alt="" className="absolute inset-y-0 right-0 h-full w-2/3 object-contain p-5 opacity-85 transition-transform duration-500 group-hover:scale-105 sm:w-1/2 sm:p-8" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/10" />
          <div className="relative z-10 flex max-w-xl flex-col justify-center p-7 sm:p-10">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">01 / Tecnología</span>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">GoVene Tecnología</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">Celulares de marcas reconocidas, con modelos y variantes disponibles en nuestro catálogo.</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">Explorar tecnología <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
          </div>
        </Link>
      </section>

      <BentoProductSection products={products} />

      {isLoading ? (
        <section className="py-10" aria-label="Cargando productos">
          <ProductGridSkeleton numberOfProducts={4} />
        </section>
      ) : (
        <ProductGrid
          eyebrow="GoVene Tecnología"
          title="Celulares para descubrir"
          description="Una selección de productos del catálogo actual, organizada en su sector correspondiente."
          products={products}
        />
      )}

      <Brands />

      <section className="mb-8 overflow-hidden rounded-3xl bg-cyan-50 px-6 py-12 text-center sm:px-10 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">GoVene</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">Un marketplace. Múltiples categorías. Todo GoVene.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 md:text-base">Explora los productos disponibles y encuentra tu próxima compra.</p>
        <Link to="/socios" className="mt-7 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
          Explorar catálogo <span aria-hidden="true" className="ml-2">↗</span>
        </Link>
      </section>
    </div>
  )
}
