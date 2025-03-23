<template>
    <div>
      <IncidentChart :incidentData="incidents" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import IncidentChart from '@/components/IncidentChart.vue'
  
  const incidents = ref([])
  
  onMounted(async () => {
    const response = await fetch('https://data.cityofnewyork.us/resource/8m42-w767.json?$limit=1000')
    const rawData = await response.json()
    incidents.value = rawData
  })
  console.log(incidents)
  </script>
  