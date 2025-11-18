<script setup lang="ts">
    const route = useRoute();

    const navTabs = [
        {to: "/", label: "Home", icon: "/assets/icons/house"},
        {to: "/myrecipes", label: "My Recipes", icon: "/assets/icons/book"},
        {to: "/newrecipe", label: "Add", icon: "/assets/icons/plus-circle"},
        {to: "/favorites", label: "Favorites", icon: "/assets/icons/bookmark"},
    ];

</script>

<template>
  <div class="bottom-0 z-50 sticky bg-offwhite shadow-[0_-4px_10px_0_rgba(23,23,23,0.075)] px-2">
    <div class="flex justify-between items-center h-[72px]">
      <NuxtLink 
        v-for="tab in navTabs"
        :key="tab.to"
        :to="tab.to" 
        class="flex flex-col items-center gap-y-1 w-[72px]"
        >
            <img 
                :src="route.path === tab.to ? `${tab.icon}-fill.svg` : `${tab.icon}.svg`" 
                class="size-8" 
            />
            <p class="text-small">{{ tab.label }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
