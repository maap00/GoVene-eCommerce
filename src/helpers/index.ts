import type { Color, Product, VariantsProducts } from "../interface";
 
//funcion para transformar precio a USD
 export const formatPrice = (price: number) => {
 return new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumSignificantDigits: 2
 }).format(price);
};
// Funcion para preparar los datos de productos
export const prepareProductData = (products: Product[]) => {
    // agrupar varianes por color
    return products.map(product => {
        const colors = product.variants.reduce((acc: Color[], variant: VariantsProducts) =>{
            const existingColor = acc.find(item => item.color === variant.color);

            if(existingColor){
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

export const formatDateLong = (date : string): string => {
    const dateObject = new Date(date);

    return dateObject.toLocaleTimeString('es-Es' ,{
        year: 'numeric',
        month:'long',
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