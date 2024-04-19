<template>
    <v-card class="h-screen relative block">
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent mini-variant expand-on-hover
                @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <v-list style="margin-bottom: 1em;">
                    <v-list-item :prepend-avatar="logo">
                        <template v-slot:title>
                            <div :class="['text-xl', 'font-bold', 'text-blue-input']">EasyBill</div>
                        </template>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list density="compact" nav>

                    <v-list-item v-for="(item, index) in options" :key="index" :value="item.label"
                        @click="$router.push(item.to)">

                        <template v-slot:prepend>
                            <svg-icon type="mdi" :path="getPathIcon(item.icon)"
                                class="mr-3 text-easy-words hover:text-blue-input ">
                            </svg-icon>
                        </template>
                        <template v-slot:title>
                            <div :class="['text-[16px]', 'font-DM', 'text-easy-words', 'hover:text-easy-blue']">{{
                item.label }}</div>
                        </template>

                    </v-list-item>
                </v-list>

                <v-list style="position: absolute; bottom: 0; width: 100%; z-index: 1000">
                    <v-divider></v-divider>

                    <v-list-item value="logout" @click="logout">
                        <template v-slot:prepend>
                            <svg-icon type="mdi" :path="getPathIcon('logout')" class="mr-3 text-blue-input">
                            </svg-icon>
                        </template>
                        <template v-slot:title>
                            <div :class="['text-[16px]', 'font-DM', 'text-easy-words']">Logout</div>
                        </template>
                    </v-list-item>
                </v-list>

            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<style module></style>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { setStatus } from '../../states/useStatus'

import {
    mdiHomeVariant,
    mdiCog,
    mdiChevronDown,
    mdiAccount,
    mdiWeatherSunny,
    mdiWeatherNight,
    mdiLogout,
    mdiPoll,
    mdiClipboardAccount,
    mdiInvoiceTextPlus
} from '@mdi/js';
import easyLogo from '../../assets/easyLogo.svg'
import 'vuetify/styles'

const iconEnum = {
    home: mdiHomeVariant,
    settings: mdiCog,
    expand_more: mdiChevronDown,
    user: mdiAccount,
    sol: mdiWeatherSunny,
    luna: mdiWeatherNight,
    logout: mdiLogout,
    poll: mdiPoll,
    profile: mdiClipboardAccount,
    bill: mdiInvoiceTextPlus
}

export default {
    data() {
        return {
            drawer: true,
            rail: true,
            logo: easyLogo,
            options: [
                { label: 'Dashboard', icon: 'home', to: '/dashboard' },
                { label: 'Reports', icon: 'poll', to: '/reports' },
                { label: 'Profile', icon: 'profile', to: '/profile' },
                { label: 'Generate Bill', icon: 'bill', to: '/bill' }
            ]
        }
    },
    methods: {
        getPathIcon(icon) {
            return iconEnum[icon];
        },
        logout() {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            setStatus({ code: 0, description: 'Closed session with successful' })
            this.$router.push('/login');
        },
        handleMouseEnter() {
            // console.log('El mouse está sobre el v-navigation-drawer');
            this.$emit('toggle', true)
            // Aquí puedes ejecutar cualquier método que necesites cuando el mouse entra en el v-navigation-drawer
        },
        handleMouseLeave() {
            // console.log('El mouse ha salido del v-navigation-drawer');
            this.$emit('toggle', false)
            // Aquí puedes ejecutar cualquier método que necesites cuando el mouse sale del v-navigation-drawer
        },
        handleClick() {
            this.rail = true;
            // console.log('Has hecho click en el v-navigation-drawer');
            this.$emit('toggle', true)
        }
    },
    components: {
        SvgIcon,
    }
}
</script>
