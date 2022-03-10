<template>
  <div class="error-box">
    <div class="error-img">
      <img src="@/assets/404.png">
    </div>
    <div class="error-img">
      您没有权限访问，请联系管理员！
    </div>
  </div>

</template>

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
  }
}
</style>
