<template>
    <div class="flex flex-col items-center max-h-140">
      <h2 class="text-xl mb-4">Select a Borough</h2>
      <select v-model="selectedBorough" class="p-2 border mb-4" @change="preparePieChartData()">
        <option v-for="borough in Object.keys(groupedData)" :key="borough" :value="borough">
          {{ borough }}
        </option>
      </select>
    
      <h3 class="text-lg mb-4">Incident Classification by Borough</h3>
      <ul class="flex space-x-4">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
    </ul>
      <Pie v-if="pieChartData" :data="pieChartData" />
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'
import { Pie } from 'vue-chartjs';  
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';  


ChartJS.register(ArcElement, Tooltip, Legend);
const groupedData = ref({})
const selectedBorough = ref(null)
const pieChartData = ref(null)
  const prop = defineProps({
    incidents:Array
  })
  console.log(prop.incidents)
  function processData() {
    const data = {}
  
    if (prop.incidents.length > 0) {
      prop.incidents.forEach(item => {
        const borough = item.incident_borough
        const category = item.incident_classification_group
  
        if (!data[borough]) {
          data[borough] = {}
        }
  
        if (!data[borough][category]) {
          data[borough][category] = 0
        }
  
        data[borough][category] += 1
        console.log(data)
      })
    }
  
    groupedData.value = data
    console.log(data)
  }
  processData()

  function preparePieChartData() {
    
    if (selectedBorough.value && groupedData.value[selectedBorough.value]) {
      const boroughData = groupedData.value[selectedBorough.value]
      const labels = []
      const data = []
      const backgroundColor = []
      console.log(7)
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

  </script>
  
  <style  scoped>

</style>