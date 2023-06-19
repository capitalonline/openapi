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
    path: '/nfv',
    name: 'nfv_list',
    component: () => import('../views/nfv/list.vue'),
    meta: {menu: 'nfv_list'}
  },
  {
    path: '/nfv/monitor/:id',
    name: 'monitor',
    component: () => import('../views/nfv/monitor.vue'),
    meta: {menu: 'nfv_list'}
  },
  {
    path:'/alarmInfo',
    name:'alarm_info',
    component:()=>import('../views/alarm/alarmInfo.vue'),
    meta:{menu:'alarm_info'}
  },
  {
    path:'/alarmInfo/create',
    name:'alarm_create',
    component:()=>import('../views/alarm/createShield.vue'),
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
    path:'/snapshot',
    name:'snapshot_list',
    component:()=>import('../views/snapshot/tabList.vue'),
    meta:{menu:'snapshot_list'}
  },
  // {
  //   path:'/chain/detail',
  //   name:'snapshot_detail',
  //   component:()=>import('../views/snapshot/tabList.vue'),
  //   meta:{menu:'snapshot_list'}
  // },
  {
    path:'/chain/detail',
    name:'disk_create',
    component:()=>import('../views/snapshot/chains-detail.vue'),
    meta:{menu:'snapshot_list'}
  },
  // {
  //   path:'/disk/create',
  //   name:'disk_create',
  //   component:()=>import('../views/disk/create.vue'),
  //   meta:{menu:'disk_list'}
  // },
  {
    path:'/disk/detail',
    name:'disk_detail',
    component:()=>import('../views/disk/detail.vue'),
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
    path:'/fielsystem',
    name:'filesystem_list',
    component:()=>import('../views/filesystem/list.vue'),
    meta:{menu:'filesystem_list'}
  },
  {
    path:'/fielsystem/detail',
    name:'file_detail',
    component:()=>import('../views/filesystem/detail.vue'),
    meta:{menu:'filesystem_list'}
  },
  {
    path:'/vm',
    name:'vm_list',
    component:()=>import('../views/filesystem/vm.vue'),
    meta:{menu:'vm_list'}
  },
  {
    path:'/notFilesystem',
    name:'notFilesystem',
    component:()=>import('../views/filesystem/notFilesystem.vue'),
    meta:{menu:'notFilesystem'}
  },
  {
    path:'/nasSet',
    name:'nasSet',
    component:()=>import('../views/filesystem/set.vue'),
    meta:{menu:'nasSet'}
  },
  {
    path: '/event',
    name: 'event_list',
    component: () => import('../views/event/list.vue'),
    meta: {menu: 'event_list'}
  },
  {
    path: '/anomalyEvent',
    name: 'anomaly_event_list',
    component: () => import('../views/event/anomalyList.vue'),
    meta: {menu: 'anomaly_event_list'}
  },
  {
    path: '/repairEvent',
    name: 'repair_event_list',
    component: () => import('../views/repairEvent/repairEventList.vue'),
    meta: {menu: 'repair_event_list'}
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
    path: '/pod',
    name: 'pod_list',
    component: () => import('../views/pod/list.vue'),
    meta: {meta: 'pod_list'}
  },
  {
    path: '/message',
    name: 'message_list',
    component: () => import('../views/message/list.vue'),
    meta: {meta: 'message_list'}
  },
  {
    path: '/ecs_destroyed',
    name: 'ecs_destroyed',
    component: () => import('../views/instance/destroyedList.vue'),
    meta: {meta: 'ecs_destroyed', no_auth: true}
  },
  {
    path:'/cluster',
    name:'cluster_list',
    component:()=>import('../views/cluster/list.vue'),
    meta:{menu:'cluster_list',no_auth: true}
  },
  {
    path:'/storage',
    name:'storage_list',
    component:()=>import('../views/cluster/storage.vue'),
    meta:{menu:'cluster_list',no_auth: true}
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {menu: '404', no_auth: true}
  }
];

export default routes;
