import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/instance',
    name: 'instance_list',
    component: () => import('../views/instance/list.vue'),
  },
  {
    path: '/instance/create',
    name: 'instance_create',
    component: () => import('../views/instance/create.vue'),
  },
  {
    path: '/mainTask',
    name: 'main_task_list',
    component: () => import('../views/task/main-task-list.vue'),
  },
  {
    path: '/mainTaskDetail/:id',
    name: 'main_task_detail',
    component: () => import( '../views/task/main-task-detail.vue'),
  },
  {
    path: '/subTask',
    name: 'sub_task_list',
    component: () => import('../views/task/sub-task-list.vue'),
  },
  {
    path: '/project',
    name: 'project_list',
    component: () => import('../views/project/list.vue'),
  }
];

export default routes;
