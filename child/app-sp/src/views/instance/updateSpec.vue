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
              <!-- <el-radio v-model="data.spec_id" :label="scope.row.spec_id" @change="FnEmit">&nbsp;</el-radio> -->
              <el-radio v-model="data.id" :label="scope.row.id" @change="FnChangeSpec(scope.row)">&nbsp;</el-radio>
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
              <span>{{
                  price_symbol +
                  scope.row.original_amount.toFixed(2) +
                  "/" +
                  priceSymble()
                }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form-item>
    <el-form-item class="total-price">
      <!-- <span class="left-label" v-if="method === '0'">变更后费用：</span> -->
      <span>差价为：</span>
      <span class="num_message price">
        {{ this.difference_price ? this.difference_price : "0.00" }}</span
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import Service from '../../https/instance/create';
import { deal_fee_info } from '../../utils/transIndex';
interface EcsListItem {
  ecs_id: string;
  ecs_goods_id: string;
  is_gpu: 0 | 1;
  cpu_size: number;
  ram_size: number;
  gpu_size: number;
  gpu_driver: string;
  billing_method: string;
  system_disk_feature: string;
  az_id: string;
  customer_id: string;
  support_gpu_driver:string
}
type EcsList = EcsListItem[];

@Component
export default class updateSpec extends Vue{
  @Prop({default: ''}) private az_id!: string;
  @Prop({default: ''}) private customer_id!: string;
  @Prop({default: '0'}) private billing_method!: string;
  @Prop({default: ''}) type!: '' | 'batch_update'; //批量修改
  @Prop({default: 0}) private default_is_gpu!: 0 | 1;
  @Prop({default: () => {return []}}) private ecs_list_info!: EcsList;
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
    spec_id: '',
    id:'',
  };
  // 时间单位
  private price_unit = "";
  // 原实例价格
  prime_price = 0;
  // 差价
  private difference_price = "";
  private price_symbol = "￥";
  private ecs_list = [];
  private row = {};
  private ecs_goods_info = [];
  private ecs_billing_info = {};
  private price = 0;
  private category_id = "";
  private ecs_goods_id = "";
  private method = ""
  // 获取价格单位
  priceSymble() {
    if (this.method == "1") {
      return '月'
    } else {
      return '天'
    }
  }
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
      billing_method: this.billing_method,
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
  // private async FnGetFamilyList() {
  //   if (!this.az_id) {
  //     return
  //   }
  //   let resData = await Service.ecs_family_info({
  //     az_id: this.az_id,
  //     customer_id: this.customer_id,
  //     billing_method: this.billing_method,
  //     category_id: this.data.category_id,
  //     cpu: String(this.default_cpu_size),
  //     ram: String(this.default_ram_size)
  //   });
  //   if (resData.code == 'Success') {
  //     this.family_list = resData.data.ecs_family_info;
  //     this.billing_info = deal_fee_info(resData.data.billing_info, true);
  //     this.data.spec_id = this.family_list[0]?.spec_id;
  //     this.data.id = this.family_list[0]?.id;
  //     this.FnGetPrice()
  //     this.FnEmit()
  //   }
  // }
  // 包年包月获取差价
  private async DifferencePrice() {
    let ecs_info = this.row;
    let update_spec_info = this.FnGetDefaultFamily(this.data.id);
    if (!update_spec_info) {
      this.difference_price = `${this.price_symbol}0.0/${this.price_unit}`;
      return;
    }
    this.category_id = this.data.category_id;
    if (this.method === "1" && this.category_id) {
      const resData = await Service.difference_price({
        ecs_info: ecs_info,
        ecs_list: this.ecs_list,
        billing_method: this.method,
        az_id: this.az_id,
        customer_id: this.ecs_list_info[0].customer_id,
        billing_info: this.billing_info[update_spec_info.ecs_goods_id],
      });
      if (resData.code === "Success") {
        this.difference_price = `${this.price_symbol}${Math.abs(
          resData.data.change_price.toFixed(2)
        )}/${this.price_unit}`;
      }
    }
  }
  private async FnGetFamilyList() {
    // 更换实例规格时调用，变更页
    this.ecs_list = this.ecs_list_info.map((item) => {
      return {
        ecs_id: item.ecs_id,
        ecs_goods_id: item.ecs_goods_id,
        is_gpu: item.is_gpu,
        cpu_size: item.cpu_size,
        ram_size: item.ram_size,
        gpu_size: item.gpu_size,
        gpu_driver: item.support_gpu_driver,
        billing_method: item.billing_method,
        system_disk_feature: item.system_disk_feature,
        az_id: item.az_id,
        customer_id: item.customer_id,
      };
    });
    this.method = this.ecs_list_info[0].billing_method;
    let resData = await Service.get_ram_cpu_price_list({
      customer_id:this.customer_id,
      ecs_list: this.ecs_list,
      category_id: this.data.category_id,
      az_id: this.az_id,
    });
    if (resData.code === "Success") {
      this.prime_price = resData.data.max_ecs_rule_price;
      this.family_list = resData.data.ecs_goods_info;
      this.price_symbol = resData.data.price_symbol;
      this.price_unit = resData.data.price_unit;
      this.row = this.family_list[0];
      this.ecs_billing_info = resData.data.billing_info;
      this.ecs_goods_info = resData.data.ecs_goods_info || "";
      // 计算差价请求接口用
      // this.ecs_goods_id =  resData.data.ecs_goods_info[0].ecs_goods_id;
      this.billing_info = deal_fee_info(resData.data.billing_info, true);
      this.price = resData.data.all_ecs_spec_price;
      this.data.id = "";
      if (!this.data.id) {
        this.data.id = this.family_list[0]?.id;
      }
      this.FnEmit();
      if (this.method === "0") {
        const dfPrice = Math.abs(
          this.ecs_list_info.length *
          (this.prime_price - this.family_list[0].trade_amount)
        );
        this.difference_price = `${this.price_symbol}${
          resData.data.ecs_goods_info.length > 0 ? dfPrice.toFixed(2) : 0.0
        }/${this.price_unit}`;
      } else {
        this.DifferencePrice();
      }
      this.FnGetPrice()
    }
  }
  private FnGetDefaultFamily(spec_id: string) {
    //item.spec_id
    return this.family_list.find(item => item.id === spec_id)
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
        this.$set(this.cpu_ram_gpu_price, value.spec_id, resData.data.price_symbol + Number(value.price).toFixed(2) + '/' + resData.data.price_unit)
      })
    }
  }
  private FnChangeSpec(row) {
    this.row = row;
    this.category_id = this.data.category_id;
    this.ecs_goods_id = row.ecs_goods_id;
    if (this.method === "0") {
      this.difference_price =
        this.difference_price = `${this.price_symbol}${Math.abs(
          this.ecs_list_info.length * (this.prime_price - row.trade_amount)
        ).toFixed(2)}/${this.price_unit}`;
    } else {
      this.DifferencePrice();
    }
  }
  @Emit('fn-spec')
  private FnEmit() {
    // let row = this.FnGetDefaultFamily(this.data.spec_id)
    let row = this.FnGetDefaultFamily(this.data.id)
    return {
      ecs_goods_id: row.ecs_goods_id,
      ecs_goods_name: row.ecs_family_name,
      cpu: row.cpu,
      ram: row.ram,
      gpu: row.gpu,
      gpu_id: row.gpu_type_id,
      gpu_card_name:row.gpu_card_name,
      card_name: row.gpu_show_type,
      is_gpu: this.is_gpu,
      cpu_model: row.cpu_name,
      support_gpu_driver: row.support_gpu_driver,
      spec_family_id: row.spec_family_id,
      spec_id: row.spec_id,
      cpu_real_name:row.cpu_real_name,
      billing_info: this.billing_info,
      ecs_list: this.ecs_list,

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
