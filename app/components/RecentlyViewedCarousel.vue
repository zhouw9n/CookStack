<script setup lang="ts">

const recipeStore = useRecipeStore();
const { getRecentlyViewed } = storeToRefs(recipeStore);

// Handle horizontal scroll for Carousel
function handleHorizontalScroll(event: WheelEvent) {
    // Prevent vertical scrolling
    event.preventDefault();

    const el = event.currentTarget as HTMLDivElement;

    el.scrollBy({
        left: event.deltaY * 4,
        behavior: "smooth"
    });
}

</script>

<template>
    <section>
        <h1 class="font-medium text-large">Recently Viewed</h1>
        <div 
            @wheel="handleHorizontalScroll"
            id="scroll-container"
            class="flex gap-3 py-4 h-[262px] overflow-x-scroll"
        >
            
            <RecipeCard v-for="recipe in getRecentlyViewed"
                :key="recipe.id"
                :recipe="recipe"
        />
        </div>
    </section>
</template>

<style scoped>
    #scroll-container::-webkit-scrollbar {
        height: 0; /* Disable scrollbar */
    }
</style>