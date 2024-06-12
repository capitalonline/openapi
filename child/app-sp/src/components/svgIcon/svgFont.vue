<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator';
@Component({})
export  default class SvgIcon extends Vue {
  @Prop({default:''}) private iconName!:string
  @Prop({default:''}) private className:string
  @Prop({default:'#8a8a8a'}) private color:string
// 图标在 iconfont 中的名字
  private get iconClassName(){
    return `#${this.iconName}`;
  }
// 给图标添加上类名
  private get svgClass(){
    if (this.className) {
      return `svg-icon ${this.className}`;
    }
    return 'svg-icon';
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
