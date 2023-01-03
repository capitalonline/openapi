<template>
  <el-form
    :model="data"
    ref="resetForm"
    label-position="left"
    label-width="120px"
    class="pwd-form">
    <div class="inline-form" v-if="system_disk">
      <el-form-item label="系统盘" prop="system_disk" class="m-right20">
        <el-select v-model="data.default_system_info" value-key="ecs_goods_id" @change="FnChangeSystemType">
          <el-option v-for="item in system_disk_info" :key="item.ecs_goods_id" :value="item" :label="item.disk_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="data.system_size"
          :min="Number(data.system_disk_min)"
          :max="data.default_system_info
            ? Number(data.default_system_info.disk_max)
            : 0
          "
          :step="data.default_system_info
            ? Number(data.default_system_info.disk_step)
            : 0
          "
          @blur="FnCheckSystemSize"
          @change="FnChangeSystemSize"
          step-strictly></el-input-number>
        {{ data.default_system_info?data.default_system_info.disk_unit:'GB' }}
      </el-form-item>
    </div>
    <template v-if="data_disk">
      <div v-for="(disk, index) in data_disk_list" :key="index" class="inline-form">
        <el-form-item class="short-select" :label="index===0?'数据盘':''">
          <i class="el-icon-remove-outline delete-icon" @click="FnDelDataDisk(index)"></i>
          <el-select v-model="disk.default_disk_info" value-key="ecs_goods_id" class="m-right20" @change="FnDataEmit">
            <el-option v-for="item in data_disk_info" :key="item.ecs_goods_id" :value="item" :label="item.disk_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input-number v-model="disk.disk_size"
            :min="Number(disk.default_disk_info.disk_min)"
            :max="Number(disk.default_disk_info.disk_max)"
            :step="Number(disk.default_disk_info.disk_step)"
            @blur="FnCheckDataSize(disk)"
            @change="FnChangeDataSize(disk)"
            step-strictly></el-input-number>
          {{ disk.default_disk_info.disk_unit }}
        </el-form-item>
        <el-form-item>
          <el-input-number
            v-model="disk.num"
            :min="disk.min"
            :max="FnGetSurplus + disk.num"
            :step="1"
            class="m-left10 m-right10"
            @blur="FnCheckDataNum(disk)"
            @change="FnChangeDataNum(disk)">
          </el-input-number>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="disk.del" @change="FnDataEmit" v-if="!is_gpu">随实例删除</el-checkbox>
        </el-form-item>
      </div>
      <el-form-item :label="data_disk_list.length===0?'数据盘':''" v-if="data_disk_info.length > 0">
        <div class="disk-btn">
          <el-button type="text" @click="FnAddDataDisk" :disabled="FnGetSurplus === 0"><i class="el-icon-circle-plus"></i> 添加数据盘</el-button>
          <div class="prompt_message">您已选择 <span class="num_message">{{ FnGetDiskNum }}</span> 块盘，
          还可以添加 <span class="num_message">{{ FnGetSurplus }}</span> 块盘</div>
        </div>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import diskService from '../../https/disk/create';
import getIops from '../../utils/getIops';
import { deal_fee_info } from '../../utils/transIndex';

@Component
export default class updateDisk extends Vue {
  @Prop({default: ''}) private az_id!: string;
  @Prop({default: ''}) private customer_id!: string;
  @Prop({default: '0'}) private billing_method!: string;
  @Prop({default: false}) private system_disk!: boolean;
  @Prop({default: false}) private data_disk!: boolean;
  @Prop({default: 0}) private os_disk_size!: number;
  @Prop({default: 0}) private origin_disk_size!: number;
  @Prop({default: ''}) private spec_family_id!: string;
  @Prop({default: 0}) private is_gpu!: 1 | 0;
  $message;
  private all_disk_info = {
    system_disk: [],
    data_disk: []
  };
  private system_disk_info = [];
  private data_disk_info = [];
  private data_disk_list = [];
  private data = {
    default_system_info: {
      ecs_goods_id: '',
      disk_name: '',
      disk_unit: '',
      disk_feature: '',
      disk_type: '',
      disk_min: 0,
      disk_max: 500,
      disk_step: 10,
      min_iops: 0,
      max_iops: 0,
      min_throughput: 0,
      throughput_step: 0,
      throughput_unit: '',
      max_throughput: 0,
      iops_step: 0,
      iops_unit: '',
    },
    system_disk_min: 0,
    system_size: 0
  }
  private async FnGetDiskInfo() {
    if (!this.az_id) {
      return
    }
    const resData: any = await diskService.get_disk_type({
      az_id: this.az_id,
      customer_id: this.customer_id,
      billing_method: this.billing_method,
      spec_family_id: this.spec_family_id
    });
    if (resData.code == 'Success') {
      this.all_disk_info = {
        system_disk: resData.data.system_disk,
        data_disk: resData.data.data_disk
      };
      this.FnBillingInfo(deal_fee_info(resData.data.billing_info, true))
      this.FnFilterDisk();
    }
  }
  private FnFilterDisk(): void {
    let disk_type_list = [];
    if (this.is_gpu) {
      this.system_disk_info = this.all_disk_info.system_disk.filter(item => item.disk_feature === 'local');
    } else {
      this.system_disk_info = this.all_disk_info.system_disk;
      this.data_disk_info = this.all_disk_info.data_disk;
    }
    this.data.default_system_info = this.system_disk_info[0];
    if (this.data.default_system_info) {
      this.FnChangeSystemType()
    } else {
      this.data.default_system_info = null;
      this.data_disk_info = [];
      this.FnSysEmit()
      this.$message.error('该产品规格无可用的存储类型，请联系管理员')
    }
  }
  private FnChangeSystemType(): void {
    this.data_disk_list = [];
    if (this.data.default_system_info.disk_feature === 'local') {
      this.data_disk_info = this.all_disk_info.data_disk.filter(item => item.disk_feature === 'local');
    } else {
      this.data_disk_info = this.all_disk_info.data_disk.filter(item => item.disk_feature !== 'local');
    }
    this.data.system_size = this.FnSystemMinSize();
    this.FnSysEmit()
  }
  private get FnGetDiskNum(): number {
    if (this.data_disk_list.length > 0) {
      return this.data_disk_list.reduce((accumulator, currentValue: any = {num: 0}) => {
        return accumulator + currentValue.num
      }, 0);
    } else {
      return 0
    }
  }

  private get FnGetSurplus() {
    return 16 - this.FnGetDiskNum
  }
  private get FnGetSystemIops() {
    return getIops(this.data.default_system_info, this.data.system_size)
  }
  private FnAddDataDisk() {
    if (this.FnGetSurplus == 0) {
      return
    }
    let data = {
      default_disk_info: {
        disk_min: 0,
        disk_max: 0,
        disk_step: 0,
        disk_unit: 'G',
        disk_name: ''
      },
      disk_size: 0,
      num: 1,
      min: 1,
      del: false
    }
    data.default_disk_info = this.data_disk_info[0] || {};
    if ( !data.default_disk_info.disk_name ) {
      return
    }
    data.disk_size = data.default_disk_info.disk_min;
    this.FnGetDataIops(data);
    this.data_disk_list.push(data);
    this.FnDataEmit();
  }
  private FnDelDataDisk(index) {
    this.data_disk_list.splice(index, 1);
    this.FnDataEmit();
  }
  private FnGetDataIops(disk) {
    let info = getIops(disk.default_disk_info, disk.disk_size);
    disk.iops = info.iops;
    disk.iops_show = info.iops_show;
    disk.handling_capacity = info.throughput;
    disk.throughput_show = info.throughput_show;
    disk.storage_space = disk.disk_size;
  }
  // 当容量输入框失焦时判断是否为空，为空则填充最小值
  private FnCheckSystemSize() {
    if (!this.data.system_size) {
      this.data.system_size = this.data.system_disk_min;
      this.FnSysEmit()
    }
  }
  // 当系统盘容量改变时
  private FnChangeSystemSize() {
    if (!this.data.system_size) {
      return
    }
    this.FnSysEmit()
  }
  @Emit('fn-system-disk')
  private FnSysEmit() {
    return {
      ecs_goods_id: this.data.default_system_info?.ecs_goods_id || '',
      disk_name: this.data.default_system_info?.disk_name || '',
      disk_feature: this.data.default_system_info?.disk_feature || '',
      disk_type: this.data.default_system_info?.disk_type || '',
      disk_size: this.data.default_system_info?this.data.system_size:0,
      disk_unit: this.data.default_system_info?.disk_unit || '',
      iops: this.data.default_system_info?this.FnGetSystemIops.iops:0,
      handling_capacity: this.data.default_system_info?this.FnGetSystemIops.throughput:0,
      storage_space: this.data.default_system_info?this.data.system_size:0,
      is_follow_delete: 1
    }
  }

  // 当容量输入框失焦时判断是否为空，为空则填充最小值
  private FnCheckDataSize(disk) {
    if (!disk.disk_size) {
      disk.disk_size = disk.default_disk_info.disk_min;
      this.FnGetDataIops(disk)
      this.FnDataEmit()
    }
  }
  // 当数据盘容量改变时
  private FnChangeDataSize(disk) {
    if (!disk.disk_size) {
      return
    }
    this.FnGetDataIops(disk)
    this.FnDataEmit()
  }
  private FnCheckDataNum(disk) {
    if (!disk.num) {
      disk.num = disk.min;
      this.FnDataEmit()
    }
  }
  private FnChangeDataNum(disk) {
    if (!disk.num) {
      return
    }
    this.FnDataEmit()
  }
  @Emit('fn-data-disk')
  private FnDataEmit() {
    return this.data_disk_list
  }

  @Emit('fn-billing-info')
  private FnBillingInfo(val) {
    return val
  }

  public FnSubmit() {
    let flag = false;
    (this.$refs['resetForm'] as any).validate((valid) => {
      flag = valid;
    })
    return {
      flag: flag,
      system_disk: this.FnSysEmit()
    }
  }
  public FnResetForm(formName) {
    (this.$refs['resetForm'] as any).resetFields();
    this.data.default_system_info = this.system_disk_info[0];
  }
  public FnSystemMinSize() {
    this.data.system_disk_min = Math.max(Number(this.data.default_system_info.disk_min), this.os_disk_size, this.origin_disk_size)
    return this.data.system_disk_min
  }
  private created() {
    if (this.az_id) {
      this.FnGetDiskInfo();
    }
  }

  @Watch('customer_id')
  private FnChangeCustomer(newVal, oldVal) {
    this.FnGetDiskInfo();
  }
  @Watch('spec_family_id')
  private FnChangeFamily(newVal) {
    if (newVal) {
      this.data_disk_list = [];
      this.FnGetDiskInfo();
    }
  }
  @Watch('os_disk_size')
  private FnChangeOs(newVal) {
    let system_size = this.FnSystemMinSize();
    if (system_size !== this.data.system_size && this.data.system_size) {
      this.data.system_size = system_size;
      this.FnSysEmit();
    }
  }
}
</script>

<style lang="scss" scoped>
.inline-form {
  display: flex;
  &>.el-form-item {
    margin-left: -120px;
  }
  &>.el-form-item:first-child {
    margin-left: 0;
  }
}
.short-select {
  .el-select {
    width: 170px;
  }
}
i {
  font-size: 24px;
  margin-right: 2px;
  vertical-align: middle;
}
.delete-icon {
  margin-right: 6px;
  color: #da3b18;
  cursor: pointer;
}
.disk-btn {
  display: flex;
  justify-content: space-between;
}
</style>
