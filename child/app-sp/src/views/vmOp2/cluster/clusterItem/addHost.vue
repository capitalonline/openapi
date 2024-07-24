<template>
  <div>
    <el-dialog
      title="添加计算节点"
      :visible.sync="visible_sync"
      width="760px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
      <el-input style="width: 30%" placeholder="输入主机名称/管理网IP搜索" v-model="search_data"></el-input>
      <el-button type="primary" class="m-left10 m-bottom10" @click="get_host_list">查询</el-button>
      <el-table
        :data="list"
        max-height="400px"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="主机名称" prop="host_name"></el-table-column>
        <el-table-column label="管理网IP" prop="host_ip"></el-table-column>
        <el-table-column label="CPU型号" prop="cpu_model"></el-table-column>
        <el-table-column label="GPU型号" prop="gpu_model"></el-table-column>
        <el-table-column label="块存储集群" prop="storage_cluster_name"></el-table-column>
        <el-table-column label="存储类型"></el-table-column>

      </el-table>
      <div class="footer">
        <div class="m-top10">共{{page_info.total}}条/已选择{{multiple_selection.length}}条</div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page_info.current"
          :page-sizes="[20, 50, 100]"
          :page-size="page_info.size"
          layout="sizes, prev, pager, next, jumper"
          :total="page_info.total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="confirm">确认</el-button>
            <el-button type="primary" @click="back('0')">取消</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script lang="ts">
import {Component, Emit, PropSync, Vue, Watch} from "vue-property-decorator";
import {findPodIdByClusterId} from "@/utils/vmOp2/findPodId";
import Service from "@/https/vmOp2/cluster/pod";
@Component

export default class AddHost extends Vue{
  @PropSync('visible') visible_sync!:Boolean;
  private search_data:string = ''
  private list:any = []
  private multiple_selection = [];
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  @Watch('visible')
  private watch_visible(n){
    if(n){
      this.get_host_list()
    }else {
      this.search_data = ''
    }
  }
  private confirm(){

  }
  private async get_host_list(){
    if(!this.$store.state.az_id){
      return
    }
    let pod=findPodIdByClusterId(this.$route.params.id)
    let req={
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      az_id:this.$store.state.az_id,
      pod_id:pod,
      is_unassigned_cluster:'1',
      host_info:this.search_data

   }
    let res:any = await Service.get_pod_host_list(req)
    if(res.code === 'Success'){
      this.list = res.data.result
      this.page_info.total = res.data.page_info.count
    }
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_host_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_host_list()
  }
  private handleSelectionChange(val) {
    this.multiple_selection = val;
  }
  @Emit("close")
  private back(val){
    this.visible_sync=false
  }

}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
}

</style>
