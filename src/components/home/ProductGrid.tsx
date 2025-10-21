import type { PrepareProductData } from "../../interface";
import { CardProduct } from "../products/CardProduct";

interface Props{
    title: string;
    products: PrepareProductData[]; // Replace 'any' with the actual type of your products
}
export const ProductGrid = ({ title , products }: Props) => {
  return (
    <div className="my-32">
        <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
            {title}
        </h2>
        <div className="grid grid-cols-1 gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <div className="flex flex-col gap-3 relative" 
                     key={product.id}
                     >
                    <CardProduct 
                    img={product.images[0]} 
                    name={product.name}
                    price={product.price}
                    slug={product.slug}
                    colors={product.colors}
                    variants={product.variants}/>

                </div>
            ))}
        </div>
    </div>
  );
};
