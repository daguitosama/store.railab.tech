import { z } from "zod";
import { SEO } from "../blocks/seo";

export const seo_parser = z
    .array(
        z.object({
            tile: z.string(),
            description: z.string(),
            og_image: z.string(),
        })
    )
    .transform((raw): SEO => {
        return {
            title: raw[0].tile,
            description: raw[0].description,
            og_image: `https:${raw[0].og_image}`,
        };
    });
