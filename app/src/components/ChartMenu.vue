<template>
  <h1 class="justify-center flex max-w-screen max-h-150 items-center ">Fire Incident Data charts and things</h1>
    <nav class="flex   p-4 items-center justify-center max-h-screen">
        
      <ul class="flex space-x-4">

        <li><router-link to="/datafire" class="hover:underline justify-center">Incident Response Bar Chart</router-link></li>
        <li><router-link to="/trypie" class="hover:underlinejustify-center flex max-w-screen max-h-150 items-center "> Incident pie chart and stuffs and thigns</router-link></li>
    </ul>
    </nav>
    <h2>Wow so data load</h2>
    <div class="grid grid-cols-5 gap-4 justify-center m-16">
    <div v-if="incidents.length > 0" v-for="incident in incidents" class="p-4 border rounded shadow">
        <h3>{{ incident.alarm_box_location }}</h3>
    </div>
</div>
    
  </template>

<script setup>
import { ref,onMounted } from 'vue'
const incidents = ref([])

onMounted(async () => {
    const response = await fetch('https://data.cityofnewyork.us/resource/8m42-w767.json?$limit=100')
    const rawData = await response.json()
    incidents.value =  rawData

  })
</script>

<style  scoped>

</style>