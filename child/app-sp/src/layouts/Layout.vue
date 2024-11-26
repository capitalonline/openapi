<template>
  <div style="height: 100%">
    <top-header :class="{'header-box': $store.state.qiankun}"></top-header>
    <div class="container">
      <el-aside class="aside_main" :class="{aside_main_show:!asideStatus}" :style="{ width: asideWidth + 'px' }">
        <sidebar></sidebar>
<!--        拖拽设置导航栏宽度-->
        <div class="resizer" @mousedown="startResize"></div>
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
    </div>
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
  private asideWidth:number = 260 // 默认宽度
  private isResizing:boolean =  false
  private startX:number = 0
  private startWidth:number = 0
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
  private startResize(event) {
    event.preventDefault()
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.asideWidth;
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.stopResize);
  }
  private resize(event) {
    if (this.isResizing) {
      const dx = this.startX + (event.clientX - this.startX);
      this.asideWidth = Math.min(Math.max(dx, 255), 600); // 最小宽度为255，最大宽度为600
    }
  }
  private stopResize() {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.resize);
    document.removeEventListener('mouseup', this.stopResize);
  }

}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: auto;
  width: 100%;
  display: flex;
  .el-divider--horizontal{
    margin: 5px 0;
  }
}
.header-box {
  position: absolute;
  top: 0px;
  left: 100px;
  width: calc(100% - 370px);
}
.main-content {
  background: #f5f6fa;
  position: relative;
  .el-main {
    padding: 5px 5px 5px 20px;
    height: 100%;
  }
}
.el-aside {
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  position: relative;
}
.aside_main {
  transition: width 0.2s;
  height: 100%;
}
.resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  cursor: ew-resize;
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
.el-main {
  padding: 5px 5px 5px 20px;
}
</style>
