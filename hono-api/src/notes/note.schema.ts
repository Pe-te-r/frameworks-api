import { z } from "zod";

export const noteSchemaData=z.object({
    'userId':z.number(),
    'note':z.string()
})