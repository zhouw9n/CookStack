<script setup lang="ts">
import type { Recipe } from '~~/shared/validation/form.schema';


    const { isMobile } = defineProps<{
        isMobile: boolean
    }>();

    const recipeStore = useRecipeStore();
    const { recipes } = storeToRefs(recipeStore);

</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">

        <Header 
            layout="search" 
            :is-mobile="isMobile" 
        />
   
        <main class="flex flex-col pt-5 pb-4 min-h-[calc(100dvh-64px-72px)]">
            <RecipeGallery
                title="My Recipes"
                :recipes="recipes"
            >
                <!-- Action Slot -->
                <template #action>
                    <ButtonSmall icon="filter"/>
                </template>

                <!-- Empty Slot: No Recipes Found -->
                <template #empty>
                    <NuxtImg src="/assets/icons/fork-knife.svg" class="opacity-70 size-16" />
                    <h1 class="opacity-70 mt-4 text-large">No Recipes Yet</h1>
                    <p class="opacity-70 mb-4">Start by adding a new recipe</p>
                    <NuxtLink
                        to="/newrecipe"
                        class="flex justify-center items-center gap-2 bg-spacegrey px-2 rounded-lg h-9 text-offwhite"
                    >
                        <NuxtImg src="/assets/icons/plus-circle-white.svg" class="size-4" />
                        <span>Add a Recipe</span>
                    </NuxtLink>
                </template>
                
            </RecipeGallery>
        </main>
    </div>
</template>