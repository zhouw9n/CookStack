<script setup lang="ts">
// Props Definition
const { label, placeholder, id, options, error } = defineProps<{
    label: string,
    placeholder: string,
    id: string,
    options: string[],
    error?: boolean,
}>();

const isFoucsed = ref<boolean>(false);
const modelValue = defineModel<string>("modelValue");
const dropdownOptions = ref<string[]>(options);

function handleFocus() {
    isFoucsed.value = !isFoucsed.value;
}

function handleInput(e:Event) {
    const el = e.target as HTMLInputElement;
    modelValue.value = el.value;
}

function handleSelection(selectedOption: string) {
    modelValue.value = selectedOption;
}



</script>

<template>
    <div class="flex flex-col">
        <label :for="id" class="font-medium">{{ label }}</label>
        <div class="relative">
            <input 
                :placeholder="`e.g. ${placeholder}`"
                :id="id"
                :name="id"
                @focus="handleFocus"
                @blur="handleFocus"
                @input="handleInput"
                type="text"
                autocomplete="off"
                v-model="modelValue"
                :class="[
                    'bg-offwhite placeholder:opacity-75 px-2 border-[0.75px] focus:border-[1px] rounded-lg focus:outline-spacegrey w-full h-8 placeholder:text-spacegrey',
                    error ? 'border-red' : 'border-spacegrey',
                ]"
            />
            
            <div 
                :class="['-left-2 z-50 absolute bg-offwhite shadow-[0_4px_4px_0_rgba(23,23,23,0.15)] mx-2 mt-2 rounded-lg w-full h-[100px] overflow-y-scroll',
                isFoucsed ? 'min-h-1 opacity-100' : 'max-h-0 opacity-0'
            ]">
                <li v-for="option in dropdownOptions" 
                    :key="option"
                    @mousedown="handleSelection(option)"
                    class="hover:bg-spacegrey my-1 first:mt-0 last:mb-0 px-2 hover:rounded-md hover:text-offwhite list-none"
                >
                    {{ option }}
                </li>
            </div>
        </div>
        
    </div>
</template>