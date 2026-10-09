import { useForm } from "react-hook-form"
import { InputAddress } from "./InputAddress"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema, type AddressFormValues } from "../../lib/validators"
import { ItemsCheckout } from "./ItemsCheckout"
import { useCreateOrder } from "../../hooks"
import { useCartStore } from "../../store/cart.store"
import { ImSpinner2 } from "react-icons/im"
import {
    HiOutlineCreditCard,
    HiOutlineDeviceMobile,
    HiOutlineOfficeBuilding,
} from "react-icons/hi"
import { SiBinance } from "react-icons/si"
import type { IconType } from "react-icons"

type PaymentMethod = {
    name: string
    Icon?: IconType
    color?: string
    image?: string
    wordmark?: boolean
    hideLabel?: boolean
}

const paymentMethods: PaymentMethod[] = [
    { name: "Pago Móvil", Icon: HiOutlineDeviceMobile, color: "#15803D" },
    { name: "Zelle", wordmark: true, color: "#6D1ED4", hideLabel: true },
    { name: "Binance Pay", Icon: SiBinance, color: "#F0B90B" },
    { name: "Cashea", image: "/img/payment-methods/cashea.png", hideLabel: true },
    { name: "Ubii", Icon: HiOutlineCreditCard, color: "#64748B" },
    { name: "Transferencia bancaria", Icon: HiOutlineOfficeBuilding, color: "#64748B" },
    { name: "Tarjeta de débito o crédito", Icon: HiOutlineCreditCard, color: "#64748B" },
]

export const FormCheckout = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
    });

    const { mutate: createOrder, isPending } = useCreateOrder();
    const cleanCart = useCartStore(state => state.cleanCart);
    const cartItems = useCartStore(state => state.items);
    const totalAmount = useCartStore(state => state.totalAmount);

    const onSubmit = handleSubmit(data => {
        const orderInput = {
            address: data,
            cartItems: cartItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
        };

        createOrder(orderInput, {
            onSuccess: () => {
                cleanCart();
            },
        });
    });

    if (isPending) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <ImSpinner2 className="h-10 w-10 animate-spin text-cyan-700" />
                <p className="text-sm font-medium text-slate-700">Estamos procesando tu pedido</p>
            </div>
        );
    }

    const inputClassName = "rounded-xl border-[#E1E5EA] bg-white py-2.5 transition-colors focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/10";

    return (
        <form action="" className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:gap-8 sm:p-7 lg:p-8" onSubmit={onSubmit}>
            <section className="flex flex-col gap-4" aria-labelledby="delivery-title">
                <div className="border-b border-slate-100 pb-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Entrega</p>
                    <h2 id="delivery-title" className="text-xl font-semibold tracking-tight text-slate-900">Dirección de entrega</h2>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <InputAddress register={register} errors={errors} name="addressLine1" placeholder="Dirección principal" className={inputClassName} />
                    </div>
                    <div className="sm:col-span-2">
                        <InputAddress register={register} errors={errors} name="addressLine2" placeholder="Dirección adicional (opcional)" className={inputClassName} />
                    </div>
                    <div className="min-w-0"><InputAddress register={register} errors={errors} name="state" placeholder="Estado" className={inputClassName} /></div>
                    <div className="min-w-0"><InputAddress register={register} errors={errors} name="city" placeholder="Ciudad" className={inputClassName} /></div>
                    <div className="min-w-0"><InputAddress register={register} errors={errors} name="postalCode" placeholder="Código postal (opcional)" className={inputClassName} /></div>
                    <div className="min-w-0">
                        <select className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" {...register('country')}>
                            <option value="Venezuela">Venezuela</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-3" aria-labelledby="delivery-method-title">
                <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Envío</p>
                    <h3 id="delivery-method-title" className="text-base font-semibold text-slate-900">Método de envío</h3>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm sm:px-5">
                    <span className="font-medium text-slate-700">Estándar</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Gratis</span>
                </div>
            </section>

            <section className="flex flex-col gap-3" aria-labelledby="payment-method-title">
                <div className="border-b border-slate-100 pb-3">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Pago</p>
                    <h3 id="payment-method-title" className="text-base font-semibold text-slate-900">Método de pago</h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {paymentMethods.map(({ name, Icon, color, image, wordmark, hideLabel }) => (
                        <div key={name} aria-label={name} className="flex min-h-[72px] min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 sm:gap-3 sm:p-3.5">
                            <span className={`grid h-10 shrink-0 place-items-center rounded-xl ${image ? "w-[88px] bg-white" : "w-10 bg-slate-50"}`}>
                                {image ? (
                                    <img src={image} alt="Cashea" className="block h-7 w-full object-contain object-center" />
                                ) : wordmark ? (
                                    <span className="text-base font-bold tracking-tight" style={{ color }} aria-hidden="true">Zelle</span>
                                ) : Icon ? (
                                    <Icon size={22} color={color} aria-hidden="true" />
                                ) : null}
                            </span>
                            {!hideLabel && <span className="text-xs font-medium leading-4 text-slate-700 sm:text-sm">{name}</span>}
                        </div>
                    ))}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Datos bancarios</p>
                    <div className="space-y-1 text-sm text-slate-600">
                        <p className="font-medium text-slate-800">Pago móvil · BANCO VENEZUELA</p>
                        <p>Cuenta: 000001221000012</p>
                        <p>Cédula: 121123213</p>
                        <p>Tipo de cuenta: Corriente</p>
                        <p className="pt-2 text-xs text-slate-500">Favor enviar comprobante</p>
                    </div>
                </div>
            </section>

            <div className="lg:hidden">
                <ItemsCheckout />
            </div>

            <button type="submit" className="min-h-12 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2">
                Completar pedido
            </button>
        </form>
    )
}
