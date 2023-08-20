/*
    Reference:
    https://dev.to/remix-run-br/type-safe-environment-variables-on-both-client-and-server-with-remix-54l5
*/

import * as z from "zod";

const environmentSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    ST_ACCESS_TOKEN: z.string().min(1),
    DOMAIN: z.string().min(1),
});

const env = () => environmentSchema.parse(process.env);

export { env };
