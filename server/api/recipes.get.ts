import db from "~~/server/database/db";

export default defineEventHandler(() => {
    const stmt = db.prepare("SELECT * FROM recipes ORDER BY created_at DESC");
    const recipes = stmt.all();
    return recipes;
});