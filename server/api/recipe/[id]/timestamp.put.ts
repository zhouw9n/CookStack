import db from '~~/server/database/db';
import { readBody } from 'h3';

export default defineEventHandler(async(event) => {
    try {
        // Read id from URL
        const recipeId = Number(event.context.params?.id);
        // Read the request body
        const { viewedAt } = await readBody<Record<"viewedAt", string>>(event);

        // Prepare statement with placeholders
        const stmt = db.prepare(`
            UPDATE recipes SET viewed_at = ? WHERE id = ?
        `);

        // Insert value in column
        stmt.run(
            viewedAt,
            recipeId
        );

        // Logging
        console.log("Recipe: ", recipeId, " Last viewed: ", viewedAt);

        // SUCCESS: Return object
        return {
            status: 200,
            success: true,
        }
    } catch (err) {
        console.log("Error updating viewed at: ", err);

        // ERROR: Return object
        return {
            status: 500,
            success: false,
            message: "Internal server error"
        }
    }
});