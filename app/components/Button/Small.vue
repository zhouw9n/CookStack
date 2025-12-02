<script setup lang="ts">

const { icon } = defineProps<{
    icon: "bookmark-white" | "bookmark-fill-white" | "close" | "close-white" | "edit" | "filter" | "list",                                                  
}>();

</script>

<template>
    <button class="flex justify-center items-center bg-spacegrey rounded-lg size-8 cursor-pointer">
        <NuxtImg 
            :src="`/assets/icons/${icon}.svg`" 
            class="size-4"
        />
    </button>
</template>