<template>
  <div id="app">
    <Header></Header>
    <div id="container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';

@Component({
  components: {
    Header
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
  height: 100%;
}
#container {
  height: 100%;
}
#container>div {
  height: 100%;
}
</style>
