<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from './layouts/layout.vue';

@Component({
  components: {
    Layout
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Microsoft YaHei,Segoe UI,Helvetica Neue,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #333;
  font-size: 14px;
}
</style>
