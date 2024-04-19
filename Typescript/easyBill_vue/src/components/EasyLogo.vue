<template>
    <div class="flex flex-col items-center justify-center bg-gradient-easy rounded-bl-[5rem] w-full h-full">
        <img class="max-w-screen-lg max-h-36" :src="easyLogo" alt="Logo">
        <p class="text-easy-words text-5xl font-extrabold font-Poppins tracking-wider text-center mt-2">EASYBILL</p>
    </div>
</template>

<script setup lang="ts">
import easyLogo from "../assets/easyLogo.svg"
</script>

<style scoped></style>