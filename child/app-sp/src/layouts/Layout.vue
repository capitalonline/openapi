<template>
  <div style="height: 100%">
    <top-header :class="{'header-box': $store.state.qiankun}"></top-header>
    <el-container class="container">
      <el-aside class="aside_main" :class="{aside_main_show:!asideStatus}">
          <sidebar></sidebar>
      </el-aside>
      <el-container class="main-content">
        <el-main class="main_cont">
          <div class="aside_open_close" @click="asidechange">
            <i class="el-icon-arrow-left" v-if="aside_open_close"></i>
            <i class="el-icon-arrow-right" v-else></i>
          </div>
<!--          <div>-->
<!--            <el-button type="text" @click="changeLayout">-->
<!--              <i class="el-icon-arrow-left"></i></el-button>-->
<!--            <el-divider></el-divider>-->
<!--          </div>-->
          <router-view :key="key"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Sidebar from "@/layouts/sidebar.vue";
import TopHeader from "@/layouts/TopHeader.vue";
@Component({
  components: {
    TopHeader,
    Sidebar,

  },
})

export default class Layout extends Vue{
  private asideStatus:boolean = true
  private aside_open_close:boolean = true
  get key(){
    return this.$route.path + Math.random()
  }
  private asidechange(){
    this.asideStatus = !this.asideStatus
    if(this.asideStatus){
      setTimeout(()=>{
        this.aside_open_close =true
      },500)
    }else{
      setTimeout(()=>{
        this.aside_open_close =false
      },500)
    }
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
  background: #f5f6fa;
  position: relative;
}
.el-aside {
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
}
.aside_main {
  width: 245px !important;
  transition: width 0.2s;
}
.aside_main_show {
  width: 0 !important;
}
.aside_open_close{
  position: absolute;
  left: 0;
  top: 50%;
  width: 16px;
  height: 33px;
  line-height: 35px;
  background: #Ffffff;
  border-bottom: 0.05rem solid #ccc;
  border-top: 0.05rem solid #ccc;
  border-right: 0.05rem solid #ccc;
  border-left-color:initial;
  font-size: 15px;
  z-index: 800;
  cursor: pointer;

}
  .el-header {
  // background: #fff;
  // box-shadow: 0 5px 5px #dde2ef;
}
</style>
<style lang="scss">
.el-main {
  padding: 5px 5px 5px 20px;
}
</style>
