<script setup lang="ts">
const props = defineProps<{
    type: string;
    disabled?: boolean;
}>()
</script>
<template>
    <button :class="type" :disabled="disabled">
        <slot></slot>
    </button>
</template>