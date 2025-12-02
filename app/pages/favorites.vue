<script setup lang="ts">

const { isMobile } = defineProps<{
    isMobile: boolean
}>();

const recipeStore = useRecipeStore();
const { getFavoriteRecipes, getCategories } = storeToRefs(recipeStore);

const filterMenu = useFilterMenu();

// Track state of filters
const filterState = reactive({
    categories: {} as Record<string, boolean>,
    sortby: "All",
});

// Initialize categories in filterState dynamically according to unique categories from database
watch(getCategories, (categories) => {
    categories.forEach(cat => {
        if (!(cat in filterState.categories)) {
            filterState.categories[cat] = false;
        }
    });
}, 
{ immediate: true}
);

// Toggle category state
function toggleCategory(category: string) {
    filterState.categories[category] = !filterState.categories[category];
}




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
                    <ButtonSmall
                        icon="filter"
                        @click="filterMenu.openFilterMenu()"
                    />
                </template>

                <!-- Empty Slot: No Favorites -->
                 <template #empty>
                    <NuxtImg src="/assets/icons/fork-knife.svg" class="opacity-70 size-16" />
                    <h1 class="opacity-70 mt-4 text-large">No Favorites Yet</h1>
                    <p class="opacity-70">Start by adding your favorite recipes</p>
                 </template>
            </RecipeGallery>

        </main>

        <MobileFilterMenu v-if="filterMenu.isOpen.value" 
            :filter-state="filterState"
            @category="toggleCategory"
            @sort="val => filterState.sortby = val"
        />
    </div>
</template>