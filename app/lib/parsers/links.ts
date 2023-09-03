import { z } from "zod";

export const menu_links_parser = z
    .object({
        data: z.object({
            CategoryItems: z.object({
                items: z.array(
                    z.object({
                        name: z.string(),
                        uuid: z.string(),
                        slug: z.string(),
                    })
                ),
            }),
        }),
    })
    .transform((raw): MenuLink[] => {
        return raw.data.CategoryItems.items.map((raw_menu_link) => ({
            id: raw_menu_link.uuid,
            label: raw_menu_link.name,
            route: `/categories/${raw_menu_link.slug}`,
        }));
    });

export type MenuLink = {
    id: string;
    label: string;
    route: string;
};
