
import { prepareProductData } from '../helpers'
import { CardProducts } from '../components/home/products/CardProducts'
import { ContainerFilter } from '../components/home/products/ContainerFilter'
import { useFilteredProducts } from '../hooks'
import { useState } from 'react'


export const SocioPage = () => {

    const [page, setPage] = useState(1);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    
    const { 
        data: products = [],
        isLoading,
        totalProducts, } = useFilteredProducts({
        page,
        brands: selectedBrands,
    });

    if(isLoading || !products) return <p>Loading...</p>

    const preparedProducts = prepareProductData(products);

  return (
    <>
    <h1 className="text-5xl font-semibold text-center mb-12">
        Celulares
    </h1>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl: grid-cols-5">
        <div><ContainerFilter 
            seletedBrands={selectedBrands} 
            setSelectedBrands={setSelectedBrands}/></div>

        {   isLoading ? (
                <div className='col-span-2 flex items-center justify-center h-[500px]'>
                    <p className='text-2xl'>Loading...</p>
                </div>
            ):(
                <div className="col-span-2 lg:col-span-2 xl: col-span-4 flex flex-col gap-12">
                    <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                        {preparedProducts.map((product) => (
                                        <div className="flex flex-col gap-3 relative" 
                                            key={product.id}
                                            >
                                            <CardProducts 
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
                )
        }



      
    </div>
    </>
  )
}
