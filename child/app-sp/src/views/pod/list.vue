<template>
  <div>
    <action-block
      :search_option="search_con"
      create_btn="添加POD"
      :disabled="!operate_auth.includes('create')"
      @fn-search="FnSearch"
      @fn-create="FnShowAdd">
    </action-block>
    <el-table :data="pod_list" border>
      <el-table-column prop="pod_name" label="POD名称"></el-table-column>
      <el-table-column prop="az_id" label="可用区编号"></el-table-column>
      <el-table-column prop="az_name" label="可用区"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          {{ scope.row.status?'可用':'不可用' }}
        </template>
      </el-table-column>
      <el-table-column prop="compute_count" label="计算机数量"></el-table-column>
      <el-table-column prop="storage_count" label="存储机器数量"></el-table-column>
      <el-table-column prop="memo" label="备注"></el-table-column>
      <el-table-column prop="update_time" label="更新时间"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="" label="操作">
        <template #default="scope">
          <el-button type="text" @click="FnShowRecord(scope.row)" :disabled="!operate_auth.includes('record')">操作记录</el-button>
          <el-button type="text" @click="FnShowEdit(scope.row)" :disabled="!operate_auth.includes('update')">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-pod :visible.sync="show_add_pod" :title="add_title" :row="default_row" @fn-refresh="FnGetPod"></add-pod>
    <pod-record :visible.sync="show_record" :pod_id="default_row.pod_id"></pod-record>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import actionBlock from '../../components/search/actionBlock.vue';
import AddPod from './add.vue';
import PodRecord from './record.vue';
import Service from '../../https/pod/index';

@Component({
  components: {
    actionBlock,
    AddPod,
    PodRecord
  }
})
export default class PodList extends Vue {
  $store;
  $route;
  private search_con = {
    pod_name: { placeholder: '请输入POD名称' },
    az_id: { placeholder: '请输入可用区编号' },
    az_name: { placeholder: '请输入可用区名称' },
  }
  private search_value = {
    pod_name: '',
    az_id: '',
    az_name: ''
  };
  private operate_auth = [];
  private show_add_pod: boolean = false;
  private add_title = '';
  private show_record: boolean = false;
  private pod_list = [];
  private default_row = {};
  private FnSearch(data) {
    this.search_value.pod_name = data.pod_name;
    this.search_value.az_id = data.az_id;
    this.search_value.az_name = data.az_name;
    this.FnGetPod();
  }
  private async FnGetPod() {
    const resData: any = await Service.get_pod_list({
      pod_name: this.search_value.pod_name,
      az_id: this.search_value.az_id,
      az_name: this.search_value.az_name
    })
    if (resData.code === 'Success') {
      this.pod_list = resData.data.pod_list;
    }
  }
  private FnShowAdd() {
    this.show_add_pod = true;
    this.add_title = '添加POD';
  }
  private FnShowRecord(row) {
    this.default_row = row;
    this.show_record = true;
  }
  private FnShowEdit(row) {
    this.show_add_pod = true;
    this.add_title = '修改POD';
    this.default_row = row;
  }
  private created() {
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
    this.FnGetPod()
  }
}
</script>


<style lang="scss" scoped>

</style>