<template>
    <div class="h-screen w-full overflow-hidden">
        <div class="absolute h-full w-full transition-none bg-black">
            <canvas id="canvas3d" ref="canvas3d" class="w-full"></canvas>
        </div>

        <div class="flex items-center justify-center w-full h-full z-10 backdrop-blur-sm pointer-events-none flex-col">

            <div class="flex items-center justify-center gap-4 ">
                <EasyLogoSmall />
                <p class="text-white relative text-7xl font-bold font-Poppins tracking-wider">EASYBILL</p>
            </div>

            <div class="flex mt-28 gap-4 w-1/4 justify-around z-10 pointer-events-auto">

                <router-link to="/login" class="flex justify-center items-center">
                    <p
                        class="bg-easy-blue bg-opacity-50 text-center text-white block font-light font-Poppins px-6 py-1 rounded-xl text-lg w-full min-w-28 hover:opacity-65 hover:cursor-pointer">
                        Login
                    </p>
                </router-link>
                <router-link to="/register" class=" flex justify-center items-center">
                    <p
                        class="block font-light bg-opacity-50 font-Poppins px-6 py-1 rounded-xl text-lg w-full min-w-28 hover:opacity-65 hover:cursor-pointer bg-white text-easy-blue">
                        Register</p>
                </router-link>
            </div>

            <FooterProbe />

        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { Application } from '@splinetool/runtime'
import FooterProbe from '../components/FooterProbe.vue'
import EasyLogoSmall from '@/components/EasyLogoSmall.vue'

export default {
    setup() {
        const canvas3d = ref(null)

        onMounted(() => {
            const app = new Application(canvas3d.value)
            app.load('../assets/scene.splinecode')
        })

        return {
            canvas3d,
        }
    },
    components: {
        FooterProbe,
        EasyLogoSmall
    }
}
</script>

<style></style>