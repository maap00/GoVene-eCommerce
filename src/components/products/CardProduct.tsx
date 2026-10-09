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
}

export const CardProduct = ({
    img,
    name,
    price,
    slug,
    colors,
    variants
}: Props) => {

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
        <div className="flex flex-col gap-6 relative">
            <Link to={`/products/${slug}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2">
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#E7E8EB] bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 group-hover:border-slate-300 group-hover:shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
                    <img
                        src={img}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-contain object-center" />
                </div>
                <button className="absolute inset-x-3 bottom-3 flex translate-y-[100%] items-center justify-center gap-1 rounded-full border border-slate-200 bg-white/95 py-3 text-sm font-medium shadow-sm transition-transform duration-300 group-hover:translate-y-0 hover:bg-stone-100"
                    onClick={handleAddClick}>
                    <FiPlus />
                    Agregar
                </button>
            </Link>

            <div className="flex flex-col gap-1 items-center">
                <p className="text-[15px] font-medium">{name}</p>
                <p className="text-[15px] font-medium">{formatPrice(price)}</p>


                <div className={`${colors.length > 0 && colors[0].color !== "" ? 'flex gap-3' : 'hidden'}`}>
                    {colors.map(color => (
                        <span
                            key={color.color}
                            className={`grid place-items-center w-5 h-5 rounded-full cursor-pointer ${activeColor.color === color.color ? 'border border-black' : ''
                                }`}
                            onClick={() => setActiveColor(color)}
                        >
                            <span
                                className="w-[14px] h-[14px] rounded-full"
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
        </div>
    )
}
