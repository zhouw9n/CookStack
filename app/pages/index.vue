<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '~/stores/recipes';


const { isMobile } = defineProps<{
    isMobile: boolean,
}>();

const recipeStore = useRecipeStore();
const { recipes, loading, error } = storeToRefs(recipeStore);

// My Recipes Preview limited to 12 recipes
const limitedRecipes = recipes.value.slice(0, 12);

</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">
    
        <Header 
            layout="search" 
            :is-mobile="isMobile"
        />
        
        <main class="flex flex-col gap-10 pt-5 pb-4 min-h-[calc(100dvh-64px-72px)]">
            
            <RecentlyViewedCarousel />

            <RecipeGallery
                title="My Recipes"
                :recipes="limitedRecipes"
            >
                <!-- Action Slot-->
                <template #action>
                    <NuxtLink to="/myrecipes" class="flex items-center gap-1">
                        <span>View All</span>
                        <NuxtImg src="/assets/icons/arrow.svg" class="size-4 rotate-180"/>
                    </NuxtLink>                    
                </template>
            </RecipeGallery>

        </main>
    </div>
    
    
    
</template>
