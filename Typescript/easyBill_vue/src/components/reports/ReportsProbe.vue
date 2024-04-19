<template>
    <div class="h-full mx-4 mb-3 mt-2 bg-white rounded-md shadow-md">
        <div>
            <DailyClosing />
        </div>
    </div>
</template>

<script>
import DailyClosing from './DailyClosing.vue';
export default {
    name: 'ReportsProbe',
    data() {
        return {

        }
    },
    components: {
        DailyClosing
    }
}
</script>