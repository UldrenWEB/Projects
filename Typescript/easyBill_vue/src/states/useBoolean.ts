import { ref } from 'vue';

export const status = ref<{ value: boolean }>({ value: false });

export function setStatus(newStatus: { value: boolean }) {
    status.value.value = newStatus.value;
}