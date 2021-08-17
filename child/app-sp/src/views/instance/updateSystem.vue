<template>
  <el-form 
    :model="data"
    ref="resetForm"
    label-position="left" 
    label-width="120px" 
    class="pwd-form">
    <el-form-item label="镜像">
      <el-radio-group v-model="default_os_template_type.os_template_type">
        <el-radio-button v-for="(value, os_template_type) in os_list" :key="os_template_type" :label="os_template_type"> {{ value.name }} </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <div class="inline-form">
      <el-form-item label="">
        <el-select v-model="data.default_os_type" class="m-right20">
          <el-option v-for="os_type in default_os_template_type.os_types" :key="os_type" :value="os_type" :label="os_type"></el-option>
        </el-select>
        <el-select v-model="data.default_os_version" value-key="os_id">
          <el-option v-for="version in default_os_template_type.os_versions[data.default_os_type]" :key="version.os_id" :value="version" :label="version.name"></el-option>
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
  @Prop({default: 'f9755192-b89d-11eb-b74e-1e00e202ff80'}) private az_id!: string;
  @Prop({default: 'E020910'}) private customer_id!: string;
  private os_list = {};
  private default_os_template_type = {
    os_template_type: '',
    os_types: [],
    os_versions: {},
  };
  private data = {
    default_os_type: '',
    default_os_version: {}
  }
  private async FnGetOsList() {
    let resData: any = await Service.get_os_list({
      customer_id: this.customer_id, 
      az_id: this.az_id});
    if (resData.code == 'Success') {
      this.os_list = resData.data;
      this.default_os_template_type.os_template_type = Object.keys(this.os_list)[0];
    }
  }
  private async FnGetDiskInfo() {
    let resData: any = await Service.get_disk_info({
      az_id: this.az_id,
      customer_id: this.customer_id
    });
    if (resData.code == 'Success') {
      // this.system_disk_info = resData.data.system_disk;
      // this.data.default_system_info = this.system_disk_info[0];
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
        
      }
    }
  }
  private FnResetForm(formName) {
    (this.$refs['resetForm'] as any).resetFields();
  }

  @Watch('default_os_template_type.os_template_type')
  private FnChangeOsTemType(newVal) {
    this.default_os_template_type.os_types = this.os_list[newVal].os_types;
    this.default_os_template_type.os_versions = this.os_list[newVal].os_versions;
    this.data.default_os_type = this.default_os_template_type.os_types[0];
  }

  @Watch('data.default_os_type')
  private FnChangeOsType(newVal) {
    this.data.default_os_version = this.default_os_template_type.os_versions[newVal][0];
  }


  private created() {
    this.FnGetOsList();
  }
}
</script>

<style lang="scss" scoped>
.inline-form {
  display: flex;
}
</style>