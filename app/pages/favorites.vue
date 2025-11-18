<script setup lang="ts">
import MobileNavigation from '~/components/MobileNavigation.vue';

const { isMobile } = defineProps<{
    isMobile: boolean
}>();

const recipeStore = useRecipeStore();
const favoriteRecipes = recipeStore.getFavoriteRecipes;

console.log(favoriteRecipes);

</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">
        <Header layout="search" :is-mobile="isMobile" />
        <main class="min-h-[calc(100dvh-64px-72px)]">
            Favorites
        </main>
    </div>
    
    
    <MobileNavigation v-if="isMobile" />
</template>