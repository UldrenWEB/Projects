<template>
    <div class="rounded-lg bg-[#F4F7FE] flex gap-3 p-2 shadow-lg hover:shadow-inner cursor-default">
        <div class="flex items-center">
            <svg-icon type="mdi" :path="getPathIcon(title)" class="text-blue-input"></svg-icon>
        </div>
        <div class="w-4/5 flex flex-col items-start justify-center">
            <span class="font-light text-easy-words text-xs">{{ title }}</span>
            <span class="text-blue-input font-bold">{{ amount }}</span>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiCurrencyUsd,
    mdiAccountGroup
} from '@mdi/js';

const iconEnum = {
    bills: mdiAccountGroup,
    balance: mdiCurrencyUsd,
}
export default {
    name: 'BoxReport',
    data() {
        return {

        }
    },
    props: {
        title: {
            type: [String, null],
            required: true
        },
        amount: {
            type: [String, null],
            required: true
        },
    },
    methods: {
        getPathIcon(title) {
            if (title.match(/balance/i)) return iconEnum['balance'];

            if (title.match(/bill/i)) return iconEnum['bills'];
        }
    },
    components: {
        SvgIcon
    },

}
</script>