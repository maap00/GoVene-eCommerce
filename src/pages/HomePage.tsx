import { FeatureGrid } from '../components/home/FeatureGrid'
import { ProductGrid } from '../components/home/ProductGrid'
import { Brands } from '../components/home/Brands'
import { popularCelulares } from '../data/initialData'
import { prepareProductData } from '../helpers'

export const HomePage = () => {
  
  const preparedPopularCelularesProducts = prepareProductData(popularCelulares);
  const preparedrecentCelularesProducts = prepareProductData(popularCelulares);
  return (
    <div>
      <FeatureGrid/>
      <ProductGrid
      title='Productos Destacados'
      products={preparedPopularCelularesProducts } // Example products
      />
      <ProductGrid
      title='Productos Destacados 2'
      products={preparedrecentCelularesProducts } // Example products
      />
      <Brands/> 
    </div>
  )
}
    