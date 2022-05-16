<template>
    <div>
      <action-block :search_option="search_option" @fn-search="fn_search">
          <template #default>
              <el-button type="primary" v-for="item in operate_btns" :key="item.value" :disabled="!auth_list.includes(item.value)" @click="handle(item.label,item.value)">{{item.label}}</el-button>
          </template>
      </action-block>
      <div class="icon m-bottom10">
        <el-tooltip content="刷新" placement="bottom" effect="light">
          <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
        </el-tooltip>
        <el-tooltip content="导出" placement="bottom" effect="light">
          <el-button type="text" @click="down" :disabled="!auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
        </el-tooltip>
      </div>
      <el-table
        :data="list"
        border
        ref="table"
        @selection-change="handleSelectionChange"
        @sort-change="FnSortChange"
        @filter-change="filterAttribute"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column v-for="item in custom_host" :key="item.prop" :prop="item.prop" :label="item.label" :column-key="item.column_key ? item.column_key : item.prop" >
          <template #default="scope" v-if="item.prop==='machine_status_name'">
            <div>{{scope.row.machine_status_name}}</div>
            <div v-if="scope.row.machine_status!=='off_shelves'" class="destroy">{{'裸金属'}}</div>
          </template>
          <template #default="scope" v-else-if="item.prop==='cpu'">
            <span>{{(parseFloat(scope.row.cpu)).toFixed(2)+'%'}}</span>
          </template>
          <template #default="scope" v-else-if="item.prop==='ram'">
            <span>{{(parseFloat(scope.row.ram)).toFixed(2)+'%'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="host_name" label="主机名"></el-table-column>
        <el-table-column prop="az_name" label="区域"></el-table-column>
        <el-table-column prop="host_room" label="机房名称"></el-table-column>
        <el-table-column prop="host_rack" label="机柜编号"></el-table-column>
        <el-table-column prop="rack_place" label="起始U位"></el-table-column>
        <el-table-column prop="rack_space" label="占用U位"></el-table-column>
        <el-table-column prop="power_status_name" label="电源状态"></el-table-column>
        <el-table-column prop="machine_status_name" label="机器状态">
          <template slot-scope="scope">
            <div>{{scope.row.machine_status_name}}</div>
            <div v-if="scope.row.machine_status!=='off_shelves'" class="destroy">{{'裸金属'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="system_version" label="操作系统"></el-table-column>
        <el-table-column prop="host_model" label="机器类型"></el-table-column>
        <el-table-column prop="host_purpose" label="主机用途"></el-table-column>
        <el-table-column prop="host_attribution__name" label="主机归属" :filter-multiple="false" :filters="host_belongs" column-key="host_belong"></el-table-column>
        <el-table-column prop="host_attribution__source" label="主机来源" :filter-multiple="false" :filters="host_source" column-key="host_source"></el-table-column>
        <el-table-column prop="gpu_model" label="显卡型号"></el-table-column>
        <el-table-column prop="gpu_count" label="显卡数量"></el-table-column>  
        <el-table-column prop="out_band_address" label="带外IP"></el-table-column>
        <el-table-column prop="host_ip" label="管理网IP"></el-table-column>
        <el-table-column prop="storage_ip" label="存储网IP"></el-table-column>
        <el-table-column prop="cpu" label="CPU使用率" sortable="custom">
          <template slot-scope="scope">
            <span>{{(parseFloat(scope.row.cpu)).toFixed(2)+'%'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ram" label="内存使用率" sortable="custom">
          <template slot-scope="scope">
            <span>{{(parseFloat(scope.row.ram)).toFixed(2)+'%'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column label="操作栏">
          <template slot-scope="scope">
            <el-dropdown @command="handleOperate">
              <el-button type="text"><svg-icon icon="more" class="more"></svg-icon></el-button>

              <!-- <el-button type="text"><i class="el-icon-s-operation"></i></el-button> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in rows_operate_btns" :command="{label:item.value,value:scope.row}" :key="item.value" :disabled="!auth_list.includes(item.value)">{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
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
      <template v-if="visible && !['upload','migrate','record','resource','update_attribute'].includes(oper_type)">
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
      <template v-if="visible && oper_type==='update_attribute'">
        <update-attribute :visible.sync="visible" :rows="multi_rows" @close="close"></update-attribute>
      </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import Operate from './operate.vue';
import UploadFile from './upload.vue';
import UpdateAttribute from './updateAttribute.vue'
import {Table} from 'element-ui';
import Migrate from './migrate.vue';
import Service from '../../https/physical/list';
import EcsService from '../../https/instance/create';
import {trans} from '../../utils/transIndex';
import {getHostStatus} from '../../utils/getStatusInfo';
import Record from '../../views/instance/record.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Resource from './resource.vue';
import {deal_list} from '../../utils/transIndex'
@Component({
  components:{
    ActionBlock,
    Operate,
    UploadFile,
    Migrate,
    Record,
    SvgIcon,
    Resource,
    UpdateAttribute
  }
})
export default class PhysicalList extends Vue {
  $message;
  $router;
  $route;
  $store;
  private search_option:any={
    az_id:{placeholder:'请选择可用区',list:[]},
    pod_name:{placeholder:'请输入POD名称'},
    room:{placeholder:'请选择机房',list:[]},
    host_name:{placeholder:'请输入主机名称'},
    vm_name:{placeholder:'请输入VM名称'},
    power_status:{placeholder:'请选择主机电源状态',list:[]},
    host_status:{placeholder:'请选择主机机器状态',list:[]},
    ecs_id:{placeholder:'请输入云服务器ID'},
  }
  private custom_host=[
    {label:'主机名',prop:'host_name'},
    {label:'区域',prop:'az_name'},
    {label:'机房名称',prop:'host_room'},
    {label:'机柜编号',prop:'host_rack'},
    {label:'起始U位',prop:'rack_place'},
    {label:'占用U位',prop:'rack_space'},
    {label:'电源状态',prop:'power_status_name'},
    {label:'机器状态',prop:'machine_status_name'},
    {label:'操作系统',prop:'system_version'},
    {label:'机器类型',prop:'host_model'},
    {label:'主机用途',prop:'host_purpose'},
    {label:'主机归属',prop:'host_attribution__name'},
    {label:'主机来源',prop:'host_attribution__source'},
    {label:'显卡型号',prop:'gpu_model'},
    {label:'显卡数量',prop:'gpu_count'},
    {label:'带外IP',prop:'out_band_address'},
    {label:'管理网IP',prop:'host_ip'},
    {label:'存储网IP',prop:'storage_ip'},
    {label:'CPU使用率',prop:'cpu'},
    {label:'内存使用率',prop:'ram'},
    {label:'创建时间',prop:'create_time'},
  ]
  private operate_btns:any=[
    {label:'导入',value:'upload'},
    {label:'完成验证',value:'finish_validate'},
    {label:'开机',value:'start_up_host'},
    {label:'关机',value:'shutdown_host'},
    {label:'重启',value:'restart_host'},
    {label:'在线维护',value:'online_maintenance'},
    {label:'离线维护',value:'offline_maintenance'},
    {label:'完成维护',value:'finish'},
    {label:'下架',value:'shelves'},
    {label:'驱散',value:'disperse'},
    {label:'分配资源',value:'resource'},
    {label:'更改属性',value:'update_attribute'},
    
  ]
  private rows_operate_btns:any=[
    {label:'详情',value:'physical_detail'},
    {label:'进入带外管理',value:'out_of_band'},
    {label:'迁移',value:'migrate'},
    {label:'操作记录',value:'record'},
    {label:'分配资源',value:'resource'},
  ]
  private host_belongs=[];
  private host_source=[]
  private search_data:any={}
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private list:any=[];
  private visible:Boolean=false;
  private oper_type:string="";
  private oper_label:string="";
  private multi_rows:any=[];
  private auth_list=[];
  private filter_data:any={}
  created() {
      this.get_room_list()
      this.get_az_list()
      this.get_status_list()
      this.fn_search();
      this.get_host_attribution()
      this.auth_list = this.$store.state.auth_info[this.$route.name]
  }
  private fn_search(data:any={}){
    this.search_data = {...data,...this.filter_data}
    this.page_info.current = 1
    this.get_physical_list()
  }
  private refresh(){
    this.page_info.current = 1;
    this.get_physical_list()
  }
  private async get_physical_list(){
    const {az_id,pod_name,room,host_name,vm_name,power_status,host_status,host_belong}=this.search_data
    let res:any=await Service.get_host_list({
      az_id,
      pod_name,
      machine_room_name:room,
      host_name,
      vm_name,
      power_status,
      machine_status:host_status,
      page_index:this.page_info.current,
      page_size:this.page_info.size,
      sort_cpu:this.search_data.sort_cpu,
      sort_ram:this.search_data.sort_ram,
      host_attribution_id:host_belong ? host_belong[0] : undefined
    })
    if(res.code==="Success"){
      this.list = res.data.host_list;
      this.page_info.total = res.data.page_info.count || 0
    }
  }
  private async get_host_attribution (){
    let res:any =await Service.get_host_attribution({})
    if(res.code==="Success"){
      let key_list=['host_attribution_id','name'];
      let label_list=['value','text']
      this.host_belongs =deal_list(res.data.host_attribution_list,label_list,key_list) 
    }
  }
   private async down(){
    const {az_id,pod_name,room,host_name,vm_name,power_status,host_status}=this.search_data
    let obj = {
          az_id,
          pod_name,
          machine_room_name:room,
          host_name,
          vm_name,
          power_status,
          machine_status:host_status,
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
  private async get_az_list(){
    let res:any=await EcsService.get_region_az_list({})
    if(res.code==="Success"){
      res.data.forEach(item=>{
        item.region_list.forEach(inn=>{
          this.search_option.az_id.list=[...this.search_option.az_id.list,...trans(inn.az_list,'az_name','az_id','label','type')]
        })
      })
    }
  }
  private async get_room_list(){
    let res:any=await Service.get_room_list({})
    if(res.code==="Success"){
      
      res.data.machine_room.forEach(item => {
        this.search_option.room.list.push({
          label:item,
          type:item
        })
      })
    }
  }
  private async get_status_list(){
    let res:any=await Service.get_status_list({})
    if(res.code==="Success"){
      this.search_option.power_status.list = res.data.power_status
      this.search_option.host_status.list = res.data.machine_status
    }
  }
  private handleSelectionChange(data){
    this.multi_rows = data
  }
  private FnSortChange(obj){
    console.log("FnSortChange",obj)
    this.search_data.sort_cpu =undefined
    this.search_data.sort_ram =undefined
    this.search_data[`sort_${obj.prop}`]= obj.order==="descending" ? '1' :obj.order==="ascending" ? '0' : undefined
    this.get_physical_list()
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_physical_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_physical_list()
  }
  private filterAttribute(obj:any){
    this.filter_data = {...this.filter_data,...obj}
    this.fn_search(this.search_data)
  }
  
  //todo,根据状态限制操作，获取所有可用区
  private handle(label,value){
    if(this.multi_rows.length===0 && value!=='upload'){
      this.$message.warning("请先勾选物理机!");
      return;
    }
    if(['upload','resource','finish_validate','update_attribute'].includes(value)){
      this.oper_type=value;
      this.oper_label = label
      this.visible=true;
      return;
    }
    if(this.judge(value)){
      if(value==="disperse"){
        //筛选出GPU物理机
        let fil = this.multi_rows.filter(item=>item.host_purpose==='GPU');
        let bool:boolean = fil.every(item=>{//判断GPU物理机上的GPU云主机是不是处于已关机
          return item.ecs_list.every(inn=>(inn.is_gpu && inn.status==="已关机") || !inn.is_gpu)
        })
        if(!bool){
          this.$message.warning("GPU物理机中的GPU云主机需为关机状态!");
          return;
        }
      }
      this.oper_type=value;
      this.oper_label = label
      this.visible=true;
    }else{
      this.$message.warning(getHostStatus(value).msg)
    }
    
    
  }
  private judge(val):any{
    const obj = getHostStatus(val)
    let flag_list = this.multi_rows.every(item=>{
      let power_flag =obj.power.length===0 ? true : obj.power.includes(item.power_status)
      let host_flag =obj.host.length===0 ? true : obj.host.includes(item.machine_status)
      let vm_flag= obj.vm ? obj.vm=== item.ecs_list.length + 1 : true
      console.log("vm_flag",vm_flag,power_flag,host_flag,)
      return power_flag && host_flag && vm_flag
    })
    return flag_list
  }
  private handleOperate(obj){
    const {label,value}=obj;
    this.multi_rows=[value]
    if(label==="physical_detail"){
      this.$router.push({name:label,query:{id:value.host_id,name:value.host_name}})
    }else if(label==="migrate"){
      if(this.judge(label)){
          this.oper_type=label;
          this.visible=true;
        }else{
          this.$message.warning(getHostStatus(label).msg)
        }
    }else if(label==="out_of_band"){
      this.out_of_band()
    }else{
      this.visible=true
      this.oper_type=label
    }

  }
  private async out_of_band(){
    let res:any=await Service.external_management({
      host_id:this.multi_rows[0].host_id
    })
    if(res.code==="Success"){
      window.open(res.data.url.out_bond_addr)
    }
  }
 
  private close(val){
    val==='1' && this.get_physical_list()
    this.visible=false;
    this.oper_type='';
    this.oper_label=""
    this.multi_rows=[]
    const table =this.$refs.table as Table
    table.clearSelection()
  }
}
</script>
<style lang="scss" scoped>
.icon{
  width:100%;
  text-align: right;
}
</style>