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
      <action-block :search_option="search" @fn-search="fn_search"></action-block>
      <el-table
        :data="list"
        max-height="400px"
        @selection-change="handleSelectionChange"
        @sort-change="FnSortChange"
        @filter-change="filterAttribute">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="主机名称" prop="host_name" sortable="custom" ></el-table-column>
        <el-table-column label="管理网IP" prop="host_ip"></el-table-column>
        <el-table-column label="CPU型号" prop="cpu_model" :filters="cpu_list" :filter-multiple="false" column-key="cpu_model"></el-table-column>
        <el-table-column label="GPU型号" prop="gpu_model"></el-table-column>
        <el-table-column label="块存储集群" prop="storage_cluster_name"></el-table-column>
        <el-table-column label="存储类型" prop="storage_type">
          <template slot-scope="scope">
            <span>{{scope.row.storage_type === 'local' ? '本地盘' : '云盘'}}</span>
          </template>
        </el-table-column>

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
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="back('0')">取消</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script lang="ts">
import {Component, Emit, PropSync, Prop,Vue, Watch} from "vue-property-decorator";
import {findPodIdByClusterId} from "@/utils/vmOp2/findPodId";
import Service from "@/https/vmOp2/cluster/pod";
import bus from "@/utils/vmOp2/eventBus";
import ActionBlock from "@/components/search/actionBlock.vue";
@Component({
  components: {ActionBlock}
})

export default class AddHost extends Vue{
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:''}) private cluster_id!:any
  @Prop({default:()=>{}}) private info!:any
  private search_data:any = {}
  private list:any = []
  private filter_data:any={}
  private multiple_selection = [];
  private filter_dict :any = {}
  private cpu_list:any = []
  private search:any = {
    host_info:{placeholder:'输入主机名称/管理网IP搜索'}
  }
  private sort_host_name = ''
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
  private fn_search(data:any={}){
    this.page_info.current = 1;
    this.search_data = {...data,...this.filter_data}
    this.get_host_list()
  }
  private async confirm(){
    const req = this.multiple_selection.map(item=>{return {host_id:item.host_id,cluster_id:this.cluster_id}})
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
  private async get_host_list(){
    if(!this.$store.state.az_id){
      return
    }
    const {search_data:data}=this
    let pod=findPodIdByClusterId(this.$route.params.id)
    let req={
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      az_id:this.$store.state.az_id,
      pod_id:pod,
      is_unassigned_cluster:2,
      host_info:data.host_info || "",
      cpu_type_id:JSON.stringify(this.info.cpu_type_id),
      gpu_type_id:this.info.gpu_type_id,
      storage_cluster_id:this.info.storage_cluster_id,
      cpu:data.cpu_model ? data.cpu_model[0] : undefined,
      sort_host_name:this.sort_host_name,
   }
    let res:any = await Service.get_pod_host_list(req)
    if(res.code === 'Success'){
      this.list = res.data.result
      this.page_info.total = res.data.page_info.count
      this.filter_dict = res.data.filter_dict
      this.cpu_list = this.filter_dict.cpu_dict.map(cpu => ({
        text: cpu,
        value: cpu
      }));
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
  private FnSortChange(obj){
    this.sort_host_name =undefined
    this.sort_host_name= obj.order==="descending" ? '1' :obj.order==="ascending" ? '0' : undefined
    this.get_host_list()
  }
  private filterAttribute(obj:any){
    this.filter_data = {...this.filter_data,...obj}
    this.fn_search()
  }
  @Emit("close")
  private back(val){
    this.multiple_selection = []
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
