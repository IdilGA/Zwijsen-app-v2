<script setup>
import Header from "~/components/Header.vue";
import Button from "~/components/Button.vue";
</script>
<template>
  <Header>Home</Header>
  <div class="home-buttons">
    <Button @click="$router.push('/scan')"> Scan toetsen </Button>
    <Button @click="$router.push('/scans')">Bekijk eerdere scans</Button>
  </div>
</template>
<style lang="scss">
.home-buttons {
  display: flex;
  flex-direction: column;
}
</style>
