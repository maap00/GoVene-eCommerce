import { useEffect, useState } from 'react';

interface Props {
    images: string[];
    productName?: string;
}

export const GridImages = ({ images, productName = 'Producto' }: Props) => {
    const [activeImage, setActiveImage] = useState(images[0]);

    useEffect(() => {
        setActiveImage(images[0]);
    }, [images]);

    return (
        <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.35)] sm:aspect-[1.08/1] sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(236,254,255,0.9),transparent_68%)]" />
                {activeImage && <img
                    key={activeImage}
                    src={activeImage}
                    alt={productName}
                    className="relative h-full w-full animate-[product-image-in_350ms_ease-out] object-contain object-center transition-transform duration-500 hover:scale-[1.025]"
                />}
            </div>

            {images.length > 1 && <div className="flex gap-3 overflow-x-auto pb-1" aria-label="Galería de imágenes del producto">
                {images.map((image, index) => (
                    <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        aria-label={`Ver imagen ${index + 1} de ${productName}`}
                        aria-pressed={activeImage === image}
                        className={`h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl border bg-white p-2 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 sm:h-[88px] sm:w-[88px] ${activeImage === image ? 'border-cyan-800 ring-1 ring-cyan-800' : 'border-slate-200 hover:border-slate-400'}`}
                    >
                        <img src={image} alt="" className="h-full w-full object-contain object-center" />
                    </button>
                ))}
            </div>}
        </div>
    );
};
