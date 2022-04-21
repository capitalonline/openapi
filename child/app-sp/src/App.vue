<template>
  <div id="app">
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
import LeftMenu from './components/LeftMenu.vue';

@Component({
  components: {
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
.main-content {
  background: #f5f6fa;
}
</style>
