<script setup lang="ts">

const { isMobile } = defineProps<{
    isMobile: boolean
}>();

const recipeStore = useRecipeStore();
const { getFavoriteRecipes } = storeToRefs(recipeStore);


</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">

        <Header 
            layout="search" 
            :is-mobile="isMobile" 
        />
        
        <main class="pt-10 pb-4 min-h-[calc(100dvh-64px-72px)]">
            <section>
                <div class="flex justify-between items-center">
                    <h1 class="font-medium text-large">Favorites</h1>

                    <ButtonSmall icon="filter"/>
                </div>
                <div class="gap-1 grid grid-cols-2 mt-4">
                    <RecipeCard v-for="recipe in getFavoriteRecipes"
                        :key="recipe.id"
                        :recipe="recipe"
                    />
                </div>
            </section>
        </main>
    </div>
</template>