<template>
  <el-form
    :model="data"
    ref="resetForm"
    label-position="left"
    label-width="120px"
    :rules="rules"
    :inline-message="true"
    class="pwd-form">
    <el-form-item label="镜像">
      <el-radio-group v-model="default_os_template_type.os_template_type">
        <el-radio-button v-for="(value, os_template_type) in os_list" :key="os_template_type" :label="os_template_type"> {{ value.name }} </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <div class="inline-form">
      <el-form-item class="m-right20" prop="default_os_type">
        <el-select v-model="data.default_os_type">
          <el-option v-for="os_type in default_os_template_type.os_types" :key="os_type" :value="os_type" :label="os_type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="default_os_version">
        <el-select v-model="data.default_os_version" value-key="os_id" @change="FnEmit">
          <el-option
            v-for="version in default_os_version_list"
            :key="version.os_id"
            :value="version"
            :label="version.name"></el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';
import Service from '../../https/instance/create';

@Component
export default class updateOs extends Vue{
  @Prop({default: ''}) private az_id!: string;
  @Prop({default: ''}) private customer_id!: string;
  @Prop({default: 0}) private is_gpu!: 0|1;
  @Prop({default: ''}) private support_gpu_driver!: string;
  @Prop({default: ''}) private default_os_type!: string;

  private os_list = {};
  private default_os_template_type = {
    os_template_type: '',
    os_types: [],
    os_versions: {},
  };
  private default_os_version_list = [];
  private data = {
    default_os_type: '',
    default_os_version: {
      os_id: '',
      os_type: '',
      username: '',
      disk_size: 0
    }
  }
  private FnCheckOs = (rule, value, callback) => {
    if (!value.os_id) {
      callback(new Error('请选择镜像'));
    }
    callback();
  }
  private rules = {
    default_os_type: [{ required: true, trigger: 'change', message: ' '}],
    default_os_version: [{ required: true, validator: this.FnCheckOs, trigger: 'change' }],
  };
  private async FnGetOsList() {
    if (!this.az_id) {
      return
    }
    let resData: any = await Service.get_os_list({
      customer_id: this.customer_id,
      az_id: this.az_id});
    if (resData.code == 'Success') {
      this.os_list = resData.data;
      this.FnHandleInitData();
    }
  }
  private FnHandleInitData() {
    if (this.default_os_type) {
      this.default_os_template_type.os_template_type = this.default_os_type;
    }
    if (this.default_os_template_type.os_template_type === Object.keys(this.os_list)[0]) {
      this.FnChangeOsTemType(this.default_os_template_type.os_template_type)
    } else {
      this.default_os_template_type.os_template_type = Object.keys(this.os_list)[0];
    }
  }
  private FnHandleOsList(list) {
    if (!list || list.length === 0) {
      return []
    }
    let fil:any= list.filter(item => {
      if(item.support_type.includes('gpu') && item.support_type.includes('cpu')){
        return item;
      }else{
        if (this.is_gpu) {
          return item.support_type.includes('gpu') && item.support_gpu_driver == this.support_gpu_driver
        } else {
          return item.support_type.includes('cpu') && item.support_gpu_driver == this.support_gpu_driver
        }
      }
      
    })
    console.log('FnHandleOsList',fil);
    return fil
  }

  @Emit('fn-os')
  private FnEmit() {
    return {
      os_id: this.data.default_os_version.os_id,
      os_type: this.data.default_os_version.os_type,
      username: this.data.default_os_version.username,
      disk_size: this.data.default_os_version.disk_size,
      os_label: this.default_os_version_list.find(item=>item.os_id === this.data.default_os_version.os_id).name
    }
  }

  private FnSubmit() {
    let flag = false;
    (this.$refs['resetForm'] as any).validate((valid) => {
      flag = valid;
    })
    return {
      flag: flag,
      os_info: this.FnEmit()
    }
  }
  private FnResetForm() {
    this.FnHandleInitData();
  }

  private created() {
    this.FnGetOsList();
  }

  @Watch('default_os_template_type.os_template_type')
  private FnChangeOsTemType(newVal) {
    if (this.default_os_type) {
      if (this.default_os_type.toLowerCase() === 'windows') {
        this.default_os_template_type.os_types = this.os_list[newVal].os_types.filter(item=> item === this.default_os_type);
      } else {
        this.default_os_template_type.os_types = this.os_list[newVal].os_types.filter(item=> item.toLowerCase() != 'windows');
      }
    } else {
      this.default_os_template_type.os_types = this.os_list[newVal].os_types;
    }
    this.default_os_template_type.os_versions = this.os_list[newVal].os_versions;
    if (this.data.default_os_type !== this.default_os_template_type.os_types[0]) {
      this.data.default_os_type = this.default_os_template_type.os_types[0];
    } else {
      this.FnChangeOsType(this.data.default_os_type);
    }
  }

  @Watch('data.default_os_type')
  private FnChangeOsType(newVal) {
    this.default_os_version_list = this.FnHandleOsList(this.default_os_template_type.os_versions[newVal]);
    if (this.default_os_version_list.length > 0) {
      this.data.default_os_version = this.default_os_version_list[0];
    } else {
      this.data.default_os_version = {
        os_id: '',
        os_type: '',
        username: '',
        disk_size: 0
      }
    }
    this.FnEmit()
  }

  @Watch('az_id')
  private FnChangeAz(newVal, oldVal) {
    this.FnGetOsList();
  }
  @Watch('customer_id')
  private FnChangeCustomer(newVal, oldVal) {
    this.FnGetOsList();
  }
  @Watch('support_gpu_driver')
  private FnChangeGpuDriver(newVal) {
    this.FnChangeOsType(this.data.default_os_type)
  }
  @Watch('is_gpu')
  private FnChangeGpu(newVal) {
    this.FnChangeOsType(this.data.default_os_type)
  }
}
</script>

<style lang="scss" scoped>
.inline-form {
  display: flex;
  &>.el-form-item:last-child {
    margin-left: -120px;
  }
}
</style>
