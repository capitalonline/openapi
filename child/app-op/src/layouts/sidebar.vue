<template>
  <!-- <el-menu :default-active="default_active">
    <template v-for="item in routes">
      <el-menu-item
        :index="item.name"
        :key="item.name"
        @click="FnChangeActive(item.name)"
      >
        <template #title>
          {{ item.meta.label }}
        </template>
      </el-menu-item>
    </template>
  </el-menu> -->
  <el-menu :default-active="default_active">
    <template v-for="item in menu">
      <el-submenu
        :index="item.name"
        :key="item.name"
        v-if="item.children"
      >
        <template slot="title">
          <span>{{item.label}}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :index="child.name"
          :key="child.name"
          @click="FnChangeUrl(child.name)"
        >
          <span>{{child.label}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        :index="item.name"
        :key="item.name"
        @click="FnChangeUrl(item.name)"
        v-else
      >
        <span>{{ item.label }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class SideBar extends Vue {
  $router;
  private routes: Array<Object>=[];
  private default_active: string = '';
  private all_menu:any=[
    {
      name: 'statistical',
      label: '数据统计',
      children: [
        {
          name: "resource_statistical_list",
          label: "资源统计"
        },
      ]
    },
    {
      name: "az_list",
      label: "可用区管理"
    },
    {
      name: "pod_list",
      label: "POD管理"
    },
    {
      name: 'productType',
      label: '物理机产品类型管理',
    },
    {
      name: "physical_list",
      label: "物理资源管理"
    },
    {
      name: "instance_list",
      label: "云服务器管理"
    },
    {
      name: 'inventory',
      label: '库存',
      children: [
        {
          name: "inventory_list",
          label: "资源库存"
        },
        {
          name: "product_inventory_list",
          label: "商品库存"
        }
      ]
    },
  ]
  private menu: Array<object> = [];
    private active_name: string = ''
  private FnChangeActive(name) {
    if (this.$route.name === name) {
      this.$router.go()
    } else {
      this.$router.push({name: name})
    }
  }
  private FnChangeUrl(name): void {
    if(this.active_name == name) {
      this.$router.go(0)
    } else {
      this.$router.push({ name: name })
    }
  };
  
  private created() {    
    this.routes = this.$router.options.routes.filter(item => !item.meta?.hidden);
    console.log('this.routes',this.routes)
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
    // this.routes = this.$router.options.routes.filter(item => !item.meta?.hidden);
    // this.FnWatchRouter(this.$route)
  }

  @Watch('$route')
  private FnWatchRouter(to) {
    this.active_name = to.name;
    this.default_active = to.meta.menu || to.name;
  }
} 
</script>

<style lang="scss">
.el-menu {
  height: 100%;
}
</style>