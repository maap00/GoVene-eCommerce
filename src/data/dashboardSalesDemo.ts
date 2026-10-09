export type SalesPeriod = 'today' | 'week' | 'month' | 'year';

export const salesPeriods: { id: SalesPeriod; label: string }[] = [
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: '7 días' },
    { id: 'month', label: '30 días' },
    { id: 'year', label: 'Este año' },
];

export const salesMetrics: Record<SalesPeriod, {
    revenue: number;
    orders: number;
    average: number;
    products: number;
    customers: number;
    conversion: number;
    pending: number;
    completed: number;
}> = {
    today: { revenue: 1640, orders: 82, average: 48.6, products: 121, customers: 27, conversion: 4.8, pending: 7, completed: 68 },
    week: { revenue: 7920, orders: 384, average: 48.6, products: 1124, customers: 118, conversion: 4.8, pending: 16, completed: 337 },
    month: { revenue: 24850, orders: 1284, average: 48.6, products: 3672, customers: 386, conversion: 4.8, pending: 27, completed: 1142 },
    year: { revenue: 248500, orders: 12840, average: 48.6, products: 36720, customers: 3860, conversion: 4.8, pending: 27, completed: 11420 },
};

export const salesTrend: Record<SalesPeriod, { label: string; value: number }[]> = {
    today: [
        { label: '8 a. m.', value: 12 }, { label: '10 a. m.', value: 24 }, { label: '12 p. m.', value: 18 },
        { label: '2 p. m.', value: 35 }, { label: '4 p. m.', value: 30 }, { label: '6 p. m.', value: 52 }, { label: '8 p. m.', value: 64 },
    ],
    week: [
        { label: 'Lun', value: 32 }, { label: 'Mar', value: 44 }, { label: 'Mié', value: 37 }, { label: 'Jue', value: 56 },
        { label: 'Vie', value: 49 }, { label: 'Sáb', value: 72 }, { label: 'Dom', value: 64 },
    ],
    month: [
        { label: '1 jun', value: 26 }, { label: '5 jun', value: 35 }, { label: '10 jun', value: 31 }, { label: '15 jun', value: 52 },
        { label: '20 jun', value: 46 }, { label: '25 jun', value: 70 }, { label: '30 jun', value: 64 },
    ],
    year: [
        { label: 'Ene', value: 30 }, { label: 'Feb', value: 40 }, { label: 'Mar', value: 35 }, { label: 'Abr', value: 48 },
        { label: 'May', value: 55 }, { label: 'Jun', value: 70 }, { label: 'Jul', value: 64 },
    ],
};

export const orderStatuses = [
    { label: 'Completados', count: 1142, color: '#0e7490' },
    { label: 'Pendientes', count: 27, color: '#f59e0b' },
    { label: 'En proceso', count: 79, color: '#818cf8' },
    { label: 'Cancelados', count: 36, color: '#e2e8f0' },
];

export const categorySales = [
    { label: 'Tecnología', amount: 8290, share: 92, color: 'bg-cyan-700' },
    { label: 'Moda', amount: 5640, share: 72, color: 'bg-indigo-400' },
    { label: 'Hogar', amount: 4210, share: 57, color: 'bg-emerald-500' },
    { label: 'Salud', amount: 2980, share: 43, color: 'bg-amber-400' },
    { label: 'Automotriz', amount: 2210, share: 32, color: 'bg-slate-500' },
    { label: 'Construcción', amount: 1520, share: 23, color: 'bg-rose-400' },
];

export const paymentMethods = [
    { label: 'Pago Móvil', percent: 34, color: '#0e7490' },
    { label: 'Zelle', percent: 24, color: '#6366f1' },
    { label: 'Binance Pay', percent: 16, color: '#f0b90b' },
    { label: 'Cashea', percent: 12, color: '#10b981' },
    { label: 'Ubii', percent: 8, color: '#f97316' },
    { label: 'Tarjetas', percent: 6, color: '#cbd5e1' },
];

export const topProducts = [
    { name: 'Laptop Pro 14', category: 'Tecnología', units: 284, revenue: 12480, initials: 'LP', color: 'bg-cyan-50 text-cyan-800', trend: '+18%' },
    { name: 'Reloj clásico', category: 'Moda', units: 219, revenue: 8290, initials: 'RC', color: 'bg-violet-50 text-violet-700', trend: '+12%' },
    { name: 'Lámpara Aura', category: 'Hogar', units: 176, revenue: 5640, initials: 'LA', color: 'bg-amber-50 text-amber-700', trend: '+9%' },
    { name: 'Tensiómetro digital', category: 'Salud', units: 143, revenue: 3820, initials: 'TD', color: 'bg-emerald-50 text-emerald-700', trend: '+6%' },
];

export const recentDemoOrders = [
    { id: '#GV-2841', customer: 'Valentina Rojas', time: 'Hace 8 min', amount: 289, status: 'Completado', style: 'bg-emerald-50 text-emerald-700' },
    { id: '#GV-2840', customer: 'Andrés Mendoza', time: 'Hace 24 min', amount: 126, status: 'En proceso', style: 'bg-indigo-50 text-indigo-700' },
    { id: '#GV-2839', customer: 'Camila Pérez', time: 'Hace 51 min', amount: 74, status: 'Pendiente', style: 'bg-amber-50 text-amber-700' },
    { id: '#GV-2838', customer: 'Diego Herrera', time: 'Hace 1 h', amount: 512, status: 'Completado', style: 'bg-emerald-50 text-emerald-700' },
];
