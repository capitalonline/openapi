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
      <el-form-item label="" class="m-right20" prop="default_os_type">
        <el-select v-model="data.default_os_type">
          <el-option v-for="os_type in default_os_template_type.os_types" :key="os_type" :value="os_type" :label="os_type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="default_os_version">
        <el-select v-model="data.default_os_version" value-key="os_id" @change="FnEmit">
          <el-option 
            v-for="version in default_os_template_type.os_versions[data.default_os_type]" 
            :key="version.os_id" 
            :value="version" 
            :label="version.name+'('+version.os_version+')'"></el-option>
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
  private os_list = {};
  private default_os_template_type = {
    os_template_type: '',
    os_types: [],
    os_versions: {},
  };
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
      if (this.default_os_template_type.os_template_type === Object.keys(this.os_list)[0]) {
        this.FnChangeOsTemType(this.default_os_template_type.os_template_type)
      } else {
        this.default_os_template_type.os_template_type = Object.keys(this.os_list)[0];
      }
    }
  }

  @Emit('fn-os')
  private FnEmit() {
    return {
      os_id: this.data.default_os_version.os_id,
      os_type: this.data.default_os_version.os_type,
      username: this.data.default_os_version.username,
      disk_size: this.data.default_os_version.disk_size
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
  private FnResetForm(formName) {
    (this.$refs['resetForm'] as any).resetFields();
  }

  private created() {
    this.FnGetOsList();
  }

  @Watch('default_os_template_type.os_template_type')
  private FnChangeOsTemType(newVal) {
    this.default_os_template_type.os_types = this.os_list[newVal].os_types;
    this.default_os_template_type.os_versions = this.os_list[newVal].os_versions;
    if (this.data.default_os_type !== this.default_os_template_type.os_types[0]) {
      this.data.default_os_type = this.default_os_template_type.os_types[0];
    } else {
      this.FnChangeOsType(this.data.default_os_type);
    }
  }

  @Watch('data.default_os_type')
  private FnChangeOsType(newVal) {
    if (newVal) {
      this.data.default_os_version = this.default_os_template_type.os_versions[newVal][0];
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