import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/views/MainPage.vue";
import UserPostForm from "@/views/UserPostForm.vue";
import UserPage from "@/views/UserPage.vue";
import EventPostForm from "@/views/EventPostForm.vue";

const routes = [
  {
    path:'/',
    name:'home',
    component:MainPage
  },
  {
    path:'/user-post-form',
    name:'userPostForm',
    component: UserPostForm
  },
  {
    path:'/user/:id',
    name:'editUser',
    component: UserPage
  },
  {
  path:'/user/:id/add-event',
  name: 'post-event',
  component: EventPostForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
