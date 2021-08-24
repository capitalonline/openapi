<template>
  <div class="box">
    <div class="left-label" :class="{'is-required': is_required}">{{ label }}</div>
    <div class="right-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  
})
export default class extends Vue {
  @Prop({ default: '' }) private label!: string;
  @Prop({ default: false }) private is_required!: boolean;
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .left-label {
    width: 120px;
    min-width: 120px;
    line-height: 44px;
    font-size: 14px;
  }
  .is-required {
    &::before {
      content: '*';
      color: #F56C6C;
      margin-right: 4px;
    }
  }
  .right-content {
    flex: 1;
    padding: 6px 0;
    overflow: auto;
    line-height: 32px;
  }
}
</style>

