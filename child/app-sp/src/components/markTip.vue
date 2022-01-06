<template>
  <el-tooltip 
    :content="content" 
    :placement="placement" 
    :effect="effect"
    popper-class="tooltip-class">
    <template #content>
      <slot name="content">
      
      </slot>
    </template>
    <el-button type="text"><svg-icon icon="info" viewBox="0 0 18 18"></svg-icon></el-button>
  </el-tooltip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import svgIcon from './svgIcon/index.vue';

@Component({
  components: {
    svgIcon
  }
})
export default class MarkTip extends Vue {
  @Prop({default: ''}) private content!: string;
  @Prop({default: 'right'}) private placement!: 'right' | 'bottom' | 'left' | 'top';
  @Prop({default: 'light'}) private effect!: 'dark' | 'light';
}
</script>

<style lang="scss">
.tooltip-class {
  max-width: 220px;
  line-height: 22px;
}
</style>