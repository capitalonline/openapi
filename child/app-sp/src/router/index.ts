import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: '/overview',
    name: 'overview',
    component: () => import('../views/overview/index.vue'),
    meta: {menu: 'overview'}
  },
  // {
  //   path: '/pod',
  //   name: 'pod_list',
  //   component: () => import('../views/pod/list.vue'),
  //   meta: {meta: 'pod_list'}
  // },
  {
    path: '/instance',
    name: 'instance_list',
    component: () => import('../views/instance/list.vue'),
    meta: {menu: 'instance_list'}
  },
  {
    path: '/instance/create',
    name: 'instance_create',
    component: () => import('../views/instance/create.vue'),
    meta: {menu: 'instance_list'}
  },
  {
    path: '/instance/monitor/:id',
    name: 'monitor',
    component: () => import('../views/instance/monitor.vue'),
    meta: {menu: 'instance_list'}
  },
  {
    path:'/alarmInfo',
    name:'alarm_info',
    component:()=>import('../views/alarm/info.vue'),
    meta:{menu:'alarm_info'}
  },
  {
    path:'/alarmStrategy',
    name:'alarm_strategy',
    component:()=>import('../views/alarm/strategy.vue'),
    meta:{menu:'alarm_strategy'}
  },
  {
    path:'/alarmStrategy/create',
    name:'alarm_strategy_create',
    component:()=>import('../views/alarm/add_strategy.vue'),
    meta:{menu:'alarm_strategy'}
  },
  {
    path:'/alarmContact',
    name:'alarm_contact',
    component:()=>import('../views/alarm/contact.vue'),
    meta:{menu:'alarm_contact'}
  },
  {
    path:'/disk',
    name:'disk_list',
    component:()=>import('../views/disk/list.vue'),
    meta:{menu:'disk_list'}
  },
  {
    path:'/disk/create',
    name:'disk_create',
    component:()=>import('../views/disk/create.vue'),
    meta:{menu:'disk_list'}
  },
  {
    path:'/physical',
    name:'physical_list',
    component:()=>import('../views/physical/list.vue'),
    meta:{menu:'physical_list'}
  },
  {
    path:'/physical/detail',
    name:'physical_detail',
    component:()=>import('../views/physical/detail.vue'),
    meta:{menu:'physical_list'}
  },
  {
    path:'/disk/capacity',
    name:'disk_capacity',
    component:()=>import('../views/disk/capacity.vue'),
    meta:{menu:'disk_list'}
  },
  {
    path:'/mirror',
    name:'mirror_list',
    component:()=>import('../views/mirror/list.vue'),
    meta:{menu:'mirror_list'}
  },
  {
    path:'/privateMirror',
    name:'private_mirror_list',
    component:()=>import('../views/mirror/privateMirror.vue'),
    meta:{menu:'private_mirror_list'}
  },
  {
    path: '/event',
    name: 'event_list',
    component: () => import('../views/event/list.vue'),
    meta: {menu: 'event_list'}
  },
  {
    path: '/event/:id',
    name: 'event_detail',
    component: () => import('../views/event/detail.vue'),
    meta: {menu: 'event_list'}
  },
  {
    path: '/mainTask',
    name: 'main_task_list',
    component: () => import('../views/task/main-task-list.vue'),
    meta: {menu: 'main_task_list'}
  },
  {
    path: '/mainTaskDetail/:id',
    name: 'main_task_detail',
    component: () => import( '../views/task/main-task-detail.vue'),
    meta: {menu: 'main_task_list'}
  },
  {
    path: '/subTask',
    name: 'sub_task_list',
    component: () => import('../views/task/sub-task-list.vue'),
    meta: {menu: 'sub_task_list'}
  },
  {
    path: '/project',
    name: 'project_list',
    component: () => import('../views/project/list.vue'),
    meta: {menu: 'project_list'}
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {menu: '404', no_auth: true}
  }
];

export default routes;
