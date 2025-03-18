<script>
import { RouterLink, RouterView } from 'vue-router'
import ItemDetail from './views/ItemDetail.vue'

import BarChart from './components/BarChart.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <ItemDetail />
      <BarChart />
      <nav></nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
