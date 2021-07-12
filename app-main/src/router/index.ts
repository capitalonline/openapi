import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
console.log(import('../views/Home.vue'))
const routes: RouteConfig[] = [
  {
    path: '/test',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
