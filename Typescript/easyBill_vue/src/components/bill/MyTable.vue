<template>
    <v-data-table-virtual :headers="headers" :items="desserts" :sort-by="[{ key: 'item', order: 'asc' }]"
        hide-default-footer>
        <template v-slot:top>
            <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ props }">
                        <button
                            class="absolute left-0 right-0 hover:opacity-70 font-DM focus:outline-none focus:shadow-outline text-white bg-btn-easy rounded-xl px-4 py-1 active:text-easy-blue"
                            dark v-bind="props">
                            Add Item
                        </button>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.sku" :readonly="isEditing" @blur="skuBlur"
                                            label="sku" :error-messages="errors.sku"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.description" :readonly="isEditing"
                                            @blur="descriptionBlur" label="description"
                                            :error-messages="errors.description"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.amount" @blur="amountBlur" label="amount"
                                            :error-messages="errors.amount"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline blue--text text--darken-2">Confirm Deletion</v-card-title>
                        <v-card-text class="body-1">Are you sure you want to delete this item?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-2" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-2" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
            <div class="flex flex-row">
                <svg-icon @click="editItem(item)" type="mdi" :path="getPathIcon('edit')"
                    class="hover:cursor-pointer text-xs text-blue-input">
                </svg-icon>

                <svg-icon @click="deleteItem(item)" type="mdi" :path="getPathIcon('delete')"
                    class="hover:cursor-pointer text-blue-input">
                </svg-icon>
            </div>
        </template>

        <template v-slot:item.item="{ index }">
            {{ itemSerials[index] }}
        </template>

    </v-data-table-virtual>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { setStatus } from '@/states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';
import myFetch from '@/service/fetch';
import {
    mdiPencil,
    mdiTrashCan
} from '@mdi/js';

const iconEnum = {
    edit: mdiPencil,
    delete: mdiTrashCan
}

const itemEnum = {
    sku: 'products/bySku',
    description: 'products/byDescription',
}

export default {
    name: 'MyTable',
    props: {
        customer: {
            type: Boolean,
        }
    },
    components: {
        SvgIcon
    },
    data: () => ({
        isEditing: false,
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                title: 'Item',
                align: 'start',
                sortable: false,
                key: 'item',
            },
            { title: 'Sku', key: 'sku' },
            { title: 'Description', key: 'description' },
            { title: 'Price', key: 'price' },
            { title: 'Amount', key: 'amount' },
            { title: 'Tax', key: 'tax' },
            { title: 'Total', key: 'total' },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            idProduct: '',
            idRow: '',
            item: '',
            sku: '',
            description: '',
            amount: 1,
            tax: '',
            total: '',
            price: ''
        },
        defaultItem: {
            item: '',
            sku: '',
            description: '',
            price: 0,
            amount: 1,
        },
        errors: {
            sku: null,
            description: null,
            amount: null,
        }
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        itemSerials() {
            return this.desserts.map((_, index) => index + 1);
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        customer: 'setData'
    },
    created() {
        this.initialize()
    },


    methods: {
        initialize() {
            this.desserts = [
            ]
        },
        setData() {
            if (this.customer) return;
            this.desserts = [];
        },
        getPathIcon(icon) {
            return iconEnum[icon];
        },
        async editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);

            this.totalToPaySubtract(this.editedItem);

            this.isEditing = true;
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'row/delete',
                    body: {
                        row: this.editedItem.idRow
                    }
                })
                const obj = { code: response.message.code, description: response.message.description }
                if (response.message.code == '1' || response.message.code == '3') {
                    this.closeDelete();
                    return setStatus(obj)
                }

                this.totalToPaySubtract(this.editedItem);
                this.desserts.splice(this.editedIndex, 1)
                this.closeDelete();
                this.setStatus(obj)
            } catch (e) {
                this.closeDelete();
                return setStatus({ code: 1, description: e.message })
            } finally {
                isLoading({ value: false })
            }
        },

        close() {
            this.dialog = false
            this.isEditing = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        totalToPayAdd(editedItem) {
            if (!this.$store.state.totals) {
                this.$store.commit('setTotals', {
                    total: editedItem.total,
                    subtotal: editedItem.price * editedItem.amount,
                    totalTaxes: editedItem.tax * editedItem.amount
                })

                if (!this.$store.state.remaining) {
                    this.$store.commit('setRemaining', editedItem.total)
                } else {
                    const remaining = this.$store.state.remaining + editedItem.total;
                    this.$store.commit('setRemaining', remaining);
                }
            } else {
                const total = this.$store.state.totals.total + editedItem.total;
                const subtotal = this.$store.state.totals.subtotal + editedItem.price * editedItem.amount;
                const totalTaxes = this.$store.state.totals.totalTaxes + editedItem.tax * editedItem.amount;

                this.$store.commit('setTotals', { total, subtotal, totalTaxes });
                this.$store.commit('setRemaining', this.$store.state.remaining + editedItem.total)
            }

        },
        totalToPaySubtract(editedItem) {

            const obj = this.$store.state.totals;
            let total = obj.total - editedItem.total;
            let subtotal = obj.subtotal - editedItem.price * editedItem.amount;
            let totalTaxes = obj.totalTaxes - editedItem.tax * editedItem.amount;

            if (total < 0 || subtotal < 0 || totalTaxes < 0) {
                total = 0;
                subtotal = 0;
                totalTaxes = 0;
            }

            this.$store.commit('setTotals', { total, subtotal, totalTaxes })
            this.$store.commit('setRemaining', this.$store.state.remaining - editedItem.total);
        },

        async save() {
            if (this.editedIndex > -1) {
                try {
                    isLoading({ value: true })
                    const response = await myFetch({
                        method: 'post',
                        endPoint: 'row/updateAmount',
                        body: {
                            row: this.editedItem.idRow,
                            amount: this.editedItem.amount
                        }
                    })
                    if (response.message.code == '1' || response.message.code == '3') {
                        this.close();
                        return setStatus({ code: 1, description: response.message.description })
                    }

                    this.editedItem.total = (this.editedItem.price * this.editedItem.amount) + (this.editedItem.tax * this.editedItem.amount);
                    this.totalToPayAdd(this.editedItem)
                    setStatus({ code: response.message.code, description: response.message.description })

                    Object.assign(this.desserts[this.editedIndex], this.editedItem)

                } catch (e) {
                    return setStatus({ code: 1, description: e.message })
                } finally {
                    isLoading({ value: false })
                }
            } else {
                if (this.editedItem.sku && this.editedItem.description && this.editedItem.amount) {
                    const response = await this.fetch('sku', { sku: this.editedItem.sku });
                    if (!response) {
                        this.close();
                        return setStatus({ code: 1, description: 'Data incorrectly filled' })
                    }

                    this.editedItem.price = response.price;
                    this.editedItem.tax = response.tax;

                    this.editedItem.total = (response.price * this.editedItem.amount) + (response.tax * this.editedItem.amount);
                    this.editedItem.idProduct = response._id;

                    isLoading({ value: true })
                    const insert = await myFetch({
                        method: 'post',
                        endPoint: 'row/create',
                        body: {
                            bill: this.$store.state.bill.id,
                            product: response._id,
                            amount: this.editedItem.amount
                        }
                    })
                    isLoading({ value: false })

                    if (insert.message.code == '1' || insert.message.code == '3') {
                        this.close();
                        return setStatus({ code: 1, description: insert.message.description });
                    }

                    this.editedItem.idRow = insert.response._id;

                    this.totalToPayAdd(this.editedItem);
                    this.desserts.push(this.editedItem);

                    this.$emit('item-added', this.editedItem);

                    this.close();
                    return setStatus({ code: 0, description: 'Item added successfully' })
                } else {
                    this.close();
                    return setStatus({ code: 1, description: 'Fill out the fields correctly' })
                }
            }
            this.close()
        },
        validate(prop, length) {
            if (!this.editedItem[prop]) {
                this.errors[prop] = `${prop} is required`;
                return false;
            } else if (this.editedItem[prop].length < length) {
                this.errors[prop] = `${prop} must be at least ${length} characters`;
                return false;
            }
            return true;
        },
        async fetch(element, body) {
            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: `${itemEnum[element]}`,
                    body
                })
                const obj = { code: response.message.code, description: response.message.description }
                if (response.message.code == 1 || response.message.code == 3) {
                    setStatus(obj)
                    return false;
                }

                setStatus(obj)
                return response.response;
            } catch (error) {
                setStatus({ code: 1, description: error.message })
                return false;
            } finally {
                isLoading({ value: false })
            }

        },
        async skuBlur() {
            const isValid = this.validate('sku', 1);
            if (!isValid || this.isEditing) return;

            const response = await this.fetch('sku', { sku: this.editedItem.sku });
            if (!response) return;

            this.editedItem.sku = response.sku;
            this.editedItem.description = response.description;
            this.errors.sku = null;
        },
        async descriptionBlur() {
            const isValid = this.validate('description', 1);
            if (!isValid || this.isEditing) return;

            const response = await this.fetch('description', { description: this.editedItem.description });
            if (!response) return;

            this.editedItem.sku = response.sku;
            this.editedItem.description = response.description;
            this.errors.description = null;
        },
        amountBlur() {
            const isValid = this.validate('amount', 1);
            if (!isValid || this.isEditing) return;

            this.errors.amount = null;
        },
    },
}
</script>

<style>
.v-table>.v-table__wrapper>table>tbody>tr>th,
.v-table>.v-table__wrapper>table>thead>tr>th,
.v-table>.v-table__wrapper>table>tfoot>tr>th {
    height: 3em !important;
    margin: 0px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    text-align: start;
    font-weight: lighter !important;
    color: #B3B7FA !important;
}

.v-toolbar__content,
.v-toolbar__extension {
    align-items: center;
    flex: 0 0 auto;
    display: flex;
    position: relative;
    transition: inherit;
    width: 100%;
    background: white;
    height: 40px !important;
}

.v-table>.v-table__wrapper>table>tbody>tr>td,
.v-table>.v-table__wrapper>table>tbody>tr>th,
.v-table>.v-table__wrapper>table>thead>tr>td,
.v-table>.v-table__wrapper>table>thead>tr>th,
.v-table>.v-table__wrapper>table>tfoot>tr>td,
.v-table>.v-table__wrapper>table>tfoot>tr>th {
    padding: 0px 0.4em;
    text-align: center;
    margin: auto;
    transition-duration: 0.28s;
    transition-property: box-shadow, opacity, background, height;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.v-data-table__th--sortable {
    margin: 0px !important;
    padding: 0.4em !important;
}
</style>
