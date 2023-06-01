import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path:'/',
    redirect:'/az'
  },
  {
    path: '/az',
    name: 'az_list',
    component: () => import('../views/az/list.vue'),
    meta: {label: '可用区管理', meta: 'az_list'}
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
  },
  {
    path: '/instance/create',
    name: 'instance_create',
    component: () => import('../views/instance/create.vue'),
    meta: {label: '云服务器创建', menu: 'instance_list', hidden: true}
  },
  {
    path: '/inventory',
    name: 'inventory_list',
    component: () => import('../views/inventory/list.vue'),
    meta: {label: '资源库存', menu: 'inventory_list'},
  },
  {
    path: '/product_inventory',
    name: 'product_inventory_list',
    component: () => import('../views/inventory/product.vue'),
    meta: {label: '商品库存', menu: 'product_inventory_list'},
  },
  {
    path: '/resource_statistical',
    name: 'resource_statistical_list',
    component: () => import('../views/statistical/tab.vue'),
    meta: {label: '资源统计', menu: 'resource_statistical_list'},
  },
  {
    path: '/vgpu_list',
    name: 'vgpu_list',
    component: () => import('../views/vgpu/list.vue'),
    meta: {label: 'vGPU授权库存', menu: 'vgpu_list',no_auth: true},
  },
  {
    path: '/cloud_inventory',
    name: 'disk_inventory',
    component: () => import('../views/cloud/inventory.vue'),
    meta: {label: '云盘库存', menu: 'disk_inventory', no_auth: true},
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {menu: '404', no_auth: true, hidden: true}
  },
];

export default routes;
