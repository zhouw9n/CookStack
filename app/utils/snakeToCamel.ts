/**
 * Convert all object keys from snake case to camel case.
 *
 * This utility processes an array of plain objects and transforms
 * every key such as "recipe_name" into "recipeName". The original
 * values are preserved. Keys without underscores remain unchanged.
 *
 * Example:
 * snakeToCamel([
 *   { recipe_name: "Pasta", prep_time: 30 }
 * ])
 * becomes:
 * [
 *   { recipeName: "Pasta", prepTime: 30 }
 * ]
 *
 * @param obj An array of objects whose keys may contain snake case formatting.
 * @returns A new array of objects with camel cased keys.
 */

export function snakeToCamel(obj: Array<Record<string,any>>) {

    const formatted = obj.map(entry => {

        const keyValPair = Object.entries(entry).map(([key, val]) => {

            // Split the key by underscore (example: recipe_name)
            const parts = key.split("_");

            // Convert snake case to camel case (example: recipe_name -> recipeName)
            const camelCase = parts.map((word, index) => {
                return index ===  0 ? word : word[0]?.toUpperCase() + word.slice(1);
            }).join("");

            return [camelCase, val];
        });

        // Convert the transformed key-value pairs back into an object
        return Object.fromEntries(keyValPair);
    });
    return formatted;
}