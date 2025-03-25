<template>
  
    <ul >
      <h2 class="justify-center flex max-w-screen max-h-150 items-center ">Chart Display</h2>
      <li class="justify-center flex max-w-screen max-h-150 items-center "><router-link to="/" class="hover:underline">Home</router-link></li>
      <Bar :data="chartData" />
    </ul>
    

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const incidents = ref([])
const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Average Incident Response Time (seconds)',
    data: [],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
  }]
})

onMounted(async () => {
  const response = await fetch('https://data.cityofnewyork.us/resource/8m42-w767.json?$limit=1000')
  const rawData = await response.json()
  incidents.value = rawData
  filterData()
})

function filterData() {
  const boroughs = {}

  incidents.value.forEach(item => {
    const borough = item.incident_borough
    const responseTime = parseInt(item.incident_response_seconds_qy)

    if (borough && !isNaN(responseTime)) {
      if (!boroughs[borough]) {
        boroughs[borough] = { totalResponseTime: 0, count: 0 }
      }
      boroughs[borough].totalResponseTime += responseTime
      boroughs[borough].count += 1
    }
  })

  const labels = []
  const values = []

  Object.keys(boroughs).forEach(borough => {
    const averageResponseTime = boroughs[borough].totalResponseTime / boroughs[borough].count
    labels.push(borough)
    values.push(averageResponseTime)
  })

  chartData.value = {
    labels,
    datasets: [{
      label: 'Average Incident Response Time (seconds)',
      data: values,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  }
}
</script>
