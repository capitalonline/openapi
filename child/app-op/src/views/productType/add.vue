<template>
  <el-dialog :visible.sync="syncVisible" :title="title" :close-on-click-modal="false" @close="FnClose">
    <el-form
        ref="resetForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
        label-suffix=":"
        label-position="left">
        <el-form-item label="产品名称" prop="name">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="CPU" prop="cpu">
            <el-input v-model="formData.cpu"></el-input>*
            <el-input-number v-model="formData.cpuNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="逻辑核数" prop="nuclear">
          <el-input v-model="formData.nuclear"></el-input>
        </el-form-item>
        <el-form-item label="内存" prop="memory">
            <el-input v-model="formData.memory"></el-input> GB *
            <el-input-number v-model="formData.memoryNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="显卡"  prop="gpu">
            <el-input v-model="formData.gpu"></el-input>*
            <el-input-number v-model="formData.gpuNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="显存"  prop="gpuMemory">
            <el-input-number v-model="formData.gpuMemory" :step="1"></el-input-number> GB
        </el-form-item>
        <el-form-item label="硬盘"  prop="disk">
            <el-input v-model="formData.disk"></el-input>*
            <el-input-number v-model="formData.diskNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="显卡"  prop="net">
            <el-input v-model="formData.net"></el-input>*
            <el-input-number v-model="formData.netNum" :step="1"></el-input-number>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="FnConfirm">确 定</el-button>
      <el-button @click="FnClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form';
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
  private formData:any = {
    name: '',
    cpu: '',
    cpuNum:1,
    nuclear: '',
    memory: '',
    memoryNum:1,
    gpu:'',
    gpuNum:1,
    gpuMemory: '',
    disk:'',
    diskNum:1,
    net:'',
    netNum:1,
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
    az_id: [{ required: true, validator: this.FnCheckAzId, trigger: 'blur' }],
    ip_address: [{ required: true, trigger: 'blur', message: '请输入管理IP' }],
    zoom_name: [{ required: true, trigger: 'blur', message: '请输入机房名称' }]
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
    (this.$refs['resetForm'] as ElForm).validate((valid) => {
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
      this.FnClose()
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
      this.FnClose()
      this.FnEmit()
    }
  }
  private FnClose() {
    this.syncVisible = false;
    (this.$refs['resetForm'] as ElForm).resetFields();
    this.region = '';
    this.az_name = '';
  }
  @Emit('fn-refresh')
  public FnEmit(){}

  @Watch('syncVisible')
  private FnGetRow(newVal) {
    if (!newVal) {
      return
    }
    this.data.pod_name = this.row['pod_name'];
    this.data.az_id = this.row['az_id'];
    this.data.ip_address = this.row['manager_ip'].join(',');
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