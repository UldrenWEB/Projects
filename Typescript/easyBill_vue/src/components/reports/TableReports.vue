<template>
    <div class="h-40 overflow-auto">
        <div v-if="obj.length > 0">
            <table>
                <thead>
                    <tr>
                        <th v-for="(header, index) in headers" :key="index"
                            class="capitalize text-gray-400 font-light text-center w-1/6 border-b p-1">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in updatedRows" :key="index">
                        <td v-for="(item, index) in row" :key="index" class="px-1 py-0.5 font-bold text-center w-1/6">
                            <div v-if="headers[index] === 'logo'" class="flex items-center justify-center">
                                <img class="w-[22%]" :src="item" alt="Icon" />
                            </div>
                            <span v-else>{{ item }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="obj.length <= 0"
            class="flex text-lg items-center justify-center rounded-lg shadow-2xl bg-easy-words text-white mt-4">
            <span class="font-ligth py-1">{{ contentDefault }}</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'TableReports',
    data() {
        return {
            headers: [],
            rows: [],
            originalBalances: [],
        }
    },
    props: {
        obj: {
            type: Array,
            required: true
        },
        contentDefault: {
            type: String,
            default: 'No data to show'
        }
    },
    watch: {
        obj: {
            handler() {
                this.parseObj();
            },
        },
    },
    computed: {
        ...mapState(['tasa']),
        updatedRows() {
            return this.rows.map((row, rowIndex) => {
                const index = this.headers.indexOf('total');
                if (index !== -1) {
                    row[index] = this.calculateTotal(rowIndex);
                }
                return row;
            });
        }
    },
    methods: {
        parseObj() {
            if (Array.isArray(this.obj) && this.obj.length > 0) {
                const mappedObj = this.obj.map(item => {
                    const newItem = { ...item };

                    delete newItem._id;
                    delete newItem.status;
                    delete newItem.payed;
                    delete newItem.created;

                    this.originalBalances.push(newItem.total);

                    return newItem;
                });

                this.headers = Object.keys(mappedObj[0]);

                this.rows = mappedObj.map(item => Object.values(item));
            } else {
                this.headers = [];
                this.rows = [];
                this.originalBalances = [];
            }
        },
        calculateTotal(index) {
            const balance = this.originalBalances[index];
            const result = `${((parseFloat(balance)) * this.tasa[this.$store.state.currentCurrency].change).toFixed(1)} ${this.tasa[this.$store.state.currentCurrency].symbol}`
            return result;
        }
    },
}
</script>