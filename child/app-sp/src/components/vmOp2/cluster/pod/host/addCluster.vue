<template>
  <el-dialog
    title="导入集群"
    :visible.sync="visible_sync"
    width="1000px"
    :close-on-click-modal="false">
    <div>
      <el-alert
        :title="alert_title"
        type="warning"
        center
        :closable="false">
      </el-alert>
      <el-table
        :data="list"
        border
        max-height="380"
      >
        <el-table-column prop="host_name" label="主机名" width="150"></el-table-column>
        <el-table-column prop="machine_status_name" label="机器状态"></el-table-column>
        <el-table-column prop="cpu_model" label="CPU型号" width="150px"></el-table-column>
        <el-table-column prop="gpu_model" label="GPU型号"></el-table-column>
        <el-table-column prop="storage_cluster_name" label="存储集群"></el-table-column>
        <el-table-column prop="recomend_cluster" label="匹配集群名称" width="150px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.selected_cluster" filterable value-key="cluster_id">
              <el-option v-for="item in cluster_list" :value="item" :key="item.cluster_id" :label="item.cluster_name"></el-option>
            </el-select>
            <div v-show="!scope.row.selected_cluster" class="error_message">请选择加入集群</div>
          </template>
        </el-table-column>
        <el-table-column prop="block_type" label="集群总容量" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.selected_cluster.max_host_count}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="block_type" label="集群剩余容量" min-width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.selected_cluster.leave_host_count}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="block_type" label="集群CPU型号" width="200px">
          <template slot-scope="scope">
            <span>{{scope.row.selected_cluster.cpu_model}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="block_type" label="集群GPU型号" min-width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.selected_cluster.gpu_model}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="block_type" label="集群存储集群" min-width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.selected_cluster.storage_cluster_name}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="back('0')">取消</el-button>
        </span>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue} from "vue-property-decorator";
import Service from '@/https/vmOp2/cluster/pod/index'
import bus from "@/utils/vmOp2/eventBus"
@Component({})
export default class updateRecommend extends Vue{
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]}) rows!:any
  private alert_title = `是否确定对以下${this.rows.length}台物理机执行导入集群的操作吗？`
  private cluster_list:any =[]
  private selected_cluster:any = {}
  private list:any = []
  created() {
    this.list = this.rows.map(item => {
      return {...item, selected_cluster: item.recommend_clusters.length>0 ? item.recommend_clusters[0]: ''};
    });
    this.getClusterList()
  }
  private async getClusterList(){
    let reqData = {
      page_index: 1,
      page_size: 1000,
      az_id:this.$store.state.az_id,
      pod_id:this.$store.state.pod_id
    }
    let res:any = await Service.get_pod_cluster_list(reqData)
    if(res.code === 'Success'){
      this.cluster_list = res.data.result
    }

  }
  private async confirm(){
    if (this.list.some(item => !item.selected_cluster)) return;
    const req = this.list.map(item=>{return {host_id:item.host_id,cluster_id:item.selected_cluster.cluster_id}})
    let res:any = await Service.add_cluster({param:req})
    if(res.code === 'Success'){
      if(res.data.error_msg == ''){
        this.$message.success(res.message)
      }else {
        this.$message.warning(res.data.error_msg)
      }
      this.back('1')
      bus.$emit('getTreeData',false)
    }else {
      this.back('0')
    }
  }
  @Emit("close")
  private back(val){
    this.visible_sync=false
  }
}
</script>

<style scoped>

</style>
