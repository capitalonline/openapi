<template>
  <el-form 
    :model="data"
    ref="resetForm"
    label-position="left" 
    label-width="50px" 
    class="pwd-form">
    <el-form-item label="规格">
      <el-select v-model="default_calc" value-key="ecs_goods_id">
        <el-option v-for="item in calc_list" :key="item.ecs_goods_id" :value="item" :label="item.ecs_goods_name"></el-option>
      </el-select>
    </el-form-item>
    <div class="inline-form">
      <el-form-item label="vCPU" prop="cpu">
        <el-select v-model="data.default_spec" value-key="cpu_size">
          <el-option v-for="cpu in default_calc.ecs_spec_list" :key="cpu.cpu_size" :value="cpu" :label="cpu.cpu_size"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内存" prop="ram" class="m-left20">
        <el-select v-model="data.ram">
          <el-option v-for="ram in data.default_spec.ram_size_list" :key="ram" :value="ram" :label="ram"></el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import Service from '../../https/instance/create';

@Component
export default class resetPwd extends Vue{
  @Prop({default: ''}) private az_id!: string;
  @Prop({default: ''}) private customer_id!: string;
  private calc_list = [];
  private default_calc = {
    ecs_goods_id: '',
    ecs_goods_name: '',
    ecs_spec_list: []
  };
  private data = {
    default_spec: {
      cpu_size: '',
      ram_size_list: []
    },
    ram: ''
  }
  private async FnGetSpecList() {
    if (!this.az_id) {
      return
    }
    let resData: any = await Service.get_spec_list({
      az_id: this.az_id,
      customer_id: this.customer_id
    });
    if (resData.code == 'Success') {
      this.calc_list = resData.data.length > 0 ? resData.data : [{ecs_spec_list: []}];
      this.default_calc = this.calc_list[0];
    }
  }
  private FnSubmit() {
    let flag = false;
    (this.$refs['resetForm'] as any).validate((valid) => {
      flag = valid;
    })
    return {
      flag: flag,
      spec_info: {
        ecs_goods_id: this.default_calc.ecs_goods_id,
        ecs_goods_name: this.default_calc.ecs_goods_name,
        cpu_size: this.data.default_spec.cpu_size,
        ram_size: this.data.ram,
      }
    }
  }
  private FnResetForm(formName) {
    (this.$refs['resetForm'] as any).resetFields();
  }
  @Watch('default_calc.ecs_goods_id')
  private FnChangeCalc(newVal) {
    this.data.default_spec = this.default_calc.ecs_spec_list[0];
  }
  @Watch('data.default_spec.cpu_size')
  private FnChangeSpec(newVal) {
    this.data.ram = this.data.default_spec.ram_size_list[0];
  }
  @Watch('az_id') 
  private FnChangeAz(newVal, oldVal) {
    this.FnGetSpecList();
  }
  @Watch('customer_id')
  private FnChangeCustomer(newVal, oldVal) {
    this.FnGetSpecList();
  }
}
</script>

<style lang="scss" scoped>
.inline-form {
  display: flex;
}
</style>