<script setup lang="ts">
import LoginProbe from '../components/LoginProbe.vue';
import EasyLogo from '../components/EasyLogo.vue';
import EasyLogoSmall from '../components/EasyLogoSmall.vue';
</script>

<template>
    <main class="h-screen md:grid md:grid-cols-login no-scroll">
        <EasyLogoSmall class="md:hidden" />
        <LoginProbe />
        <EasyLogo class="hidden md:flex" />
    </main>
</template>

<style scoped>
.no-scroll {
    overflow: hidden;
}
</style>