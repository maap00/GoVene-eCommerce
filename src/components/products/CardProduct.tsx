import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { VariantsProducts } from "../../interface";
import { formatPrice } from "../../helpers";
import { Tag } from "../shared/Tag";
import { useCartStore } from "../../store/cart.store";
import toast from "react-hot-toast";

interface Props {
    img: string;
    name: string;
    price: number;
    slug: string;
    colors: { name: string; color: string }[];
    variants: VariantsProducts[];
    presentation?: 'default' | 'catalog';
}

export const CardProduct = ({
    img,
    name,
    price,
    slug,
    colors,
    variants,
    presentation = 'default'
}: Props) => {
    const isCatalog = presentation === 'catalog'

    const [activeColor, setActiveColor] = useState<{
        name: string;
        color: string;
    }>(colors[0]);

    const addItem = useCartStore(state => state.addItem);

    const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (selectedVariant && selectedVariant.stock > 0) {

            addItem({
                variantId: selectedVariant?.id,
                productId: slug,
                name,
                image: img,
                color: activeColor.name,
                storage: selectedVariant?.storage,
                price: selectedVariant?.price,
                quantity: 1
            });
            toast.success('Producto agregado al pedido', {
                position: 'bottom-right'
            });
        } else {
            toast.error('Este producto está agotado', {
                position: 'bottom-right'
            })
        }

    }

    const selectedVariant = variants.find(
        variant => variant.color === activeColor.color);

    const stock = selectedVariant?.stock || 0;

    return (
        <article className={`relative flex h-full flex-col ${isCatalog ? 'gap-3 rounded-[1.4rem] border border-slate-200/80 bg-white p-2.5 shadow-[0_6px_24px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] motion-reduce:transform-none motion-reduce:transition-none sm:gap-4 sm:p-3' : 'gap-6'}`}>
            <Link to={`/products/${slug}`}
                className={`group relative block aspect-square w-full overflow-hidden rounded-2xl bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 ${isCatalog ? 'border border-slate-100 bg-slate-50/70' : ''}`}>
                <div className={`relative h-full w-full overflow-hidden rounded-2xl border border-[#E7E8EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 group-hover:border-slate-300 group-hover:shadow-[0_4px_14px_rgba(15,23,42,0.08)] ${isCatalog ? 'p-3 sm:p-4' : 'p-2'}`}>
                    <img
                        src={img}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-contain object-center" />
                </div>
                <button aria-label={`Agregar ${name} al pedido`} className={`absolute inset-x-3 bottom-3 flex items-center justify-center gap-1 rounded-full border border-slate-200 bg-white/95 shadow-sm transition-all duration-300 hover:bg-stone-100 motion-reduce:transition-none ${isCatalog ? 'translate-y-0 py-2.5 text-xs font-semibold opacity-100 sm:py-3 sm:text-sm md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100' : 'translate-y-[100%] py-3 text-sm font-medium group-hover:translate-y-0'}`}
                    onClick={handleAddClick}>
                    <FiPlus />
                    Agregar
                </button>
            </Link>

            <div className={`flex flex-1 flex-col gap-1 ${isCatalog ? 'items-start px-1 pb-1' : 'items-center'}`}>
                <p className={`${isCatalog ? 'line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-800 sm:text-[15px]' : 'text-[15px] font-medium'}`}>{name}</p>
                <p className={`${isCatalog ? 'mt-auto pt-1 text-base font-semibold tracking-tight text-slate-950' : 'text-[15px] font-medium'}`}>{formatPrice(price)}</p>


                <div className={`${colors.length > 0 && colors[0].color !== "" ? `flex gap-2 ${isCatalog ? 'mt-2' : ''}` : 'hidden'}`}>
                    {colors.map(color => (
                        <span
                            key={color.color}
                            className={`grid place-items-center rounded-full cursor-pointer ${isCatalog ? 'h-6 w-6' : 'h-5 w-5'} ${activeColor.color === color.color ? 'border border-slate-900' : ''
                                }`}
                            onClick={() => setActiveColor(color)}
                        >
                            <span
                                className="h-[14px] w-[14px] rounded-full"
                                style={{
                                    backgroundColor: color.color
                                }}
                            />
                        </span>
                    ))}
                </div>
            </div>

            <div className="absolute top-2 left-2">
                {stock === 0 && <Tag contentTag="agotado" />}
            </div>
        </article>
    )
}
