import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path:'/',
    redirect:'/pod_list'
  },
  {
    path: '/pod',
    name: 'pod_list',
    component: () => import('../views/pod/list.vue'),
    meta: {label: 'POD管理', meta: 'pod_list'}
  },
  {
    path: '/productType',
    name: 'productType',
    component: () => import('../views/productType/list.vue'),
    meta: {label: '物理机产品类型管理', meta: 'productType'}
  },
  {
    path:'/physical',
    name:'physical_list',
    component:()=>import('../views/physical/list.vue'),
    meta: {label: '物理资源管理', menu:'physical_list'},
  },
  {
    path: '/instance',
    name: 'instance_list',
    component: () => import('../views/instance/list.vue'),
    meta: {label: '云服务器管理', menu: 'instance_list'},
    children: [
      // {
      //   path: '/instance/monitor/:id',
      //   name: 'monitor',
      //   component: () => import('../views/instance/monitor.vue'),
      //   meta: {label: '云服务器详情', menu: 'instance_list'}
      // }
    ]
  },
  {
    path: '/instance/create',
    name: 'instance_create',
    component: () => import('../views/instance/create.vue'),
    meta: {label: '云服务器创建', menu: 'instance_list', hidden: true}
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {menu: '404', no_auth: true, hidden: true}
  },
];

export default routes;
