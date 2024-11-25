import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
const routes:RouteConfig[] = [
  {
    path: '/new',
    component: () => import('../layouts/Layout.vue'),
    name:'new_op',
    // redirect: {name: 'pod_list'},
    children: [
      {
        path: '/pod/:id/',
        name: 'pod_list',
        component: () => import('../views/vmOp2/cluster/pod/gather.vue'),
        meta: {meta: 'pod_list',no_auth: true},
        children: [
          {// 概要
            path: '/pod/info/:id?',
            name: 'pod_info',
            component: () => import('../views/vmOp2/cluster/pod/info.vue'),
            meta: {meta: 'pod_info',no_auth: true}
          },
          { // 集群
            path: '/pod/cluster/:id?',
            name: 'pod_cluster',
            component: () => import('../views/vmOp2/cluster/pod/cluster_list.vue'),
            meta: {meta: 'pod_cluster',no_auth: true}
          },
          { // 主机
            path: '/pod/host/:id?',
            name: 'pod_host',
            component: () => import('../views/vmOp2/cluster/pod/host_list.vue'),
            meta: {meta: 'pod_host',no_auth: true}
          },
          { // 虚拟机
            path: '/pod/virtual_machine/:id?',
            name: 'pod_vm',
            component: () => import('../views/vmOp2/cluster/pod/vm_list.vue'),
            meta: {meta: 'pod_vm',no_auth: true}
          },
        ],
      },
      {
        path: '/cluster/:id',
        name: 'cluster_list',
        component: () => import('../views/vmOp2/cluster/clusterItem/gather.vue'),
        meta: {meta: 'cluster_list',no_auth: true},
        children: [
          {// 概要
            path: '/cluster/info/:id?',
            name: 'cluster_info',
            component: () => import('../views/vmOp2/cluster/clusterItem/info.vue'),
            meta: {meta: 'pod_info',no_auth: true}
          },
          { // 宿主机
            path: '/cluster/host/:id?',
            name: 'cluster_host',
            component: () => import('../views/vmOp2/cluster/pod/host_list.vue'),
            meta: {meta: 'cluster_host',no_auth: true}
          },
          {// 虚拟机
            path: '/cluster/virtual_machine/:id?',
            name: 'cluster_vm',
            component: () => import('../views/vmOp2/cluster/pod/vm_list.vue'),
            meta: {meta: 'pod_info',no_auth: true}
          },
          {//报警
            path: '/cluster/alarm/:id?',
            name: 'cluster_alarm',
            component: () => import('../views/vmOp2/cluster/clusterItem/alarm_info.vue'),
            meta: {menu: 'cluster_alarm'}
          },
          {//报警
            path: '/cluster/event/:id?',
            name: 'cluster_event',
            component: () => import('../views/vmOp2/cluster/clusterItem/event.vue'),
            meta: {menu: 'cluster_event'}
          },
        ],
      },
      {
        path: '/host/:id',
        name: 'host_list',
        component: () => import('../views/vmOp2/cluster/host/gather.vue'),
        meta: {menu: 'host_list',no_auth: true},
        children: [
          {// 概要
            path: '/host/info/:id?',
            name: 'host_info',
            component: () => import('../views/vmOp2/cluster/host/info.vue'),
            meta: {meta: 'host_info',no_auth: true}
          },
          {// 虚拟机
            path: '/host/virtual_machine/:id?',
            name: 'host_vm',
            component: () => import('../views/vmOp2/cluster/pod/vm_list.vue'),
            meta: {meta: 'host_vm',no_auth: true}
          },
          {// 监控
            path: '/host/monitor/:id?',
            name: 'host_monitor',
            component: () => import('../views/vmOp2/cluster/host/monitor.vue'),
            meta: {meta: 'host_monitor',no_auth: true}
          },
          {// 存储
            path: '/host/storage/:id?',
            name: 'host_storage',
            component: () => import('../views/physical/storage.vue'),
            meta: {meta: 'host_storage',no_auth: true}
          },
          {// GPU
            path: '/host/gpu/:id?',
            name: 'host_gpu',
            component: () => import('../views/vmOp2/cluster/host/gpu.vue'),
            meta: {meta: 'host_gpu',no_auth: true}
          },
        ],
      },
      //虚机监控
      {
        path: '/vm_monitor/:id',
        name: 'monitor',
        component: () => import('../views/instance/monitor.vue'),
        meta: {menu: 'monitor',no_auth: true}
      },
      {
        path: '/mirror_list',
        name: 'mirror',
        component: () => import('../views/vmOp2/mirror/list.vue'),
        meta: {menu: 'mirror_list',no_auth: true}
      },
      {
        path: '/privateMirror_list',
        name: 'private_mirror',
        component: () => import('../views/vmOp2/mirror/privateMirror.vue'),
        meta: {menu: 'private_mirror',no_auth: true}
      },
      {
        path: '/disk_list',
        name: 'disk',
        component: () => import('../views/vmOp2/storage/list.vue'),
        meta: {menu: 'disk_list',no_auth: true}
      },
      {
        path: '/ecs_destroyed_list',
        name: 'ecs_destroyed_list',
        component: () => import('../views/instance/destroyedList.vue'),
        meta: {meta: 'ecs_destroyed_list', no_auth: true}
      },
      {
        path: '/operate_log_list',
        name: 'operate_log',
        component: () => import('../views/log/list.vue'),
        meta: {meta: 'operate_log',no_auth: true}
      },
      {
        path: '/error',
        name: 'error',
        component: () => import('../views/vmOp2/404.vue'),
        meta: {menu: '404', no_auth: true}
      },
      {
        path: '/waiting_hosts/:id?',
        name: 'waiting_hosts',
        component: () => import('../views/vmOp2/cluster/pod/noClusterHostList.vue'),
        meta: {menu: 'waiting_hosts',no_auth: true}
      },
      {
        path: '/message_list',
        name: 'message',
        component: () => import('../views/message/list.vue'),
        meta: {meta: 'message',no_auth: true}
      },
      {
        path: '/main_task',
        name: 'config_main_task',
        component: () => import('../views/vmOp2/task/main-task-list.vue'),
        meta: {menu: 'main_task_list',no_auth: true}
      },
      {
        path: '/main_task/:id',
        name: 'main_task_detail',
        component: () => import( '../views/task/main-task-detail.vue'),
        meta: {menu: 'main_task_list',no_auth: true}
      },
      {
        path: '/sub_task',
        name: 'config_sub_task',
        component: () => import('../views/vmOp2/task/sub-task-list.vue'),
        meta: {menu: 'sub_task_list',no_auth: true}
      },
      {
        path: '/project_list',
        name: 'project',
        component: () => import('../views/project/list.vue'),
        meta: {menu: 'project',no_auth: true}
      },
      {
        path: '/alarmShield',
        name: 'alarm_shield',
        component: () => import('../views/vmOp2/alarm/alarm_shield.vue'),
        meta: {menu: 'alarm_shield',no_auth: true}
      },
      {
        path: '/alarm_strategy',
        name: 'alarm_strategy_list',
        component: () => import('../views/vmOp2/alarm/strategy.vue'),
        meta: {menu: 'alarm_strategy_list',no_auth: true}
      },
      {
        path: '/alarm_strategy/create',
        name: 'alarm_strategy_list_create',
        component: () => import('../views/alarm/add_strategy.vue'),
        meta: {menu: 'alarm_strategy',no_auth: true}
      },
      {
        path: '/alarm_contact',
        name: 'alarm_contact_list',
        component: () => import('../views/vmOp2/alarm/contact.vue'),
        meta: {menu: 'alarm_contact_list',no_auth: true}
      },
      {
        path: '/alarm_info/create',
        name: 'alarm_create',
        component: () => import('../views/alarm/createShield.vue'),
        meta: {menu: 'alarm_info',no_auth: true}
      },
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/fLayout.vue'),
    redirect: {path: '/overview'},
    children: [
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
        meta: {label:'云服务器管理',menu: 'instance_list'}
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
        path: '/nfv/monitor/:id/:ip',
        name: 'monitor',
        component: () => import('../views/nfv/monitor.vue'),
        meta: {menu: 'nfv_list'}
      },
      {
        path: '/alarmInfo',
        name: 'alarm_info',
        component: () => import('../views/alarm/alarmInfo.vue'),
        meta: {menu: 'alarm_info'}
      },
      {
        path: '/alarmInfo/create',
        name: 'alarm_create',
        component: () => import('../views/alarm/createShield.vue'),
        meta: {menu: 'alarm_info'}
      },
      {
        path: '/alarmStrategy',
        name: 'alarm_strategy',
        component: () => import('../views/alarm/strategy.vue'),
        meta: {menu: 'alarm_strategy'}
      },
      {
        path: '/alarmStrategy/create',
        name: 'alarm_strategy_create',
        component: () => import('../views/alarm/add_strategy.vue'),
        meta: {menu: 'alarm_strategy'}
      },
      {
        path: '/alarmContact',
        name: 'alarm_contact',
        component: () => import('../views/alarm/contact.vue'),
        meta: {menu: 'alarm_contact'}
      },
      {
        path: '/disk',
        name: 'disk_list',
        component: () => import('../views/disk/list.vue'),
        meta: {menu: 'disk_list'}
      },
      {
        path: '/diskRecord',
        name: 'disk_record',
        component: () => import('../views/disk/record.vue'),
        meta: {menu: 'disk_record'}
      },
      {
        path: '/diskVolume',
        name: 'disk_volume',
        component: () => import('../views/disk/volume.vue'),
        meta: {menu: 'disk_volume'}
      },
      {
        path: '/snapshot',
        name: 'snapshot_list',
        component: () => import('../views/snapshot/tabList.vue'),
        meta: {menu: 'snapshot_list'}
      },
      {
        path: '/chain/detail',
        name: 'snapshot_detail',
        component: () => import('../views/snapshot/chains-detail.vue'),
        meta: {menu: 'snapshot_list'}
      },
      {
        path: '/disk/create',
        name: 'disk_create',
        component: () => import('../views/disk/create.vue'),
        meta: {menu: 'disk_list'}
      },
      {
        path: '/disk/detail',
        name: 'disk_detail',
        component: () => import('../views/disk/detail.vue'),
        meta: {menu: 'disk_list'}
      },
      {
        path: '/physical',
        name: 'physical_list',
        component: () => import('../views/physical/list.vue'),
        meta: {menu: 'physical_list'}
      },
      {
        path: '/physical/detail',
        name: 'physical_detail',
        component: () => import('../views/physical/detail.vue'),
        meta: {menu: 'physical_list'}
      },
      {
        path: '/disk/capacity',
        name: 'disk_capacity',
        component: () => import('../views/disk/capacity.vue'),
        meta: {menu: 'disk_list'}
      },
      {
        path: '/gpu',
        name: 'gpu_list',
        component: () => import('../views/gpu/list.vue'),
        meta: {menu: 'gpu_list'}
      },
      {
        path: '/gpuRecord',
        name: 'gpu_fault_record',
        component: () => import('../views/gpu/faultRecord.vue'),
        meta: {menu: 'gpu_fault_record'}
      },
      {
        path: '/mirror',
        name: 'mirror_list',
        component: () => import('../views/mirror/list.vue'),
        meta: {menu: 'mirror_list'}
      },
      {
        path: '/privateMirror',
        name: 'private_mirror_list',
        component: () => import('../views/mirror/privateMirror.vue'),
        meta: {menu: 'private_mirror_list'}
      },
      {
        path: '/fielsystem',
        name: 'filesystem_list',
        component: () => import('../views/filesystem/list.vue'),
        meta: {menu: 'filesystem_list'}
      },
      {
        path: '/fielsystem/detail',
        name: 'file_detail',
        component: () => import('../views/filesystem/detail.vue'),
        meta: {menu: 'filesystem_list'}
      },
      {
        path: '/vm',
        name: 'vm_list',
        component: () => import('../views/filesystem/vm.vue'),
        meta: {menu: 'vm_list'}
      },
      {
        path: '/notFilesystem',
        name: 'notFilesystem',
        component: () => import('../views/filesystem/notFilesystem.vue'),
        meta: {menu: 'notFilesystem'}
      },
      {
        path: '/nasSet',
        name: 'nasSet',
        component: () => import('../views/filesystem/set.vue'),
        meta: {menu: 'nasSet'}
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
        path: '/log',
        name: 'log_list',
        component: () => import('../views/log/list.vue'),
        meta: {meta: 'log_list'}
      },
      {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
        meta: {menu: '404', no_auth: true}
      }
    ]
  }
];

export default routes;
