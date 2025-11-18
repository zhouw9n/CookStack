<script setup lang="ts">
    const { isMobile } = defineProps<{
        isMobile: boolean
    }>();
</script>

<template>
    <div class="mx-auto px-2 w-full min-w-[300px] max-w-[1200px]">
        <Header layout="search" :is-mobile="isMobile" />
        <main class="min-h-[calc(100dvh-64px-72px)]">
            My Recipes
        </main>
    </div>
    
    <MobileNavigation v-if="isMobile"/>
</template>