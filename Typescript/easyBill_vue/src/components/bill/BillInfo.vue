<template>
    <div class="mt-2">
        <div class="flex flex-row justify-between">
            <div class="text-xs text-blue-input">
                <span class="text-easy-words font-extralight">Code: </span>
                <span class="text-xs font-light">{{ code }}</span>
            </div>
            <div class="text-xs text-blue-input">
                <span class="text-easy-words font-extralight">Customer: </span>
                <span class="text-xs font-light">{{ customer }}</span>
            </div>
            <div class="text-xs text-blue-input">
                <span class="text-easy-words font-extralight">Date: </span>
                <span class="text-xs font-light">{{ date }}</span>
            </div>
            <div class="text-xs text-blue-input">
                <span class="text-easy-words font-extralight">Time: </span>
                <span class="text-xs font-light">{{ hour }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BillInfo',
    props: {
        customer: {
            type: String,
        },
        code: {
            type: Number
        },
        date: {
            type: String
        },
        hour: {
            type: String
        }
    }
}
</script>

<style></style>