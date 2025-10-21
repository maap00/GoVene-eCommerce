import React, { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { useGlobalStore } from '../../store/global.store';
import { formatPrice } from '../../helpers';
import { searchProducts } from '../../actions';
import type { Product } from '../../interface';
import { useNavigate } from 'react-router-dom';

export const Search = () => {

const [searchTerm, setSearchTerm] = useState('');
const [searchResult, setSearchResult] = useState<Product[]>([]);

const closeSheet = useGlobalStore((state) => state.closeSheet);

const handleSearch = async(e: React.FormEvent) => {
  e.preventDefault();
  if(searchTerm.trim()){
  // Look API products
  const products = await searchProducts(searchTerm);
  setSearchResult(products)
  }
} 

const navigate = useNavigate();

return (
<>
  <div className="py-5 px-7 flex gap-10 items-center border-b border-slate-200">
    <form className="flex gap-3 items-center flex-1" onSubmit={handleSearch}>
      <HiOutlineSearch size={25} />
      <input type="text" className="outine-none w-full text-sm" placeholder='Que buscas?' value={searchTerm}
        onChange={e=> setSearchTerm(e.target.value)} />
    </form>
    <button type="button" onClick={closeSheet}>
      <IoMdClose size={25} className='text-black' />
    </button>
  </div>

  {/* results here */}
  <div className="py-5">
    {searchResult.length > 0 ? (
    <ul>
      {searchResult.map(product => (
        <li className="py-2 group">
        <button className="flex items-center gap-3"
                onClick={() => {
                  navigate(`/products/${product.slug}`);
                  closeSheet();
                }}>
          <img src={product.images[0]} alt={product.name} className="h-20 w-20 object-contain p-3" />
        </button>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold group-hover:underline">
            {product.variants[0].storage} / {' '} 
            {product.variants[0].color_name}
          </p> 
          <p className="text-[13px] text-gray-600">
            {product.features[0]}
          </p>
          <p className="text-sm font-medium text-gray-600">
            {formatPrice(product.variants[0].price)}
          </p>
        </div>
      </li>
      ))}
    </ul>) : (
    <p className="text-sm text-gray-600">
      There are no results
    </p>
    )}


  </div>
</>
)}