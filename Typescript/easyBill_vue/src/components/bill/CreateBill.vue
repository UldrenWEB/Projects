<template>
    <div class="mx-2 h-full">
        <div v-show="!isCustomer.bool"
            class="w-full z-50 relative mt-48 mx-auto animate-slideUp bg-opacity-60 text-white px-4 py-2 rounded shadow-lg text-center max-w-sm bg-easy-blue">
            <span>Please Select a Customer</span>
        </div>
        <div v-show="isCustomer.bool" :class="{ 'blur-sm': !isCustomer.bool }" class="mt-2">
            <div class="flex flex-row justify-between mb-2">
                <span class="text-blue-input font-DM font-bold my-1 text-xl opacity-80">
                    Bill Summary
                </span>
                <button
                    class="hover:opacity-70 font-DM focus:outline-none focus:shadow-outline text-white bg-btn-easy rounded-xl px-4 py-1 active:text-easy-blue"
                    @click="cancelBill">
                    Cancel Bill
                </button>
            </div>
            <hr>
            <div class="mt-1">
                <bill-info :customer="isCustomer.cust" :date="date" :hour="isCustomer.time" :code="isCustomer.code" />
            </div>
            <div class="mt-3 flex flex-wrap overflow-y-auto h-64">
                <my-table :customer="isCustomer.bool" @item-added="getItem" />
            </div>
            <div class="grid grid-cols-[0.60fr,0.40fr] gap-2 h-full">

                <div class="w-full grid grid-cols-2 auto-cols-auto gap-2 h-4 mt-2">
                    <IconPay v-for="(pay, index) in pays" :key="`${pay.id}${index}`" :src="pay.src" :id="pay.id"
                        :amount="pay.amount" @remove-pay="removePay" />
                </div>
                <div class="flex flex-col">
                    <side-bar-total />
                    <button
                        :class="{ 'bg-btn-easy': confirmBtn, 'hover:bg-opacity-70': confirmBtn, 'bg-easy-words': !confirmBtn }"
                        class="mt-1 text-sm font-DM focus:outline-none focus:shadow-outline text-white rounded-xl px-4 py-1 active:text-easy-blue"
                        @click="submitValues">Confirm Bill
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import MyTable from './MyTable.vue'
import BillInfo from './BillInfo.vue'
import SideBarTotal from './SideBarTotal.vue'
import myFetch from '@/service/fetch'
import { setStatus } from '@/states/useStatus'
import { setStatus as isLoading } from '@/states/useBoolean';
import { mapState } from 'vuex'
import IconPay from './IconPay.vue'

export default {
    name: 'CreateBill',
    data() {
        return {
            confirmBtn: false,
            code: null,
            amount: null,
            tax: null,
            total: null,
            existsPay: false,
            pays: [],
            price: null,
            objInfo: {
                amount: null,
                id: null,
                srcI: null
            }
        }
    },
    props: {
        id: {
            type: String,
        },
        existsCustomer: {
            type: Boolean,
            default: false
        },
        customer: {
            type: String,
            default: ''
        },
        date: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
        document: {
            type: String,
            default: ''
        },
        newPay: {
            type: Object,
            default: () => ({ amountPay: 0, idPay: '' })
        },
        idPay: {
            type: String,
            default: ''
        },

    },
    watch: {
        newPay: 'addIconPay',
        time: 'createBill',
        remaining(newValue) {
            if (newValue <= 0.02) {
                this.confirmBtn = true;
            } else {
                this.confirmBtn = false;
            }
        }
    },
    computed: {
        ...mapState(['remaining']),
        isCustomer() {
            return {
                bool: this.existsCustomer,
                cust: this.customer,
                document: this.document,
                code: this.code,
                date: this.date,
                time: this.time,
                id: this.id
            };
        },
    },
    methods: {
        async createBill() {
            const values = this.isCustomer;
            const userJSON = sessionStorage.getItem('user');

            if (!userJSON) return setStatus({ code: 1, description: 'User not found, error' })
            const user = JSON.parse(userJSON);

            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'bill/create',
                    body: {
                        customer: values.id,
                        cashier: user.id,
                        date: values.date,
                        time: values.time,
                    }
                })

                if (response.message.code == '1' || response.message.code == '3') return setStatus({ code: response.message.code, description: response.message.description })
                if (!response.response._id) return setStatus({ code: 1, description: 'Bill not created' })

                this.code = response.response.code;
                this.$store.commit('setBill', { code: this.code, id: response.response._id })
            } catch (error) {
                return setStatus({ code: 1, description: error.message })
            } finally {
                isLoading({ value: false })
            }
        },
        async submitValues() {
            if (!this.confirmBtn) return;

            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'bill/status',
                    body: {
                        bill: this.$store.state.bill.id
                    }
                })
                if (response.message.code == '1' || response.message.code == '3')
                    return setStatus({ code: response.message.code, description: response.message.description })

                setStatus({ code: 0, description: 'Bill confirmed successfully' })

            } catch (error) {
                return setStatus({ code: 1, description: error.message })
            } finally {
                this.pays = [];
                this.canceled();
                isLoading({ value: false })
            }
        },
        async addIconPay() {
            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'payment/byId',
                    body: {
                        payment: this.idPay
                    }
                })
                if (response.message.code == '1' || response.message.code == '3')
                    return setStatus({ code: response.message.code, description: response.message.description })

                this.objInfo = {
                    amount: this.newPay.amountPay,
                    id: this.idPay,
                    src: response.response.paymentMethod.srcImage
                }
                this.pays.push(this.objInfo);
                this.existsPay = true;
                return;
            } catch (error) {
                return setStatus({ code: 1, description: error.message })
            } finally {
                isLoading({ value: false })
            }
        },
        removePay(data) {
            const index = this.pays.findIndex(item => item.id === data.id);
            if (index !== -1) {
                this.pays.splice(index, 1);
            }
        },
        resetTotal() {
            this.$store.commit('setRemaining', null);
            this.$store.commit('setTotals', {
                total: 0,
                subtotal: 0,
                totalTaxes: 0,
                amount: 0
            });
        },

        canceled() {
            this.confirmBtn = false;
            this.resetTotal();
            this.$store.commit('setBill', null);
            this.$emit('cancel-bill', { bool: false });
        },
        async cancelBill() {
            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'bill/cancel',
                    body: {
                        bill: this.$store.state.bill.id
                    }
                })
                if (response.message.code == '1' || response.message.code == '3')
                    return setStatus({ code: response.message.code, description: response.message.description });

                this.$store.commit('setBill', null);
                this.canceled();
            } catch (error) {
                return setStatus({ code: 1, description: error.message })
            } finally {
                isLoading({ value: false })
            }
        },
        getItem(data) {
            console.log(data)
            return {
                price: data.price,
                total: data.total,
                tax: data.tax,
                description: data.description,
                amount: data.amount
            }
        },
        isConfirm() {
            this.confirmBtn = true;
        }
    },
    components: {
        BillInfo,
        MyTable,
        SideBarTotal,
        IconPay
    }
}
</script>
