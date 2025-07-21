import { z } from "zod";

export const UserSignUpSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email('It is not an email adress'),
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Password check is required" }),
})
    .superRefine((val, ctx) => {
        if (val.password && val.confirmPassword && val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['confirmPassword'],
                message: "Passwords do not match"
            });
        }
    });

export type UserSignUpFormData = z.infer<typeof UserSignUpSchema>;
