<template>
  <div >
    <h1>{{ item.alarm_box_location }}</h1>
    <h2>yo</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const itemId = route.params.id;
const item = reactive(null);
console.log(1)

</script>
