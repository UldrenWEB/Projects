<template>
    <div class="max-w-screen-2xl flex flex-col justify-center items-center px-5 pb-5 gap-1">
        <div class="max-w-lg">
            <h1 class="w-full text-center text-easy-blue text-3xl font-bold mb-4">Create account</h1>
            <p class="w-full text-center text-sm text-gray-400 mb-2">Aqui te puedes registrar, probando!</p>
            <hr class="mb-2" />
            <form ref="myForm" class="w-full grid grid-cols-2 items-center gap-3" @submit.prevent="submitValues">

                <GeneratorInput v-for="(input, index) in computedInputs" :key="index" :id="input.id"
                    :label="input.label" :type="input.type" :value="input.value" :pattern="input.pattern"
                    :placeholder="input.placeholder" @input="updateValue" :selectOptions="input.selectOptions"
                    @input-change="handleSelectChange" />

                <button
                    class="col-span-2 bg-easy-blue text-white hover:opacity-70 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    @click="submitValues">
                    Register
                </button>
            </form>
            <router-link to="/login" class="w-full text-left">
                <p class="text-easy-blue text-sm font-bold mt-4 mb-4">Already have an account?</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import GeneratorInput from '@/components/GeneratorInput.vue';
import { setStatus } from '@/states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';
import myFetch from '@/service/fetch';

export default {
    components: {
        GeneratorInput
    },
    data() {
        return {
            options: [],
            isButtonClicked: false,
            inputs: [
                {
                    id: 'document',
                    label: 'document',
                    type: 'text',
                    value: '',
                    placeholder: '',
                    pattern: '^[0-9]{7,9}$',
                    selectOptions: {
                        defaultText: 'Types',
                        options: this.options
                    }
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
                    id: 'fullname',
                    label: 'full name',
                    type: 'text',
                    value: '',
                    placeholder: 'Uldren Gedde',
                    pattern: '^[a-zA-Z ]{3,}'
                },
                {
                    id: 'address',
                    label: 'address',
                    type: 'text',
                    value: '',
                    placeholder: 'Av. Fuerzas Armadas',
                    pattern: '^[a-zA-Z0-9 ,.]*$'
                },
                {
                    id: 'email',
                    label: 'email',
                    type: 'email',
                    value: '',
                    placeholder: 'example@example.com',
                    pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$'
                },
                {
                    id: 'password',
                    label: 'password',
                    type: 'password',
                    value: '',
                    placeholder: 'Min. 8 characters',
                    pattern: '.{8,}'
                }
            ],
            values: {},
            selectedOption: {}
        };
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
            isLoading({ value: true });
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
            isLoading({ value: false });
        }
    },
    methods: {
        updateValue({ id, value }) {
            this.values[id] = value;
        },
        handleSelectChange(data) {
            this.selectedOption = data.value;
        },
        async submitValues() {
            if (this.isButtonClicked) return;
            this.isButtonClicked = true;

            const values = this.values;

            if (
                !values.document ||
                !values.phone ||
                !values.fullname ||
                !values.address ||
                !values.email ||
                !values.password ||
                !this.selectedOption
            ) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'All fields are required' });
            }

            if (typeof this.selectedOption === 'object') {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: 'Debe seleccionar un tipo de documento' })
            }

            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'auth/register',
                    body: {
                        fullname: values.fullname,
                        document: values.document,
                        address: values.address,
                        phoneNumber: values.phone,
                        idTypeDocument: this.selectedOption,
                        email: values.email,
                        password: values.password,
                    }
                });

                const obj = { code: response.message.code, description: response.message.description }
                if (response.message.code == 1) {
                    this.$refs.myForm.reset();
                    this.isButtonClicked = false;
                    return setStatus(obj)
                }

                this.isButtonClicked = false;
                this.$router.push('/login');
                this.$refs.myForm.reset();
                return setStatus(obj)
            } catch (e) {
                this.isButtonClicked = false;
                return setStatus({ code: 1, description: e.message })
            } finally {
                isLoading({ value: false })
            }
        },
    }
};
</script>

<style scoped></style>