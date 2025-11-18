<script setup lang="ts">

const { id, label, placeholder, bold, size, width, error } = defineProps<{
    id: string,
    label: string,
    placeholder: string,
    bold: boolean,
    size: "small" | "medium",
    width: string,
    error?: boolean,
}>();

const modelValue = defineModel<string | null>("modelValue");

</script>

<template>
    <div :class="['flex flex-col', width]">
        <label 
            :for="id" 
            :class="[
                size === 'small' ? 'text-small' : 'text-medium',
                bold ? 'font-medium' : 'font-regular'
            ]">
                {{ label }}
            </label>
        <textarea
            :id="id"
            :name="id"
            :placeholder="placeholder"
            v-model="modelValue"
            :class="[
                'bg-offwhite placeholder:opacity-75 p-2 border-[0.75px]  focus:border-[1px] rounded-lg focus:outline-spacegrey h-24 placeholder:text-spacegrey resize-none',
                error ? 'border-red' : 'border-spacegrey',
            ]"
        ></textarea>
    </div>
</template>

