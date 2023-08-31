import z from "zod";

export { SEO_Schema } from "./blocks/seo";
export type { SEO } from "./blocks/seo";

const CategorySchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    image: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

const ProductSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    price: z.string(),
    short_description: z.string(),
    full_description: z.string(),
    image: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

const GlobalSettingsSchema = z.object({
    telegram_link: z.string(),
    whatsapp_link: z.string(),
});

export type GlobalSettings = z.infer<typeof GlobalSettingsSchema>;
