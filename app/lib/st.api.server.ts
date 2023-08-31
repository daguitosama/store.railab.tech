import { HomePage } from "./blocks/home";
import { gql } from "./lib.server";
import { home_page_parser } from "./parsers/home";

class HTTPError extends Error {}

export function create_storyblock_api({ access_token }: { access_token: string }) {
    var api_url = `https://gapi-us.storyblok.com/v1/api`;
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Token", access_token);

    return {
        async get_home_page(): Promise<GetHomeResult> {
            const query = gql`
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
                return { ok: home_page_parser.parse(data), err: null };
            } catch (error) {
                if (error instanceof Error) {
                    return { ok: null, err: error };
                }
            }

            return { ok: null, err: new Error("Unknown error") };
        },
    };
}

// types
type GetHomeResult =
    | {
          ok: HomePage;
          err: null;
      }
    | {
          ok: null;
          err: Error;
      };
