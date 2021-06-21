import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/mainTask',
    name: 'main_task_list',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/task/main-task-list.vue'),
  },
  {
    path: '/subTask',
    name: 'sub_task_list',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/task/sub-task-list.vue'),
  },
  {
    path: '/project',
    name: 'project_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/project/list.vue'),
  }
];

export default routes;
