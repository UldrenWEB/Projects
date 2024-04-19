<template>
    <div class="w-full h-full flex flex-col gap-8">
        <div class="flex top h-4 bg-white w-full">
            <div class="text-blue-input font-DM font-bold mb-2 ml-3 text-xl">Recent Bills</div>
        </div>

        <div class="overflow-y-auto h-[18.5em] w-full">
            <div class="flex flex-col gap-6">
                <div v-if="array.length <= 0" class=" m-10 flex text-lg items-center justify-center rounded-lg shadow-2xl
                    bg-easy-words text-white mt-4">
                    <span class="font-ligth py-1">No existen facturas en el registro</span>
                </div>
                <PersonProbe v-for="(item, index) in array" :myIndex="index" :key="index" :srcImage="item.srcImage"
                    :customer="item.customer" :timeElapsed="item.timestamp" :amount="item.amount" />
            </div>
        </div>
    </div>
</template>

<script>
import PersonProbe from './PersonProbe.vue';
import MyFetch from '../../service/fetch';
import { setStatus } from '../../states/useStatus';
import { setStatus as isLoading } from '../../states/useBoolean';

export default {
    data() {
        return {
            array: []
        }
    },
    async mounted() {
        try {
            isLoading({ value: true })
            const response = await MyFetch({
                method: 'get',
                endPoint: 'bill/all'
            })

            if (response.message.code == '1' || response.message.code == '3')
                return setStatus({ code: 1, description: response.message.description })

            this.array = response.response.map(item => {
                return {
                    srcImage: item.srcImage,
                    customer: item.customer,
                    amount: item.total,
                    timestamp: item.created
                }
            })

        } catch (error) {
            return setStatus({ code: 1, description: error.message })
        } finally {
            isLoading({ value: false })
        }
    },
    components: {
        PersonProbe
    }
}
</script>


<style></style>