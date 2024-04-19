<template>
    <div
        class="flex flex-col gap-1 md:grid md:grid-cols-2 md:grid-rows-[0.45fr,0.55] grid-cols-1 py-1 mb-2 mx-4 rounded-lg bg-white overflow-y-scroll md:overflow-hidden">
        <AddCustomer @customer-info="getCustomer" class="flex-grow row-start-1 row-end-2 col-start-1 col-end-2" />
        <AddPayment @payment-created="newPay" :bill="codeBill"
            class="flex-grow row-start-2 row-end-3 col-start-1 col-end-2" />
        <CreateBill @bill-created="getCodeBill" @cancel-bill="cancelBill" :time="time" :date="date" :customer="customer"
            :existsCustomer="isCustomer" :document="document" :idPay="isAmountPay.idPay" :newPay="isAmountPay" :id="id"
            class="flex-grow row-start-1 row-end-3 col-start-2 col-end-2" />
    </div>
</template>

<script>
import AddCustomer from './AddCustomer.vue';
import AddPayment from './AddPayment.vue';
import CreateBill from './CreateBill.vue';

export default {
    name: 'GenerateBill',
    data() {
        return {
            isCustomer: false,
            customer: null,
            time: null,
            date: null,
            id: null,
            document: null,
            codeBill: null,
            amountPay: null,
            idPay: null
        }
    },
    computed: {
        isAmountPay() {
            return {
                amountPay: this.amountPay,
                idPay: this.idPay
            }
        }
    },
    methods: {
        getCustomer({ bool, value, time, date, document, id }) {
            this.isCustomer = bool;
            this.customer = value;
            this.time = time;
            this.date = date;
            this.document = document;
            this.id = id;
        },
        cancelBill({ bool }) {
            this.isCustomer = bool;
            this.customer = null;
        },
        getCodeBill({ code }) {
            this.codeBill = code;
        },
        newPay({ amount, id }) {
            this.amountPay = amount;
            this.idPay = id;
        }
    },
    components: {
        AddCustomer,
        AddPayment,
        CreateBill
    }
}
</script>