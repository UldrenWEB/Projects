<template>
    <div class="rounded-lg bg-[#f4f7fe] flex gap-3 p-2 shadow-lg hover:shadow-inner cursor-default">
        <div class="w-1/5">
            <img :src="srcImage" alt="Icono" class="w-full h-full object-cover" />
        </div>

        <div class="w-4/5 flex flex-col items-start justify-center">
            <p class="font-light text-easy-words text-xs capitalize">{{ title }}</p>
            <p class="text-blue-input font-bold">{{ amount }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        srcImage: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        }
    }
}
</script>