import { type SEO } from "./blocks/seo";

/**
 * Returns the required SEO meta tags
 * `$route` shall all ways start with `/` or will throw
 * @param seo
 * @param route
 * @returns
 */
export function seo_meta_tags(seo: SEO, relative_route: string) {
    if (relative_route[0] != "/") {
        throw new Error("(seo_meta_tags) `relative_route` shall start all ways with a `/`");
    }
    return [
        { title: seo.title },
        { name: "description", content: seo.description },
        // og
        { property: "og:url", content: `https://store.railab.tech` + relative_route },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:image", content: seo.og_image },
        // tw
        { property: "twitter:card", content: "summary_large_image" },
    ];
}

export const gql = String.raw;
