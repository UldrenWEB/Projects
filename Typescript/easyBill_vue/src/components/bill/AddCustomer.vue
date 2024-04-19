<template>
    <div class="ml-4 border-r-2 rounded-tr-lg rounded-br-lg flex-grow border-b-2">
        <div class="text-blue-input font-DM font-bold mt-1 mb-2 text-xl opacity-80">Customer Info</div>
        <form ref="myForm" @submit.prevent="submitValues" class="flex-col flex-grow grid grid-cols-2 mr-1 gap-1">
            <GeneratorInput v-for="(input, index) in computedInputs" :key="index" :id="input.id" :label="input.label"
                :type="input.type" :value="input.value" :pattern="input.pattern" :placeholder="input.placeholder"
                @input="updateValue" :selectOptions="input.selectOptions" @input-change="handleSelectChange"
                :isBlur="input.isBlur" @search-data="searchCustomer" />

            <div class="flex col-span-2 justify-center mt-1 mb-2">
                <button
                    class="hover:opacity-70 font-DM focus:outline-none focus:shadow-outline text-white bg-btn-easy rounded-xl px-4 py-1 active:text-easy-blue"
                    @click="submitValues">AddCustomer
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import GeneratorInput from '@/components/GeneratorInput.vue';
import { setStatus } from '@/states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';
import myFetch from '@/service/fetch';

export default {
    name: 'AddCustomer',
    data() {
        return {
            fullname: '',
            options: [],
            isButtonClicked: false,
            values: {},
            selectedOption: {},
            inputs: [
                {
                    id: 'document',
                    label: 'document',
                    type: 'text',
                    value: '',
                    placeholder: '',
                    pattern: '^[0-9]{7,9}$',
                    isBlur: true,
                    selectOptions: {
                        defaultText: 'Types',
                        options: this.options
                    }
                },
                {
                    id: 'fullname',
                    label: 'full name',
                    type: 'text',
                    value: '',
                    placeholder: 'Uldren Gedde',
                    pattern: '^[a-zA-Z ]{3,}'
                },
                {
                    id: 'phone',
                    label: 'phone number',
                    type: 'text',
                    value: '',
                    placeholder: '04246029262',
                    pattern: '^[0-9]{7,11}$'
                },
                {
                    id: 'address',
                    label: 'address',
                    type: 'text',
                    value: '',
                    placeholder: 'Av. Fuerzas Armadas',
                    pattern: '^[a-zA-Z0-9 ,.]*$'
                },
            ]
        }
    },
    computed: {
        computedInputs() {
            return this.inputs.map((input) => {
                if (input.id === 'document') {
                    return {
                        ...input,
                        selectOptions: {
                            ...input.selectOptions,
                            options: this.options
                        }
                    };
                }
                return input;
            });
        }
    },
    async created() {
        try {
            isLoading({ value: true })
            const response = await myFetch({
                method: 'get',
                endPoint: 'person/typesDocument'
            });

            const options = response.response.map(item => {
                return {
                    id: item.id,
                    description: item.type
                }
            });

            setStatus({ code: response.message.code, description: response.message.description })
            return this.options = options;
        } catch (e) {
            return setStatus({ code: 1, description: e.message })
        } finally {
            isLoading({ value: false })
        }
    },
    methods: {
        updateValue({ id, value }) {
            let inputToUpdate = this.inputs.find(input => input.id === id);
            if (inputToUpdate) {
                inputToUpdate.value = value;
            }
        },
        handleSelectChange(data) {
            this.selectedOption = data.value;
        },
        updateInputValues(response, id, value) {
            this.computedInputs.forEach(input => {
                if (input.id === id) {
                    input.value = value;
                }
                if (input.id === 'fullname') {
                    input.value = response.response.fullname || '';
                }
                if (input.id === 'phone') {
                    input.value = response.response.phoneNumber || '';
                }
                if (input.id === 'address') {
                    input.value = response.response.address || '';
                }
            });
        },
        async searchCustomer({ id, value }) {
            if (!value) return;
            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'person/byDocument',
                    body: { document: value }
                })
                if (response.message.code == '1' || response.message.code == '3') return setStatus({ code: response.message.code, description: response.message.description })

                this.updateInputValues(response, id, value);
            } catch (error) {
                return setStatus({ code: 1, description: error.message })
            } finally {
                isLoading({ value: false })
            }
        },
        async submitValues() {
            if (this.isButtonClicked) return;
            this.isButtonClicked = true;

            const values = this.computedInputs.reduce((acc, input) => {
                acc[input.id] = input.value;
                return acc;
            }, {})

            if (
                !values.document ||
                !values.phone ||
                !values.fullname ||
                !values.address ||
                !this.selectedOption
            ) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'All fields are required' });
            }

            if (typeof this.selectedOption === 'object') {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'Debe seleccionar un tipo de documento' })
            }

            if (this.$store.state.bill) {
                this.isButtonClicked = false;
                return setStatus({ code: 3, description: 'Please complete the current bill or cancel it' })
            }

            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'person/createCustomer',
                    body: {
                        document: values.document,
                        fullname: values.fullname,
                        phoneNumber: values.phone,
                        address: values.address,
                        idTypeDocument: this.selectedOption
                    }
                })

                const obj = { code: response.message.code, description: response.message.description }
                if (response.message.code == '1') return setStatus(obj)

                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                this.$emit('customer-info', { bool: true, value: values.fullname, date, time, document: values.document, id: response.response._id })

                this.isButtonClicked = false;
                this.$refs.myForm.reset();

                this.computedInputs.forEach(input => {
                    input.value = '';
                });

                return setStatus({ code: 0, description: 'Invoice successfully created for the customer' })
            } catch (e) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: e.message })
            } finally {
                this.isButtonClicked = false;
                isLoading({ value: false })
            }
        },
    },
    components: {
        GeneratorInput
    }
}
</script>
