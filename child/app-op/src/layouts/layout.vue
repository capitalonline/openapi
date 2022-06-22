<template>
  <el-container class="container">
    <el-aside width="180px">
      <Sidebar></Sidebar>
    </el-aside>
    <el-main  class="main-content">
      <router-view :key="key"></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from './sidebar.vue';

@Component({
  components: {
    Sidebar
  }
})
export default class Layout extends Vue {
  get key(){
    return this.$route.path + Math.random()
  }
} 
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: auto;
}
.header-box {
  position: absolute;
  top: 0px;
  left: 100px;
  width: calc(100% - 300px);
}
.main-content {
  background: #f5f6fa;
}
</style>