<template>
    <template>
        <div v-if="!statusClass"
            class="w-full relative bottom-0 mb-4 animate-slideUp bg-opacity-75 text-white px-4 py-2 rounded shadow-lg text-center max-w-xl mx-auto bg-easy-blue">
            <span>{{ description }}</span>
        </div>
    </template>
</template>

<script>

export default {
    name: 'PopUpBill',
    props: {
        status: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            description: 'Please select a customer'
        }
    },
    computed: {
        statusClass() {
            return this.status;
        }
    }
}
</script>

<style scoped>
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