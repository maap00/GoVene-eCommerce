import { Separator } from "../../shared/Separator"
import { Brands } from "../Brands"

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

}:Props) => {
    const handleBrandChange = (brand: string) => {
        if(seletedBrands.includes(brand)) {
            setSelectedBrands(seletedBrands.filter(b => b !== brand));
        }else {
            setSelectedBrands([...seletedBrands, brand]);
        }
    };
  return (
    <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg: col-span-1">
        <h3 className="font-semibold text-xl mb-4">Filtros</h3>

        <Separator/>
        
        <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium text-black">Marcas</h3>
            <div className="flex flex-col gap-2">
                {availableFilters.map(brand =>(
                    <label key={brand} className="inline-flex items-center">
                        <input 
                        type="checkbox" 
                        className="text-black border-black focus:ring-black accent-black" 
                        checked={seletedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}                        
                        />
                        
                        <span className="ml-2 text-black text-sm cursor-pointer">
                            {brand}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    </div>
  )
}