<script setup>
import Header from '~/components/Header.vue';
import Button from '~/components/Button.vue';
</script>
<template>
    <Header>Home</Header>
    <div class="home-buttons">
        <Button>Scan toetsen</Button>
        <Button>Bekijk eerdere scans</Button>
    </div>
</template>
<style lang="scss">
.home-buttons {
    display: flex;
    flex-direction: column;
}
</style>