import type { Color, Product, VariantsProducts } from "../interface";

//funcion para transformar precio a USD
export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
};
// Funcion para preparar los datos de productos
export const prepareProductData = (products: Product[]) => {
    // agrupar varianes por color
    return products.map(product => {
        const colors = product.variants.reduce((acc: Color[], variant: VariantsProducts) => {
            const existingColor = acc.find(item => item.color === variant.color);

            if (existingColor) {
                existingColor.price = Math.min(existingColor.price, variant.price);
            } else {
                acc.push({
                    color: variant.color,
                    price: variant.price,
                    name: variant.color_name
                });
            }
            return acc;
        }, []);

        // obetener precio de las variantes agrupadas

        const price = Math.min(...colors.map(item => item.price));


        return {
            ...product,
            price,
            colors
        };
    });
};

export const formatDateLong = (date: string): string => {
    const dateObject = new Date(date);

    return dateObject.toLocaleTimeString('es-Es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

}

export const getStatus = (status: string): string => {
    switch (status) {
        case 'pending':
            return 'Pendiente';
        case 'paid':
            return 'Pagado';
        case 'shipped':
            return 'Enviado';
        case 'delivered':
            return 'Entregado';
        default:
            return status;
    }
};

// Función para formatear la fecha a formato dd/mm/yyyy
export const formatDate = (date: string): string => {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
    });
};

// Función para generar el slug de un producto
export const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Funcion para extraer el path relativo al bucket de una URL publica
export const extractFilePath = (url: string): string => {
    const paths = url.split('/storage/v1/object/public/product-images/');

    if (paths.length !== 2) {
        throw new Error(`Invalid URL:${url}`);
    }
    return paths[1];
};