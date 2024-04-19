<template>
    <div class="flex flex-col mx-2 my-1 h-full gap-1">
        <div class="flex flex-row">
            <span class="text-xs mr-2 font-light text-easy-words">bill subtotal:</span>
            <span class="text-xs text-blue-input">{{ `${((this.totals?.subtotal ?? 0) *
                (this.tasa[this.$store.state.currentCurrency].change))?.toFixed(2)}
                ${this.tasa[this.$store.state.currentCurrency]?.symbol}` }}</span>
        </div>
        <div class="flex flex-row">
            <span class="text-xs mr-2 text-easy-words font-light">total taxes:</span>
            <span class="text-xs text-blue-input">{{ `${((this.totals?.totalTaxes ?? 0) *
                (this.tasa[this.$store.state.currentCurrency].change))?.toFixed(2)}
                ${this.tasa[this.$store.state.currentCurrency]?.symbol}` }}</span>
        </div>
        <div class="flex flex-row">
            <span class="text-xs mr-2 text-blue-input font-extralight">total:</span>
            <span class="text-xs text-blue-input">{{ `${((this.totals?.total ?? 0) *
                (this.tasa[this.$store.state.currentCurrency].change))?.toFixed(2)}
                ${this.tasa[this.$store.state.currentCurrency]?.symbol}` }}</span>
        </div>
        <div class="flex flex-row">
            <span class="text-xs mr-2 text-red-600 text-opacity-60 font-light">remaining:</span>
            <span class="text-xs text-blue-input">{{ `${((this.remaining ?? 0) *
                (this.tasa[this.$store.state.currentCurrency].change))?.toFixed(2)}
                ${this.tasa[this.$store.state.currentCurrency]?.symbol}` }}</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['totals', 'remaining', 'tasa']),
    },
}

</script>