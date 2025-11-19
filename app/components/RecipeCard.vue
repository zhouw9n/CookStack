<script setup lang="ts">
import type { Recipe } from '~~/shared/validation/form.schema';


const { recipe } = defineProps<{
    recipe: Recipe,
}>();

const recipeStore = useRecipeStore();

</script>

<template>
    <div class="relative bg-lightgrey rounded-lg aspect-square">
        <NuxtImg src="/assets/img/placeholder.svg" class="rounded-lg w-full h-full object-center object-fill" />
        <div class="top-0 z-50 absolute flex flex-col justify-between bg-gradient-to-t from-[#171717BF] from-[25%] to-[#7D7D7D3F] to-[100%] p-2 rounded-lg w-full h-full">
            
                <ButtonSmall 
                @mousedown.stop="recipeStore.updateFavorite(Number(recipe.id))"
                :icon="recipe.isFavorite ? 'bookmark-fill-white' : 'bookmark-white'" 
                />
                <div class="flex flex-col gap-[2px] text-offwhite">
                    <h2 class="text-small">{{ recipe.category }}</h2>
                    <h1 class="max-h-12 text-medium truncate text-wrap">{{ recipe.recipeName }}</h1>
                </div>
        </div>
    </div>
</template>