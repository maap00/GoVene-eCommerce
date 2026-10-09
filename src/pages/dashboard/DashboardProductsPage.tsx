import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { TableProduct } from '../../components/dashboard'

export const DashboardProductsPage = () => {
  return (
    <div className="mx-auto flex h-full min-w-0 max-w-[1500px] flex-col gap-6 pb-10">
      <header className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-cyan-50/70 p-5 shadow-[0_18px_48px_-38px_rgba(15,23,42,0.28)] sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:p-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">Catálogo GoVene</p>
          <h1 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">Gestión de productos</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Administra tu catálogo desde un solo lugar</p>
        </div>
        <Link
            to='/dashboard/products/new'
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 sm:w-auto">
            <FiPlus size={18} strokeWidth={2.5} />
            Nuevo producto
        </Link>
      </header>
      <TableProduct />
    </div>
  )
}
