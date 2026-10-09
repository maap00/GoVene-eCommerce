import { zodResolver } from "@hookform/resolvers/zod"
import { type JSONContent } from "@tiptap/react"
import { useForm } from "react-hook-form"
import { productSchema, type ProductFormValues } from "../../../lib/validators"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate, useParams } from "react-router-dom"
import { SectionFormProduct } from "./SectionFormProduct"
import { Inputform } from "./Inputform"
import { FeatureInput } from "./FeatureInput"
import { useEffect } from "react"
import { generateSlug } from '../../../helpers/index'
import { VariantsInput } from "./VariantsInput"
import { UploaderImages } from "./UploaderImages"
import { Editor } from "./Editor"
import { useCreateProduct, useProduct, useUpdateProduct } from "../../../hooks"
import { Loader } from "../../shared/Loader"



interface Props {
    titleForm: string
}
export const FormProduct = ({ titleForm }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema)
    })

    const { slug } = useParams<{ slug: string }>();

    const { product, isLoading } = useProduct(slug || '');

    const { mutate: createProduct, isPending } = useCreateProduct()

    const { mutate: updateProduct, isPending: isUpdatePending } = useUpdateProduct(product?.id || '')

    const navigate = useNavigate();

    useEffect(() => {
        if (product && !isLoading) {
            setValue('name', product.name)
            setValue('slug', product.slug)
            setValue('brand', product.brand)
            setValue('features', product.features.map((f: string) => ({ value: f })))
            setValue('description', product.description as unknown as JSONContent)
            setValue('images', product.images)
            setValue('variants', product.variants.map(v => ({
                id: v.id,
                stock: v.stock,
                price: v.price,
                storage: v.storage,
                color: v.color,
                colorName: v.color_name,
            })))
        };
    }, [product, isLoading, setValue]);

    const watchName = watch('name');

    useEffect(() => {
        if (!watchName) return

        const slug = generateSlug(watchName)
        setValue('slug', slug, { shouldValidate: true })

    }, [watchName, setValue])


    const onSubmit = handleSubmit(data => {
        const features = data.features.map(feature => feature.value);

        if (slug) {
            updateProduct({
                name: data.name,
                slug: data.slug,
                brand: data.brand,
                description: data.description,
                variants: data.variants,
                images: data.images,
                features,
            })
        } else {
            createProduct({
                name: data.name,
                slug: data.slug,
                brand: data.brand,
                description: data.description,
                variants: data.variants,
                images: data.images,
                features,
            });
        }
    });

    if (isPending || isUpdatePending || isLoading) return <Loader />
    return (
        <div className="flex flex-col gap-6 relative">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button
                        aria-label="Volver"
                        className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:slate-105"
                        onClick={() => navigate(-1)}
                    >
                        <IoIosArrowBack
                            size={18}
                            className="transition-all group-hover:scale-125" />
                    </button>
                    <h2 className="font-bold tracking-tight text-2xl capitalize">
                        {titleForm}
                    </h2>
                </div>
            </div>
            <form action=""
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1"
                onSubmit={onSubmit}>
                <SectionFormProduct
                    titleSection="Detalles del Producto"
                    className="lg:col-span-2 lg:row-span-2">
                    <Inputform
                        type='text'
                        placeholder='Ejemplo: iPhone 13 Pro Max'
                        label='Nombre'
                        name='name'
                        register={register}
                        errors={errors}
                        required
                    />
                    <FeatureInput control={control} errors={errors} />
                </SectionFormProduct>

                <SectionFormProduct>
                    <Inputform
                        type='text'
                        placeholder='Ejemplo: iPhone 13 Pro Max'
                        label='Identificador de URL'
                        name='slug'
                        register={register}
                        errors={errors}

                    />
                    <Inputform
                        type='text'
                        placeholder='Apple'
                        label='Marca'
                        name='brand'
                        register={register}
                        errors={errors}
                        required
                    />
                </SectionFormProduct>

                <SectionFormProduct
                    titleSection="Variantes del Producto"
                    className="lg:col-span-2 h-fit">
                    <VariantsInput
                        control={control}
                        errors={errors}
                        register={register}
                    />

                </SectionFormProduct>

                <SectionFormProduct
                    titleSection="Imágenes del producto"
                    className="">
                    <UploaderImages
                        setValue={setValue}
                        errors={errors} watch={watch} />
                </SectionFormProduct>

                <SectionFormProduct
                    titleSection="Descripción del Producto"
                    className="">
                    <Editor
                        setValue={setValue}
                        errors={errors}
                        initialContent={product?.description as unknown as JSONContent}
                    />
                </SectionFormProduct>

                <div className='flex gap-3 absolute top-0 right-0'>
                    <button
                        className='border border-slate-400 text-slate-600 py-2 px-3 text-sm font-medium rounded-md'
                        type='button'
                        onClick={() => navigate(-1)}
                    >
                        Cancelar
                    </button>
                    <button className='bg-black text-white py-2 px-3 text-sm font-medium rounded-md' type='submit'>
                        Guardar
                    </button>
                </div>

            </form>
        </div>
    )
}
