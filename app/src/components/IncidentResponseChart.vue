<template>
  <div>
    <BarChart :chartData="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import BarChart from './BarChart.vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  apiData: Array,

  aval: Boolean,
})
console.log(props.apiData)
const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Incident Response Time (seconds)',
      backgroundColor: '#42A5F5',
      data: [],
    },
  ],
})

const chartOptions = reactive({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Incident Response Times by Borough',
    },
  },
})

const processData = () => {
  const boroughs = {}
  console.log(props.apiData.value)
  props.apiData.forEach((incident) => {
    const borough = incident.incident_borough
    const responseTime = parseInt(incident.incident_response_seconds_qy)

    if (!boroughs[borough]) {
      boroughs[borough] = { totalResponseTime: 0, count: 0 }
    }

    boroughs[borough].totalResponseTime += responseTime
    boroughs[borough].count += 1
  })

  const labels = []
  const data = []
  for (const borough in boroughs) {
    if (boroughs.hasOwnProperty(borough)) {
      labels.push(borough)
      const averageResponseTime = boroughs[borough].totalResponseTime / boroughs[borough].count
      data.push(averageResponseTime)
    }
  }

  chartData.labels = labels
  chartData.datasets[0].data = data
  console.log(Math.round(data))
}

processData()
</script>

<style scoped></style>
