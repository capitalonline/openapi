import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
console.log(import('../views/Home.vue'))
const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/child/app-sp/instance'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
