<script setup lang="ts">
import type { Instruction } from '~~/shared/types/recipe';


const { removable, id, index } = defineProps<{
    removable: boolean,
    id: number,
    index: number,
    error?: boolean,
}>();

const emit = defineEmits<{
    (e: "remove", id: number): void;
}>();

function handleRemove(id: number) {
    emit("remove", id);
}

const modelValue = defineModel<Instruction>("modelValue");
const instructionVal = ref("");

watch([instructionVal], () => {
    modelValue.value = {
        id,
        instruction: instructionVal.value,
    }
});
</script>

<template>
    <div class="flex gap-1">
        <FormInputTextarea 
            :id="'step' + id"
            :label="'Step ' + (index + 1)"
            placeholder="..."
            size="small"
            :bold="false"
            :error="error"
            width="flex-1"
            v-model="instructionVal"
        />

        <button
            type="button"
            :class="['flex items-center mt-4', removable ? '' : 'pointer-events-none opacity-0']"
            @click="handleRemove(id)"
        >
            <NuxtImg src="/assets/icons/close.svg" class="size-4" />
        </button>
    </div>
</template>
