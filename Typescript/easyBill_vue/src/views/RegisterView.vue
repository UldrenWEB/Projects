<script setup lang="ts">
import RegisterProbe from '../components/RegisterProbe.vue';
import EasyLogo from '../components/EasyLogo.vue'
import EasyLogoSmall from '../components/EasyLogoSmall.vue'
</script>

<template>
    <main class="h-screen md:grid md:grid-cols-login overflow-hidden">
        <EasyLogoSmall class="md:hidden" />
        <RegisterProbe />
        <EasyLogo class="hidden md:flex" />
    </main>
</template>


<style scoped>
.no-scroll {
    overflow: hidden;
}
</style>