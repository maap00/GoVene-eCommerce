import { FaBoxOpen, FaCartShopping, FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6"


export const navbarLinks = [{
    id: 1,
    title: 'Inicio',
    href: '/home'
}, {
    id: 2,
    title: 'Productos',
    href: '/products'
}, {
    id: 3,
    title: 'Catálogo',
    href: '/socios'
}, {
    id: 4,
    title: 'Nosotros',
    href: '/about'
}]

export const socialMedia = [{
    id: 2,
    title: 'Twitter',
    href: '/',
    icon: <FaXTwitter />
}, {
    id: 3,
    title: 'Instagram',
    href: '/',
    icon: <FaInstagram />
}, {
    id: 4,
    title: 'TikTok',
    href: '/',
    icon: <FaTiktok />
}, {
    id: 5,
    title: 'Facebook',
    href: '/',
    icon: <FaFacebook />
}]


export const dashboardLinks = [
    {
        id: 1,
        title: 'Productos',
        href: '/dashboard/products',
        icon: <FaBoxOpen size={25} />
    },
    {
        id: 2,
        title: 'Pedidos',
        href: '/dashboard/orders',
        icon: <FaCartShopping size={25} />
    }
]


