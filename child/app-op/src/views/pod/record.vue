<template>
  <el-dialog :visible.sync="syncVisible" title="操作记录">
    <el-table :data="history_list" border>
      <el-table-column prop="op_user" label="用户名"></el-table-column>
      <el-table-column prop="op_time" label="操作时间"></el-table-column>
      <el-table-column prop="content" label="操作内容"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="FnClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator';
import Service from '../../https/pod/index';

@Component
export default class PodRecord extends Vue {
  @PropSync('visible', {type: Boolean}) syncVisible!: boolean;
  @Prop({default: ''}) pod_id!: string;
  private history_list = [];
  private async FnGetRecord() {
    const resData: any = await Service.get_pod_history({
      pod_id: this.pod_id
    })
    if (resData.code === 'Success') {
      this.history_list = resData.data.history_record;
    }
  }
  private FnClose() {
    this.syncVisible = false;
  }
  @Watch('visible')
  private FnChangeVisible(newVal) {
    if (newVal) {
      this.FnGetRecord()
    }
  }
}
</script>


<style lang="scss" scoped>

</style>