import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  
];

const router = new VueRouter({
  mode: 'history',
  base: '/app-main',
  routes,
});

export default router;
