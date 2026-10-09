import { HiOutlineAdjustments } from "react-icons/hi";
import { Separator } from "../shared/Separator";

const availableFilters = [
    'Samsung',
    'Apple',
    'Xiaomi',
    'Huawei',
    'Realme',
    'Honor',
]

interface Props {
    seletedBrands: string[];
    setSelectedBrands: (brands: string[]) => void;
}

export const ContainerFilter = ({
    seletedBrands,
    setSelectedBrands,

}: Props) => {
    const handleBrandChange = (brand: string) => {
        if (seletedBrands.includes(brand)) {
            setSelectedBrands(seletedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...seletedBrands, brand]);
        }
    };
    return (
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-6" aria-labelledby="catalog-filters-title">
            <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-800">
                    <HiOutlineAdjustments size={20} aria-hidden="true" />
                </span>
                <div>
                    <h2 id="catalog-filters-title" className="text-base font-semibold tracking-tight text-slate-900">Filtros</h2>
                    <p className="mt-0.5 text-xs text-slate-500">Afina tu búsqueda</p>
                </div>
            </div>

            <Separator className="my-5" />

            <fieldset>
                <legend className="mb-3 text-sm font-semibold text-slate-800">Marcas</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    {availableFilters.map(brand => (
                        <label key={brand} className={`group flex min-h-10 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-sm transition-colors duration-200 motion-reduce:transition-none ${seletedBrands.includes(brand) ? 'border-cyan-200 bg-cyan-50 text-cyan-900' : 'border-slate-100 bg-slate-50/70 text-slate-600 hover:border-slate-200 hover:bg-white'}`}>
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 accent-cyan-700 focus:ring-cyan-600"
                                checked={seletedBrands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                            />
                            <span className="font-medium">{brand}</span>
                        </label>
                    ))}
                </div>
            </fieldset>
        </aside>
    )
}
