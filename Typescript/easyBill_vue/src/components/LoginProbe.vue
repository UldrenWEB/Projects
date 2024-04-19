<template>
    <div class="max-w-screen-2xl flex flex-col justify-center items-center p-5 gap-1">
        <div class="max-w-lg">
            <h1 class="w-full text-center text-easy-blue text-2xl font-bold mb-4">Login</h1>
            <p class="w-full text-left text-sm text-gray-400 mb-2">Enter your email and password to log in!</p>
            <hr class="mb-2" />
            <form ref="myForm" class="w-full flex flex-col items-center" @submit.prevent="submitValues">
                <GeneratorInput v-for="(input, index) in inputs" :key="index" :id="input.id" :label="input.label"
                    :type="input.type" :value="input.value" :pattern="input.pattern" :style="input.style"
                    :placeholder="input.placeholder" @input="updateValue" :selectOptions="input.selectOptions"
                    @input-change="handleSelectChange" />
                <router-link to="/register" class="w-full text-left">
                    <p class="text-easy-blue text-sm font-bold mt-2 mb-4">Don't you have an account yet?</p>
                </router-link>
                <button
                    class="bg-easy-blue text-white hover:opacity-70 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    @click="submitValues">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import GeneratorInput from './GeneratorInput.vue';
import myFetch from '../service/fetch'
import { setStatus as isLoading } from '@/states/useBoolean';
import { setStatus } from '../states/useStatus';

export default {
    components: {
        GeneratorInput
    },
    data() {
        return {
            inputs: [
                {
                    id: 'input1',
                    label: 'email',
                    type: 'email',
                    value: '',
                    placeholder: 'example@example.com',
                    pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$'
                },
                {
                    id: 'input2',
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
    methods: {
        updateValue({ id, value }) {
            this.values[id] = value;
        },
        handleSelectChange(data) {
            this.selectedOption = data.value;
        },
        async submitValues() {
            if (!this.$refs.myForm.reportValidity()) {
                this.$refs.myForm.reset();
                return;
            }

            const values = this.values;

            try {
                isLoading({ value: true })
                const response = await myFetch({
                    method: 'post',
                    endPoint: 'auth/login',
                    body: {
                        email: values.input1,
                        password: values.input2
                    }
                });

                const obj = { code: response.message.code, description: response.message.description }
                if (response.message.code == 1 || response.message.code == 3) {
                    this.$refs.myForm.reset();
                    return setStatus(obj)
                }

                sessionStorage.setItem('token', response.response.token);
                sessionStorage.setItem('user', JSON.stringify(response.response.user))

                this.$router.push('/dashboard');

                this.$refs.myForm.reset();
                return setStatus(obj)
            } catch (error) {
                const obj = { code: 1, description: error.message }
                return setStatus(obj)
            } finally {
                isLoading({ value: false })
            }
        },
    }
};
</script>