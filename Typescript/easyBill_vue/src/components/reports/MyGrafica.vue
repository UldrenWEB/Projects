<template>
    <div class="mt-1 grid grid-cols-1 h-auto w-full overflow-auto">
        <div class="left-50 flex justify-center items-center h-full w-full">
            <Bar v-if="loaded" :options="chartOptions" :data="chartData" />
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import myFetch from '../../service/fetch';
import { setStatus } from '../../states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'MyGrafica',
    data() {
        return {
            loaded: false,
            chartData: [],
            labels: [],
            values: [],
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        }
    },
    async mounted() {
        this.loaded = false

        try {
            isLoading({ value: true })
            const resumeBank = await myFetch({
                method: 'get',
                endPoint: 'bank/resume'
            })
            if (resumeBank.message.code == '1' || resumeBank.message.code == '3')
                return setStatus({ code: resumeBank.message.code, description: resumeBank.message.description })

            resumeBank.response.map(item => {
                this.labels.push(item.bank)
                this.values.push(item.total)
            })

            if (resumeBank.response !== null && resumeBank.response.datasets !== undefined) {
                this.chartData = resumeBank.response
            } else {
                this.chartData = {
                    labels: this.labels,
                    datasets: [{
                        label: 'Bank Balance',
                        backgroundColor: ['#2B3674', '#B3B7FA'],
                        data: this.values
                    }]
                }
            }

            this.loaded = true
        } catch (e) {
            console.error(e)
        } finally {
            isLoading({ value: false })
        }
    },
    components: {
        Bar
    }
}
</script>