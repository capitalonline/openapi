<template>
  <div>
    <Item :params="params" :child="default_params" @fn-change="FnEmit" @fn-child="FnAddChild"></Item>
    <el-dialog :visible.sync="child_dialog" :title="default_params.key" :close-on-click-modal="false" width="660px" append-to-body>
      <div class="key-box">
        <div class="m-right10">{{default_params.key + '.' }}</div>
        <div><el-input v-model="default_params.second_key"></el-input></div>
      </div>
      <Item :params="default_params_child" :second="true" @fn-change="FnGetChild"></Item>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FnConfirmAddChild">确 定</el-button>
        <el-button @click="child_dialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import Item from '../params/item.vue'

@Component({
  components: {
    Item
  }
})
export default class Params extends Vue {
  @Prop({ default: '' }) readonly params!: [];
  private default_params = {
    value: []
  };
  private default_params_child = [];
  private child_dialog = false;

  @Emit('fn-change')
  public FnEmit(data) {
    return data
  }
  private FnAddChild(item): void {
    this.default_params = item;
    this.default_params_child = item.value instanceof Array ? item.value : [];
    this.child_dialog = true;
  }
  private FnGetChild(child): void {
    this.default_params_child = child;
  }
  private FnConfirmAddChild(): void {
    this.default_params.value = this.default_params_child;
    this.child_dialog = false;
  };
}
</script>

<style lang="scss" scoped>
.key-box {
  display: flex;
  line-height: 32px;
}
</style>
