<!-- Componente para mostrar por encima del login el logo svg -->

<template>
    <div class="flex justify-center mt-5 mb-2">
        <router-link to="/">
            <img class="max-w-sm max-h-[100px]" :src="easyLogo" alt="Logo" />
        </router-link>
    </div>
</template>

<script>
import easyLogo from '../assets/easyLogo.svg';
export default {
    name: 'EasyLogoSmall',
    data(){
        return{
            easyLogo
        }
    }
}
</script>
