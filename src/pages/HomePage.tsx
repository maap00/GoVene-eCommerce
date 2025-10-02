import { FeatureGrid } from '../components/home/FeatureGrid'
import { ProductGrid } from '../components/home/ProductGrid'
import { Brands } from '../components/home/Brands'
import { prepareProductData } from '../helpers'
import { useHomeProducts } from '../hooks'

export const HomePage = () => {

  const { recentProducts, popularProducts, isLoading, error } = useHomeProducts();
  
  const preparedPopularCelularesProducts = prepareProductData(popularProducts);
  const preparedrecentCelularesProducts = prepareProductData(recentProducts);
  return (
    <div>
      <FeatureGrid/>
      <ProductGrid
      title='Productos Destacados'
      products={preparedPopularCelularesProducts } // Products to display radomly
      />
      <ProductGrid
      title='Productos Destacados 2'
      products={preparedrecentCelularesProducts } // Example products
      />
      <Brands/> 
    </div>
  )
}
    