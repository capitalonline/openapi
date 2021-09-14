<template>
  <el-form 
    :model="data"
    ref="resetForm"
    label-position="left" 
    label-width="120px" 
    class="pwd-form">
    <div class="inline-form" v-if="system_disk">
      <el-form-item label="系统盘" prop="system_disk" class="m-right20">
        <el-select v-model="data.default_system_info" value-key="ecs_goods_id">
          <el-option v-for="item in system_disk_info" :key="item.ecs_goods_id" :value="item" :label="item.disk_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="data.system_size" 
          :min="Number(data.system_disk_min)" 
          :max="Number(data.default_system_info.disk_max)" 
          :step="Number(data.default_system_info.disk_step)"
          @change="FnSysEmit"
          step-strictly></el-input-number> 
        {{ data.default_system_info.disk_unit }}
      </el-form-item>
    </div>
    <template v-if="data_disk">
      <div v-for="(disk, index) in data_disk_list" :key="index" class="inline-form">
        <el-form-item class="short-select" :label="index===0?'数据盘':''">
          <i class="el-icon-remove-outline delete-icon" @click="FnDelDataDisk(index)"></i>
          <el-select v-model="disk.default_disk_info" value-key="ecs_goods_id" class="m-right20">
            <el-option v-for="item in data_disk_info" :key="item.ecs_goods_id" :value="item" :label="item.disk_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input-number v-model="disk.disk_size" 
            :min="Number(disk.default_disk_info.disk_min)" 
            :max="Number(disk.default_disk_info.disk_max)" 
            :step="Number(disk.default_disk_info.disk_step)"
            @change="FnDataEmit"
            step-strictly></el-input-number> 
          {{ disk.default_disk_info.disk_unit }}
        </el-form-item>
        <el-form-item>
          <el-input-number v-model="disk.num" :min="disk.min" :max="FnGetSurplus + disk.num" :step="1" class="m-left10 m-right10" @change="FnDataEmit"></el-input-number> 
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="disk.del" @change="FnDataEmit">随实例删除</el-checkbox>
        </el-form-item>
      </div>
      <el-form-item :label="data_disk_list.length===0?'数据盘':''">
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
import Service from '../../https/instance/create';
import diskService from '../../https/disk/create';

@Component
export default class updateDisk extends Vue {
  @Prop({default: ''}) private az_id!: string;
  @Prop({default: ''}) private customer_id!: string;
  @Prop({default: false}) private system_disk!: boolean;
  @Prop({default: false}) private data_disk!: boolean;
  @Prop({default: 0}) private os_disk_size!: number;
  $message;
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
      disk_step: 10
    },
    system_disk_min: 0,
    system_size: 0
  }
  private async FnGetDiskInfo() {
    if (!this.az_id) {
      return
    }
    let resData: any = await diskService.get_disk_type({
      az_id: this.az_id,
      customer_id: this.customer_id
    });
    if (resData.code == 'Success') {
      this.system_disk_info = resData.data.system_disk;
      this.data.default_system_info = this.system_disk_info[0];
      this.data_disk_info = resData.data.data_disk;
    }
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
      this.$message.warning('请输入客户ID');
      
      return
    }
    data.disk_size = data.default_disk_info.disk_min;
    this.data_disk_list.push(data);
    this.FnDataEmit();
  }
  private FnDelDataDisk(index) {
    this.data_disk_list.splice(index, 1);
    this.FnDataEmit();
  }

  @Emit('fn-system-disk')
  private FnSysEmit() {
    return {
      ecs_goods_id: this.data.default_system_info.ecs_goods_id,
      disk_name: this.data.default_system_info.disk_name,
      disk_feature: this.data.default_system_info.disk_feature,
      disk_type: this.data.default_system_info.disk_type,
      disk_size: this.data.system_size,
      disk_unit: this.data.default_system_info.disk_unit
    }
  }

  @Emit('fn-data-disk')
  private FnDataEmit() {
    return this.data_disk_list
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
    this.data.system_disk_min = Math.max(Number(this.data.default_system_info.disk_min), this.os_disk_size)
    return this.data.system_disk_min
  }

  private created() {
    this.FnGetDiskInfo();
  }

  @Watch('data.default_system_info.ecs_goods_id')
  private FnChangeSystem() {
    this.data.system_size = this.FnSystemMinSize();
    this.FnSysEmit();
  }
  @Watch('az_id') 
  private FnChangeAz(newVal, oldVal) {
    this.FnGetDiskInfo();
  }
  @Watch('customer_id')
  private FnChangeCustomer(newVal, oldVal) {
    this.FnGetDiskInfo();
  }
  @Watch('os_disk_size')
  private FnChangeOs(newVal) {
    this.data.system_size = this.FnSystemMinSize();
    this.FnSysEmit();
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