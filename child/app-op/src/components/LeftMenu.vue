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
      name: "pod_list",
      label: "POD管理"
    },
    {
      name: "physical_list",
      label: "物理资源管理"
    },
    {
      name: "instance_list",
      label: "云服务器管理"
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
    this.all_menu.forEach((item:any) => {      
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

