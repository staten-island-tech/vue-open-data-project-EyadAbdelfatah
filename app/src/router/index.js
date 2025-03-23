import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemDetail from '../views/ItemDetail.vue'
import DataFire from '@/components/IncidentChart.vue'
import { name } from '@vue/eslint-config-prettier/skip-formatting'
import DataGet from '@/components/DataGet.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/datafire', component: DataGet }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
