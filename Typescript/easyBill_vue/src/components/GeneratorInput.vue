<template>
    <div :class="combinedStyle">
        <label
            class="text-left text-blue-input font-normal font-Poppins w-full mb-1 text-xs capitalize hover:text-easy-words"
            :for="id" :style="combinedStyle.label">{{ label }}:</label>
        <div class="w-full flex flex-row gap-1">
            <select v-if="selectOptions" @change="emitSelectedOption"
                class="select max-w-16 px-3 py-1 w-auto placeholder:font-light placeholder:text-gray-500 rounded-xl border-gray-200 border focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 ease-in-out mr-1 mb-2 text-xs">
                <option class="p-4" disabled value="">{{ selectOptions.defaultText }}</option>
                <option v-for=" option  in  selectOptions.options " :key="option.id" :value="option.id">{{
        option.description }}
                </option>
            </select>
            <input
                class="px-3 py-2 w-full placeholder:font-light placeholder:text-gray-500 rounded-xl border-gray-200 border focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 ease-in-out mr-3 mb-2 text-sm"
                @blur="validateInput" :pattern="pattern" :id="id" :type="type" :value="value" :placeholder="placeholder"
                @input="updateValue" :style="combinedStyle.input" :isBlur="isBlur" :step="0.01" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'GeneratorInput',
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        defaultText: {
            type: String,
            default: ''
        },
        style: {
            type: String,
            default: ''
        },
        pattern: {
            type: String,
            default: '',
            required: true
        },
        title: {
            type: String,
            default: '',
        },
        selectOptions: {
            type: Object,
            default: null
        },
        isBlur: {
            type: Boolean,
            default: false
        }
    },
    updated() {
        if (this.selectOptions) {
            this.$nextTick(() => {
                const selectElement = this.$el.querySelector('select');
                const selectedValue = selectElement.value;
                this.$emit('input-change', { value: selectedValue });
            });
        }
    },
    computed: {
        combinedStyle() {
            const defaultStyle = 'flex flex-col items-center justify-center w-full'

            if (!this.style || this.style === '') return defaultStyle

            return this.style;
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('input', { id: this.id, value: event.target.value });
        },
        clearInput() {
            this.$emit('input', { id: this.id, value: '' });
        },
        validateInput(event) {
            // if (!event.target.checkValidity()) {
            //     event.target.reportValidity();
            // }
            if (!this.isBlur) return;

            this.$emit('search-data', { id: this.id, value: event.target.value });
        },
        emitSelectedOption(event) {
            this.$emit('input-change', { value: event.target.value });
        }
    }
}
</script>