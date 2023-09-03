import { SEO } from "./seo";
import { Product } from "../parsers/product";

export type CategoryPage = {
    seo: SEO;
    name: string;
    products: Product[];
};
