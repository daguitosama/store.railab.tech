import z from "zod";

const Link_Schema = z.object({
    id: z.string(),
    label: z.string(),
    route: z.string(),
});

export const Navigation_Schema = z.object({
    links: z.array(Link_Schema),
});
