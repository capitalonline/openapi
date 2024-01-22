<template>
  <el-container class="container">
    <el-header width="180px">
      <Sidebar></Sidebar>
    </el-header>
    <el-container class="main-content">
      <el-main>
        <router-view :key="key"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Sidebar from "@/layouts/sidebar.vue";
@Component({
  components: {
    Sidebar

  },
})

export default class Layout extends Vue{
  get key(){
    return this.$route.path + Math.random()
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/handle';
.container {
  height: 100%;
  overflow: auto;
  @include background_color('background_color1');
}
.main-content {//
  padding: 0 !important;
  margin:0 !important;
  @include background_color('background_color5');
}
.el-aside {
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  @include background_color('background_color1');
}
.el-header {
  // background: #fff;
  // box-shadow: 0 5px 5px #dde2ef;
}
</style>
<style lang="scss">
.el-main {
  padding: 0 0 20px 0;
}
</style>
