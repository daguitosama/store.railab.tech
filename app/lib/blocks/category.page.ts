import { z } from "zod";
import { Image } from "./image";
import { SEO } from "./seo";
import { product_parser } from "../parsers/product";

export type Product = z.infer<typeof product_parser>;
export type CategoryPage = {
    seo: SEO;
    name: string;
    products: Product[];
};
