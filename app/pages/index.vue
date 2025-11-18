<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '~/stores/recipes';


const { isMobile } = defineProps<{
    isMobile: boolean,
}>();

const recipeStore = useRecipeStore();
const { recipes, loading, error } = storeToRefs(recipeStore);

console.log(recipes.value)


</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">
        <Header layout="search" :is-mobile="isMobile"/>
        
        <main class="min-h-[calc(100dvh-64px-72px)]">
            <div class="bg-darkgrey mt-10 mb-6 rounded-lg w-[200px] h-6 animate-pulse"></div>
            <div class="gap-1 grid grid-cols-2"> 
                <SkeletonCardSmall v-for="n in 2" 
                    :key="n"
                />
            </div>
            <div class="flex justify-between items-end mt-20 mb-6">
                <div class="bg-darkgrey rounded-lg w-[200px] h-6 animate-pulse"></div>
                <div class="bg-darkgrey rounded w-[80px] h-4 animate-pulse"></div>
            </div>
            <div class="gap-1 grid grid-cols-2 mb-4"> 
                <SkeletonCardSmall v-for="n in 6" 
                    :key="n"
                />
            </div>
        </main>
    </div>
    
    <MobileNavigation v-if="isMobile" />
</template>