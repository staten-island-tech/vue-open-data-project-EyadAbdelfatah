<template>
  <div>
    <h1>Items</h1>
    <ul>
      <li v-for="item in items" :key="item.starfire_incident_id">
        <router-link :to="{ name: 'ItemDetail', params: { id: item.starfire_incident_id } }">
          {{ item.alarm_box_location }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
}
fireData()
console.log(1)
console.log(result)

</script>

const items = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/8m42-w767.json');
    const data = await response.json();
    items.value = data; 
    console.log(items.value[0])
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
console.log(2)
</script>