<template>
  <div>
    <action-block :search_option="search_dom" @fn-search="search">
      <template #default>
        <el-button type="primary" v-for="item in operate_btns" :key="item.value" @click="handleBtn(item.label,item.value)">{{item.label}}</el-button>
      </template>
    </action-block>
    <el-table
      :data="disk_list"
      border
      ref="disk_table"
      @selection-change="handleSelectionChange"
      @filter-change="filterAttribute"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
      <el-table-column prop="disk_name" label="云盘名称"></el-table-column>
      <el-table-column prop="customer_id" label="云盘状态" :filter-multiple="false" :filters="disk_state" column-key="status">
        <template slot-scope="scope">
          <span :class="scope.row.status">{{scope.row.status_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="IOPS及吞吐" min-width="110px">
        <template slot-scope="scope">
          <div>IOPS：{{scope.row.disk_iops ? `${scope.row.disk_iops}${scope.row.iops_unit}` : ''}}</div>
          <div>吞吐量：{{scope.row.band_mbps ? `${scope.row.band_mbps}${scope.row.mbps_unit}` : ''}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="地域-可用区" min-width="110ox">
        <template slot-scope="scope">
          <span>{{scope.row.region_name}}&nbsp;&nbsp;{{scope.row.az_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="属性">
        <template slot-scope="scope">
          <span>{{scope.row.disk_type==="data" ? `数据盘` : '系统盘'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="实例ID">
        <template slot-scope="scope">
          <pre>{{scope.row.ecs_id ? scope.row.ecs_id : ''}}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="dev_id" label="dev_id"></el-table-column>
      <el-table-column prop="dev_name" label="dev_name"></el-table-column>
      <el-table-column prop="cluster_name" label="集群名称" min-width="95px"></el-table-column>
      <el-table-column prop="pool_name" label="存储池名称"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <template v-if="visible">
      <Iops :visible="visible" :title="oper_label" :oper_type="oper_type" :mount_id="mount_id" @close = "close_disk"></Iops>
    </template>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ActionBlock from '../../components/search/actionBlock.vue';
import Iops from "@/views/disk/iopsMbps.vue";
import {Table} from "element-ui";
import Service from "@/https/disk/list";
import {trans} from "@/utils/transIndex";
@Component({
  components: {
    ActionBlock,
    Iops,
  }
})
export default class DiskVolume extends Vue{
  private disk_list:any=[]
  private current:number = 1;
  private size:number=20;
  private total:number = 0;
  private filter_obj = null
  private visible:boolean = false
  private oper_type:string="";
  private oper_label:string="";
  private disk_state:any = [];
  private mount_id:any=[]
  private req_data:any={}
  private search_dom = {
    customer_id:{placeholder:'请输入客户ID'},
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'}
  }
  private operate_btns:any=[
    {label:'设置IOPS',value:'iops'},
    {label:'设置吞吐量',value:'mbps'},
  ]
  private search(data:any={}){
    this.current = 1;
    this.req_data = {...data,...this.filter_obj};
    this.getDataList()
  }
   created(){
    this.get_disk_state()
    this.search()
  }
  //获取云盘状态列表
  private async get_disk_state(){
    let res:any = await Service.get_disk_state({})
    if(res.code==="Success"){
      this.disk_state = trans(res.data,'status_name','status','text','value')
    }
  }
  private handleBtn(label,value){
    if(this.mount_id.length===0){
      this.$message.warning("请先勾选云盘!");
      return;
    }
      if (!this.judge_disk('customer_id', this.mount_id[0].customer_id)) {
        this.$message.warning('只允许对同一客户的云盘进行批量操作！')
        return;
      }
      if (!this.judge_disk('az_name', this.mount_id[0].az_name)) {
        this.$message.warning('只允许对同一可用区的云盘进行批量操作！')
        return;
      }
      const flag: boolean = this.mount_id.every((item, index, arr) => {
        return (item.ecs_status === "running" && item.status === "running") || (item.disk_status === "running" && item.ecs_status === "shutdown" && item.no_charge_shutdown_ecs) || item.status === "waiting"
      })
      if (!flag) {
        this.$message.warning('仅支持对实例状态为运行中且云盘状态为使用中，或云盘状态为待挂载的云盘进行批量操作！')
        return;
      }
      let title = value === 'iops' ? '修改IOPS限制' : '修改吞吐量限制'
      this.operate(value, title, this.mount_id)
  }
  //判断已选择云盘是否符合操作要求
  private judge_disk(label:string,val:any){
    return this.mount_id.every((item,index,arr)=>{
      return item[label] ===val
    })
  }
  private operate(type,title,obj:any){
    this.mount_id = obj
    this.oper_type = type
    this.oper_label = title
    this.visible = true;
  }
  private close_disk(val:string='1'){
    this.visible = false
    this.mount_id=[]
    this.oper_type = ''
    this.toggleSelection()
    if(val==='1'){
      this.current =1;
    }
    this.getDataList()
  }
  private toggleSelection() {
    const table = this.$refs.disk_table as Table
    table.clearSelection()
  }
  private handleSelectionChange(data){
    this.mount_id = data
  }
  private filterAttribute(obj:any){
    this.filter_obj = {...this.filter_obj,...obj}
    this.search(this.req_data)
  }
  private handleSizeChange(size){
    this.size = size
    this.getDataList()
  }
  private handleCurrentChange(cur){
    this.current = cur
    this.getDataList()
  }
  private async getDataList(loading:boolean = true){
    const {req_data}=this
    let res:any = await Service.get_disk_list({
      pod_id:this.$store.state.pod_id,
      disk_id:req_data.disk_id || '',
      ecs_id:req_data.ecs_id || '',
      status:req_data.status ? req_data.status[0] : '',
      customer_id:req_data.customer_id || '',
      page_index:this.current,
      page_size:this.size,
    })
    if(res.code==="Success"){
      this.disk_list = res.data.result || []
      this.total = res.data.page_info.count || 0;
    }
  }
}
</script>

<style scoped>

</style>
