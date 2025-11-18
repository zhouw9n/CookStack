<script setup lang="ts">

const { icon, label } = defineProps<{
    icon: "tag" | "stopwatch",
    label: string | undefined,
}>();
</script>

<template>
    <div class="flex items-center gap-1 px-2 border-[1px] border-orange rounded-lg w-fit h-6 item-center">
        <NuxtImg :src="`/assets/icons/${icon}-fill.svg`" class="size-4"/>
        <span class="text-orange text-small">{{ label }}</span>
    </div>
</template>