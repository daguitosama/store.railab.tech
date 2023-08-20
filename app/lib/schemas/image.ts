import z from "zod";

export const Image_Schema = z.object({
    url: z.string(),
    alt_text: z.string(),
});

export type Image = z.infer<typeof Image_Schema>;
