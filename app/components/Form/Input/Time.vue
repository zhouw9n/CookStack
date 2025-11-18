<script setup lang="ts">
const isFocused = ref(false);

const { label, placeholder, id, error } = defineProps<{
    label : string,
    placeholder : string,
    id : string,
    error?: boolean,
}>();

function handleFocus() {
    isFocused.value = !isFocused.value;
}

const modelValue = defineModel<number | null>("modelValue");

</script>

<template>
    <div class="flex flex-col">
        <label :for="id" class="font-medium">{{ label }}</label>
        <div :class="[
                'flex items-center rounded-lg min-w-0 h-8',
                isFocused ? 'border-[2px] border-spacegrey' : 'border-[1px]',
                error ? 'border-red' : 'border-spacegrey',
            ]">
            <input 
                type="number"
                v-model.number="modelValue"
                :placeholder="`e.g. ${placeholder}`"
                :id="id" 
                :name="id"
                @focus="handleFocus"
                @blur="handleFocus"
                class="flex-1 bg-transparent placeholder:opacity-75 pl-2 focus:outline-none min-w-0 h-8 placeholder:text-spacegrey"
            />
            <span class="relative px-2 text-spacegrey">minutes</span>
        </div>
        
    </div>
</template>