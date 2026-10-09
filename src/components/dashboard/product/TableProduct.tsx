import { useState } from "react"
import { FiBox, FiEdit2, FiImage, FiMoreHorizontal, FiTrash2 } from "react-icons/fi"
import { HiOutlineExternalLink } from "react-icons/hi"
import { Link } from "react-router-dom"
import { Loader } from "../../shared/Loader"
import { useDeleteProduct, useProducts } from "../../../hooks"
import { formatDate, formatPrice } from "../../../helpers"
import { Pagination } from "../../shared/Pagination"
import { CellTableProduct } from "./CellTableProduct"

const tableHeader = ['', 'Nombre', 'Variante', 'Precio', 'Existencias', 'Fecha de creación', '']

const ProductActions = ({
  productName,
  slug,
  isOpen,
  onToggle,
  onDelete,
}: {
  productName: string;
  slug: string;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) => (
  <div className="relative flex justify-end">
    <button
      type="button"
      aria-label={`Más acciones para ${productName}`}
      aria-expanded={isOpen}
      onClick={event => { event.stopPropagation(); onToggle(); }}
      className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
    >
      <FiMoreHorizontal size={19} />
    </button>
    {isOpen && <div className="absolute right-0 top-11 z-20 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl" role="menu">
      <Link to={`/dashboard/products/edit/${slug}`} role="menuitem" onClick={event => event.stopPropagation()} className="flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700">
        <FiEdit2 size={15} /> Editar <HiOutlineExternalLink size={14} className="ml-auto text-slate-400" />
      </Link>
      <button type="button" role="menuitem" onClick={event => { event.stopPropagation(); onDelete(); }} className="flex min-h-10 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-medium text-rose-700 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600">
        <FiTrash2 size={15} /> Eliminar
      </button>
    </div>}
  </div>
)

export const TableProduct = () => {
  const [openMenuProductId, setOpenMenuProductId] = useState<string | null>(null)
  const [selectVariant, setSelectVariant] = useState<{ [key: string]: number }>({})
  const [page, setPage] = useState(1)
  const { products, isLoading, totalProducts } = useProducts({ page })
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const handleVariantChange = (productId: string, variantIndex: number) => {
    setSelectVariant(current => ({ ...current, [productId]: variantIndex }))
  }

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id)
    setOpenMenuProductId(null)
  }

  if (isLoading || !products || isDeleting) return <Loader />

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_12px_38px_-30px_rgba(15,23,42,0.25)] sm:p-6" aria-label="Catálogo de productos">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Inventario</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">Catálogo de productos</h2>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-50 text-cyan-800"><FiBox size={18} /></span>
          <div><p className="text-lg font-semibold leading-5 text-slate-950">{totalProducts}</p><p className="mt-1 text-[11px] text-slate-500">productos registrados</p></div>
        </div>
      </div>

      {products.length === 0 ? <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-5 text-center">
        <div><span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm"><FiBox size={20} /></span><p className="mt-3 text-sm font-semibold text-slate-800">Aún no hay productos</p><p className="mt-1 text-xs text-slate-500">Los productos que agregues aparecerán en este catálogo.</p></div>
      </div> : <>
        <div className="hidden min-w-0 overflow-x-auto md:block">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead><tr className="border-b border-slate-100 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              {tableHeader.map((header, index) => <th key={`${header}-${index}`} className="h-12 px-3">{header}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => {
                const selectedVariantIndex = selectVariant[product.id] ?? 0
                const selectedVariant = product.variants[selectedVariantIndex]
                const stock = selectedVariant?.stock ?? 0
                return <tr key={product.id} className="transition-colors hover:bg-slate-50/70">
                  <td className="w-20 px-3 py-3">
                    <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      {product.images[0] ? <img src={product.images[0]} alt={`Imagen de ${product.name}`} loading="lazy" decoding="async" className="h-full w-full object-contain p-1.5" /> : <FiImage className="text-slate-300" size={20} />}
                    </div>
                  </td>
                  <CellTableProduct content={product.name} className="min-w-40 font-semibold text-slate-800" />
                  <td className="min-w-48 px-3 py-3">
                    <select aria-label={`Variante de ${product.name}`} className="min-h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/10" onChange={event => handleVariantChange(product.id, Number(event.target.value))} value={selectedVariantIndex}>
                      {product.variants.map((variant, variantIndex) => <option key={variant.id} value={variantIndex}>{variant.color_name} · {variant.storage}</option>)}
                    </select>
                  </td>
                  <CellTableProduct content={selectedVariant ? formatPrice(selectedVariant.price) : '—'} className="whitespace-nowrap font-semibold text-slate-900" />
                  <td className="px-3 py-3">
                    <span className={`inline-flex min-w-12 items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${stock === 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{stock === 0 ? 'Agotado' : stock}</span>
                  </td>
                  <CellTableProduct content={formatDate(product.created_at)} className="whitespace-nowrap text-slate-500" />
                  <td className="w-14 px-2 py-3"><ProductActions productName={product.name} slug={product.slug} isOpen={openMenuProductId === product.id} onToggle={() => setOpenMenuProductId(openMenuProductId === product.id ? null : product.id)} onDelete={() => handleDeleteProduct(product.id)} /></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {products.map(product => {
            const selectedVariantIndex = selectVariant[product.id] ?? 0
            const selectedVariant = product.variants[selectedVariantIndex]
            const stock = selectedVariant?.stock ?? 0
            return <article key={product.id} className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-[0_8px_24px_-22px_rgba(15,23,42,0.4)] transition duration-200 hover:border-slate-300 sm:p-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="grid h-[72px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  {product.images[0] ? <img src={product.images[0]} alt={`Imagen de ${product.name}`} loading="lazy" decoding="async" className="h-full w-full object-contain p-2" /> : <FiImage className="text-slate-300" size={22} />}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">{product.name}</h3>
                  {product.brand && <p className="mt-1 truncate text-xs text-slate-500">{product.brand}</p>}
                  <p className="mt-2 text-base font-semibold tracking-tight text-slate-950">{selectedVariant ? formatPrice(selectedVariant.price) : '—'}</p>
                </div>
                <ProductActions productName={product.name} slug={product.slug} isOpen={openMenuProductId === product.id} onToggle={() => setOpenMenuProductId(openMenuProductId === product.id ? null : product.id)} onDelete={() => handleDeleteProduct(product.id)} />
              </div>
              <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
                <select aria-label={`Variante de ${product.name}`} className="min-h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-2.5 text-xs text-slate-700 outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/10" onChange={event => handleVariantChange(product.id, Number(event.target.value))} value={selectedVariantIndex}>
                  {product.variants.map((variant, variantIndex) => <option key={variant.id} value={variantIndex}>{variant.color_name} · {variant.storage}</option>)}
                </select>
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex min-h-8 items-center justify-center rounded-full px-3 text-xs font-semibold ${stock === 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{stock === 0 ? 'Agotado' : `${stock} disponibles`}</span>
                  <p className="text-[11px] text-slate-400">Creado el {formatDate(product.created_at)}</p>
                </div>
              </div>
            </article>
          })}
        </div>
      </>}

      {totalProducts > 0 && <div className="mt-5 border-t border-slate-100 pt-5">
        <Pagination totalItems={totalProducts} page={page} setPage={setPage} appearance="catalog" />
      </div>}
    </section>
  )
}
