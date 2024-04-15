<template>
  <div class="error-box">
    <div class="error-img">
      <img src="@/assets/404.png">
    </div>
    <div class="error-img">
      <div style="font-size: 25px">对不起，该节点目前没有数据</div>
      <div>Sorry,there is no data</div>
    </div>
  </div>

</template>S

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

export default class App extends Vue {

}
</script>

<style lang="scss" scoped>
.error-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  .error-img {
    margin-right: 30px;
    line-height: 32px;
  }
}
</style>
