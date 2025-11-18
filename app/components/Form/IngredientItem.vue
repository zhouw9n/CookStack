<script setup lang="ts">
import { UNIT_OPTIONS } from '~~/shared/constants/units';
import type { Ingredient } from '~~/shared/types/recipe';

const { removable, id, errorAmount, errorUnit, errorItem } = defineProps<{
    id: number,
    removable: boolean,
    errorAmount?: boolean,
    errorUnit?: boolean,
    errorItem?:boolean,    
}>();

const emit = defineEmits<{
    (e: "remove", id: number): void;
}>();

function handleRemove(id: number) {
    emit("remove", id);
}
const modelValue = defineModel<Ingredient>('modelValue');
const amountVal = ref()
const unitVal = ref("")
const itemVal = ref("")


watch([amountVal, unitVal, itemVal], () => {
    modelValue.value = {
        id,
        amount: amountVal.value,
        unit: unitVal.value,
        item: itemVal.value,
    }
});


</script>

<template>
    <div class="flex gap-1">
        <!--AMOUNT-->
        <FormInputNumber 
            :id="'amount' + id" 
            label="Amount" 
            placeholder="0" 
            size="small" 
            :bold="false"
            :error="errorAmount"  
            width="w-[50px]" 
            v-model="amountVal"
        />
        <!--UNIT-->
        <FormInputDropdown 
            :id="'unit' + id"
            label="Unit" 
            size="small" 
            width="w-[80px]" 
            :bold="false" 
            :error="errorUnit"
            :options="UNIT_OPTIONS" 
            v-model="unitVal"
        />
        <!--ITEM-->
        <FormInputText 
            :id="'item' + id" 
            label="Item" 
            placeholder="Eggs" 
            size="small" 
            width="flex-1 max-w-[450px]"
            :bold="false"  
            :error="errorItem"
            v-model="itemVal"
         />
        <!--REMOVE BUTTON-->
        <button 
            type="button"
            :class="['flex items-center mt-4', removable ? '' : 'pointer-events-none opacity-0']"
            @click="handleRemove(id)"
            >
            <NuxtImg src="/assets/icons/close.svg" class="size-4"/>
        </button>
    </div>
</template>