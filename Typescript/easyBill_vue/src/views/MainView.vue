<template>
    <main class="flex h-screen">
        <NavBarProbe2 :class="sidebarOpen ? 'w-64' : ['w-[58px] flex-shrink']" @toggle="toggleSidebar" />
        <div :class="sidebarOpen ? 'h-screen bg-easy-bg w-[calc(100%-245px)]' : 'h-screen bg-easy-bg w-full'">
            <div class="h-screen bg-easy-bg">
                <div v-if="this.$route.name != 'profile'" class="absolute right-48 top-6">
                    <select
                        class="bg-white capitalize ring-1 ring-gray-400 focus:outline-none rounded-lg focus:ring-1 focus:ring-blue-input p-1"
                        v-model="selectedCurrency">
                        <option v-for="(value, key) in tasa" :key="key" :value="key">
                            {{ key }}
                        </option>
                    </select>
                </div>
                <RouterView></RouterView>
            </div>
        </div>
    </main>
</template>

<script>
import NavBarProbe2 from '@/components/navbar/NavBarProbe2.vue';
import { RouterView } from 'vue-router'
import { mapState } from 'vuex';

export default {
    components: {
        NavBarProbe2,
        RouterView
    },
    data() {
        return {
            sidebarOpen: false,
            selectedCurrency: null
        }
    },
    methods: {
        toggleSidebar(bool) {
            this.sidebarOpen = bool;
        }
    },
    computed: {
        ...mapState(['tasa']),
        ...mapState(['currentCurrency'])
    },
    watch: {
        selectedCurrency(newOption) {
            if (newOption) {
                this.$store.commit('setCurrentCurrency', newOption);
            }
        },
        currentCurrency(newCurrency) {
            this.selectedCurrency = newCurrency;
        }
    },
    mounted() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.$router.push('/login');
        }
        this.selectedCurrency = this.currentCurrency;
    }
}
</script>

<style scoped></style>