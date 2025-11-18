/**
 * Normalize recipe fields that may be stored as serialized JSON strings.
 *
 * Some backend systems store complex fields like `ingredients` and
 * `instructions` as JSON-encoded strings instead of real JavaScript objects.
 * This utility transforms those fields back into proper arrays so the frontend
 * always works with clean, fully structured data.
 *
 * Example:
 * Input:
 * {
 *   recipeName: "Pasta",
 *   ingredients: "[{\"amount\":2,\"unit\":\"g\",\"item\":\"Salt\"}]",
 *   instructions: "[{\"instruction\":\"Boil water\"}]"
 * }
 *
 * Output:
 * {
 *   recipeName: "Pasta",
 *   ingredients: [{ amount: 2, unit: "g", item: "Salt" }],
 *   instructions: [{ instruction: "Boil water" }]
 * }
 *
 * @param recipe A single recipe object with fields that may be JSON strings.
 * @returns A recipe object with parsed ingredients and instructions.
 */

import type { Recipe } from "~~/shared/validation/form.schema";

export function normalizeRecipe(recipe: any): Recipe {
    return {
        ...recipe,
        // Convert serialized JSON strings into real arrays
        ingredients: JSON.parse(recipe.ingredients),
        instructions: JSON.parse(recipe.instructions),
    }
}