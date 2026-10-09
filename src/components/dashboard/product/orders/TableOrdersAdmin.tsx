import { useNavigate } from "react-router-dom";
import { formatDateLong, formatPrice } from "../../../../helpers";
import type { OrderWithCustomer } from "../../../../interface";
import { useChangeStatusOrder } from "../../../../hooks";

const tableHeaders = ['Cliente', 'Fecha', 'Estado', 'Total'];

const statusOptions = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'paid', label: 'Pagado' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregado' },
]

const statusStyles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-800 ring-amber-200',
    paid: 'bg-cyan-50 text-cyan-800 ring-cyan-200',
    shipped: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
    delivered: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
};

interface Props {
    orders: OrderWithCustomer[];
}

export const TableOrdersAdmin = ({ orders }: Props) => {
    const navigate = useNavigate();
    const { mutate } = useChangeStatusOrder();

    const handleUpdateStatus = (id: number, status: string) => {
        mutate({ id, status });
    }

    return (
        <div className="w-full overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[680px] table-auto border-collapse text-sm">
                <thead>
                    <tr className="border-b border-slate-100 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {tableHeaders.map(header => <th key={header} className="h-12 px-4">{header}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {orders.length > 0 ? orders.map(order => (
                        <tr key={order.id}
                            onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                            className="cursor-pointer transition-colors hover:bg-slate-50/80">
                            <td className="px-4 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-slate-800">{order.customers?.full_name || '—'}</span>
                                    <span className="text-xs text-slate-500">{order.customers?.email || '—'}</span>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-slate-600">{formatDateLong(order.created_at)}</td>
                            <td className="px-4 py-4" onClick={event => event.stopPropagation()}>
                                <select
                                    aria-label={`Cambiar estado del pedido ${order.id}`}
                                    value={order.status}
                                    className={`cursor-pointer appearance-none rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset outline-none transition focus:ring-2 focus:ring-cyan-700 ${statusStyles[order.status] || 'bg-slate-50 text-slate-700 ring-slate-200'}`}
                                    onChange={event => handleUpdateStatus(order.id, event.target.value)}
                                >
                                    {statusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                                </select>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-900">{formatPrice(order.total_amount)}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan={tableHeaders.length} className="px-4 py-12 text-center text-sm text-slate-500">No hay pedidos para mostrar.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
