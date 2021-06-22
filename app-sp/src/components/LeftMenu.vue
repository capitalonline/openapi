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
          <i class="el-icon-menu"></i>
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
        <i class="el-icon-menu"></i>
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
export default class App extends Vue {
  $router;
  private active_menu :String = "sub_task_list";
  private menu = [
    {
      name: "task",
      label: "任务管理",
      children: [
        { name: 'main_task_list', label: "主任务管理" },
        { name: 'sub_task_list', label: "子任务管理" }
      ]
    },
    {
      name: "project_list",
      label: "项目管理",
    }
  ];
  FnChangeUrl(name) {
    if(this.active_menu == name) {
      this.$router.go(0)
    } else {
      this.$router.push({ name: name })
    }
  };

  @Watch('$route')
  private FnWatchRouter(to, from) {
    this.active_menu = to.name
  }
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>

