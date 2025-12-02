<script setup lang="ts">

const { category, active } = defineProps<{
    category: string,
    active: boolean | undefined,
}>();

</script>

<template>
    <div :class="[active ? ' bg-orange border-offwhite' : ' bg-offwhite border-orange', 'px-2 rounded-lg border-[1px]  w-fit cursor-pointer']">
        <span :class="[active ? 'text-offwhite': 'text-orange', 'text-small']">{{ category }}</span>
    </div>
</template>


