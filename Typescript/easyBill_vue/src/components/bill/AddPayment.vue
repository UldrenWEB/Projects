<template>
    <div class="ml-4 my-2 border-r-2 rounded-tr-lg rounded-br-lg">
        <div class="text-blue-input font-DM font-bold mt-1 mb-1 text-xl opacity-80">Add Payments</div>
        <div class="grid grid-cols-[0.75fr,0.25fr] gap-2">
            <div>
                <label for="select"
                    class="text-left text-blue-input font-normal font-Poppins w-full mb-2 mt-3 text-xs capitalize hover:text-easy-words">
                    Payment method:
                </label>
                <div>
                    <v-select class="" v-model="select" :hint="`${select.description}`" :items="items" item-title="type"
                        item-value="value" label="Select" persistent-hint return-object single-line
                        @change="updateCurrency"></v-select>
                </div>
            </div>
            <div class="flex flex-col items-center">
                <span
                    class="text-blue-input font-normal font-Poppins mt-1 mb-2 text-xs capitalize hover:text-easy-words">
                    Currency:
                </span>

                <div>
                    <svg-icon v-if="select.currency" type="mdi" :path="getPathIcon(select.currency.representation)"
                        class="text-blue-input"></svg-icon>
                </div>
            </div>
        </div>
        <form ref="myForm" @submit.prevent="submitValues" class="grid flex-col mx-2 flex-grow grid-cols-2 mt-3">
            <GeneratorInput v-for="(input, index) in options" :key="index" :id="input.id" :label="input.label"
                :type="input.type" :value="input.value" :pattern="input.pattern" :placeholder="input.placeholder"
                @input="updateValue" :selectOptions="input.selectOptions" @input-change="handleSelectChange" />
            <div class="flex col-span-2 justify-center mb-4">
                <button
                    class="hover:opacity-70 font-DM focus:outline-none focus:shadow-outline text-white bg-btn-easy rounded-xl px-4 py-1 active:text-easy-blue"
                    @click="submitValues">
                    Add Payment
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import GeneratorInput from '@/components/GeneratorInput.vue';
import { setStatus } from '@/states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';
import myFetch from '../../service/fetch'

import SvgIcon from '@jamescoyle/vue-icon';
import {
    mdiCurrencyUsd,
    mdiCurrencyEur,
    mdiCreditCard,
    mdiContactlessPayment,
    mdiCurrencyBtc,
    mdiAlertRhombus
} from '@mdi/js';

const iconEnum = {
    usd: mdiCurrencyUsd,
    eur: mdiCurrencyEur,
    card: mdiCreditCard,
    trans: mdiContactlessPayment,
    uni: mdiCurrencyBtc,
    alert: mdiAlertRhombus
}

const repreEnum = {
    '$': 'usd',
    '€': 'eur',
    'Bs': 'uni',
    'alert': 'alert'
}

export default {
    name: 'AddPayment',
    data() {
        return {
            isButtonClicked: false,
            select: { type: 'default', currency: { representation: 'alert' }, value: 'default', description: 'Select a payment method' },
            values: {},
            options: [
                {
                    id: 'amount',
                    label: 'amount',
                    type: 'number',
                    value: '',
                    placeholder: '',
                    pattern: ''
                },
                {
                    id: 'reference',
                    label: 'payment reference',
                    type: 'text',
                    value: '',
                    placeholder: 'sd4f4cs',
                    pattern: '^[0-9a-zA-Z]+$'
                },
            ],
            items: [],
            objDefault: { type: '' },
        }
    },
    async created() {
        try {
            isLoading({ value: true })
            const response = await myFetch({
                method: 'get',
                endPoint: 'payment/methods'
            })

            if (response.message.code == '1' || response.message.code == '3')
                return setStatus({ code: response.message.code, description: response.message.description })

            this.items = response.response.map(item => {
                return {
                    type: item.description,
                    currency: item.currency,
                    value: item._id,
                    description: `${Object.values(typeof item.account === 'object' ? item.account : this.objDefault).join(', ')}`
                }
            })
            this.isButtonClicked = false;
            return;
        } catch (error) {
            return setStatus({ code: 1, description: error.message })
        } finally {
            isLoading({ value: false })
        }

    },
    methods: {
        updateCurrency() {
            this.currency = this.select.currency;
        },
        getPathIcon(representation) {
            return iconEnum[repreEnum[representation]];
        },
        updateValue({ id, value }) {
            this.values[id] = value;
        },
        handleSelectChange(data) {
            this.selectedOption = data.value;
        },
        async submitValues() {
            if (this.isButtonClicked) return;
            this.isButtonClicked = true;

            const bill = this.$store.state.bill;
            if (!bill) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'Please enter the customer first' });
            }

            const total = this.$store.state.totals?.total;
            if (!total) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'Please enter the products first' });
            }

            const values = this.values;

            if (
                !values.amount ||
                !values.reference ||
                !this.select
            ) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'All fields are required' });
            }

            if (this.select.value === 'default') {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'Please select a payment method' })
            }

            if (values.amount > this.$store.state.remaining) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'The amount exceeds the remaining amount' })
            }

            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'payment/create',
                    body: {
                        bill: bill.id,
                        amount: values.amount,
                        reference: values.reference,
                        paymentMethod: this.select.value
                    }
                })
                isLoading({ value: false })

                if (response.message.code == '1' || response.message.code == '3') {
                    console.log('Aqui hubo un codigo de estado erroneo')
                    this.isButtonClicked = false;
                    return setStatus({ code: response.message.code, description: response.message.description })
                }

                const remaining = this.$store.state.remaining - values.amount;
                if (remaining <= 0.09) {
                    this.$store.commit('setRemaining', 0)
                } else {
                    this.$store.commit('setRemaining', remaining)
                }

                this.$emit('payment-created', { amount: values.amount, id: response.response._id })

                this.isButtonClicked = false;
                this.$refs.myForm.reset();
                // return setStatus(obj)
            } catch (e) {
                this.isButtonClicked = false;
                isLoading({ value: false })
                return setStatus({ code: 1, description: e.message })
            }
        },
    },
    components: {
        GeneratorInput,
        SvgIcon,
    }
}
</script>

<style>
/* .v-input__control {
    max-width: 15em;
} */

.v-select .v-field .v-text-field__prefix,
.v-select .v-field .v-text-field__suffix,
.v-select .v-field .v-field__input,
.v-select .v-field.v-field {
    cursor: pointer;
    padding: 4px;
    max-height: 2em;
    align-items: center;
    display: flex;
}

.v-text-field .v-input__details {
    padding-inline: 8px;
}
</style>