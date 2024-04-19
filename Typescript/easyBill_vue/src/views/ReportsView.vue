<template>
    <main>
        <div class="flex flex-col h-screen mb-4">
            <div class="flex justify-between">
                <div class="mx-3 my-1 flex-grow flex-shrink-0">
                    <span class="capitalize text-xs text-[#707EAE] font-DM">Pages / {{ page }}</span>
                    <div class="capitalize text-blue-input font-DM text-2xl font-extrabold mt-0 mb-0">{{ page }}</div>
                </div>
                <div class="flex items-center mr-4">
                    <UserComp :srcImage="srcImage" :name="name" />
                </div>
            </div>
            <ReportsProbe class="flex-grow" />
        </div>
    </main>
</template>

<script>
import ReportsProbe from '@/components/reports/ReportsProbe.vue';
import UserComp from '@/components/UserComp.vue';

export default {
    name: 'ReportsView',
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
        ReportsProbe,
        UserComp
    }
}
</script>