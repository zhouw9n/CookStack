import db from "~~/server/database/db";
import { readBody } from 'h3';

export default defineEventHandler(async(event) => {
    try {
        // Read id from URL
        const recipeId = Number(event.context.params?.id);
        // Read the request body
        const { isFavorite } = await readBody<Record<"isFavorite", boolean>>(event);

        // Prepare put statement with placeholders
        const updateRecipeStmt = db.prepare(`
            UPDATE recipes SET is_favorite = ? WHERE id = ?
        `);
        
        // Insert updated value in column
        updateRecipeStmt.run(
            isFavorite ? 1 : 0,
            recipeId,
        );

        // Logging
        console.log("Recipe: ", recipeId, " isFavorite: ", isFavorite);

        // SUCCESS: Return object
        return {
            status: 200,
            success: true,
        }

    } catch (err) {
        console.log("Error updating favorite: ", err);

        // ERROR: Return object
        return {
            status: 500,
            success: false,
            message: "Internal server error"
        }
    }

});