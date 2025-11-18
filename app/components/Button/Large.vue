<script setup lang="ts">

const { buttonLabel, loading } = defineProps<{
    buttonLabel: string,
    loading?: boolean,
}>();

</script>

<template>
    <button
        type="button"
        class="flex justify-center items-center bg-spacegrey px-2 py-1 rounded-lg h-8 text-offwhite"
    >
        <svg v-if="loading" class="border-2 border-b-transparent rounded-full size-5 animate-spin"></svg>
        <span v-else>{{ buttonLabel }}</span>
    </button>
</template>