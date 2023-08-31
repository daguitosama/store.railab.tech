import { Image } from "./image";
import { SEO } from "./seo";

export type HomePage = {
    seo: SEO;
    intro: {
        heading: string;
        sub_heading: string;
    };
    category_sections: { id: string; title: string; categories: HomeCategory[] }[];
};

export type HomeCategory = {
    id: string;
    slug: string;
    title: string;
    image: Image;
};
