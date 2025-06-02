<script setup lang="ts">
defineProps<{
    backButton?: boolean;
}>()
</script>
<template>
    <header class="header">
        <h2 class="header__title"><slot /></h2>
    </header>
</template>
<style lang="scss">
.header__title {
    text-align: center;
}
</style>