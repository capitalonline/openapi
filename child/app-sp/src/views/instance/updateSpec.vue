<template>
  <el-form
    :model="data"
    ref="resetForm"
    label-position="left"
    class="spec-form">
    <div class="inline-form">
      <el-form-item class="m-right20">
        <el-select v-model="default_cpu_size" placeholder="全部vCPU" clearable>
          <el-option v-for="(value, cpu) in cpu_ram_size_list" :key="cpu + 'cpu'" :value="String(cpu)">{{ cpu }} vCPU</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="default_ram_size" placeholder="全部内存" clearable>
          <el-option v-for="(ram, index) in ram_size_list" :key="ram + index + 'ram'" :value="String(ram)">{{ ram }} GiB</el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item prop="">
      <span>分类： </span>
      <el-radio-group v-model="data.category_id">
        <el-radio-button v-for="item in category_list" :key="item.category_id" :label="item.category_id">{{ item.name }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="table-form">
      <div class="table-box">
        <el-table :data="family_list" border>
          <el-table-column label="选择" width="60">
            <template #default="scope">
              <el-radio v-model="data.cpu_ram_gpu" :label="FnJoinGoodCpuRamGpu(scope.row)" @change="FnEmit">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="ecs_family_name" label="规格族"></el-table-column>
          <el-table-column prop="cpu" label="vCPU"></el-table-column>
          <el-table-column prop="ram" label="内存"></el-table-column>
          <el-table-column prop="gpu" label="GPU" v-if="is_gpu">
            <template #default="scope">
              {{ scope.row.gpu }}*{{ scope.row.gpu_show_type }}
            </template>
          </el-table-column>
          <el-table-column prop="cpu_name" label="处理器型号" width="200"></el-table-column>
          <el-table-column label="参考价格">
            <template #default="scope">
              <span>{{ cpu_ram_gpu_price[FnJoinGoodCpuRamGpu(scope.row)] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import Service from '../../https/instance/create';
import { deal_fee_info } from '../../utils/transIndex';

@Component
export default class updateSpec extends Vue{
  @Prop({default: ''}) private az_id!: string;
  @Prop({default: ''}) private customer_id!: string;
  @Prop({default: '0'}) private billing_method!: string;
  @Prop({default: ''}) type!: '' | 'batch_update'; //批量修改
  @Prop({default: 0}) private default_is_gpu!: 0 | 1;
  private cpu_ram_size_list = [];
  private all_ram_size_list = [];
  private ram_size_list = [];
  private default_cpu_size = '';
  private default_ram_size = '';
  private category_list = [];
  private family_list = [];
  private is_gpu: 0 | 1 = 0;
  private billing_info = {};
  private cpu_ram_gpu_price = {};
  private data = {
    category_id: '',
    cpu_ram_gpu: ''
  };
  private async FnGetAllCpuRam() {
    let resData = await Service.get_all_cpu_ram();
    if (resData.code == 'Success') {
      this.cpu_ram_size_list = resData.data;
      let arr = [];
      for(let i in this.cpu_ram_size_list){
        arr = [...new Set([...arr, ...this.cpu_ram_size_list[i]])]
      }
      this.all_ram_size_list = arr.sort((v1,v2)=>{
        return v1 - v2
      })
      this.ram_size_list = this.all_ram_size_list;
    }
  }
  private async FnGetCategoryList() {
    if (!this.az_id) {
      return
    }
    this.family_list = [];
    let resData = await Service.get_category_list({
      az_id: this.az_id,
      customer_id: this.customer_id,
      biiling_method: this.billing_method,
      cpu: String(this.default_cpu_size),
      ram: String(this.default_ram_size)
    });
    if (resData.code == 'Success') {
      this.category_list = this.type === 'batch_update' ?
                          resData.data.category_list.filter(item => item.is_gpu == this.default_is_gpu) : resData.data.category_list
      if (this.data.category_id === this.category_list[0].category_id) {
        this.FnChangeCate(this.data.category_id)
      } else {
        this.data.category_id = this.category_list[0].category_id;
      }
    }
  }
  private async FnGetFamilyList() {
    if (!this.az_id) {
      return
    }
    let resData = await Service.ecs_family_info({
      az_id: this.az_id,
      customer_id: this.customer_id,
      billing_method: this.billing_method,
      category_id: this.data.category_id,
      cpu: String(this.default_cpu_size),
      ram: String(this.default_ram_size)
    });
    if (resData.code == 'Success') {
      this.family_list = resData.data.ecs_family_info;
      this.billing_info = deal_fee_info(resData.data.billing_info, true);
      this.data.cpu_ram_gpu = this.FnJoinGoodCpuRamGpu(this.family_list[0]);
      this.FnGetPrice()
      this.FnEmit()
    }
  }
  private FnJoinGoodCpuRamGpu(row): string {
    row.gpu = row.gpu || 0;
    return row.ecs_goods_id + '_' + row.cpu + '_' + row.ram + '_' + row.gpu
  }
  private FnGetDefaultFamily(cpu_ram_gpu: string) {
    return this.family_list.find(item => this.FnJoinGoodCpuRamGpu(item) === cpu_ram_gpu)
  }
  private async FnGetPrice() {
    const reqData = {
      customer_id: this.customer_id,
      az_id: this.az_id,
      is_gpu: this.is_gpu,
      batch: 1,
      billing_method: this.billing_method,
      ecs_info: {
        billing_info: this.billing_info,
        ecs_goods_info: this.family_list
      },
      number: 1,
    }
    const resData = await Service.get_price(reqData);
    if (resData.code === 'Success') {
      resData.data.ecs.forEach(value => {
        this.$set(this.cpu_ram_gpu_price, this.FnJoinGoodCpuRamGpu(value), resData.data.price_symbol + Number(value.price).toFixed(2) + '/' + resData.data.price_unit)
      })
    }
  }
  @Emit('fn-spec')
  private FnEmit() {
    let row = this.FnGetDefaultFamily(this.data.cpu_ram_gpu)
    return {
      ecs_goods_id: row.ecs_goods_id,
      ecs_goods_name: row.ecs_family_name,
      cpu: row.cpu,
      ram: row.ram,
      gpu: row.gpu,
      gpu_id: row.gpu_type_id,
      card_name: row.gpu_show_type,
      is_gpu: this.is_gpu,
      billing_info: this.billing_info
    }
  }
  public FnSubmit() {
    let flag = false;
    (this.$refs['resetForm'] as any).validate((valid) => {
      flag = valid;
    })
    return {
      flag: flag,
      spec_info: this.FnEmit()
    }
  }
  private created() {
    this.FnGetAllCpuRam()
  }

  @Watch('default_cpu_size')
  private FnChangeCpuSize (newVal) {
    this.default_ram_size = '';
    if (newVal) {
      this.ram_size_list = this.cpu_ram_size_list[Number(newVal)];
    }else{
      this.ram_size_list = this.all_ram_size_list;
    }
    this.FnGetCategoryList()
  }
  @Watch('default_ram_size')
  private FnChangeRamSize(newVal) {
    this.FnGetCategoryList()
  }
  @Watch('data.category_id')
  private FnChangeCate(newVal) {
    if (newVal) {
      this.FnGetFamilyList()
      this.is_gpu = this.category_list.find(item => item.category_id === newVal).is_gpu ? 1 : 0;
    }
  }
  @Watch('az_id')
  private FnChangeAz(newVal, oldVal) {
    this.FnGetCategoryList();
  }
  @Watch('customer_id', {immediate: true})
  private FnChangeCustomer(newVal, oldVal) {
    this.FnGetCategoryList();
  }
}
</script>

<style lang="scss" scoped>
.inline-form {
  display: flex;
}
</style>
