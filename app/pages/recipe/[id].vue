<script setup lang="ts">
import type { Recipe } from '~~/shared/validation/form.schema';

const { isMobile } = defineProps<{
    isMobile: boolean,
}>();

const route = useRoute();
const recipeId = Number(route.params.id);


const recipeStore = useRecipeStore();
const { getRecipeById } = storeToRefs(recipeStore);

const recipe: Recipe | undefined = getRecipeById.value(recipeId);


function handleEdit() {

}

</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">

        <Header 
            layout="return" 
            return-label="All Recipes" 
            return-to="/myrecipes" 
            :is-mobile="isMobile"
        />

        <main class="min-h-[calc(100dvh-64px-72px)]">
            <div class="mt-6 mb-6">

                <!-- Image -->
                <section class="w-full h-full aspect-square">
                    <NuxtImg v-if="!recipe?.imageUrl" 
                        src="/assets/img/placeholder.svg" 
                        class="rounded-lg w-full h-full object-center object-contain"/>
                </section>

                <!-- Recipe Info -->
                <section class="mt-8">
                    <h1 class="font-medium text-large">{{ recipe?.recipeName }}</h1>
                    <p>{{ recipe?.description }}</p>
                    <div class="flex justify-between items-end mt-2">
                        <div class="flex gap-2 w-fit">
                            <Tag icon="stopwatch" :label="`${recipe?.preperationTime} min`" />
                            <Tag icon="tag" :label="recipe?.category"/>
                        </div>
                        <div class="flex gap-2">
                            <ButtonSmall 
                                @mousedown="recipeStore.updateFavorite(recipeId)"
                                :icon="recipe?.isFavorite ? 'bookmark-fill-white' : 'bookmark-white'"/>
                            <ButtonSmall 
                                @mousedown="handleEdit"
                                icon="edit" />
                        </div>
                    </div>
                </section>
                
                <!-- Ingredients -->
                <section class="mt-16">
                    <h1 class="font-medium text-large">Ingredients</h1>
                    <div class="bg-spacegrey mt-4 px-2 py-4 rounded-lg text-offwhite">
                        <ul class="flex flex-col gap-2 pl-5 list-disc">
                            <li v-for="(ingredient, index) in recipe?.ingredients" :key="index">
                                {{ ingredient.amount }}{{ ingredient.unit }} {{ ingredient.item }}
                            </li>
                        </ul>
                    </div>
                </section>

                <!-- Instructions -->
                <section class="mt-16">
                    <h1 class="font-medium text-large">Instructions</h1>
                    <div class="flex flex-col gap-3 mt-4">
                        <div v-for="(instruction, index) in recipe?.instructions"
                            class="flex flex-col gap-4 bg-spacegrey px-2 py-4 rounded-lg text-offwhite"
                        >
                            <h2>Step {{ index + 1 }}:</h2>
                            <p>{{ instruction.instruction }}</p>
                        </div>
                    </div>
                </section>

                <!-- Notes -->
                <section  v-if="recipe?.notes" class="mt-16">
                    <h1 class="font-medium text-large">Notes</h1>
                    <div class="bg-lightgrey mt-4 px-2 py-4 rounded-lg">
                        <p>{{ recipe?.notes }}</p>
                    </div>
                </section>
            </div>
            
        </main>
    </div>

    <MobileNavigation v-if="isMobile" />
</template>
 