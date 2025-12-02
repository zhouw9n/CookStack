<script setup lang="ts">


const { id, label, bold, size, width, options, error } = defineProps<{
    id: string,
    label: string, 
    bold: boolean,
    size: "small" | "medium",
    width: string,
    options: string[],
    error?: boolean,
}>();

const isFocused = ref(false);
//const unitValue = ref("-");
const modelValue = defineModel<string>("modelValue");

function handleFocus() {
    isFocused.value = !isFocused.value;
}

function handleSelection(selectedOption: string) {
    modelValue.value = selectedOption;
}

</script>

<template>
    <div :class="['flex flex-col', width]">
        <label 
            :class="[
                size === 'small' ? 'text-small' : 'text-medium',
                bold ? 'font-medium' : 'font-regular'
            ]">
                {{ label }}
        </label>

        <div class="relative">
            <!--Input-->
            <div 
                tabindex="0" 
                aria-label="input"
                @focus="handleFocus" 
                @blur="handleFocus"
                :id="id"
                :name="id"
                :class="[
                    'flex justify-between items-center focus:outline-spacegrey rounded-lg h-8 px-2', 
                    isFocused ? 'border-[2px] border-spacegrey' : 'border-[1px]',
                    error ? 'border-red' : 'border-spacegrey',
                ]">
                <div class="flex truncate pointer-events-none">{{ modelValue || "-" }}</div>
                <img src="/assets/icons/caret-down-fill.svg" class="size-4 pointer-events-none" />
            </div>
            <!--Dropdown-->
            <div
                :class="['-left-2 z-50 absolute bg-offwhite shadow-[0_4px_4px_0_rgba(23,23,23,0.15)] mx-2 mt-2  rounded-lg w-full h-[100px] overflow-y-scroll',
                isFocused ? 'min-h-1 opacity-100' : 'max-h-0 opacity-0'   
            ]">
                <li v-for="(option) in options"
                    :key="option"
                    @mousedown="handleSelection(option)"
                    class="hover:bg-spacegrey my-1 first:mt-0 last:mb-0 px-2 hover:rounded-md hover:text-offwhite text-center list-none"
                >
                {{ option }}
            </li>
            </div>
        </div>

    </div>
</template>