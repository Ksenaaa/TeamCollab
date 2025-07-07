import { z } from "zod";

export const ListSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters" }),
});

export type ListFormData = z.infer<typeof ListSchema>;
