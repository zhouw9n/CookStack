<script setup lang="ts">
  
  // Detects device for UI layout
  const device = useDevice();
  const isMobile = device.isMobile;

  // Initialize Store with first fetch
  const recipeStore = useRecipeStore();
  await recipeStore.getAllRecipes();


  
</script>

<template>
  <div class="bg-offwhite mx-auto min-h-[calc(100dvh-72px)] font-montserrat">
    <NuxtPage :is-mobile="isMobile" />
  </div>
  <MobileNavigation v-if="isMobile" />
  
</template>


<style global>
  /* FONT IMPORT */
  @font-face {
    font-family: "Montserrat";
    src: url("/assets/fonts/Montserrat-Variable.woff2") format("woff2");
  }

  /* GLOBAL STYLING */

  body {
    background-color: #F1F1F1;
  }


  /* Removes number input increment/decrement buttons */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }


  /* Scrollbar Styling (Chrome/Safari/Edge) */
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: #171717;
    border-radius: 2px;
  } 
</style>