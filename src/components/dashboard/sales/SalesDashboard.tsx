import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { FiArrowUpRight, FiBox, FiCheckCircle, FiClock, FiCreditCard, FiShoppingBag, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import { formatPrice } from '../../../helpers';
import {
    categorySales, orderStatuses, paymentMethods, recentDemoOrders, salesMetrics, salesPeriods,
    salesTrend, topProducts, type SalesPeriod,
} from '../../../data/dashboardSalesDemo';
import { useAllOrders } from '../../../hooks';
import { TableOrdersAdmin } from '../product/orders/TableOrdersAdmin';


const number = new Intl.NumberFormat('es-VE');
const currency = (value: number) => formatPrice(value);

function useCountUp(target: number, decimals = 0) {

    const [value, setValue] = useState(0);
    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            setValue(target);
            return;
        }
        let frame = 0;
        const start = performance.now();
        const duration = 1150;
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(target * eased);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target]);
    return new Intl.NumberFormat('es-VE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(decimals ? value : Math.round(value));
}

function Sparkline({ values, color = '#0e7490' }: { values: number[]; color?: string }) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const points = values.map((value, index) => `${(index / (values.length - 1)) * 90 + 5},${30 - ((value - min) / (max - min || 1)) * 22}`).join(' ');
    return <svg viewBox="0 0 100 36" className="h-10 w-24 overflow-visible" aria-hidden="true"><polyline points={points} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="sales-line-draw" /></svg>;
}

function MetricCard({ title, value, prefix = '', suffix = '', decimals = 0, change, icon: Icon, tone = 'cyan', prominent = false }: {
    title: string; value: number; prefix?: string; suffix?: string; decimals?: number; change?: string;
    icon: IconType; tone?: 'cyan' | 'indigo' | 'amber' | 'emerald'; prominent?: boolean;
}) {
    const count = useCountUp(value, decimals);
    const tones = {
        cyan: 'bg-cyan-50 text-cyan-800', indigo: 'bg-indigo-50 text-indigo-700',
        amber: 'bg-amber-50 text-amber-700', emerald: 'bg-emerald-50 text-emerald-700',
    };
    return (
        <article className={`sales-card-enter group rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_38px_-30px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-30px_rgba(15,23,42,0.28)] sm:p-6 ${prominent ? 'min-h-[190px]' : ''}`}>
            <div className="flex items-start justify-between gap-3">
                <div className={`grid h-11 w-11 place-items-center rounded-2xl ${tones[tone]}`}><Icon size={20} /></div>
                {change && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"><FiArrowUpRight />{change}</span>}
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
            <div className="mt-1 flex items-end justify-between gap-2">
                <p className={`font-semibold tracking-tight text-slate-950 ${prominent ? 'text-3xl sm:text-[2rem]' : 'text-2xl'}`}>{prefix}{count}{suffix}</p>
                {prominent && <Sparkline values={[17, 23, 21, 34, 30, 42, 52]} />}
            </div>
        </article>
    );
}

function Panel({ title, subtitle, action, children, className = '' }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
    return <section className={`rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_38px_-30px_rgba(15,23,42,0.25)] sm:p-6 ${className}`}>
        <div className="mb-6 flex items-start justify-between gap-3">
            <div><h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">{title}</h2>{subtitle && <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{subtitle}</p>}</div>
            {action}
        </div>
        {children}
    </section>;
}

function SalesChart({ period, revenue }: { period: SalesPeriod; revenue: number }) {
    const series = salesTrend[period];
    const [activePoint, setActivePoint] = useState(series.length - 1);
    useEffect(() => setActivePoint(series.length - 1), [period, series.length]);
    const coords = series.map((point, index) => ({ x: 18 + (index / (series.length - 1)) * 564, y: 198 - point.value * 1.65 }));
    const path = coords.map((point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        const previous = coords[index - 1];
        const mid = (previous.x + point.x) / 2;
        return `C ${mid} ${previous.y}, ${mid} ${point.y}, ${point.x} ${point.y}`;
    }).join(' ');
    const areaPath = `${path} L ${coords[coords.length - 1].x} 210 L ${coords[0].x} 210 Z`;
    return <div>
        <div className="mb-3 flex items-center justify-between">
            <div><p className="text-2xl font-semibold tracking-tight text-slate-950">{currency(24850)}</p><p className="mt-1 text-xs text-slate-500">Ventas del período · demostración</p></div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"><FiArrowUpRight />12,8 %</span>
        </div>
        <div className="relative w-full">
            <svg viewBox="0 0 600 230" className="w-full overflow-visible" role="img" aria-label="Gráfico de evolución demostrativa de ventas">
                <defs><linearGradient id="sales-chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#0891b2" stopOpacity=".2" /><stop offset="100%" stopColor="#0891b2" stopOpacity="0" /></linearGradient></defs>
                {[35, 80, 125, 170, 210].map(y => <line key={y} x1="18" x2="582" y1={y} y2={y} stroke="#e9eef2" strokeDasharray="4 6" />)}
                <path d={areaPath} fill="url(#sales-chart-fill)" />
                <path d={path} fill="none" stroke="#0e7490" strokeWidth="3.2" strokeLinecap="round" className="sales-line-draw" />
                {coords.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r={activePoint === index ? 6 : 3.5} fill={activePoint === index ? '#0e7490' : '#fff'} stroke="#0e7490" strokeWidth="2" tabIndex={0} role="button" aria-label={`${series[index].label}: ${currency(Math.round(revenue * series[index].value / Math.max(...series.map(({ value }) => value))))}`} onMouseEnter={() => setActivePoint(index)} onFocus={() => setActivePoint(index)}><title>{series[index].label} · {currency(Math.round(revenue * series[index].value / Math.max(...series.map(({ value }) => value))))}</title></circle>)}
            </svg>
            <div className="mt-1 flex justify-between px-1 text-[10px] font-medium text-slate-400 sm:text-xs">{series.map(point => <span key={point.label}>{point.label}</span>)}</div>
        </div>
        <p className="mt-3 text-xs text-slate-500">Punto seleccionado: <span className="font-semibold text-slate-700">{series[activePoint]?.label}</span><span className="ml-2 font-semibold text-slate-900">{currency(Math.round(revenue * series[activePoint].value / Math.max(...series.map(({ value }) => value))))}</span></p>
    </div>;
}

function StatusDonut() {
    const total = orderStatuses.reduce((sum, status) => sum + status.count, 0);
    let accumulated = 0;
    const gradient = orderStatuses.map(status => {
        const start = accumulated;
        accumulated += (status.count / total) * 100;
        return `${status.color} ${start}% ${accumulated}%`;
    }).join(', ');
    return <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full sales-donut-draw" style={{ background: `conic-gradient(${gradient})` }}>
            <div className="grid h-[108px] w-[108px] place-items-center rounded-full bg-white text-center"><div><p className="text-xl font-semibold text-slate-900">{number.format(total)}</p><p className="text-[10px] text-slate-500">pedidos</p></div></div>
        </div>
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-1">
            {orderStatuses.map(status => <div key={status.label} className="flex min-w-0 items-center gap-2"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: status.color }} /><span className="min-w-0 flex-1 truncate text-xs text-slate-500">{status.label}</span><span className="text-xs font-semibold text-slate-800">{number.format(status.count)}</span></div>)}
        </div>
    </div>;
}

function PaymentMix() {
    let offset = 0;
    const gradient = paymentMethods.map(method => {
        const start = offset;
        offset += method.percent;
        return `${method.color} ${start}% ${offset}%`;
    }).join(', ');
    return <div>
        <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100 sales-bar-draw"><div className="h-full w-full rounded-full" style={{ background: `linear-gradient(90deg, ${gradient})` }} /></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {paymentMethods.map(method => <div key={method.label} className="flex items-center gap-2"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: method.color }} /><span className="flex-1 truncate text-xs text-slate-600">{method.label}</span><span className="text-xs font-semibold text-slate-800">{method.percent}%</span></div>)}
        </div>
    </div>;
}

export const SalesDashboard = () => {
    const [period, setPeriod] = useState<SalesPeriod>('month');
    const { data: orders, isLoading: isOrdersLoading } = useAllOrders();
    const metrics = salesMetrics[period];
    const operations = useMemo(() => [
        { label: 'Pedidos que requieren atención', value: metrics.pending, icon: FiClock, color: 'text-amber-700 bg-amber-50' },
        { label: 'Productos con pocas existencias', value: 12, icon: FiBox, color: 'text-rose-700 bg-rose-50' },
        { label: 'Categoría con mejor rendimiento', value: 'Tecnología', icon: FiTrendingUp, color: 'text-cyan-800 bg-cyan-50' },
        { label: 'Pedidos entregados', value: '92 %', icon: FiCheckCircle, color: 'text-emerald-700 bg-emerald-50' },
    ], [metrics.pending]);

    return <div className="mx-auto w-full min-w-0 max-w-[1500px] space-y-6 pb-10 sm:space-y-8">
        <header className="sales-card-enter rounded-[28px] border border-slate-200/70 bg-gradient-to-br from-white via-white to-cyan-50/70 p-5 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.25)] sm:p-7 lg:p-8">
            <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
                <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-900 sm:text-xs"><span className="h-1.5 w-1.5 rounded-full bg-cyan-600" />Panel comercial · Datos de demostración</div>
                    <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[2.75rem]">Panel de ventas</h1>
                    <p className="mt-2 text-sm text-slate-600 sm:text-base">Visualiza el rendimiento de tu negocio en GoVene</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between xl:justify-end">
                    <div className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm" role="tablist" aria-label="Período de datos de demostración">
                        {salesPeriods.map(item => <button key={item.id} type="button" role="tab" aria-selected={period === item.id} onClick={() => setPeriod(item.id)} className={`shrink-0 rounded-xl px-2 py-2 text-[11px] font-semibold transition sm:px-4 sm:text-sm ${period === item.id ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>{item.label}</button>)}
                    </div>
                    <div className="flex items-center gap-2 self-start rounded-full bg-white/80 px-3 py-2 text-xs text-slate-500 sm:self-auto"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>Actualizado ahora</div>
                </div>
            </div>
        </header>

        <section aria-label="Métricas principales" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <MetricCard title="Ventas totales" value={metrics.revenue} prefix="$" decimals={2} change="12,8 %" icon={HiOutlineCurrencyDollar} prominent />
            <MetricCard title="Pedidos recibidos" value={metrics.orders} change="8,4 %" icon={FiShoppingBag} tone="indigo" prominent />
            <MetricCard title="Ticket promedio" value={metrics.average} prefix="$" decimals={2} icon={FiCreditCard} tone="emerald" prominent />
        </section>

        <section aria-label="Métricas complementarias" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard title="Productos vendidos" value={metrics.products} icon={FiBox} tone="cyan" />
            <MetricCard title="Clientes nuevos" value={metrics.customers} change="5,2 %" icon={FiUsers} tone="indigo" />
            <MetricCard title="Tasa de conversión" value={metrics.conversion} suffix=" %" decimals={1} icon={FiTrendingUp} tone="emerald" />
            <MetricCard title="Pedidos completados" value={metrics.completed} icon={FiCheckCircle} tone="cyan" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
            <Panel title="Evolución de ventas" subtitle="Tendencia del período seleccionado"><SalesChart period={period} revenue={metrics.revenue} /></Panel>
            <Panel title="Pedidos por estado" subtitle="Distribución de pedidos · datos demo"><StatusDonut /></Panel>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
            <Panel title="Ventas por categoría" subtitle="Ingresos por línea comercial · demostración">
                <div className="space-y-4">
                    {categorySales.map((category, index) => <div key={category.label} className="grid grid-cols-[minmax(76px,0.8fr)_minmax(70px,1.7fr)_auto] items-center gap-3 text-xs sm:grid-cols-[minmax(100px,0.8fr)_minmax(100px,1.6fr)_auto] sm:gap-4">
                        <span className="truncate font-medium text-slate-600">{category.label}</span>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`sales-bar-draw h-full rounded-full ${category.color}`} style={{ width: `${category.share}%`, animationDelay: `${index * 90}ms` }} /></div>
                        <span className="text-right font-semibold text-slate-800">{currency(category.amount)}</span>
                    </div>)}
                </div>
            </Panel>
            <Panel title="Métodos de pago" subtitle="Participación por método · demostración"><PaymentMix /></Panel>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
            <Panel title="Productos más vendidos" subtitle="Unidades e ingresos · datos de demostración">
                <div className="divide-y divide-slate-100">
                    {topProducts.map(product => <div key={product.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4">
                        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xs font-bold ${product.color}`}>{product.initials}</div>
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{product.name}</p><p className="mt-0.5 text-xs text-slate-500">{product.category} · {number.format(product.units)} unidades</p></div>
                        <div className="text-right"><p className="text-sm font-semibold text-slate-800">{currency(product.revenue)}</p><span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700"><FiArrowUpRight />{product.trend}</span></div>
                    </div>)}
                </div>
            </Panel>
            <Panel title="Actividad reciente" subtitle="Pedidos de ejemplo · datos ficticios">
                <div className="space-y-2">
                    {recentDemoOrders.map(order => <div key={order.id} className="flex items-center gap-3 rounded-2xl px-2.5 py-3 transition hover:bg-slate-50 sm:px-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">{order.customer.split(' ').map(name => name[0]).slice(0, 2).join('')}</div>
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{order.customer}</p><p className="mt-0.5 text-xs text-slate-500">{order.id} · {order.time}</p></div>
                        <div className="text-right"><p className="text-sm font-semibold text-slate-800">{currency(order.amount)}</p><span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${order.style}`}>{order.status}</span></div>
                    </div>)}
                </div>
            </Panel>
        </section>

        <section aria-label="Resumen operativo" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {operations.map((item, index) => <article key={item.label} className="sales-card-enter rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_32px_-28px_rgba(15,23,42,0.25)] sm:p-5" style={{ animationDelay: `${index * 70}ms` }}>
                <div className={`mb-3 grid h-9 w-9 place-items-center rounded-xl ${item.color}`}><item.icon size={17} /></div>
                <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{typeof item.value === 'number' ? number.format(item.value) : item.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{item.label}</p>
            </article>)}
        </section>

        <p className="text-center text-[11px] text-slate-400">Las métricas, gráficos, productos destacados y actividad de muestra de este panel son ficticios y se presentan únicamente con fines demostrativos.</p>

        <section className="space-y-4" aria-labelledby="sales-orders-title">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">Operación</p>
                <h2 id="sales-orders-title" className="mt-1 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">Gestión de pedidos</h2>
                <p className="mt-1 text-sm text-slate-500">Consulta y administra los pedidos de GoVene</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-[0_12px_38px_-30px_rgba(15,23,42,0.25)] sm:p-4">
                {isOrdersLoading ? (
                    <div className="flex min-h-32 items-center justify-center text-sm text-slate-500" role="status">Cargando pedidos…</div>
                ) : (
                    <TableOrdersAdmin orders={orders ?? []} />
                )}
            </div>
        </section>
    </div>;
};
