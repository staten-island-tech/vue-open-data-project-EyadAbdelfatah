<template>
  <br>
  <div class="align-center flex max-h-128">
    <h2 class=" ">Chart Display</h2>
    <ul class="flex space-x-4">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
    </ul>
      <Bar :data="chartData" />
  </div>
  
        
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = ref(null)


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
const props = defineProps({
  incidentData: Array,

})


function filterData(){
  const boroughs={}
  props.incidentData.forEach(item => {
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
if(props.incidentData!=undefined && props.incidentData.length>0){
  console.log()
  filterData()
  console.log(props.incidentData)
}

 
</script>
