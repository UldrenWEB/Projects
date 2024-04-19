<template>
    <div class="w-full">
        <div class="flex items-center justify-between w-auto gap-1 py-2 px-1 border rounded-lg shadow-sm bg-white">
            <div class="flex flex-shrink-0 items-center">
                <img :src="info.src" alt="Payment Icon" class="w-4 h-4">
            </div>
            <div class="flex flex-shrink-0 items-center justify-center">
                <span class="text-xs font-bold font-Poppins">{{ `${((info.amount) *
                    (this.tasa[this.$store.state.currentCurrency].change))?.toFixed(2)}
                    ${this.tasa[this.$store.state.currentCurrency]?.symbol}` }}</span>
            </div>
            <button
                class="px-1 py-1 ml-1 flex justify-center items-center hover:opacity-65 hover:shadow-lg h-4 w-3 text-[6px] font-bold text-white bg-red-500 rounded"
                @click="removePay">
                <span>X</span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import myFetch from '@/service/fetch'
import { setStatus } from '@/states/useStatus'
import { setStatus as isLoading } from '@/states/useBoolean';

export default {
    name: 'IconPay',
    data() {
        return {
        }
    },
    props: {
        amount: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        src: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState(['tasa']),
        info() {
            return {
                amount: this.amount,
                id: this.id,
                src: this.src
            }
        }
    },
    methods: {
        async removePay() {

            this.$emit('remove-pay', {
                id: this.id,
                amount: this.amount,
                src: this.src
            })
            const amount = parseFloat(this.amount);
            this.$store.commit('setRemaining', this.$store.state.remaining + amount)

            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'payment/delete',
                    body: {
                        payment: this.id
                    }
                })

                if (response.message.code == '1' || response.message.code == '2')
                    return setStatus({ code: response.message.code, description: response.message.description })

                return setStatus({ code: 0, description: response.message.description })
            } catch (e) {
                return setStatus({ code: 1, description: e.message })
            } finally {
                isLoading({ value: false })
            }

        }
    }

}
</script>