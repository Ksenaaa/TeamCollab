import { z } from "zod";

export const ProjectSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters" }),
    description: z
        .string()
        .min(1, { message: "Description is required" })
        .min(3, { message: "Description must be at least 3 characters" }),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;
