<script setup lang="ts" async>
  
  // Detects device for layout purpose
  const device = useDevice();
  const isMobile = device.isMobile;

  
  const recipeStore = useRecipeStore();
  await recipeStore.getAllRecipes();

  
</script>

<template>
  <div class="bg-offwhite mx-auto min-h-[100dvh] font-montserrat">
    <NuxtPage :is-mobile="isMobile" />
  </div>
</template>

<style global>
  @font-face {
    font-family: "Montserrat";
    src: url("/assets/fonts/Montserrat-Variable.woff2") format("woff2");
  }

body{
    background-color: #f1f1f1;
  }


  /* Chrome, Safari, Edge */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>