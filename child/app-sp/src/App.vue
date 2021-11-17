<template>
  <div id="app">
    <Header></Header>
    <el-container class="container">
      <el-aside width="200px">
        <left-menu></left-menu>
      </el-aside>
      <el-main class="main-content">
        <router-view :key="key"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import LeftMenu from './components/LeftMenu.vue';

@Component({
  components: {
    Header,
    LeftMenu
  },
})
export default class App extends Vue {
  $route;
  get key(){
    return this.$route.path+  Math.random()
  }
  created() {
    window.onerror = (error) => {
      console.log('错误信息：', error)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #333;
}
.container {
  height: calc(100% - 52px);
  overflow: auto;
}
.main-content {
  background: #f5f6fa;
}
</style>
