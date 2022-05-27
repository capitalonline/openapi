<template>
  <el-menu :default-active="default_active">
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
  </el-menu>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class SideBar extends Vue {
  $router;
  private routes: Array<Object>=[];
  private default_active: string = '';
  private FnChangeActive(name) {
    if (this.$route.name === name) {
      this.$router.go()
    } else {
      this.$router.push({name: name})
    }
  }
  private created() {
    console.log('this.routes',this.routes);
    
    this.routes = this.$router.options.routes.filter(item => !item.meta?.hidden);
    this.FnWatchRouter(this.$route)
  }

  @Watch('$route')
  private FnWatchRouter(to) {
    this.default_active = to.meta.menu || to.name;
  }
} 
</script>

<style lang="scss">
.el-menu {
  height: 100%;
}
</style>