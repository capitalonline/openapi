<template>
  <el-menu :default-active="active_menu">
    <template v-for="item in routes">
      <el-submenu
        :index="item.name"
        :key="item.name"
        v-if="item.children">
        <template #title>
          {{ item.meta.label }}
        </template>
        <el-menu-item
          v-for="child in item.children"
          :index="child.name"
          :key="child.name"
          @click="FnChangeUrl(child.name)">
          <template #title>
            {{ child.meta.label }}
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        :index="item.name"
        :key="item.name"
        @click="FnChangeUrl(item.name)"
        v-else>
        <template #title>
          {{ item.meta.label }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class LeftMenu extends Vue {
  $router;
  $store;
  private active_menu: string = '';
  private active_name: string = ''
  private routes:any = [
    {
      name: "physical_list",
      label: "物理机管理"
    },
    {
      name: "instance_list",
      label: "云服务器管理"
    },
    {
      name: 'gpu',
      label: 'GPU',
      children: [
        {
          name: "gpu_list",
          label: "GPU管理",
        },
        {
          name: "gpu_fault_record",
          label: "GPU故障记录",
        }
      ]
    },
    {
      name: "nfv_list",
      label: "NFV云服务器",
    },
    {
      name: 'disk',
      label: '云盘',
      children: [
        {
          name: "disk_list",
          label: "云盘管理"
        },
        // {
        //   name: "snapshot_list",
        //   label: "快照管理"
        // },
      ]
    },
    {
      name: 'mirror',
      label: '镜像管理',
      children: [
        {
          name: "mirror_list",
          label: "公共镜像管理"
        },
        {
          name: "private_mirror_list",
          label: "私有镜像管理"
        }
      ]
    },
    {
      name: 'filesystem',
      label: '文件存储',
      children: [
        {
          name: "filesystem_list",
          label: "文件系统"
        },
        {
          name: "vm_list",
          label: "NAS转发虚拟机"
        },
        {
          name: "notFilesystem",
          label: "不可用文件系统"
        },
        {
          name: "nasSet",
          label: "NAS设置"
        },
      ]
    },
    { name: 'event_list', label: "任务管理" },
    { name: 'anomaly_event_list', label: "异常任务处理"},
    { name: 'repair_event_list', label: "异常任务处理2"},
    {
      name: "log_list",
      label: "操作日志审计"
    },
    {
      name:'alarm_manage',
      label:'报警管理',
      children:[
        {name:'alarm_info',label:'报警信息'},
        {name:'alarm_strategy',label:'报警策略'},
        {name:'alarm_contact',label:'报警联系人'},
      ]
    },
    {
      name: "message_list",
      label: "消息通知"
    },
    {
      name: "task_config",
      label: "底层任务配置",
      children: [
        { name: 'main_task_list', label: "主任务配置" },
        { name: 'sub_task_list', label: "子任务配置" },
        { name: 'project_list', label: "项目管理" },
      ]
    },
    {
      name: "destroyed",
      label: "已销毁资源",
      children: [
        { name: 'ecs_destroyed', label: "云服务器",noAuth:true, },
      ]
    },
  ];
  private menu: Array<object> = [];
  private FnChangeUrl(name): void {
    if(this.active_name == name) {
      this.$router.go(0)
    } else {
      this.$router.push({ name: name })
    }
  };
  // created() {
  //   this.all_menu.forEach(item => {
  //     if (item.children) {
  //       let child_list = []
  //       item.children.forEach(child => {
  //         if (this.$store.state.auth_info[child.name] || child.noAuth) {
  //           child_list.push(child)
  //         }
  //       })
  //       if (child_list.length > 0) {
  //         this.menu.push({
  //           name: item.name,
  //           label: item.label,
  //           children: child_list
  //         })
  //       }
  //     } else {
  //       if (this.$store.state.auth_info[item.name] || item.noAuth) {
  //         this.menu.push(item)
  //       }
  //     }
  //   })
  // }
   created() {
    this.routes = this.$router.options.routes[0].children;
    this.FnWatchRouter(this.$route)
  }

  @Watch('$route')
  private FnWatchRouter(to) {
    this.default_active = to.meta.menu || to.name;
  }


  @Watch('$route')
  private FnWatchRouter(to, from) {
    this.active_name = to.name;
    this.active_menu = to.meta.menu || to.name;
  }
}
</script>

<style lang="scss">
.menu-title {
  padding-top: 30px;
  padding-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  img {
    width: 50px;
    margin-bottom: 10px;
  }
}
.el-menu {
  border-right: none;
}
.el-submenu__title {
  text-align: center;
}
.el-submenu__icon-arrow {
  right: 8px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
  height: 32px;
  line-height: 32px;
  margin: 10px 0 20px;
  text-align: center;
  &:hover,
  &:focus {
    // background: #fff;
  }
}
.el-menu-item.is-active {
  border-right: 4px solid;
}
</style>

