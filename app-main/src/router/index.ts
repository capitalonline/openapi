import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/under-app-sp/instance'
  },
  {
    path: '/under-app-sp/instance',
    name: 'under-app-sp'
  },
  {
    path: '/under-app-op',
    name: 'under-app-op'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
