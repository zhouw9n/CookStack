<script setup lang="ts">

</script>

<template>
    <div class="flex">
        <div class="relative w-full">
            <img 
                src="/assets/icons/search.svg" 
                class="left-2 absolute my-2 size-4" 
                />
            <input 
                placeholder="Start searching..."
                type="text"
                name="searchquery"
                class="bg-offwhite placeholder:opacity-75 py-2 pr-2 pl-8 border-[0.75px] border-spacegrey focus:border-[1px] rounded-lg focus:outline-spacegrey w-full h-8 placeholder:text-spacegrey"
            />
        </div>
    </div>
</template>