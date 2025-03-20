<template>
  <div>
    <h1>Items</h1>
    <ul>
      <li v-for="item in items" :key="item.starfire_incident_id">
        <router-link :to="{ name: 'ItemDetail', params: { id: item.starfire_incident_id } }">
          {{ item.alarm_box_location }}
        </router-link>
        <IncidentResponseChart :apiData="items" :aval="aval" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import IncidentResponseChart from './IncidentResponseChart.vue'
const items = reactive([])
let aval
onMounted(async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/8m42-w767.json?$limit=20')
    const data = await response.json()
    items.value = data
    console.log(items.value[0])
    aval = true
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
console.log(2)
</script>
