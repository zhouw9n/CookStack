import Database from "better-sqlite3";
import { join } from "path";

const dbPath = join(process.cwd(), "server/data/recipes.db");
const db = new Database(dbPath);

db.prepare(`
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_name TEXT NOT NULL,
        description TEXT,
        preperation_time INTEGER NOT NULL CHECK(preperation_time > 0),
        category TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        notes TEXT,
        image_id TEXT,
        image_url TEXT,
        is_favorite INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )    
`).run();

export default db;