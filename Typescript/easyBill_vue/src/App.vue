<template>
  <main>
    <MyLoader />
    <RouterView />
    <StatusPopUp />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import StatusPopUp from './components/StatusPopUp.vue';
import MyLoader from './components/MyLoader.vue';
</script>

<style scoped></style>