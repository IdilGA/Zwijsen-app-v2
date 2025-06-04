<script setup lang="ts">
const props = defineProps<{
    type: string;
    disabled?: boolean;
}>()
</script>
<template>
    <button :class="type" class="btn" :disabled="disabled">
        <slot></slot>
    </button>
</template>
<style lang="scss">
.btn {
    width: 100%;
    padding: 12px;
    color: var(--color-text);
    font-weight: bold;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 12px;
    &.primary {
        background-color: var(--color-primary);
    }
    &.secondary {
        background-color: var(--color-secondary);
    }
    &.light {
        background-color: var(--color-light);
    }
}
</style>