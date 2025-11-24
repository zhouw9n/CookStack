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
        
        <main class="flex flex-col pt-5 pb-4 min-h-[calc(100dvh-64px-72px)]">

            <RecipeGallery
                title="Favorites"
                :recipes="getFavoriteRecipes"
            >
                <!-- Action Slot: Filter Button -->
                <template #action>
                    <ButtonSmall icon="filter"/>
                </template>

                <!-- Empty Slot: No Favorites -->
                 <template #empty>
                    <NuxtImg src="/assets/icons/fork-knife.svg" class="opacity-70 size-16" />
                    <h1 class="opacity-70 mt-4 text-large">No Favorites Yet</h1>
                    <p class="opacity-70">Start by adding your favorite recipes</p>
                 </template>
            </RecipeGallery>

        </main>
    </div>
</template>