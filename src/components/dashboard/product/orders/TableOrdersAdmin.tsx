import { useNavigate } from "react-router-dom";
import { formatDateLong } from "../../../../helpers";
import type { OrderWithCustomer } from "../../../../interface";
import { useChangeStatusOrder } from "../../../../hooks";

const tableHeaders = ['Cliente', 'Fecha', 'Estado', 'Total'];

const statusOptions = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'paid', label: 'Pagado' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregado' },
]

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
        <div className="relative w-full h-full">
            <table className="text-sm w-full caption-bottom overflow-auto">
                <thead className="border-b border-gray-200 pb-3">
                    <tr className="text-sm font-bold">
                        {
                            tableHeaders.map((header, index) => (
                                <th key={index} className="h-12 px-4 text-left">
                                    {header}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {
                        orders.map((order) => (
                            <tr key={order.id} onClick={() => navigate(`/dashboard/orders/${order.id}`)} className="cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                                <td className="p-4 font-medium tracking-tighter flex flex-col gap-1">
                                    <span className="font-semibold">
                                        {order.customers?.full_name}
                                    </span>
                                    <span>{order.customers?.email}</span>
                                </td>
                                <td className="p-4 font-medium tracking-tighter">
                                    {formatDateLong(order.created_at)}
                                </td>
                                <td className="p-4 font-medium tracking-tighter">
                                    <select
                                        value={order.status}
                                        onClick={(e) => e.stopPropagation()}
                                        className="border border-gray-300 py-2 rounded"
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                    >
                                        {
                                            statusOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td className="p-4 font-medium tracking-tighter">
                                    {order.total_amount}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

        </div>
    )
}
