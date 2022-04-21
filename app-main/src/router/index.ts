import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/under-app-sp/instance'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
