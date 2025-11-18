import { z } from "zod";
import { UNIT_OPTIONS } from "~~/shared/constants/units";


export const ingredientSchema = z.object({
    amount: z.number().positive().gt(0),
    unit: z.enum(UNIT_OPTIONS),
    item: z.string().trim().regex(/^[a-zA-Z ]+$/),
});

export const instructionSchema = z.object({
    instruction: z.string().trim().min(1), 
});

export const formSchema = z.object({
    // Required
    recipeName: z.string().trim().min(1),
    description: z.string().optional(),
    preperationTime: z.number().positive(),
    category: z.string().trim().min(1),
    ingredients: z.array(ingredientSchema),
    instructions: z.array(instructionSchema),
    notes: z.string().optional(),

    // Optional - populated by backend after creation
    id: z.number().optional(),
    createdAt: z.iso.datetime().optional(), // timestamp of creation
    viewedAt: z.iso.datetime().optional(), // last time viewed
    isFavorite: z.boolean().optional(), // user favorite flag

    imageId: z.number().optional(),
    imageUrl: z.url().optional(),
});



export function parseErrors(error: z.ZodError)  {
    const errors:Record<string, boolean> = {};
    for (const issue of error.issues) {
        const key = issue.path.join(".");
        errors[key] = true;
    }
    return errors;
}

export type Recipe = z.infer<typeof formSchema>;