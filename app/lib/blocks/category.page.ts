import { SEO } from "./seo";
import { ProductOfCategoryView } from "../parsers/product";

export type CategoryPage = {
    seo: SEO;
    name: string;
    products: ProductOfCategoryView[];
};
