<template>
  <div class="box">
    <div class="left-label">{{ label }}</div>
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
  @Prop({ default: '' }) private label!: String;
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .left-label {
    width: 120px;
    min-width: 120px;
    line-height: 44px;
  }
  .right-content {
    flex: 1;
    padding: 6px 0;
    overflow: auto;
  }
}
</style>

