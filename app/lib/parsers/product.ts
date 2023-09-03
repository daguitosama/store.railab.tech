import { z } from "zod";
import { seo_parser } from "./seo";
import { RichtextResolver } from "storyblok-js-client";
const rich_text_renderer = new RichtextResolver();
export const product_parser = z
    .object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        content: z.object({
            seo: seo_parser,
            image: z.string(),
            price: z.string(),
            description: z.any(), // rich text field, leave to renderer
        }),
    })
    .transform((raw) => {
        console.log("Product parser transform, rendering description as: ");

        return {
            id: raw.id,
            name: raw.name,
            slug: raw.slug,
            content: {
                seo: raw.content.seo,
                image: raw.content.image,
                price: raw.content.price,
                description: rich_text_renderer.render(raw.content.description),
            },
        };
    });

export type Product = z.infer<typeof product_parser>;

export const product_page_query_parser = z
    .object({
        data: z.object({
            ProductItem: product_parser,
        }),
    })
    .transform((raw): Product => {
        return raw.data.ProductItem;
    });
