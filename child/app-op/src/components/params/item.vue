<template>
  <div>
    <el-button type="text" @click="FnAddDepen" class="add-btn">
      <i class="el-icon-plus"></i> 添加
    </el-button>
    <div v-for="(item, index) in dependent_params" :key="index + '--'" class="add-box">
      <div class="m-right10">
        <el-input type="text" v-model="item.key" @blur="FnEmit"></el-input>
      </div>
      <div v-if="type!=='key'">
        <el-select v-model="item.type" @change="FnChangeDep(item)">
          <el-option 
            v-for="(value, key) in dependent_type" 
            :key="key + '-' + index" 
            :label="value.label" 
            :value="key"
            @change="FnEmit">
          </el-option>
        </el-select>
        <el-button type="text" v-if="item.type === 'object' && !second" class="m-left10" @click="FnAddChild(item)">{{ item.second_key }} 详情</el-button>
      </div>
      <div>
        <el-input-number v-model="item.value" :min="0" :max="10000" v-if="item.type === 'number' " class="m-left10" @blur="FnEmit"></el-input-number>
        <div v-if="item.type === 'string'" class="short-input m-left10"><el-input v-model="item.value" @blur="FnEmit"></el-input></div>
      </div>
      <div class="btn-box"><el-button type="text" @click="FnDel(index)"><i class="el-icon-remove-outline"></i></el-button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';

@Component
export default class ParamsItem extends Vue {
  @Prop({ default: '' }) readonly params!: [];
  @Prop({ default: false }) readonly second!: boolean;
  @Prop({ default: '' }) readonly type!: string;
  private dependent_params = [];
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
    this.dependent_params.push({key: '', second_key: '', type: '', value: ''});
  }
  private FnChangeDep(data): void {
    data.value = this.dependent_type[data.type].value;
  }
  @Emit('fn-child')
  public FnAddChild(item) {
    return item
  }

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
  }

  mounted() {
    this.dependent_params = this.params;
    this.FnEmit()
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
