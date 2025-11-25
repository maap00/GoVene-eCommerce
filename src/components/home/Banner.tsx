
import { Link } from 'react-router-dom'

export const Banner = () => {
    return (
        <div className="relative bg-gray-900 text-white">

            <div className="absolute inset-0 bg-cover bg-top opacity-70 h-full" style={{ backgroundImage: 'url(/img/about_bgs.jpg)' }}></div>

            <div className="absolute insert-0 bg-black opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8">
                <h3 className='text-4xl font-bold mb-4 lg:text-4xl'>
                    Los mejores precios en productos de tecnología
                </h3>
                <p className="text-lg mb-8 lg:text-2xl">
                    Descubre nuestra amplia gama de productos electrónicos y aprovecha las ofertas exclusivas.
                </p>
                <Link
                    to='/products'
                    className="bg-gray-900 hover:bg-gray-950 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
                    Ver productos
                </Link>
            </div>
        </div>

    )
}
