<script setup>
const state = ref()

// Allowed states: "scanning", scan-successfull, error (defaults to v-else)
state.value = 'scanning'
</script>
<template>
    <div v-if="state == 'scanning'">
        <p>Scanning page</p>
    </div>
    <div v-else-if="state == 'scan-successfull'">
        <p>Scan scan successfull page</p>
    </div>
    <div v-else>
        <p>Error page</p>
    </div>
</template>
<style lang="scss">
</style>