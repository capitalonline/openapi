<template>
  <div>
    <el-button type="text" @click="FnAddDepen" class="add-btn">
      <i class="el-icon-plus"></i> 添加
    </el-button>
    <div v-for="(item, index) in dependent_params" :key="index + '--'" class="add-box">
      <div class="m-right10"><el-input type="text" v-model="item.key" @blur="FnEmit"></el-input></div>
      <div><el-select v-model="item.value">
        <el-option 
          v-for="value in dependent_type" 
          :key="value.type + '-' + index" 
          :label="value.label" 
          :value="value.value"
          @change="FnEmit">
        </el-option>
      </el-select>
      </div>
      <div class="btn-box"><el-button type="text" @click="FnDel(index)"><i class="el-icon-remove-outline"></i></el-button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component({
  
})
export default class extends Vue {
  $emit;
  @Prop({ default: '' }) private params!: [];
  private dependent_params = [];
  private dependent_type = [
    {type: 'number', label: '数值', value: 0},
    {type: 'string', label: '字符串', value: ''},
    {type: 'object', label: '字典', value: {}},
    {type: 'list', label: '列表', value: []},
  ]
  private FnAddDepen() {
    this.dependent_params.push({key: '', value: ''})
  };
  private FnEmit() {
    this.$emit('fn-change', this.dependent_params)
  };
  private FnDel(index) {
    this.dependent_params.splice(index, 1)
    this.FnEmit()
  };

  @Watch('params')
  private FnWatchRel(newVal) {
    this.dependent_params = newVal;
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
</style>

<style lang="scss">
.btn-box {
  line-height: 46px;
  margin-left: 10px;
  .el-button--text {
    font-size: 22px;
  }
}
</style>
