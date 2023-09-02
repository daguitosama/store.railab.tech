import z from "zod";
import { seo_parser } from "./seo";
import { product_parser } from "./product";
import { CategoryPage } from "../blocks/category.page";

export const category_page_parser = z
    .object({
        data: z.object({
            CategoryItem: z.object({
                full_slug: z.string(),
                name: z.string(),
                content: z.object({
                    seo: seo_parser,
                    products: z.array(product_parser),
                }),
            }),
        }),
    })
    .transform((raw): CategoryPage => {
        return {
            seo: raw.data.CategoryItem.content.seo,
            name: raw.data.CategoryItem.name,
            products: raw.data.CategoryItem.content.products,
        };
    });
