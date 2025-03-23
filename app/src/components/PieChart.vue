<template>
    <div class="flex flex-col items-center">
      <h2 class="text-xl mb-4">Select a Borough</h2>
      <select v-model="selectedBorough" class="p-2 border mb-4">
        <option v-for="borough in Object.keys(groupedData)" :key="borough" :value="borough">
          {{ borough }}
        </option>
      </select>
  
      <h3 class="text-lg mb-4">Incident Classification by Borough</h3>
      <PieChart :data="pieChartData" v-if="selectedBorough" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
  
  const props = defineProps({
    incidentData: Array
  })
  
  const selectedBorough = ref(null)
  const groupedData = ref({})
  const pieChartData = ref({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  })
  
  function processData() {
    const data = {}
  
    if (props.incidentData !== undefined && props.incidentData.length > 0) {
      props.incidentData.forEach(item => {
        const borough = item.incident_borough
        const category = item.incident_classification_group
  
        if (data[borough] === undefined) {
          data[borough] = {}
        }
  
        if (data[borough][category] === undefined) {
          data[borough][category] = 0
        }
  
        data[borough][category] += 1
      })
    }
  
    groupedData.value = data
  }
  
  function preparePieChartData() {
    if (selectedBorough.value && groupedData.value[selectedBorough.value]) {
      const boroughData = groupedData.value[selectedBorough.value]
      const labels = []
      const data = []
      const backgroundColor = []
      
      Object.keys(boroughData).forEach(category => {
        labels.push(category)
        data.push(boroughData[category])
        backgroundColor.push(getRandomColor())
      })
  
      pieChartData.value = {
        labels,
        datasets: [{
          data,
          backgroundColor,
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1
        }]
      }
    }
  }
  
  function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  
  if (props.incidentData !== undefined && props.incidentData.length > 0) {
    processData()
    preparePieChartData()
  }
  </script>
  