<template>
  <div>
    <action-block :search_option="search_dom" @fn-search="search"></action-block>
    <el-table
      :data="disk_list"
      border
      ref="disk_table"
      @selection-change="handleSelectionChange"
      @filter-change="filterAttribute"
      @row-click="FnOperRow"
      @row-contextmenu="FnRightClick"
      :row-class-name="rowStyle"
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
    <right-click :multi_rows="mount_id" :menus="operate_btns" :name=" mount_id.length>0 ? mount_id[0].ecs_name: ''"  @fn-click="infoClick"></right-click>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import ActionBlock from '@/components/search/actionBlock.vue';
import Iops from "@/views/disk/iopsMbps.vue";
import {Table} from "element-ui";
import Service from "@/https/disk/list";
import {trans} from "@/utils/transIndex";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import {rightClick} from "@/utils/vmOp2/rightClick";
@Component({
  components: {
    ActionBlock,
    Iops,
    RightClick
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
  private auth_list:any=[]
  private search_dom = {
    customer_id:{placeholder:'请输入客户ID'},
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'}
  }
  private operate_btns:any=[
    {label:'设置IOPS',value:'iops',disabled:false},
    {label:'设置吞吐量',value:'mbps',disabled:false},
  ]
  @Watch('mount_id',{immediate:true,deep:true})
  private watch_multi(){
    this.handleMenus()
  }
  //校验按钮权限
  private hasPermission(value: string) {
    return this.auth_list.includes(value);
  }
  //将按钮的value 映射到一个返回布尔值的函数，来判断菜单项是否应该被禁用
  private menuConditions: { [key: string]: () => boolean } = {
    'iops': () => !this.hasPermission('iops'),
    'mbps': () => !this.hasPermission('mbps')
  }
  //遍历菜单根据映射来判断是否禁用
  private handleMenus() {
    for (const item of this.operate_btns) {
      item.disabled = this.menuConditions[item.value] ? this.menuConditions[item.value]() : false;
    }
  }
  //按钮执行的方法
  private infoClick(item) {
    if(item.disabled){
      return
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
    let title = item.value === 'iops' ? 'IOPS' : '吞吐量'
    this.operate(item.value, title, this.mount_id)

  }
  //右键弹出操作
  FnRightClick(row,column,event){
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.mount_id.some(item => item.ecs_id === row.ecs_id);
    if (!isSelected) {
      (this.$refs.disk_table as any).toggleRowSelection(row)
    }
    rightClick(row,column,event)
  }
  //改变点击行得选中状态
  private FnOperRow(row){
    (this.$refs.disk_table as any).toggleRowSelection(row)
  }
  //改变选中行的背景颜色
  rowStyle({row}) {
    const isSelected = this.mount_id.some(item => item.disk_id === row.disk_id);
    if (isSelected) {
      return 'rowStyle'
    }
  }
  private search(data:any={}){
    this.current = 1;
    this.req_data = {...data,...this.filter_obj};
    this.getDataList()
  }
  created(){
    this.auth_list=this.$store.state.auth_info['disk_volume']
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
  private async getDataList(){
    const {req_data}=this
    let res:any = await Service.get_disk_list({
      az_id:this.$store.state.az_id,
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
