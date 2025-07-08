import { z } from "zod";

export const UserSignInSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email('It is not an email adress'),
    password: z.string().min(1, { message: "Password is required" }),
});

export type UserSignInFormData = z.infer<typeof UserSignInSchema>;
