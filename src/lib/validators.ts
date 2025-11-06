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