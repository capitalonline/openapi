<template>
  <el-menu
    :default-active="active_menu"
    class="el-menu-vertical-demo"
    >
    <template v-for="item in menu">
      <el-submenu
        :index="item.name"
        :key="item.name"
        v-if="item.children">
        <template slot="title">
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.name"
          :index="child.name"
          @click="FnChangeUrl(child.name)">
          <span>{{ child.label }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        :index="item.name"
        :key="item.name"
        @click="FnChangeUrl(item.name)"
        v-else>
        <span>{{ item.label }}</span>
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
  private all_menu = [
    {
      name: "overview",
      label: "概览"
    },
    // {
    //   name: "monitor",
    //   label: "监控"
    // },
    // {
    //   name: "pod_list",
    //   label: "POD管理"
    // },
    {
      name: "physical_list",
      label: "物理机管理"
    },
    {
      name: "instance_list",
      label: "云服务器管理"
    },
    {
      name: "disk_list",
      label: "云盘管理"
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
          name: "not_filesystem",
          label: "不可用文件系统"
        },
      ]
    },
    { name: 'event_list', label: "任务管理" },
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
  ];
  private menu: Array<object> = [];
  private FnChangeUrl(name): void {
    if(this.active_name == name) {
      this.$router.go(0)
    } else {
      this.$router.push({ name: name })
    }
  };
  created() {
    this.all_menu.forEach(item => {
      if (item.children) {
        let child_list = []
        item.children.forEach(child => {
          if (this.$store.state.auth_info[child.name]) {
            child_list.push(child)
          }
        })
        if (child_list.length > 0) {
          this.menu.push({
            name: item.name,
            label: item.label,
            children: child_list
          })
        }
      } else {
        if (this.$store.state.auth_info[item.name]) {
          this.menu.push(item)
        }
      }
    })
  }


  @Watch('$route')
  private FnWatchRouter(to, from) {
    this.active_name = to.name;
    this.active_menu = to.meta.menu || to.name;
  }
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>

