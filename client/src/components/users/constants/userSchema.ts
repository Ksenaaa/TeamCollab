import { Role } from "@/generated/prisma";
import { z } from "zod";

export const UserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: 'Email is required' }).email('It is not an email adress'),
    password: z.string().min(1, { message: "Password is required" }),
    role: z.object({
        id: z.enum([Role.ADMIN, Role.EDITOR_LIST, Role.VIEWER]),
        name: z.string()
    })
        .superRefine((value, ctx) => {
            if (!value) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Role is required",
                });
            }
        }),
});

export type UserFormData = z.infer<typeof UserSchema>;

export const UserUpdateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: 'Email is required' }).email('It is not an email adress'),
    role: z.object({
        id: z.enum([Role.ADMIN, Role.EDITOR_LIST, Role.VIEWER]),
        name: z.string()
    })
        .superRefine((value, ctx) => {
            if (!value) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Role is required",
                });
            }
        }),
});

export type UserUpdateFormData = z.infer<typeof UserUpdateSchema>;
