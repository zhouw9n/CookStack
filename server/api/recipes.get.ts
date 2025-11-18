import db from "~~/server/database/db";

export default defineEventHandler(() => {
    const stmt = db.prepare("SELECT * FROM recipes");
    const recipes = stmt.all();
    return recipes;
});