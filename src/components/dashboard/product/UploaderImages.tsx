import type { FieldErrors, UseFormSetValue } from "react-hook-form"
import type { ProductFormValues } from "../../../lib/validators"
import { IoIosCloseCircleOutline } from "react-icons/io";
import React, { useState } from "react";


interface ImagePreview {
    file?: File;
    previewUrl: string;

}

interface Props {
    setValue: UseFormSetValue<ProductFormValues>;
    errors: FieldErrors<ProductFormValues>;
}


export const UploaderImages = ({ setValue, errors }: Props) => {

    const [images, setImages] = useState<ImagePreview[]>([])

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map(file => ({
                file,
                previewUrl: URL.createObjectURL(file),
            }));

            const updatedImages = [...images, ...newImages];
            setImages(updatedImages);

            setValue(
                'images',
                updatedImages.map(img => img.file || img.previewUrl)
            );
        }
    }

    const handleRemoveImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);

        setValue(
            'images',
            updatedImages.map(img => img.file || img.previewUrl)
        );
    };
    return (
        <>
            <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                accept="image/*"
            />
            <div className="grid grid-col-4 lg:grid-col-2 gap-4">
                {
                    images.map((image, index) => (
                        <div key={index}>
                            <div className="border border-gray-200 w-full h-20 rounded-md p-1 relative lg:h-28">
                                <img
                                    src={image.previewUrl}
                                    alt={`Preview ${index}`}
                                    className="rounded-md w-full h-full object-contain"
                                />
                                <button
                                    type="button"
                                    className="flex justify-end absolute -top-3 -right-4 hover:scale-100 transition-all z-10"
                                    onClick={() => handleRemoveImage(index)}>
                                    <IoIosCloseCircleOutline
                                        size={22}
                                        className="text-red-500" />

                                </button>
                            </div>
                        </div>

                    ))
                }
            </div>

            {errors.images && (
                <p className="text-red-500 text-xs mt-1">
                    {errors.images.message}
                </p>
            )}


        </>
    )
}
