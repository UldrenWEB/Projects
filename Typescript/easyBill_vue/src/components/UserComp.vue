<template>
    <div class="flex flex-row items-center justify-end gap-1 w-full h-auto">
        <div>
            <span class="font-light text-easy-words font-Poppins text-xs">{{ name }}</span>
        </div>
        <div class="w-1/12">
            <router-link to="/profile">
                <div class="rounded-full shadow-2xl bg-white p-[6px]">
                    <img :src="srcImage" alt="Image by User" class="rounded-full w-full h-full object-cover">
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserComp',
    data() {
        return {

        }
    },
    props: {
        srcImage: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    }
}
</script>