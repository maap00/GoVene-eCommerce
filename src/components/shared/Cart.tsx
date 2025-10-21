import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { useGlobalStore } from '../../store/global.store';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { useCartStore } from '../../store/cart.store';

export const Cart = () => {

const closeSheet = useGlobalStore((state) => state.closeSheet);

const cartItems = useCartStore((state) => state.items);
const cleanCart = useCartStore((state) => state.cleanCart);
const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);


return (
<div className="flex flex-col h-full">
  <div className="px-5 py-7 flex justify-between items-center border-b border-slate-200">
    <span className="flex gap-3 items-center font-semibold">
      <HiOutlineShoppingBag size={20} />
      {totalItemsInCart} Items
    </span>
    <button type="button" onClick={closeSheet}>
      <IoMdClose size={25} className='text-black' />
    </button>
  </div>

  {cartItems.length > 0 ? (
  <>
    {/* PRODUCTS LIST ADDED TO CART */}

    <div className="p-7 overflow-auto flex-1">
      <ul>
        {cartItems.map((item) => (
        <CartItem key={item.variantId} item={item} />
        ))}
      </ul>
    </div>
    <div className="mt-4 p-7">
      <Link to="/checkout"
        className="w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-3">
      <RiSecurePaymentLine size={24} />
      Continue to checkout
      </Link>
      <button className="mt-3 w-full text-black border border-black rounded-full py-3" onClick={cleanCart}>
        Clear cart
      </button>
    </div>
  </>

  ) : (
    <div className="flex flex-col items-center justify-center h-full gap-7">
      <p className="text-sm font-medium tracking-tight">
        Your cart is empty
      </p>
      <Link to={'/socios'} className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold">
        Shop products
      </Link>

    </div>
  )}



</div>


)
}