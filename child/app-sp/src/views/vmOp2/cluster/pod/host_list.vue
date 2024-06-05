<template>
  <div>
    <div class="search-box" >
      <el-input prefix-icon="el-icon-search"></el-input>
      <div class="icon m-bottom10">
        <el-tooltip content="自定义列表项" placement="bottom" effect="light">
          <el-button type="text" @click="FnCustom"><i class="el-icon-s-tools" ></i></el-button>
        </el-tooltip>
        <el-tooltip content="刷新" placement="bottom" effect="light">
          <el-button type="text" @click="refresh" ><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
        </el-tooltip>
        <el-tooltip content="导出" placement="bottom" effect="light">
          <el-button type="text" @click="down"><svg-icon icon="export" class="export"></svg-icon></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-table
      :data="list"
      border
      ref="table"
      @selection-change="handleSelectionChange"
      @sort-change="FnSortChange"
      @filter-change="filterAttribute"
      @row-click="FnOperRow"
      @row-contextmenu="FnRightClick"
      :row-class-name="rowStyle"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        v-for="(item) in custom_host"
        :filter-multiple="item.column_key ? false : null"
        :key="item.prop"
        :prop="item.prop"
        :column-key="item.column_key ? item.column_key : null"
        :filters="item.column_key ? item.list : null"
        :sortable="item.sortable ? item.sortable : null"
        :width="item.width ? item.width : null"
        :type="item.type"
        :label="item.label"
        :show-overflow-tooltip='item.overflow'
        :min-width="item.minWidth"
      >
        <template #default="scope" v-if="item.prop==='cpu_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="Math.round(scope.row.cpu_rate)"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='ram_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="Math.round(scope.row.ram_rate)"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='gpu_rage'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="Math.round(scope.row.gpu_rate)"></el-progress>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page_info.current"
      :page-sizes="[20, 50, 100]"
      :page-size="page_info.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page_info.total">
    </el-pagination>
    <template v-if="visible && !['physical_detail','upload','migrate','record','resource','update_attribute','business_test','remark'].includes(oper_type)">
      <Operate :title="oper_label" :rows="multi_rows" :oper_type="oper_type" :visible.sync="visible" @close="close"></Operate>
    </template>
    <template v-if="visible && oper_type==='upload'">
      <upload-file :visible.sync="visible" @close="close"></upload-file>
    </template>
    <template v-if="visible && oper_type==='migrate'">
      <Migrate :visible.sync="visible" :rows="multi_rows" @close="close"></Migrate>
    </template>
    <template v-if="visible && oper_type==='record'">
      <Record :visible.sync="visible" type="physical" :record_id="multi_rows[0].host_id" @close="close"></Record>
    </template>
    <template v-if="visible && oper_type==='resource'">
      <Resource :visible.sync="visible" :rows="multi_rows" @close="close"></Resource>
    </template>
    <template v-if="visible && oper_type==='business_test'">
      <business-test :visible.sync="visible" :az_info="az_info"></business-test>
    </template>
    <template v-if="visible && oper_type==='remark'">
      <remark :visible.sync="visible" :rows="multi_rows[0]" @close="close"></remark>
    </template>
    <custom-list-item
      :visible.sync="show_custom"
      :all_item="all_item"
      :all_column_item="all_column_item"
      @fn-custom="get_custom_columns"
      :type="'pod_host'"
    ></custom-list-item>
    <right-click :multi_rows="multi_rows" :menus="menus" :name=" multi_rows.length>0 ? multi_rows[0].host_name: ''" :error_msg="error_msg"  @fn-click="infoClick"></right-click>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index.vue';
import SearchFrom from "@/components/search/searchFrom.vue";
import CustomListItem from '@/views/physical/customListItem.vue';
import {deal_list} from "@/utils/transIndex";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import Service from "@/https/vmOp2/cluster/pod";
import { rightClick } from "@/utils/vmOp2/rightClick"
import { hideMenu} from "@/utils/vmOp2/hideMenu"
import {getHostStatus} from "@/utils/getStatusInfo";
import {Table} from "element-ui";
import Operate from "@/components/vmOp2/cluster/pod/host/operate.vue"
import UploadFile from "@/components/vmOp2/cluster/pod/host/upload.vue"
import Migrate from '@/components/vmOp2/cluster/pod/host/migrate.vue';
import Record from '@/components/vmOp2/cluster/pod/host/record.vue';
import Resource from '@/components/vmOp2/cluster/pod/host/resource.vue';
import BusinessTest from '@/components/vmOp2/cluster/pod/host/businessTest.vue';
import Remark from '@/components/vmOp2/cluster/pod/host/editRemark.vue';
import moment from "moment";

@Component({
  components: {
    RightClick,
    SearchFrom,
    SvgIcon,
    CustomListItem,
    Operate,
    UploadFile,
    Migrate,
    Record,
    Resource,
    BusinessTest,
    Remark
  }
})

export default class HostList extends Vue{
  private list=[]
  private all_column_item=[];
  private multi_rows:any=[];
  private search_data:any={}
  private az_info:any={}
  private visible:Boolean=false;
  private oper_type:string="";
  private oper_label:string="";
  private power_list=[];
  private filter_data:any={}
  private machine_list=[]
  private power_status:any=""
  private machine_status:any =''
  private filter_info:any={}
  private sort_prop_name = '';
  private sort_order = undefined;
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private all_item:Array<any>=[]
  private custom_host=[]
  private show_custom:boolean=false;
  private switch_power:any= [
      {label:'开机',value:'start_up_host',disabled:false},
      {label:'关机',value:'shutdown_host',disabled:false},
    {label:'重启',value:'restart_host',disabled:false},
  ]
  private lock_machine:any =[
    {label:'锁定机器',value:'lock',disabled:false},
    {label:'解锁机器',value:'unlock',disabled:false}
  ]
  private crash_list:any=[
    {label:'数据清理同步',value:'data_clear',disabled:false},
    {label:'宕机恢复',value:'down_recover',disabled:false}
  ]
  private maintenance_host:any =[
    {label:'设置维护',value:'maintenance',disabled:false},
    {label:'完成维护',value:'finish',disabled:false},
  ]
  private sign_host:any =[
    {label:'调度标记',value:'schedule',disabled:false},
    {label:'迁移标记',value:'migrate_flag',disabled:false},
  ]
  private menus= [
    //{label: '详情',value: 'physical_detail',single:true,disabled:false},
    {label:'迁移',value:'migrate',single:true,disabled:false},
    {label:'操作记录',value:'record',single:true,disabled:false},
    {label:'分配资源',value:'resource',single:true,disabled:false},
    {label:'编辑备注',value:'remark',single:true,disabled:false},
    {label:'开关机',value:'start_or_shutdown', list:this.switch_power,disabled:false},
    {label:'机器锁定',value:'lock_machine', disabled:false,list:this.lock_machine},
    {label:'机器维护',value:'maintenance', disabled:false,list: this.maintenance_host},
    {label: '宕机处理',value: 'crash', disabled:false,list: this.crash_list},
    {label: '设备标记',value: 'sign', disabled:false,list: this.sign_host},
    {label:'导入',value:'upload', disabled:false},
    {label:'底层同步',value:'under_sync', disabled:false},
    {label:'驱散',value:'disperse', disabled:false},
    {label:'欺骗器管理',value:'cheat', disabled:false},
    {label:'业务测试',value:'business_test', disabled:false},
  ]
  private error_msg={
    start_up_host:'已选主机需为在线或离线状态',
    shutdown_host:'已选主机需为在线或离线状态且无虚拟机运行',
    restart_host:'已选主机需为在线或离线状态',
    finish:'已选主机需为在线维护中或离线维护中',
    shelves:'已选主机上不能有虚拟机运行',
    disperse:'已选主机需为在线状态',
    migrate:'已选主机需为在线状态',
    unlock:'已选主机需为锁定状态',
    data_clear:'机器状态需为待清理状态',
    down_recover:'机器状态需为待恢复状态!'
  }
  @Watch('multi_rows',{immediate:true,deep:true})
  private watch_multi(){
    this.handleMenus()
  }
  created(){
    this.get_field()
    this.get_pod_host_list()
    this.get_status_list()
  }
  private close(val){
    //this.oper_type==="upload" && this.get_room_list()
    val==='1' && this.get_pod_host_list()
    this.visible=false;
    this.oper_type='';
    this.oper_label=""
    this.multi_rows=[]
    const table =this.$refs.table as Table
    table.clearSelection()
  }
  private handleMenus() {
    // 处理菜单项
    for (const item of this.menus) {
      if (!item.list) {
        item.disabled = this.handle(item.label, item.value);
      } else {
        // 处理子菜单项
        for (const inn of item.list) {
          inn.disabled = this.handle(inn.label, inn.value);
        }
      }
    }
  }
  private handle(label,value){
    if(value==='finish_validate'){
      if(this.multi_rows.every(item=>['init_error','init','offline'].includes(item.machine_status))){
        return false
      }else{
        this.error_msg['finish_validate'] = '物理机需为初始化状态或验证失败状态'!
        return true
      }
    }
    if(['upload','resource','update_attribute','business_test','schedule','migrate_flag','cheat','under_sync'].includes(value)){
      if(value==='business_test'){
        if(this.list.length===0){
          this.error_msg['business_test']='当前无宿主机可进行业务测试!'
          return true
        }
      }
      return false
    }
    if(this.judge(value)){
      if(value==="disperse"){
        //筛选出GPU物理机
        let fil = this.multi_rows.filter(item=>item.host_purpose==='GPU');
        let bool:boolean = fil.every(item=>{//判断GPU物理机上的GPU云主机是不是处于已关机
          return item.ecs_list.every(inn=>(inn.is_gpu && inn.status==="已关机") || !inn.is_gpu)
        })
        if(!bool){
          this.error_msg['disperse']="GPU物理机中的GPU云主机需为关机状态!"
          return false
        }
      }
    }else{
      return  true
    }
  }
  private judge(val):any{
    const obj = getHostStatus(val)
    let flag_list = this.multi_rows.every(item=>{
      let power_flag =obj.power.length===0 ? true : obj.power.includes(item.power_status)
      let host_flag =obj.host.length===0 ? true : obj.host.includes(item.machine_status)
      let vm_flag= obj.vm ? obj.vm=== item.ecs_count + 1 : true;
      // if(!vm_flag && ['shutdown_host'].includes(val)){
      //   this.error_msg[val]=getHostStatus(val).msSg2
      // }else{
      //   return false
      // }
      return power_flag && host_flag && vm_flag
    })
    return flag_list
  }
  private infoClick(item) {
    const {label, value}=item
    if(!item.list && !item.disabled){
      if(value==='business_test'){
        this.az_info={
          az_id:this.$store.state.az_id,
          az_name:this.$store.state.az_name,
        }
      }
        this.oper_type = value;
        this.oper_label = label
        this.visible = true;
      hideMenu()
    }
  }
  @Watch("$store.state.az_id")
  private watch_az(nv){
    if(!nv){
      return;
    }
    this.refresh()
  }
  private refresh(){
    this.get_pod_host_list()
  }
  //改变点击行得选中状态
  private FnOperRow(row){
   (this.$refs.table as any).toggleRowSelection(row)
  }
  //改变选中行的背景颜色
  rowStyle({row}) {
    const isSelected = this.multi_rows.some(item => item.host_id === row.host_id);
      if (isSelected) {
        return 'rowStyle'
      }
  }
  //右键弹出操作
  FnRightClick(row,column,event){
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.multi_rows.some(item => item.host_id === row.host_id);
    if (!isSelected) {
      (this.$refs.table as any).toggleRowSelection(row)
    }
    rightClick(row,column,event)
  }
  private async get_field(){
    let res:any = await Service.get_pod_host_field()
    if(res.code==="Success"){
    let key_list=['field_name','show_name'];
    let label_list=['prop','label'];
    let list:Array<any>=[]
    this.all_item = res.data.map(item=>{
      list=[...list,...item.filed];
      return item;
    })
    this.all_column_item = deal_list(list,label_list,key_list);
    this.get_custom_columns(this.$store.state.pod.host_list)
    }
  }
  private get_custom_columns(list) {
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
    this.custom_host.map((item:any)=>{
      if(!['cpu_model','gpu_model','bare_metal_name','power_status_name','machine_status_name'].includes(item.prop)) {
        item = Object.assign(item, {}, {sortable: 'custom'})
      }
      if(['host_id','bare_metal_name','cpu_model'].includes(item.prop)){
        item = Object.assign(item,{},{width:'240px',overflow:true})
      }
      if(['host_name','gpu_model'].includes(item.prop)){
        item = Object.assign(item,{},{width:'150px',overflow:true})
      }
      if(['host_ip','out_band_address','gpu_count','ecs_count','cpu_rate','ram_rate','gpu_rage','machine_status_name'].includes(item.prop)){
        item = Object.assign(item,{},{minWidth:'120px'})
      }
      if(item.prop==='power_status_name'){
        item = Object.assign(item,{},{column_key:'power_status',list:this.power_list})
      }
      if(item.prop==='machine_status_name'){
        item = Object.assign(item,{},{column_key:'machine_status',list:this.machine_list})
      }
      return item;
    })
  }
  private async get_status_list(){
    let res:any=await Service.get_status_list({})
    if(res.code==="Success"){
      for(let i in res.data.power_status){
        this.power_list.push({text:res.data.power_status[i],value:i})
      }
      for(let i in res.data.machine_status){
        this.machine_list.push({text:res.data.machine_status[i],value:i})
      }
    }
  }
  private FnCustom() {
    this.show_custom = true;
  }
  private async down(){
    const {
      room,
      host_name,
      vm_id,
      out_band_address,
      host_ip,
      host_id,
      gpu_model,
      host_rack,
      sort_host_ip,
      create_time,
      cpu,
      nic,
      bare_metal_name,
      bare_metal_id,
    }=this.search_data
    let obj = {
      pod_id:this.$route.params.id,
      machine_room_name:room,
      host_name,
      vm_id,
      out_band_address,
      host_ip,
      host_id,
      gpu_model,
      host_rack,
      sort_host_ip,
      cpu,
      nic,
      bare_metal_name,
      bare_metal_id,
      start_time:create_time && create_time[0] ? moment(create_time[0]).format('YYYY-MM-DD HH:mm:ss') : undefined,
      end_time:create_time && create_time[1] ? moment(create_time[1]).format('YYYY-MM-DD HH:mm:ss') : undefined,
      ...this.filter_info,
      field_names:JSON.stringify(this.custom_host.map((item:any)=>item.prop))
    }
    let str=""
    for (let i in obj){
      if(obj[i]){
        str =str+`${i}=${obj[i]}&`
      }
    }
    let query = str==="" ? "" : `?${str.slice(0,str.length-1)}`
    window.location.href=`/ecs_business/v1/host/host_list_download/${query}`
  }
  private async get_pod_host_list(){
    if(!this.$store.state.az_id){
      return
    }
    let reqData = {
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      az_id:this.$store.state.az_id,
      [this.sort_prop_name]: this.sort_order,
      ...this.filter_info
    }
    if(this.$store.state.node === 'pod'){
      reqData['pod_id'] = this.$route.params.id
    }
    if(this.$store.state.node === 'cluster'){
      reqData['cluster_id'] = this.$route.params.id
    }
    let res:any = await Service.get_pod_host_list(reqData)
    if(res.code === 'Success'){
      this.list = res.data.result
      this.page_info.total = res.data.page_info.count
    }
  }
  //校验列表项是否存在此项
  private judgeColumns(){
    let keys = Object.keys(this.filter_data)
    let temp = ['power_status','machine_status']
    keys.map(item=>{
      if(!temp.includes(item)){
        delete(this.filter_data[item])
      }
    });
    this.filter_info={}
    for(let i in this.filter_data){
      this.filter_info[i]=this.filter_data[i][0]
    }
  }
  private filterAttribute(obj:any){
    this.filter_data = {...this.filter_data,...obj}
    this.judgeColumns()
    this.get_pod_host_list()
  }
  private handleSelectionChange(data){
    this.multi_rows = data
  }
  private FnSortChange(val){
    let relation = {};
    this.all_item.forEach(item => {
      item.filed.forEach(inn => {
        relation[inn.field_name] = `sort_${inn.field_name}`;
      });
    });
    this.sort_prop_name = relation[val.prop];
    this.sort_order = val.order === "ascending" ? '0' : val.order === "descending" ? '1' : undefined;
    this.get_pod_host_list()
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_pod_host_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_pod_host_list()
  }
}
</script>

<style scoped lang="scss">
.search-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  ::v-deep .el-input{
    width: 260px;
  }
  ::v-deep .el-input__inner{
    width: 260px;
    border-radius: 20px;
  }
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}
::v-deep .el-progress-bar__outer {
  border-radius: 0;
}
::v-deep .el-progress-bar__inner {
  border-radius: 0;
}
::v-deep .el-progress__text{
  font-size: 14px!important;
}
</style>
