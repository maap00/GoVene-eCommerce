import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { productSchema, type ProductFormValues } from "../../../lib/validators"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { SectionFormProduct } from "./SectionFormProduct"
import { Inputform } from "./Inputform"
import { FeatureInput } from "./FeatureInput"
import { useEffect } from "react"
import { generateSlug } from '../../../helpers/index'
import { VariantsInput } from "./VariantsInput"
import { UploaderImages } from "./UploaderImages"
import { Editor } from "./Editor"
import { useCreateProduct } from "../../../hooks"
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

    const { mutate: createProduct, isPending } = useCreateProduct()

    const navigate = useNavigate();

    const watchName = watch('name');

    useEffect(() => {
        if (!watchName) return

        const slug = generateSlug(watchName)
        setValue('slug', slug, { shouldValidate: true })



    }, [watchName, setValue])


    const onSubmit = handleSubmit(data => {
        const features = data.features.map(feature => feature.value);

        createProduct({
            name: data.name,
            slug: data.slug,
            brand: data.brand,
            description: data.description,
            variants: data.variants,
            images: data.images,
            features,
        })
    });

    if (isPending) return <Loader />
    return (
        <div className="flex flex-col gap-6 relative">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button
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
                        label='name'
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
                        label='slug'
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
                        errors={errors}
                    />
                </SectionFormProduct>

                <SectionFormProduct
                    titleSection="Descripción del Producto"
                    className="">
                    <Editor
                        setValue={setValue}
                        errors={errors}
                    />
                </SectionFormProduct>

                <div className="flex gap-3 absolute top-0 right-0">
                    <button
                        className="btn-secondary-outline"
                        type="button"
                        onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                    <button className="btn-primery" type="submit">
                        Guardar
                    </button>
                </div>

            </form>
        </div>
    )
}
