import { z } from "zod";
import { HomePage } from "../blocks/home";

export const home_page_parser = z
    .object({
        data: z.object({
            HomeItems: z.object({
                items: z.array(
                    z.object({
                        content: z.object({
                            seo: z.array(
                                z.object({
                                    tile: z.string(),
                                    description: z.string(),
                                    og_image: z.string(),
                                })
                            ),
                            intro: z.array(
                                z.object({
                                    heading: z.string(),
                                    sub_heading: z.string(),
                                })
                            ),
                            categories_section: z.array(
                                z.object({
                                    _uid: z.string(), // "a9e6d60e-f34d-4807-8e2f-f27864a69de2",
                                    title: z.string(), // "Componentes en Stock",
                                    categories: z.array(
                                        z.object({
                                            name: z.string(), // "Motherboards",
                                            created_at: z.string(), //"2023-08-20T03:15:50.192Z",
                                            published_at: z.string(), //"2023-08-31T02:09:46.754Z",
                                            id: z.number(), //236312,
                                            uuid: z.string(), //"b8c0fd2f-f8a8-4615-9934-736b0c9229fe",
                                            content: z.object({
                                                seo: z.array(
                                                    z.object({
                                                        _uid: z.string(), // "0a24dd30-3aea-4dff-9af4-2586b5d1d13c",
                                                        tile: z.string(), // "Motherboards para la Mac en la Habana | Railab Store",
                                                        og_image: z.string(), //"//a-us.storyblok.com/f/1015266/2300x1533/4979101805/alexandre-debieve-fo7jilwjotu-unsplash.webp",
                                                        description: z.string(), //"Motherboards para MacBooks, iMacs, y Macs en la Habana. Listas para instalar. Calidad y Garantía.",
                                                    })
                                                ),
                                                _uid: z.string(), // "81074d94-7439-446a-af84-e2ed543bb4ea",
                                                name: z.string(), // "Motherboards",
                                                image: z.string(), // "//a-us.storyblok.com/f/1015266/2300x1533/4979101805/alexandre-debieve-fo7jilwjotu-unsplash.webp",
                                            }),
                                            slug: z.string(), // "motherboards",
                                            full_slug: z.string(), // "categories/motherboards",
                                        })
                                    ),
                                })
                            ),
                        }),
                    })
                ),
            }),
        }),
    })
    .transform(function (raw): HomePage {
        return {
            seo: {
                title: raw.data.HomeItems.items[0].content.seo[0].tile,
                description: raw.data.HomeItems.items[0].content.seo[0].description,
                og_image: raw.data.HomeItems.items[0].content.seo[0].og_image,
            },
            intro: {
                heading: raw.data.HomeItems.items[0].content.intro[0].heading,
                sub_heading: raw.data.HomeItems.items[0].content.intro[0].sub_heading,
            },
            category_sections: raw.data.HomeItems.items[0].content.categories_section.map(
                (category_section) => {
                    return {
                        title: category_section.title,
                        id: category_section._uid,
                        categories: category_section.categories.map((category_section) => {
                            return {
                                id: category_section.uuid,
                                slug: `/category/${category_section.slug}`,
                                title: category_section.name,
                                image: {
                                    url: `https:${category_section.content.image}`,
                                    alt_text: category_section.name,
                                },
                            };
                        }),
                    };
                }
            ),
        };
    });
