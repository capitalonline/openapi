<template>
  <div>
      <el-alert
        type="warning"
        :closable = "false">
        <template #title>
          <p>支持自定义填写恢复后新IP，若原IP未被占用则可以使用原IP；</p>
          <p>若未自定义填写恢复后新IP，则默认随机生成新可用IP；</p>
          <p>为避免自定义IP成功可用率较低，建议使用随机生成的新IP。</p>
        </template>
      </el-alert>
      <el-table :data="multiple_selection" border>
        <el-table-column prop="ecs_id" label="云服务器ID"></el-table-column>
        <el-table-column prop="ecs_name" label="云服务器名称"></el-table-column>
        <el-table-column label="原IP（最近使用）">
          <template #default="scope">
            {{ scope.row.private_net }}{{ ip_usage[scope.row.ecs_id].is_used?'': '已占用' }}
          </template>
        </el-table-column>
        <el-table-column label="恢复后新IP">
          <template #default="scope">
            <el-input v-model="ip_usage[scope.row.ecs_id].new_ip_address"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Service from '../../https/instance/list';

@Component
export default class Recover extends Vue {
  @Prop({default: ''}) private customer_id!: string;
  @Prop({default: []}) private multiple_selection!: Array<Object>;
  $message;
  private ip_usage = {};
  private async FnGetIpUsage() {
    let reqData = {
      customer_id: this.customer_id,
      ecs_ids: this.multiple_selection.map((item: any) => {
        return item.ecs_id
      })
    }
    this.ip_usage = {};
    let resData: any = await Service.get_usage_ip(reqData);
    if (resData.code === 'Success') {
      resData.data.ecs_list.forEach(item => {
        this.ip_usage[item.ecs_id] = {
          ip_address: item.ip_address,
          new_ip_address: ''
        }
      })
    }
  }
  private async FnRecover() {
    let reqData = {
      customer_id: this.customer_id,
      ecs_list: this.multiple_selection.map((item :any) => {
        return {
          ecs_id: item.ecs_id,
          ip_address: this.ip_usage[item.ecs_id].new_ip_address
        }
      })
    }
    const resData: any = await Service.recover_instance(reqData);
    if(resData.code == "Success") {
      // this.$message.success(resData.msg || `成功下发 ${this.operate_title} 任务！`);
    }
  }

  created() {
    this.FnGetIpUsage()
  }
}
</script>