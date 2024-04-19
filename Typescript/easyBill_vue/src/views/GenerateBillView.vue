<template>
    <div class="flex flex-col h-full mb-4">
        <div class="flex justify-between">
            <div class="mx-3 my-1 flex-grow flex-shrink-0">
                <span class="capitalize text-xs text-[#707EAE] font-DM">Pages / Generate {{ page }}</span>
                <div class="text-blue-input font-DM text-2xl font-extrabold mt-0 mb-0">Generate {{ page }}</div>
            </div>
            <div class="flex items-center mr-4">
                <UserComp :srcImage="srcImage" :name="name" />
            </div>
        </div>
        <GenerateBill class="flex-grow" />
    </div>
</template>

<script>
import GenerateBill from '@/components/bill/GenerateBill.vue';
import UserComp from '@/components/UserComp.vue';
export default {
    name: 'GenerateBillView',
    data() {
        return {
            page: this.$route.name,
            name: '',
            srcImage: ''
        }
    },
    mounted() {
        const userJSON = sessionStorage.getItem('user');
        if (!userJSON) return;
        const user = JSON.parse(userJSON);

        this.name = user.name;
        this.srcImage = user.srcImage;
    },
    components: {
        GenerateBill,
        UserComp
    }
}
</script>