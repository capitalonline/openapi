import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layouts/layout.vue'),
    children: [
      {
        path: '/instance',
        name: 'instance_list',
        component: () => import('../views/instance/list.vue'),
        meta: {label: '云服务器管理', menu: 'instance_list'},
        children: [
          {
            path: '/instance/create',
            name: 'instance_create',
            component: () => import('../views/instance/create.vue'),
            meta: {label: '云服务器创建', menu: 'instance_list'}
          },
          {
            path: '/instance/monitor/:id',
            name: 'monitor',
            component: () => import('../views/instance/monitor.vue'),
            meta: {label: '云服务器详情', menu: 'instance_list'}
          }
        ]
      },
      {
        path:'/physical',
        name:'physical_list',
        component:()=>import('../views/physical/list.vue'),
        meta: {label: '物理机管理', menu:'physical_list'},
        children: [
          {
            path:'/physical/detail',
            name:'physical_detail',
            component:()=>import('../views/physical/detail.vue'),
            meta: {label: '物理机详情', menu:'physical_list'}
        
          }
        ]
      },
      {
        path: '/pod',
        name: 'pod_list',
        component: () => import('../views/pod/list.vue'),
        meta: {label: 'POD管理', meta: 'pod_list'}
      }
    ]
  }
];

export default routes;
