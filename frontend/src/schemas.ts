import { z } from "zod";

export const namesSchema = z.array(z.string());

export const nameMutationSchema = z.union([z.string(), z.boolean()]);
