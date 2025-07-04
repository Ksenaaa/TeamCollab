import { z } from "zod";

export const CreateProjectSchema = z.object({
    name: z
        .string()
        .nonempty({ message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters" }),
    description: z
        .string()
        .nonempty({ message: "Description is required" })
        .min(3, { message: "Description must be at least 3 characters" }),
});

export type ProjectFormData = z.infer<typeof CreateProjectSchema>;
