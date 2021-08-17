<template>
  <div class="box">
    <div>{{ title }}</div>
    <div>
      <el-button type="primary" plain @click="FnBack">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop , Vue } from 'vue-property-decorator';

@Component
export default class backHeader extends Vue {
  @Prop({ default: "" }) private title!: string;
  @Prop({ default: "" }) private back_url!: string;

  $router;
  private FnBack() {
    if (this.back_url) {
      this.$router.push(this.back_url);
    } else {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  margin: -20px -20px 20px -20px;
  background: #fff;
  box-shadow: 0 5px 5px #dde2ef;
  font-weight: bold;
}
</style>

