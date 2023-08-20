import z from "zod";
import { Image_Schema } from "./image";
import { SEO_Schema } from "./seo";

export const Category_Schema = z.object({
    seo: SEO_Schema,
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    image: Image_Schema,
});
