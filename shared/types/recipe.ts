export interface Ingredient {
    id: number,
    amount: number,
    unit: string,
    item: string,
};

export interface Instruction {
    id: number,
    instruction: string,
};

export interface CreateRecipeResponse {
    success: boolean,
    recipeId?: number,
    error?: Record<string, boolean>,
    message?: string,
};

export interface UpdateRecipeResponse {
    status: number,
    success: boolean,
    message?: string,
}