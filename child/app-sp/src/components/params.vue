<template>
  <div :key="key">
    <el-button type="text" @click="FnAddDepen" class="add-btn">
      <i class="el-icon-plus"></i> 添加
    </el-button>
    <div v-for="(item, index) in dependent_params" :key="index + '--'" class="add-box">
      <div class="m-right10"><el-input type="text" v-model="item.key" @blur="FnEmit"></el-input></div>
      <div>
        <el-select v-model="item.type" @change="FnChangeDep(item)">
          <el-option 
            v-for="(value, key) in dependent_type" 
            :key="key + '-' + index" 
            :label="value.label" 
            :value="key"
            @change="FnEmit">
          </el-option>
        </el-select>
        <el-button type="text" v-if="item.type === 'object' && !second" class="m-left10" @click="FnAddChild(item)">详情</el-button>
      </div>
      <div>
        <el-input-number v-model="item.value" :min="0" :max="10000" v-if="item.type === 'number' " class="m-left10" @blur="FnEmit"></el-input-number>
        <div v-if="item.type === 'string'" class="short-input m-left10"><el-input v-model="item.value" @blur="FnEmit"></el-input></div>
      </div>
      <div class="btn-box"><el-button type="text" @click="FnDel(index)"><i class="el-icon-remove-outline"></i></el-button></div>
    </div>

    <el-dialog :visible.sync="child_dialog" :title="default_params.key" :close-on-click-modal="false" width="660px" append-to-body>
      <params :params="default_params_child" :second="true" @fn-change="FnGetChild"></params>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FnConfirmAddChild">确 定</el-button>
        <el-button @click="child_dialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Params extends Vue {
  @Prop({ default: '' }) readonly params!: [];
  @Prop({ default: false }) readonly second!: boolean;
  private dependent_params = [];
  private key = Symbol();
  private dependent_type = {
    'number': { label: '数值', value: 0 },
    'string': { label: '字符串', value: '' },
    'object': { label: '字典', value: {} },
    'list': { label: '列表', value: [] },
  };
  private child_dialog: boolean = false;
  private default_params = {
    value: {}
  };
  private default_params_child = [];
  private FnAddDepen(): void {
    this.dependent_params.push({key: '', type: '', value: ''});
  }
  private FnChangeDep(data): void {
    data.value = this.dependent_type[data.type].value;
  }
  private FnAddChild(item): void {
    this.default_params = item;
    this.default_params_child = item.value instanceof Array ? item.value : [];
    this.child_dialog = true;
  }
  private FnGetChild(child) {
    this.default_params_child = child;
  }
  private FnConfirmAddChild() {
    this.default_params.value = this.default_params_child;
    this.child_dialog = false;
    this.FnEmit()
  };
  @Emit('fn-change')
  public FnEmit() {
    return this.dependent_params
  }
  private FnDel(index) {
    this.dependent_params.splice(index, 1)
    this.FnEmit()
  }

  @Watch('params')
  private FnWatchRel(newVal) {
    this.dependent_params = newVal;
    this.FnEmit()
    console.log('Watch', newVal)
  }

  mounted() {
    this.dependent_params = this.params;
    this.FnEmit()
    console.log('Mounted')
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  line-height: 32px;
}
.add-box {
  display: flex;
  line-height: 46px;
  .m-right10 {
    margin-right: 10px;
  }
}
.btn-box {
  line-height: 46px;
  margin-left: 10px;
}
.short-input {
  width: 140px;
}
</style>

<style lang="scss">
.btn-box {
  line-height: 46px;
  margin-left: 10px;
  .el-button--text {
    font-size: 22px;
    vertical-align: middle;
  }
}
</style>
