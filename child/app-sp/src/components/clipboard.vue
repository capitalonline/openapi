<template>
  <el-tooltip 
    content="复制" 
    placement="bottom" 
    effect="light">
    <el-button type="text" v-clipboard:copy="content" v-clipboard:success="onCopy" v-clipboard:error="onError" :key="content">
      <svg-icon icon="copy"></svg-icon>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import svgIcon from './svgIcon/index.vue';

@Component({
  components: {
    svgIcon
  }
})
export default class Clipboard extends Vue {
  @Prop({default: ''}) readonly content!: string;
  private onCopy() {
    this.$message.success('复制成功')
  }
  private onError() {
    this.$message.error('复制失败')
  }
}
</script>
<style lang="scss" scoped>
.el-button--text {
  vertical-align: text-bottom;
}
</style>