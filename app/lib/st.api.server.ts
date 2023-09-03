import { CategoryPage } from "./blocks/category.page";
import { HomePage } from "./blocks/home";
import { gql } from "./lib.server";
import { category_page_parser } from "./parsers/category.page";
import { home_page_parser } from "./parsers/home";
import { MenuLink, menu_links_parser } from "./parsers/links";
import { Product, product_page_query_parser, product_parser } from "./parsers/product";

class HTTPError extends Error {}

type GetHomeResult =
    | {
          ok: HomePage;
          err: null;
      }
    | {
          ok: null;
          err: Error;
      };
type GetCategoryPageResult =
    | {
          ok: CategoryPage;
          err: null;
      }
    | {
          ok: null;
          err: Error;
      };

type GetProductResult =
    | {
          ok: Product;
          err: null;
      }
    | {
          ok: null;
          err: Error;
      };

type GetMenuLinksResult =
    | {
          ok: MenuLink[];
          err: null;
      }
    | {
          ok: null;
          err: Error;
      };
export function create_storyblock_api({ access_token }: { access_token: string }) {
    var api_url = `https://gapi-us.storyblok.com/v1/api`;
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Token", access_token);

    return {
        async get_home_page(): Promise<GetHomeResult> {
            const query = gql`
                # nested data ref
                # https://www.storyblok.com/cl/resolve-relations-in-nested-graphql-query
                {
                    HomeItems(resolve_relations: "categories_section.categories") {
                        total
                        items {
                            id
                            full_slug
                            content {
                                seo
                                intro
                                categories_section
                            }
                        }
                    }
                }
            `;

            try {
                var res = await fetch(api_url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ query, variables: {} }),
                });

                if (!res.ok) {
                    throw new HTTPError("Get Home fail with status: " + res.status);
                }
                var data = await res.json();
                // console.log(JSON.stringify(data, null, 2));
                return { ok: home_page_parser.parse(data), err: null };
            } catch (error) {
                if (error instanceof Error) {
                    return { ok: null, err: error };
                }
            }

            return { ok: null, err: new Error("Unknown error") };
        },

        async get_category_page(slug: string): Promise<GetCategoryPageResult> {
            const category_item_id = `"categories/${slug}"`;
            const query = gql`
                {
                    CategoryItem(id: ${category_item_id}) {
                        full_slug
                        name
                        id
                        content {
                            seo
                            name
                            image
                            products {
                                id
                                name
                                content
                                slug
                            }
                        }
                    }
                }
            `;

            // console.log(JSON.stringify({ query }, null, 2));
            try {
                var res = await fetch(api_url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ query, variables: {} }),
                });

                if (!res.ok) {
                    throw new HTTPError("Get Category fail with status: " + res.status);
                }
                var data = await res.json();
                // console.log(JSON.stringify(data, null, 2));
                return { ok: category_page_parser.parse(data), err: null };
            } catch (error) {
                if (error instanceof Error) {
                    return { ok: null, err: error };
                }
            }

            return { ok: null, err: new Error("Unknown error") };
        },
        async get_product(slug: string): Promise<GetProductResult> {
            const product_id = `"products/${slug}"`;
            const query = gql`
                {
                    ProductItem(id: ${product_id}) {
                        id
                        name
                        slug
                        content {
                            seo
                            image
                            price
                            description
                        }
                    }
                }
            `;

            // console.log(JSON.stringify({ query }, null, 2));
            try {
                var res = await fetch(api_url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ query, variables: {} }),
                });

                if (!res.ok) {
                    throw new HTTPError("Get Product fail with status: " + res.status);
                }
                var data = await res.json();
                // console.log(JSON.stringify(data, null, 2));
                return { ok: product_page_query_parser.parse(data), err: null };
            } catch (error) {
                if (error instanceof Error) {
                    return { ok: null, err: error };
                }
            }

            return { ok: null, err: new Error("Unknown error") };
        },

        async get_menu_links(): Promise<GetMenuLinksResult> {
            const query = gql`
                {
                    CategoryItems {
                        items {
                            name
                            uuid
                            slug
                        }
                    }
                }
            `;

            // console.log(JSON.stringify({ query }, null, 2));
            try {
                var res = await fetch(api_url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ query, variables: {} }),
                });

                if (!res.ok) {
                    throw new HTTPError("Get Menu Links fail with status: " + res.status);
                }
                var data = await res.json();
                // console.log(JSON.stringify(data, null, 2));
                return { ok: menu_links_parser.parse(data), err: null };
            } catch (error) {
                if (error instanceof Error) {
                    return { ok: null, err: error };
                }
            }

            return { ok: null, err: new Error("Unknown error") };
        },
    };
}
