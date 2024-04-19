<template>
    <div
        class="fixed max-w-4xl h-screen left-0 top-0 border border-r-gray-100 overflow-auto transition-all duration-300 ease-in-out flex flex-col items-center">
        <div class="grid grid-cols-2 gap-2 justify-center items-center">
            <img class="max-w-14 max-h-14" :src="logo" alt="EasyBill Logo" />
            <span class="text-gray-400">EasyBill</span>
        </div>
        <div>
            <NavItem v-for="(item, index) in menutree" :key="index" :label="item.label" :icon="item.icon" :depth="0"
                :hideLabels="hideLabels" :data="item.children" />
        </div>

        <div class="w-full flex flex-row justify-center items-center">
            <button @click="toggleLabels" class="max-w-10 p-2 mb-2 bg-blue-500 text-white rounded-lg">To</button>
        </div>
    </div>
</template>


<script>
import NavItem from './NavItem.vue';
import easyLogo from '../../assets/easyLogo.svg'

export default {
    name: 'NavBar',
    data: () => ({
        hideLabels: false,
        logo: easyLogo,
        menutree: [
            {
                label: 'Home',
                icon: 'home',
                children: [
                    { label: 'Opcion 1', children: [{ label: 'Opcion 1.1', children: [{ label: 'Opcion 1.1.1' }] }] },
                    { label: 'Opcion 2' }
                ]
            },
            {
                label: 'Settings',
                icon: 'settings'
            }
        ]
    }),
    components: {
        NavItem
    },
    methods: {
        toggleLabels() {
            this.hideLabels = !this.hideLabels;
        }
    }
}
</script>