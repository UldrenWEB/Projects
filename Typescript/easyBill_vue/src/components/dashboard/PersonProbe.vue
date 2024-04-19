<template>
    <div class="w-full flex justify-between rounded-lg shadow-lg hover:shadow-inner hover:border hover:border-gray-200">
        <div class="flex gap-3 p-1 w-9/12 items-center justify-start">
            <img :src="srcImageValue" alt="Person" class="rounded-lg aspect-square max-w-14" />
            <p class="font-semibold font-DM text-black">{{ customer }}</p>
        </div>

        <div class="w-2/12 flex items-center">
            <p class=" text-black font-semibold font-DM">{{ `${((amount ?? 0) *
                (this.tasa[this.$store.state.currentCurrency].change))?.toFixed(2)}
                ${this.tasa[this.$store.state.currentCurrency]?.symbol}` }}
            </p>
        </div>
        <div class="w-1/12 flex items-center">
            <p class="font-semibold text-gray-400 font-DM text-xs">
                {{ timeElapsedFromNow }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

const defaultImage = 'https://unavatar.io/'

export default {
    props: {
        srcImage: String,
        customer: String,
        amount: Number,
        myIndex: Number,
        timeElapsed: {
            type: String,
            required: true
        }
    },
    computed: {
        srcImageValue() {
            return this.srcImage === "" || !this.srcImage ? `${defaultImage}${this.myIndex + 1}` : this.srcImage
        },
        timeElapsedFromNow() {
            return moment(this.timeElapsed).fromNow();
        },
        ...mapState(['tasa']),
    }
}
</script>