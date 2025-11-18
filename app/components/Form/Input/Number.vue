<script setup lang="ts">

const { id, label, placeholder, bold, size, width, error } = defineProps<{
    id: string,
    label: string,
    placeholder: string,
    size: "small" | "medium",
    bold: boolean,
    width: string, 
    error?: boolean,
}>();

const modelValue = defineModel<number>("modelValue");

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
        <input
            :id="id"
            :name="id" 
            :placeholder="placeholder"
            type="number"
            v-model.number="modelValue"
            :class="[
                'bg-offwhite placeholder:opacity-75 px-2 border-[1px]  focus:border-[2px] rounded-lg focus:outline-spacegrey h-8 placeholder:text-spacegrey text-center',
                error ? 'border-red' : 'border-spacegrey',
            ]"
        />
    </div>
</template>