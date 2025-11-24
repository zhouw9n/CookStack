<script setup lang="ts">
import type { Recipe } from '~~/shared/validation/form.schema';

    const { title, recipes } = defineProps<{
        title: string,
        recipes: Array<Recipe>,
    }>();

</script>

<template>
    <section class="flex flex-col flex-1">
        <div class="flex justify-between items-end h-9">
            <h1 class="font-medium text-large">{{ title }}</h1>

            <!-- Action Slot: Buttons, Navigation, etc. -->
            <slot name="action"></slot>
        </div>

        <!-- Empty Slot: UI message for empty states (i.e. no recipes) -->
        <div v-if="recipes.length === 0" class="flex flex-col flex-1 justify-center items-center">
            <slot name="empty"></slot>
        </div>

        <div v-else class="gap-1 grid grid-cols-2 mt-4">
            <RecipeCard v-for="recipe in recipes"
                :key="recipe.id"
                :recipe="recipe"
            />
        </div>
    </section>
</template>