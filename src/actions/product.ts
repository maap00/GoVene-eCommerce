import { supabase } from "../supabase/client";
import type { ProductInput } from "../interface/product.interface";
import { extractFilePath } from "../helpers";

export const getProducts = async (page: number) => {
    const itemsPerPage = 10;
    const from = itemsPerPage * (page - 1);
    const to = from + itemsPerPage - 1;

    const { data: products, error, count } = await supabase
        .from('products')
        .select('*,variants(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return { products, count };
}

export const getFilteredProducts = async ({
    page = 1,
    brands = []
}: {
    page: number;
    brands: string[];
}) => {
    const itemsPerPage = 10;
    const from = itemsPerPage * (page - 1);
    const to = from + itemsPerPage - 1;

    let query = supabase
        .from('products')
        .select('*,variants(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (brands.length > 0) {
        query = query.in('brand', brands);
    }

    const { data: products, error, count } = await query;

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return { products, count };
}

export const getRecentProducts = async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select(`
        *,
        variants(*)
    `)
        .order('created_at', { ascending: false })
        .limit(4);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
}

export const getRandomProducts = async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select(`
        *,
        variants(*)
    `)
        .limit(20);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    // select 4 random products radomly from the 20 products
    const radomProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return radomProducts;
}

export const getProductBySlug = async (slug: string) => {
    const { data: products, error } = await supabase
        .from('products')
        .select(`
        *,
        variants(*)
    `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
}

export const searchProducts = async (searchTerm: string) => {
    const { data: products, error } = await supabase
        .from('products')
        .select(`
        *,
        variants(*)
    `)
        .ilike('name', `%${searchTerm}%`); //to look for similar names

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
}

// ADMINISTRADOR
export const createProduct = async (productInput: ProductInput) => {
    try {
        // insert the product to get ID
        const { data: product, error: productError } = await supabase.
            from('products')
            .insert({
                name: productInput.name,
                brand: productInput.brand,
                slug: productInput.slug,
                features: productInput.features,
                description: productInput.description,
                images: [],
            })
            .select()
            .single();

        if (productError) {
            console.log(productError.message);
            throw new Error(productError.message);
        }
        // Subir images al bucket dentro de la carpeta que se creara a partir del producto
        const folderName = product.id;

        const uploadedImages = await Promise.all(
            productInput.images.map(async (image) => {
                const { data, error } = await supabase.storage
                    .from('product-images')
                    .upload(`${folderName}/${product.id}-${image.name}`, image);

                if (error) {
                    console.log(error.message);
                    throw new Error(error.message);
                }
                const imageUrl = `${supabase.storage
                    .from('product-images')
                    .getPublicUrl(data.path).data.publicUrl
                    }`;
                return imageUrl;
            })
        );

        //Actualizar el producto con las imagenes subidas
        const { error: updateError } = await supabase
            .from('products')
            .update({
                images: uploadedImages
            })
            .eq('id', product.id);

        if (updateError) {
            console.log(updateError.message);
            throw new Error(updateError.message);
        }

        //Crear variantes del productop
        const variants = productInput.variants.map(variant => ({
            product_id: product.id,
            stock: variant.stock,
            price: variant.price,
            storage: variant.storage,
            color: variant.color,
            color_name: variant.colorName,
        }));

        const { error: variantError } = await supabase
            .from('variants')
            .insert(variants);

        if (variantError) {
            console.log(variantError.message);
            throw new Error(variantError.message);
        }

        return product;

    } catch (error) {
        console.log(error);
        throw new Error('Error inesperado, vuelva a intentarlo');
    }

}

export const deleteProducto = async (productId: string) => {

    //1. Delete the variant product by id

    const { error: variantError } = await supabase
        .from('variants')
        .delete()
        .eq('product_id', productId);

    if (variantError) {
        console.log(variantError.message);
        throw new Error(variantError.message);
    }

    //2. get images product
    const { data: productImages, error: imagesError } =
        await supabase
            .from('products')
            .select('images')
            .eq('id', productId)
            .single();

    if (imagesError) {
        console.log(imagesError.message);
        throw new Error(imagesError.message);
    }
    //3. Delete product
    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

    if (deleteError) {
        console.log(deleteError.message);
        throw new Error(deleteError.message);
    }

    // 4. Delete images from storage

    if (productImages.images.length > 0) {
        const folderName = productId;

        const paths = productImages.images.map(image => {
            const fileName = image.split('/').pop();
            return `${folderName}/${fileName}`;
        });
        const { error: storageError } = await supabase.storage
            .from('product-images')
            .remove(paths);

        if (storageError) {
            console.log(storageError.message);
            throw new Error(storageError.message);
        }

        return true;
    }
};

export const updateProduct = async (
    productId: string,
    productInput: ProductInput
) => {

    //1. obtener las imagenes actuales
    const { data: currentProduct, error: currentProductError } =
        await supabase
            .from('products')
            .select('images')
            .eq('id', productId)
            .single();

    if (currentProductError) {
        console.log(currentProductError.message);
        throw new Error(currentProductError.message);
    }

    const existingImages = currentProduct.images || [];

    //2. actualizaar la informacion actual del producto

    const { data: updatedProduct, error: updateProductError } = await supabase
        .from('products')
        .update({
            name: productInput.name,
            brand: productInput.brand,
            slug: productInput.slug,
            features: productInput.features,
            description: productInput.description,
        })
        .eq('id', productId)
        .select()
        .single();

    if (updateProductError) {
        console.log(updateProductError.message);
        throw new Error(updateProductError.message);
    }

    // 3. Manejo de imágenes (SUBIR NUEVAS y ELIMINAR ANTIGUAS SI ES NECESARIO)
    const folderName = productId;

    const validImages = productInput.images.filter(image => image);

    // 3.1 Identificar las imágenes que han sido eliminadas
    const imagesToDelete = existingImages.filter(
        image => !validImages.includes(image)
    );

    // 3.2 Obtener los paths de los archivos a eliminar
    const filesToDelete = imagesToDelete.map(extractFilePath);

    //3.3 Eliminar las imagenes de bucket
    if (filesToDelete.length > 0) {
        const { error: deleteImagesError } = await supabase.storage
            .from('product-images')
            .remove(filesToDelete);

        if (deleteImagesError) {
            console.log(deleteImagesError.message);
            throw new Error(deleteImagesError.message);
        }
        else {
            console.log(`Imagenes eliminadas: ${filesToDelete.join(', ')}`);
        }
    }

    const uploadedImages = await Promise.all(
        validImages.map(async image => {
            if (image instanceof File) {
                //si la imagen no es un URL (es un archivo), entonces subela al bucket
                const { data, error } = await supabase.storage
                    .from('product-images')
                    .upload(`${folderName}/${productId}-${image.name}`, image);

                if (error) throw new Error(error.message);

                const imageUrl = supabase.storage
                    .from('product-images')
                    .getPublicUrl(data.path).data.publicUrl;

                return imageUrl;
            }
            else if (typeof image === 'string') {
                return image;
            }
            else {
                throw new Error('Tipo de imagen no compatible')
            }
        })
    );

    //4. Actualizar el producto con las imagenes actualizadas

    const { error: updateImageError } = await supabase
        .from('products')
        .update({ images: uploadedImages })
        .eq('id', productId);

    if (updateImageError) {
        throw new Error(updateImageError.message);
    }

    //5. Actualizar las variantes del producto

    const existingVariants = productInput.variants.filter(v => v.id);

    const newVariants = productInput.variants.filter(v => !v.id);

    //5.1 Actualizar variantes existentes
    if (existingVariants.length > 0) {

        const { error: updateVariantsError } = await supabase
            .from('variants')
            .upsert(
                existingVariants.map(variant => ({
                    id: variant.id,
                    product_id: productId,
                    stock: variant.stock,
                    price: variant.price,
                    storage: variant.storage,
                    color: variant.color,
                    color_name: variant.colorName,

                }))
            );

        if (updateVariantsError) {
            throw new Error(updateVariantsError.message);
        }
    };

    //5.2 Crear y guardar las nuevas variantes

    let newVariantsId: string[] = [];

    if (newVariants.length > 0) {

        const { data, error: insertVarianError } = await supabase
            .from('variants')
            .insert(
                newVariants.map(variant => ({
                    product_id: productId,
                    stock: variant.stock,
                    price: variant.price,
                    storage: variant.storage,
                    color: variant.color,
                    color_name: variant.colorName,
                }))
            )
            .select();

        if (insertVarianError) {
            throw new Error(insertVarianError.message);
        }

        newVariantsId = data.map(variant => variant.id);
    };

    //5.3 Combinar los IDs de las variante existentes y las nuevas

    const currentVariantIds = [
        ...existingVariants.map(v => v.id),
        ...newVariantsId,
    ]

    //5.4 Eliminar las variantes que no estan en la lista de IDs

    const { error: deleteVariantError } = await supabase
        .from('variants')
        .delete()
        .eq('product_id', productId)
        .not(
            'id',
            'in',
            `(${currentVariantIds ? currentVariantIds.join(',') : 0})`
        );

    if (deleteVariantError) {
        throw new Error(deleteVariantError.message);
    }

    return updatedProduct;

};










