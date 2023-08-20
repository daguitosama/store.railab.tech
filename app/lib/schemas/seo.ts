import z from "zod";

export const SEO_Schema = z.object({
    title: z.string(),
    description: z.string(),
    og_image: z.string(),
});

export type SEO = z.infer<typeof SEO_Schema>;
