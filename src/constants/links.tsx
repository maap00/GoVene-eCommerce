import { FaBoxOpen, FaCartShopping, FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6"


export const navbarLinks = [{
    id:1,
    title: 'Home',
    href: '/'
},{
    id:2,
    title: 'Products',
    href: '/products'
},{
    id:3,
    title: 'Socios',
    href: '/socios'          
},{
    id:4,
    title: 'About',
    href: '/about'          
}]

export const socialMedia = [{
    id:2,
    title: 'Twitter',
    href: '/',
    icon: <FaXTwitter/>
},{
    id:3,
    title: 'Products',
    href: '/',
    icon: <FaInstagram/>
},{
    id:4,
    title: 'Tiktok',
    href: '/',
    icon: <FaTiktok/>       
},{
    id:5,
    title: 'Facebook',
    href: '/',
    icon: <FaFacebook/>       
}]


export const dashboardLinks = [
    {
        id: 1,
        title: 'Productos',
        href: '/dashboard/products',
        icon: <FaBoxOpen size={25}/>
    },
    {
        id: 2,
        title: 'Ordenes',
        href: '/dashboard/orders',
        icon: <FaCartShopping size={25}/>
    }
]


