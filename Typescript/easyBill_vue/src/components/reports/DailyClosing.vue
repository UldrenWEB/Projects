<template>
    <div class="flex flex-col mx-4 mt-2">
        <div class="mb-1">
            <span class="text-xl text-blue-input font-extrabold font-DM">Daily Closing</span>
        </div>
        <div class="flex flex-row gap-3 mt-1">
            <BoxReport title="Bills" :amount="`${amount}`" />
            <BoxReport title="Balance"
                :amount="`${((balance) * this.tasa[this.$store.state.currentCurrency].change).toFixed(1)} ${this.tasa[this.$store.state.currentCurrency].symbol}`" />
        </div>
        <div class="mt-3 grid grid-cols-2 gap-3 grid-rows-[0.65fr, 0.35fr]">
            <TableReport :obj="bills" :content-default="'No has facturado nada en el dia'"
                class="text-sm col-start-1 col-end-3 row-start-1 row-end-2" />
            <TableReport :obj="methods" :content-default="'No han hecho ni un pago'"
                class="mt-1 text-xs col-start-2 col-end-3 row-start-2 row-end-3" />
            <MyGrafica class="col-start-1 col-end-2 row-start-2 row-end-3" />
        </div>
    </div>
</template>

<script>
import BoxReport from './BoxReport.vue';
import TableReport from './TableReports.vue';
import MyGrafica from './MyGrafica.vue';

import { setStatus } from '../../states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';
import myFetch from '../../service/fetch'

import { mapState } from 'vuex';

export default {
    name: 'DailyClosing',
    data() {
        return {
            bills: [],
            methods: [],
            amount: null,
            balance: null,
        }
    },
    async mounted() {
        try {
            isLoading({ value: true })
            const resumeBill = await myFetch({
                method: 'get',
                endPoint: 'bill/resume'
            })
            const resumePayment = await myFetch({
                method: 'get',
                endPoint: 'payment/resume'
            })

            if (resumePayment.message.code == '1' || resumePayment.message.code == '3') return setStatus({ code: resumePayment.message.code, description: resumePayment.message.description })
            if (resumeBill.message.code == '1' || resumeBill.message.code == '3') return setStatus({ code: resumeBill.message.code, description: resumeBill.message.description })

            this.amount = resumeBill.response.amount;
            this.balance = resumeBill.response.balance;
            this.bills = resumeBill.response.bills;

            this.methods = resumePayment.response;

            // setStatus({ code: resumeBill.message.code, description: resumeBill.message.description })
            return;
        } catch (error) {
            setStatus({ code: 1, description: error.message })
        } finally {
            isLoading({ value: false })
        }
    },
    computed: {
        ...mapState(['tasa'])
    },
    components: {
        BoxReport,
        TableReport,
        MyGrafica
    }
}    
</script>