<template>
    <div class="bg-white mx-4 flex flex-col gap-1 rounded-md">
        <div class="">
            <div class="mt-3 flex">
                <ReportInfo class="m-4" :srcImage="src" :title="title" :amount="`${totalC}`" />
                <ReportInfo class="m-4" :srcImage="src2" :title="title2" :amount="`${((totalP ?? 0) *
                    (this.tasa[this.$store.state.currentCurrency].change))?.toFixed(2)}
                ${this.tasa[this.$store.state.currentCurrency]?.symbol}`" />
                <ReportInfo class="m-4" :srcImage="src3" :title="title3" :amount="`${totalCa}`" />
            </div>
        </div>
        <div class="h-full rounded-lg shadow-sm w-full bg-white p-2">
            <MyBills />
        </div>
    </div>
</template>

<script>
import MyBills from './MyBills.vue';
import ReportInfo from './ReportInfo.vue';
import customer from '../../assets/Icon.svg';
import pays from '../../assets/icon2.svg';
import cashier from '../../assets/icon3.svg';
import MyFetch from '../../service/fetch'
import { setStatus } from '@/states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';
import { mapState } from 'vuex';
export default {
    components: {
        MyBills,
        ReportInfo
    },
    data() {
        return {
            src: customer,
            title: 'customers',
            totalC: 0,

            src2: pays,
            title2: 'total payments',
            totalP: null,

            src3: cashier,
            title3: 'cashier',
            totalCa: 0,
        }
    },
    async mounted() {
        try {
            isLoading({ value: true })
            const response = await MyFetch({
                method: 'get',
                endPoint: 'payment/resumeAll',
            })
            if (response.message.code == '1' || response.message.code == '2')
                return setStatus({ code: response.message.code, description: response.message.description })

            this.totalC = response.response.customers
            this.totalP = response.response.total
            this.totalCa = response.response.cashiers
        } catch (error) {
            return setStatus({ code: 1, description: 'No existen facturas en los registros' })
        } finally {
            isLoading({ value: false })
        }
    },
    computed: {
        ...mapState(['tasa']),
    }
}
</script>