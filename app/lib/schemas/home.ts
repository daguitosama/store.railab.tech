import z from "zod";
import { SEO_Schema } from "./seo";
import { Category_Schema } from "./category";

const Home_Schema = z.object({
    seo: SEO_Schema,
    intro: z.object({
        heading: z.string(),
        sub_heading: z.string(),
    }),
    categories_section: z.object({
        title: z.string(),
        categories: z.array(Category_Schema),
    }),
});
