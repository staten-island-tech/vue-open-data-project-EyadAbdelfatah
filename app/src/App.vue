<script>

import { RouterLink, RouterView } from 'vue-router'
import ItemDetail from './views/ItemDetail.vue';


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

        <ItemDetail/>
      <nav>
        

      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
