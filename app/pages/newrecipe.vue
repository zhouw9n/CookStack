<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { Ingredient } from '~~/shared/types/recipe';
import type { Instruction } from '~~/shared/types/recipe';
import { formSchema, parseErrors } from '~~/shared/validation/form.schema';


// Props Definition
const { isMobile } = defineProps<{isMobile: boolean}>();

const recipeStore = useRecipeStore();
const { loading, error } = storeToRefs(recipeStore);



// Stores flags to update Form UI Inputs accordingly
const errors = reactive<Record<string, boolean>>({});

// ID counters used to track dynamically added form fields for ingredients and instructions
let ingredientId = 2;
let instructionId = 1;

// Reactive state to track inputs from form fields.
// Ingredients: Initiate with 2 empty form inputs.
// Instructions: Initiate with 1 empty form input.
const formState = reactive({
    category: "",
    description: "",
    notes: "",
    recipeName: "",
    preperationTime: 0,
    ingredients: [
        {id: 1, amount: 0, unit: "", item: ""}, 
        {id: 2, amount: 0, unit: "", item: ""},
    ] as Ingredient[],
    instructions: [
        {id: instructionId, instruction: ""},
    ] as Instruction[],
});

function addIngredientItem() {
    ingredientId++;
    formState.ingredients.push({id: ingredientId, amount: 0, unit: "", item: ""});
}

function removeIngredientItem(id: number) {
    formState.ingredients = formState.ingredients.filter(ingredient => ingredient.id !== id);
}



function addInstruction() {
    instructionId++;
    formState.instructions.push({id: instructionId, instruction: ""});
}

function removeInstruction(id: number) {
    formState.instructions = formState.instructions.filter(instruction => instruction.id !== id);
    
}


async function handleSubmit(e: Event) {
    // Prevent double submission
    if (loading.value.create) return;
    // Validation check
    if (!validateForm()) {
        window.scrollTo({top: 0, behavior: "smooth"});
        return
    }
    // API Call
    try {
        const response = await recipeStore.createRecipe(formState);
        // Setting error flags to update Form UI
        if (!response.success) {
            Object.assign(errors, response.error || {});
            window.scrollTo({top: 0, behavior: "smooth"});
            return;
        }
        // Navigate to page of newly created recipe
        const route = useRouter();
        route.push(`/recipe/${response.recipeId}`);
    } catch (err: any) { 
        throw createError({statusCode: 500, statusMessage: "Internal server error."})
    }
}

function validateForm() {
    // Reseting previous error flags
    Object.keys(errors).forEach(key => errors[key] = false);

    const result = formSchema.safeParse(formState);

    // Setting error flags to update Form UI
    if(!result.success) {
        Object.assign(errors, parseErrors(result.error));
        return false;
    }
    return true;
}

</script>

<template>
    <div class="mx-auto px-2 min-w-[300px] max-w-[1029px] min-h-[calc(100dvh-72px)]">
        <div class="flex justify-between items-center pt-4">
            <h1 class="font-medium text-large">New Recipe</h1>
            
        </div>
        <form class="flex flex-col gap-16 mt-10 mb-4">

            <!--GENERAL-->
            <section class="flex flex-col gap-4">
                <FormInputText 
                    id="recipeName" 
                    label="Recipe Name*" 
                    placeholder="Classic Pancakes" 
                    size="medium" 
                    width="w-fill" 
                    :bold=true 
                    :error="errors['recipeName']"
                    v-model="formState.recipeName"    
                />
                <FormInputText 
                    id="description" 
                    label="Description" 
                    placeholder="American style fluffy Pancakes" 
                    size="medium" 
                    width="w-fill" 
                    :bold=true 
                    v-model="formState.description"    
                />
                <FormInputTime 
                    id="preperationTime" 
                    label="Preperation Time*" 
                    placeholder="20" 
                    :error="errors['preperationTime']"
                    v-model="formState.preperationTime"
                />
                <FormInputTextDropdown 
                    id="category" 
                    label="Category*" 
                    placeholder="Type or select category" 
                    :options="['Appetizer', 'Breakfast', 'Dessert', 'Main', 'Snack', 'Other']" 
                    :error="errors['category']"
                    v-model="formState.category"    
                />
            </section>

            <!--INGREDIENTS-->
            <section>
                <h2 class="mb-4 font-medium">Ingredients*</h2>

                <div class="flex flex-col gap-2 mb-4">               
                    <FormIngredientItem v-for="(ingredient,index) in formState.ingredients"
                        :key="ingredient.id"
                        :id="ingredient.id"
                        :removable="ingredient.id != 1"
                        :error-amount="errors[`ingredients.${index}.amount`]"
                        :error-unit="errors[`ingredients.${index}.unit`]"
                        :error-item="errors[`ingredients.${index}.item`]"
                        v-model="formState.ingredients[index]"
                        @remove="removeIngredientItem"    
                    />
                </div>

                <ButtonLarge 
                    button-label="Add Item"
                    @click="addIngredientItem"
                />
            </section>
            <!--INSTRUCTIONS-->
            <section>
                <h2 class="mb-4 font-medium">Instructions*</h2>
                <div class="flex flex-col gap-2 mb-4">
                    <FormInstruction v-for="(instruction, index) in formState.instructions"
                        :key="instruction.id"
                        :id="instruction.id"
                        :index="index"
                        :removable="instruction.id != 1"
                        :error="errors[`instructions.${index}.instruction`]"
                        v-model="formState.instructions[index]"
                        @remove="removeInstruction"
                    />
                </div>
                <ButtonLarge 
                    button-label="Add Step"
                    @click="addInstruction"
                />
            </section>
            <!--NOTES-->
            <section>
                <FormInputTextarea 
                    id="notes"
                    label="Notes"
                    placeholder="..."
                    :bold="true"
                    size="medium"
                    width="w-full"
                    v-model="formState.notes"
                />
            </section>

            <ButtonLarge 
                button-label="Save Recipe"
                @click="handleSubmit"
                :loading="loading.create"
            />
        </form>
        
    </div>
</template>