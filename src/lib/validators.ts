import type { JSONContent } from "@tiptap/react";
import z from "zod";

// validators schemas
export const userRegisterSchema = z.object({
	email: z.string().email('Ingresa un correo electrónico válido'),
	password: z
		.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
	fullName: z.string().min(1, 'El nombre es obligatorio'),
	phone: z.string().optional()
});

export const addressSchema = z.object({
	addressLine1: z.string().min(1, 'Este campo es obligatorio').max(100, 'No puede superar los 100 caracteres'),
	addressLine2: z.string().max(100, 'No puede superar los 100 caracteres').optional(),
	city: z.string().min(1, 'Este campo es obligatorio').max(50, 'No puede superar los 50 caracteres'),
	state: z.string().min(1, 'Este campo es obligatorio').max(50, 'No puede superar los 50 caracteres'),
	postalCode: z.string().max(10, 'No puede superar los 10 caracteres').optional(),
	country: z.string().min(1, 'Este campo es obligatorio'),
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
		(value) => !isContentEmpty(value as JSONContent),
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
					.string().optional(),
				// .regex(
				// 	/^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,
				// 	'El color debe ser un valor válido en formato hexadecimal, RGB o HSL'
				// )

				colorName: z
					.string().optional()
				// .min(1, 'El nombre del color es obligatorio'),
			})
		)
		.min(1, 'Debe haber al menos una variante'),
	images: z.array(z.any()).min(1, 'Debe haber al menos una imagen'),
});

export type ProductFormValues = z.infer<typeof productSchema>;
