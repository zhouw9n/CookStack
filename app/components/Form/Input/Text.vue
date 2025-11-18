<script setup lang="ts">

const { id, label, placeholder, bold, size, width, error } = defineProps<{
    label: string,
    placeholder: string,
    id: string,
    size: "small" | "medium",
    bold: boolean,
    width: string,
    error?: boolean;
    
}>();

const modelValue = defineModel<string | null>("modelValue");

</script>

<template>
    <div :class="['flex flex-col', width]">
        <label 
            :for="id" 
            :class="[
                size === 'small' ? 'text-small' : 'text-medium',
                bold ? 'font-medium' : 'font-regular',  
            ]">
                {{ label }}
            </label>
        <input 
            :id="id"
            :name="id"
            :placeholder="`e.g. ${placeholder}`"
            v-model="modelValue"
            :class="[
                'bg-offwhite placeholder:opacity-75 px-2 border-[0.75px] focus:border-[1px] rounded-lg focus:outline-spacegrey h-8 placeholder:text-spacegrey', 
                error ? 'border-red' : 'border-spacegrey'
            ]"
        />
    </div>
</template>