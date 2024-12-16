<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({})
export default class backHeader extends Vue {
  @Prop({ default: "" }) private title!: string;
  @Prop({ default: "" }) private back_url!: string;
  private FnBack() {
    if (this.back_url) {
      this.$router.push(this.back_url);
    } else {
      this.$router.go(-1);
    }
  }

}
</script>

<template>
  <div>
    <div class="header">
      <div>
        <span>{{title}}</span>
        <slot name="left"></slot>
      </div>
      <div>
        <slot></slot>
        <el-button type="primary" plain @click="FnBack">返回</el-button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.header{
  display: flex;
  justify-content: space-between;
  height: 56px;
  line-height: 56px;
  width: calc(100% - 50px);
  background: #Ffffff;
  padding: 0 10px;
  z-index: 999;
  position: absolute;
  box-shadow: 0 5px 5px #dde2ef;;
  span:first-child{
    font-weight: bold;
    margin-right: 10px;
  }
}

</style>
