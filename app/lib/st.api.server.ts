import { CategoryPage } from "./blocks/category.page";
import { HomePage } from "./blocks/home";
import { gql } from "./lib.server";
import { category_page_parser } from "./parsers/category.page";
import { home_page_parser } from "./parsers/home";

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
                    throw new HTTPError("Get Home fail with status: " + res.status);
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
    };
}
