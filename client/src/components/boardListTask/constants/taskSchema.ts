import { z } from "zod";

export const TaskSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    dateEnd: z.string().min(1, { message: "Date End is required" }),
    assigned: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
    }).nullable().superRefine((arg, ctx) => {
        if (!arg) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'A User must be selected'
            });
        }
    })
});

export type TaskFormData = z.infer<typeof TaskSchema>;
