<template>
     <div class="flex flex-col h-full mb-2 ">
        <div class="mt-3 mx-4">
            <span class="capitalize text-xs text-[#707EAE] font-DM">Pages / {{ $route.name }}</span>
            <div class="text-blue-input font-DM text-2xl font-extrabold mt-1 mb-0 capitalize"> {{ $route.name }}</div>
        </div>
        <ProfileProbe class="flex-grow" />
    </div>
</template>

<script setup>
import ProfileProbe from '../components/profile/ProfileProbe.vue';
</script>