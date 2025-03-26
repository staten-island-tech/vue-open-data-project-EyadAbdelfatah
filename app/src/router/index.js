import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { name } from '@vue/eslint-config-prettier/skip-formatting'
import DataGet from '@/components/DataGet.vue'
import TryData from '@/components/FireData.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/datafire', component: DataGet },

  {path: '/trypie', component:TryData}

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
