<script setup lang="ts">
import { SORTBY_OPTIONS } from '~~/shared/constants/options';

const { filterState } = defineProps<{
    filterState: { categories: Record<string, boolean>, sortby: string},
}>()


const filterMenu = useFilterMenu();

const options = ref(SORTBY_OPTIONS);

const recipeStore = useRecipeStore();
const { getCategories } = storeToRefs(recipeStore);

const sortBy = ref("All");

const emit = defineEmits<{
    (e: "category", val: string): void,
    (e: "sort", val: string): void,
}>();

function updateCategory(category: string) {
    emit( "category", category);
}

watch(sortBy, () => {
    emit( "sort", sortBy.value);
});


</script>

<template>
    <!-- Blur Overlay -->
    <div class="top-0 z-[999] absolute inset-0 bg-offwhite/1 backdrop-blur-[5px] w-full h-dvh"></div>

    <!-- Filter Menu-->
    <div class="bottom-0 left-0 z-[999] absolute flex flex-col gap-5 row-span-2 bg-offwhite shadow-[0_-4px_10px_0_rgba(23,23,23,0.25)] p-2 rounded-t-lg w-full h-[50%]">
        <div class="flex justify-between items-center">
            <h1 class="font-medium text-large">Filter</h1>
            <ButtonSmall 
                @click="filterMenu.closeFilterMenu()"
                icon="close-white" />
        </div>

        <!-- Category -->
        <div class="flex flex-col">
            <h2>Category</h2>
            <div class="flex flex-wrap gap-1">
                <ButtonTag v-for="category in getCategories"
                    :key="category"
                    :category="category"
                    :active="filterState.categories[category]"
                    @click="updateCategory(category)"
                />
            </div>
            
            
        </div>

        <!-- Sort By -->
        <FormInputDropdown
            id="filterSortBy"
            label="Sort by"
            size="medium"
            width="w-full"
            :bold=false
            :options=options
            v-model=sortBy
        />
    </div>      
     
</template>