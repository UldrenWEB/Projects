<template>
    <div class="relative flex justify-center">
        <div v-show="status.description" :class="statusClass"
            class="w-full fixed bottom-0 mb-4 animate-slideUp bg-opacity-75 text-white px-4 py-2 rounded shadow-lg text-center max-w-xl mx-auto">
            {{ status?.description }}
        </div>
    </div>
</template>

<script>

import { computed } from 'vue';
import { status as statusState } from '../states/useStatus';

export default {
    setup() {
        const status = statusState;

        const statusClass = computed(() => {
            switch (parseInt(status.value.code)) {
                case 0:
                    return 'bg-green-500';
                case 1:
                    return 'bg-red-500';
                case 3:
                    return 'bg-yellow-500';
                default:
                    return '';
            }
        });

        return { status, statusClass };
    }
}
</script>

<style>
.animate-slideUp {
    animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>