<template>
  <div id="app">
    <Header :class="{'header-box': $store.state.qiankun}"></Header>
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
  }
})
export default class App extends Vue {
  get key (): string {
    return this.$route.path + Math.random()
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
