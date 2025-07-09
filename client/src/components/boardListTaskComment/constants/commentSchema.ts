import { z } from "zod";

export const CommentSchema = z.object({
    text: z
        .string()
        .min(1, { message: "Text is required" })
        .min(2, { message: "Text must be at least 2 characters" }),
});

export type CommentFormData = z.infer<typeof CommentSchema>;
