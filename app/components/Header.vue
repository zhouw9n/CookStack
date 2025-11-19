<script setup lang="ts">

const {layout, isMobile} = defineProps<{
    isMobile: boolean,
    layout: "search" | "return",
    returnLabel?: string,
    returnTo?: string,
}>();


</script>

<template>

    
    <header v-if="layout === 'return'" 
        class="flex items-center"
        >
        <div class="flex-1 py-4">
            <NuxtLink :to="returnTo" class="flex items-center gap-2 w-fit">
                <NuxtImg src="/assets/icons/arrow.svg" class="size-4" />
                <span>{{ returnLabel }}</span>
            </NuxtLink>
        </div>
        
        <div v-if="!isMobile" class="ml-2">
            <ButtonSmall icon="list"  />
        </div>

    </header>
    
    <header v-if="layout === 'search'" 
        class="flex justify-between py-4"
        >
        <div class="flex-1 lg:max-w-[610px]">
            <SearchBar />
        </div>
        <div v-if="!isMobile" class="ml-2">
            <ButtonSmall  icon="list" />
        </div>
    </header>
</template>