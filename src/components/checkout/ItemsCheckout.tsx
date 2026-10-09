import { formatPrice } from '../../helpers';
import { useCartStore } from '../../store/cart.store';

export const ItemsCheckout = () => {
  const cartItems = useCartStore(state => state.items);
  const totalAmount = useCartStore(state => state.totalAmount);
  const totalItems = useCartStore(state => state.totalItemsInCart);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-label="Resumen del pedido">
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">Resumen del pedido</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
        </span>
      </div>

      <ul className="space-y-4">
        {cartItems.map(item => (
          <li
            key={item.variantId}
            className="flex min-w-0 items-center gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0 sm:gap-4"
          >
            <div className="relative h-[72px] w-[72px] shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2 sm:h-20 sm:w-20">
              <img
                src={item.image}
                alt={item.name}
                className="block h-full w-full object-contain object-center"
              />
              <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full border-2 border-white bg-slate-900 px-1 text-[11px] font-semibold text-white">
                {item.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">{item.name}</p>
                <p className="shrink-0 text-sm font-semibold text-slate-800">{formatPrice(item.price)}</p>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                {item.storage} {item.color ? `· ${item.color}` : ''}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-3 border-t border-slate-200 pt-4">
        <div className="flex justify-between text-sm text-slate-600">
          <p>Envío</p>
          <p className="font-medium text-slate-800">Gratis</p>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-cyan-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-800">Total del pedido</p>
          <p className="text-xl font-bold tracking-tight text-slate-950">{formatPrice(totalAmount)}</p>
        </div>
      </div>
    </section>
  );
};
