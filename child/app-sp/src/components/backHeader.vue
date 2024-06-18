<template>
<div>
  <div class="box">
    <div>
      <span>{{ title }}</span>
      <slot name="left"></slot>
    </div>
    <div>
      <slot></slot>
      <el-button v-if="!no_back" type="primary" plain @click="FnBack">返回</el-button>
    </div>

  </div>
  <div class="perch"></div>
</div>

</template>

<script lang="ts">
import { Component, Prop , Vue } from 'vue-property-decorator';

@Component
export default class backHeader extends Vue {
  @Prop({ default: "" }) private title!: string;
  @Prop({ default: "" }) private back_url!: string;
  @Prop({default:false}) private no_back:boolean

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

  position: absolute;
  width: calc(100% - 240px);
  z-index: 999;
  span:first-child{
    font-weight: bold;
    margin-right: 10px;
  }

}
.perch{
    height: 16px;
    width: 100%;
  }
</style>

