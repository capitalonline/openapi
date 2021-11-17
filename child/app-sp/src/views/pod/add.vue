<template>
  <el-dialog :visible.sync="syncVisible" :title="title">
    <el-form
      ref="resetForm"
      :model="data"
      :rules="rules"
      label-width="120px"
      label-position="left">
      <el-form-item label="POD名称" prop="pod_name">
        <el-input v-model="data.pod_name"></el-input>
      </el-form-item>
      <el-form-item label="可用区编号" prop="az_id">
        <el-input v-model="data.az_id"></el-input>
      </el-form-item>
      <el-form-item label="区域">{{ region }}</el-form-item>
      <el-form-item label="可用区">{{ az_name }}</el-form-item>
      <el-form-item label="管理IP">
        <el-input v-model="data.ip_address"></el-input>
      </el-form-item>
      <el-form-item label="机房名称">
        <el-input v-model="data.zoom_name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="data.status">
          <el-option v-for="(value, key) in status_list" :key="key" :value="key" :label="value">{{ value }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="data.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="FnConfirm">确 定</el-button>
      <el-button @click="FnClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Emit, Watch, Vue } from 'vue-property-decorator';
import Service from '../../https/pod/index';

@Component
export default class AddPod extends Vue {
  $message;
  @PropSync('visible', {type: Boolean}) syncVisible!: boolean;
  @Prop({default: '添加POD'}) title!: string;
  @Prop({default: () => {
    return {}
  }}) row!: Object;
  private status_list = {
    available: '可用',
    unavailable: '不可用'
  }
  private region = '';
  private az_name = '';
  private data = {
    pod_name: '',
    az_id: '',
    ip_address: '',
    zoom_name: '',
    status: Object.keys(this.status_list)[0],
    remark: ''
  };
  private FnCheckPodName = (rule, value, callback) => {
    if (!value) {
      callback('请输入POD名称')
    }
    callback();
  }
  private FnCheckAzId = (rule, value, callback) => {
    if (!value) {
      callback('请输入可用区编号')
    }
    this.FnGetAzName().then(resData => {
      if (!resData) {
        callback('请输入正确的可用区编号')
      }
      callback();
    })
  }
  private rules = {
    pod_name: [{ required: true, validator: this.FnCheckPodName, trigger: 'blur' }],
    az_id: [{ required: true, validator: this.FnCheckAzId, trigger: 'blur' }]
  }
  private async FnGetAzName() {
    this.region = '';
    this.az_name = '';
    if (!this.data.az_id) {
      return
    }
    const resData: any = await Service.get_az_info({
      az_id: this.data.az_id
    })
    if (resData.code === 'Success') {
      this.region = resData.data.region;
      this.az_name = resData.data.az_name;
    }
    return this.region
  }
  private FnConfirm() {
    (this.$refs['resetForm'] as any).validate((valid) => {
      if (!valid) {
        return
      }
      if (this.row['pod_id']) {
        this.FnUpdatePod()
      } else {
        this.FnAddPod()
      }
    })  
  }
  private async FnAddPod() {
    const resData: any = await Service.create_pod({
      pod_name: this.data.pod_name,
      az_id: this.data.az_id,
      manager_ip: this.data.ip_address,
      host_room: this.data.zoom_name,
      status: this.data.status === 'available',
      memo: this.data.remark
    })
    if (resData.code === 'Success') {
      this.$message.success('添加POD成功！')
      this.syncVisible = false;
      this.FnEmit()
    }
  }
  private async FnUpdatePod() {
    const resData: any = await Service.update_pod({
      pod_id: this.row['pod_id'],
      pod_name: this.data.pod_name,
      az_id: this.data.az_id,
      manager_ip: this.data.ip_address,
      host_room: this.data.zoom_name,
      status: this.data.status === 'available',
      memo: this.data.remark
    })
    if (resData.code === 'Success') {
      this.$message.success('修改POD成功！')
      this.syncVisible = false;
      this.FnEmit()
    }
  }
  private FnClose() {
    (this.$refs['resetForm'] as any).resetFields();
    this.syncVisible = false;
  }
  @Emit('fn-refresh')
  public FnEmit(){}

  @Watch('row.pod_id')
  private FnGetRow() {
    this.data.pod_name = this.row['pod_name'];
    this.data.az_id = this.row['az_id'];
    this.data.ip_address = this.row['manager_ip'];
    this.region = this.row['region'];
    this.az_name = this.row['az_name'];
    this.data.zoom_name = this.row['host_room'];
    this.data.status = this.row['status']?Object.keys(this.status_list)[0]: Object.keys(this.status_list)[1];
    this.data.remark = this.row['memo'];
  }
}
</script>


<style lang="scss" scoped>

</style>