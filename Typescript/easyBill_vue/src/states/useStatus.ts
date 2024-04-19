import { ref } from 'vue';

export const status = ref<{ code: number | null | string, description: string }>({ code: null, description: '' });

export function setStatus(newStatus: { code: number | null | string, description: string }) {
    status.value = newStatus;

    setTimeout(() => {
        status.value = { code: null, description: '' };
    }, 2000);
}