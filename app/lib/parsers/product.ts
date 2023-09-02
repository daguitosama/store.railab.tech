import { z } from "zod";
import { seo_parser } from "./seo";
import { renderRichText } from "@storyblok/js";

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
        return {
            id: raw.id,
            name: raw.name,
            slug: raw.slug,
            content: {
                seo: raw.content.seo,
                image: raw.content.image,
                price: raw.content.price,
                description: renderRichText(raw.content.description),
            },
        };
    });
