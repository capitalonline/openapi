<template>
  <div style="height: 100%">
    <Header :class="{'header-box': $store.state.qiankun}"></Header>
    <el-container class="container">
      <el-aside width="260px">
        <div style="width: 100%;text-align: right;background: #fafafa">
          <el-button type="text" @click="changeLayout"><i class="el-icon-arrow-left"></i></el-button>
          <el-divider></el-divider>
        </div>
          <sidebar></sidebar>
      </el-aside>
      <el-container class="main-content">
        <el-main>
          <router-view :key="key"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Sidebar from "@/layouts/sidebar.vue";
import Header from '../components/Header.vue';
@Component({
  components: {
    Sidebar,
    Header

  },
})

export default class Layout extends Vue{
  get key(){
    return this.$route.path + Math.random()
  }
  private changeLayout(){
    this.$router.push({name:'overview'})

  }

}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: auto;
  .el-divider--horizontal{
    margin: 5px 0;
  }
}
.main-content {
  background: #fafafa;
  .bottom-header{
    border-bottom: solid 1px #e6e6e6
  }
}
.el-aside {
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
}
.el-header {
  // background: #fff;
  // box-shadow: 0 5px 5px #dde2ef;
}
</style>
<style lang="scss">
.el-main {
  padding: 5px;
}
</style>
