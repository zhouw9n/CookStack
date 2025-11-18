import { defineStore } from 'pinia';
import { normalize } from 'zod';
import { normalizeRecipe } from '~/utils/normalizeRecipe';
import type { UpdateRecipeResponse } from '~~/shared/types/recipe';
import type { Recipe } from '~~/shared/validation/form.schema';

export const useRecipeStore = defineStore("recipes", {
    // STATE
    state: () => ({
        recipes: [] as Recipe[],
        loading: {
            recipes: false, 
            create: false,
        } as Record<"recipes" | "create", boolean>,
        error: {
            recipes: null,
            create: null,
        } as Record<"recipes" | "create", Error | null>
    }),

    // ACTIONS
    actions: {

        // GET ALL RECIPES
        async getAllRecipes() {
            this.loading.recipes = true;
            try {
                const data = await $fetch("/api/recipes", 
                    {cache: "no-store"}
                );
                
                // Convert backend snake_case + fix serialized JSON fields
                this.recipes = snakeToCamel(data).map(normalizeRecipe) || [];
                
            } catch (err: any) {
                // Handle error
            } finally {
                this.loading.recipes = false;
            }
        },


        // CREATE RECIPE
        async createRecipe(formData: Recipe): Promise<CreateRecipeResponse> {
            this.loading.create = true;
            try {
                const response = await $fetch<CreateRecipeResponse>("/api/recipe",
                    {
                        method: "POST", 
                        body: formData
                    }
                );
                // Refresh recipes if POST successful
                if (response.success) {
                    await this.getAllRecipes();
                    console.log("Updated Recipes", this.recipes)
                }
                return response;
            } catch (err: any) {
                return err;
            } finally {
                this.loading.create = false;
            }
        },


        // DELETE RECIPE
        async deleteRecipe(id: number) {

        },


        // UPDATE FAVORITE
        async updateFavorite(id: number) {
            const recipe = this.getRecipeById(id);
            if (!recipe) return;

            const favoriteVal = recipe.isFavorite;
            
            // Optimistic UI update
            recipe.isFavorite = !favoriteVal;

            try {
                const response = await $fetch<UpdateRecipeResponse>(`/api/recipes/${id}/favorite`,
                    {
                        method: "PUT",
                        body: { isFavorite: recipe.isFavorite } 
                    }
                );

                // Revert back to original value on failed success
                if (!response.success) {
                    recipe.isFavorite = favoriteVal;
                    return;
                }

            } catch (err) {
                console.error("Failed to update favorite.", err);
                // Revert back to original value on error
                recipe.isFavorite = favoriteVal;
            }
        },
    },


    // GETTERS
    getters: {
        getRecipeById: (state) => {
            return (id: number) => state.recipes.find( recipe => recipe.id === id);
        },

        getFavoriteRecipes: (state) => {
            return state.recipes.filter( recipe => recipe.isFavorite);
        }
    }
    
});