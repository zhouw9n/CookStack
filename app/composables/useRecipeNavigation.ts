/**
 * Composable that provides helpers for navigating to recipe pages.
 *
 * This function returns a navigation helper that takes a recipe id
 * and moves the user to the matching recipe route.
 */

export function useRecipeNavigation() {
    
    function goToRecipe(id: number) {
        const router = useRouter();
        router.push(`/recipe/${id}`);
    }

    return {
        goToRecipe,
    }
}