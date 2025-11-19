<script setup lang="ts">
import { useRecipeNavigation } from '#imports';

    const { isMobile } = defineProps<{
        isMobile: boolean
    }>();

    const recipeStore = useRecipeStore();
    const { recipes } = storeToRefs(recipeStore);

    const { goToRecipe } = useRecipeNavigation();
</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">

        <Header 
            layout="search" 
            :is-mobile="isMobile" 
        />
   
        <main class="pt-10 pb-4 min-h-[calc(100dvh-64px-72px)]">
            <section>
                <h1 class="font-medium text-large">My Recipes</h1>
                <div class="gap-1 grid grid-cols-2 mt-4">
                    <RecipeCard v-for="recipe in recipes"
                        :key="recipe.id"
                        :recipe="recipe"
                        @mousedown="goToRecipe(Number(recipe.id))"
                    />
                </div>
            </section>
        </main>
    </div>
    
    <MobileNavigation v-if="isMobile"/>
</template>