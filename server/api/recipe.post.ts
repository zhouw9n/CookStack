import db from "~~/server/database/db";
import { formSchema, parseErrors, type Recipe } from '~~/shared/validation/form.schema';
import { readBody } from 'h3';

export default defineEventHandler(async(event) => {
    try {
        // Read the request body
        const body = await readBody<Recipe>(event);

        // Validate the input using zod schema
        const result = formSchema.safeParse(body);
        if(!result.success) {
            // Returned parsed error objects to update Form UI
            return {
                status: 400,
                success: false,
                error: parseErrors(result.error),
                message: "Invalid entries"
            };
        }

        // Store result in new variable
        const recipeData: Recipe = result.data;

        // Prepare insert statement with placeholders
        const insertRecipeStmt  = db.prepare(`
            INSERT INTO recipes (recipe_name, description, preperation_time, category, ingredients, instructions, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        
        // Insert recipe data in column
        const insertData  = insertRecipeStmt.run(
            recipeData.recipeName,
            recipeData.description,
            recipeData.preperationTime,
            recipeData.category,
            JSON.stringify(recipeData.ingredients),
            JSON.stringify(recipeData.instructions),
            recipeData.notes
        );

        // SUCCESS: Return object
        return {
            status: 200,
            success: true,
            recipeId: insertData.lastInsertRowid
        }

    } catch (err) {
        console.log("Error inserting recipe: ", err);
        // ERROR: Return object
        return {
            status: 500,
            success: false,
            message: "Internal server error"
        }
    }
});