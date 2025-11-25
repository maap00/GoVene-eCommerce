
import { BiWorld } from 'react-icons/bi'
import { FaHammer } from 'react-icons/fa6'
import { HiMiniReceiptRefund } from 'react-icons/hi2'
import { MdLocalShipping } from 'react-icons/md'

export const FeatureGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">
            <div className="flex items-center gap-6">
                <MdLocalShipping size={40} className='text-slate-600' />
                <div className="space-y-1">
                    <p className="font-semibold">Envio Gratis</p>
                    <p className="text-sm">En todos nuestros productos</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <HiMiniReceiptRefund size={40} className='text-slate-600' />
                <div className="space-y-1">
                    <p className="font-semibold">Devoluciones</p>
                    <p className="text-sm">Hasta 72horas para devolver sin costo</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <FaHammer size={40} className='text-slate-600' />
                <div className="space-y-1">
                    <p className="font-semibold">Soporte tecnico</p>
                    <p className="text-sm">Servicio 24horas</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <BiWorld size={40} className='text-slate-600' />
                <div className="space-y-1">
                    <p className="font-semibold">Garantias</p>
                    <p className="text-sm">Garantia por 365 dias</p>
                </div>
            </div>
        </div>
    )
}
