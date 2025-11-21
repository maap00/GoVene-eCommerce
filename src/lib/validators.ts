import type { JSONContent } from "@tiptap/react";
import z from "zod";

// validators schemas
export const userRegisterSchema = z.object({
email: z.string().email('Invalid email'),
password: z
.string()
.min(6, 'Password would include min 6 characters'),
fullName: z.string().min(1, 'Name is requested'),
phone: z.string().optional()
});

export const addressSchema = z.object({
    addressLine1 : z.string().min(1,'Value required').max(100, 'Dont more 100 characters'),
    addressLine2 : z.string().max(100, 'Dont more 100 characters').optional(),
    city : z.string().min(1,'Value required').max(50, 'Dont more 50 characters'),
    state : z.string().min(1,'Value required').max(50, 'Dont more 50 characters'),
    postalCode : z.string().max(10, 'Dont more 10 characters').optional(),
    country : z.string().min(1, 'Value required'),    
})

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;

const isContentEmpty = (value: JSONContent): boolean => {
	if (
		!value ||
		!Array.isArray(value.content) ||
		value.content.length == 0
	) {
		return true;
	}

	return !value.content.some(
		node =>
			node.type === 'paragraph' &&
			node.content &&
			Array.isArray(node.content) &&
			node.content.some(
				textNode =>
					textNode.type === 'text' &&
					textNode.text &&
					textNode.text.trim() !== ''
			)
	);
};

export const productSchema = z.object({
	name: z.string().min(1, 'El nombre del producto es obligatorio'),
	brand: z.string().min(1, 'La marca del producto es obligatoria'),
	slug: z
		.string()
		.min(1, 'El slug del producto es obligatorio')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido'),
	features: z.array(
		z.object({
			value: z
				.string()
				.min(1, 'La característica no puede estar vacía'),
		})
	),
	description: z.custom<JSONContent>(
		value => !isContentEmpty(value),
		{ message: 'La descripción no puede estar vacía' }
	),
	variants: z
		.array(
			z.object({
				id: z.string().optional(),
				stock: z.number(),
				price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
				storage: z.string().min(1, 'El almacenamiento es requerido'),
				color: z
					.string()
					.regex(
						/^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,
						'El color debe ser un valor válido en formato hexadecimal, RGB o HSL'
					),
				colorName: z
					.string()
					.min(1, 'El nombre del color es obligatorio'),
			})
		)
		.min(1, 'Debe haber al menos una variante'),
	images: z.array(z.any()).min(1, 'Debe haber al menos una imagen'),
});

export type ProductFormValues = z.infer<typeof productSchema>;