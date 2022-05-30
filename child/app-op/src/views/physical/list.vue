<template>
    <div>
      <action-block :search_option="search_option" @fn-search="fn_search" :type="'physical'" @fn-operate="FnOperate">
          <template #default>
              <el-button type="primary" v-for="item in operate_btns" :key="item.value" :disabled="!auth_list.includes(item.value)" @click="handle(item.label,item.value)">{{item.label}}</el-button>
          </template>
      </action-block>
      <div class="icon m-bottom10">
        <el-tooltip content="自定义列表项" placement="bottom" effect="light">
          <el-button type="text" @click="FnCustom"><i class="el-icon-s-tools" ></i></el-button>        
        </el-tooltip>
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
        :max-height="tableHeight"
      >
        <el-table-column type="selection" :width="custom_host.length>0 ? '48px' : '1100px'"></el-table-column>
        <el-table-column 
          v-for="item in custom_host" 
          :filter-multiple="item.column_key ? item.multiple ? true : false : null"
          :key="item.prop" 
          :prop="item.prop" 
          :label="item.label" 
          :column-key="item.column_key ? item.column_key : null"
          :filters="item.column_key ? item.list : null"
          :sortable="item.sortable ? item.sortable : null"
          :width="item.width ? item.width : null"
        >
          <template #default="scope" v-if="item.prop==='machine_status_name'">
            <div>{{scope.row.machine_status_name}}</div>
            <div v-if="scope.row.machine_status==='off_shelves'" class="destroy">{{scope.row.recycle_department}}</div>
          </template>
          <template #default="scope" v-else-if="item.prop==='cpu'">
            <span>{{(parseFloat(scope.row.cpu)).toFixed(2)+'%'}}</span>
          </template>
          <template #default="scope" v-else-if="item.prop==='net_nic'">
            <el-tooltip effect="light" v-if="scope.row.net_nic.length>0">
              <div slot="content">
                <div v-for="(item,index) in scope.row.net_nic" :key="index">{{item}}</div>
              </div>
              <div class="tooltip-cell">{{scope.row.net_nic[0]}}</div>
            </el-tooltip>
            <div v-else></div>
          </template>
          <template #default="scope" v-else-if="item.prop==='exclusive_customers'">
            <span>{{scope.row.exclusive_customers && scope.row.exclusive_customers.length>0 ? scope.row.exclusive_customers.join(',') : '全部客户'}}</span>
          </template>
          <template #default="scope" v-else-if="item.prop==='exclusive_spec_family'">
            <el-tooltip
              v-if="scope.row.exclusive_spec_family.length>0"
              effect="light">
              <template #content>
                <div v-for="item in scope.row.exclusive_spec_family" :key="item">{{item}}</div>
              </template>
                <span class="id-cell">{{ scope.row.exclusive_spec_family[0] }}</span>
            </el-tooltip>
            <span v-else></span>
          </template>
          <template #default="scope" v-else-if="item.prop==='ram'">
            <span>{{(parseFloat(scope.row.ram)).toFixed(2)+'%'}}</span>
          </template>
          <template #default="scope" v-else-if="item.prop==='ecs_num'">
            <el-button type="text" @click="goEcs(scope.row.host_name)">{{scope.row.ecs_num}}</el-button>
          </template>
          <template #default="scope" v-else-if="item.prop==='cpu_with_model'">
            <span v-if="scope.row.cpu_model">{{scope.row.cpu_model}} * {{scope.row.cpu_model_count}}</span><!--型号*数量-->
          </template>
          <template #default="scope" v-else-if="item.prop==='net_card_with_model'">
            <div class="net-model">
              <el-tooltip
                v-if="scope.row.net_model"
                :content="scope.row.net_model"
                popper-class="tooltip-width" 
                placement="right" 
                effect="light">
                  <span class="id-cell">{{ scope.row.net_model }}</span>
              </el-tooltip>
              <span v-if="scope.row.net_model"> * {{scope.row.net_model_count}}</span><!--型号*数量-->
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作栏">
          <template slot-scope="scope">
            <el-dropdown @command="handleOperate">
              <el-button type="text"><svg-icon icon="more" class="more"></svg-icon></el-button>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in rows_operate_btns" :command="{label:item.value,value:scope.row}" :key="item.value" :disabled="!auth_list.includes(item.value)">{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          </template>
        </el-table-column> -->
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
      <custom-list-item 
        :visible.sync="custom_visible" 
        :all_item="all_item"
        :all_column_item="all_column_item" 
        @fn-custom="get_custom_columns"
      ></custom-list-item>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import Operate from './operate.vue';
import UploadFile from './upload.vue'
import {Table} from 'element-ui';
import Migrate from './migrate.vue';
import Service from '../../https/physical/list';
import EcsService from '../../https/instance/create';
import ListService from '../../https/instance/list'
import {trans} from '../../utils/transIndex';
import {getHostStatus} from '../../utils/getStatusInfo';
import Record from '../../views/instance/record.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Resource from './resource.vue';
import {deal_list} from '../../utils/transIndex';
import UpdateAttribute from './updateAttribute.vue';
import CustomListItem from '../../components/customListItem.vue';
import moment from 'moment';
@Component({
  components:{
    ActionBlock,
    Operate,
    UploadFile,
    Migrate,
    Record,
    SvgIcon,
    Resource,
    UpdateAttribute,
    CustomListItem
  }
})
export default class PhysicalList extends Vue {
  $message;
  $router;
  $route;
  $store;
  private search_option:any={
    az_id:{placeholder:'请选择可用区',list:[]},
    out_band_address:{placeholder:'请输入带外IP'},
    host_ip:{placeholder:'请输入管理网IP'},
    host_name:{placeholder:'请输入主机名称/ID'},
    gpu_model:{placeholder:'请输入显卡型号'},
    cpu_model:{placeholder:'请输入CPU型号'},
    net_model:{placeholder:'请输入网卡型号'},
    room:{placeholder:'请选择机房',list:[]},
    host_rack:{placeholder:'请输入机柜编号'},
  }
  private operate_btns:any=[
    {label:'分配资源',value:'resource'},
    {label:'更改属性',value:'update_attribute'},
    {label:'下架',value:'shelves'},
  ]
  private rows_operate_btns:any=[]
  private error_msg={
    start_up_host:'已选主机需为在线或离线状态',
    shutdown_host:'已选主机需为在线或离线状态',
    restart_host:'已选主机需为在线或离线状态',
    online_maintenance:'已选主机需为在线状态',
    offline_maintenance:'已选主机需为在线或离线状态且已选主机上不能有虚拟机运行',
    finish:'已选主机需为在线维护中或离线维护中',
    shelves:'已选主机上不能有虚拟机运行',
    disperse:'已选主机需为在线状态',
    migrate:'已选主机需为在线状态'
  };
  private host_belongs=[]
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
  private host_types=[]
  private host_uses=[];
  private host_source=[];
  private spec_family_list=[]
  private all_column_item=[];
  private all_item:Array<any>=[];
  private custom_visible:boolean = false;
  private tableHeight=70;
  private custom_host=[]
  created() {
      this.getFamilyList()
      this.get_host_list_field()
      this.get_room_list()
      this.get_az_list();
      this.get_host_attribution()
      this.getHostTypes();
      this.get_host_recycle_department()
      this.auth_list = this.$store.state.auth_info[this.$route.name];
      delete this.$store.state.host_search['']
      for(let i in this.search_option){
        this.search_option[i].default_value = this.$store.state.host_search[i]
      }
      if(this.$route.query.host_id){
        this.search_option.host_id.default_value = this.$route.query.host_id as string
      }this.fn_search();      
      
      
  }
  mounted() {
    this.setHeight()
  }
  private FnOperate(){
    this.setHeight()
  }
  setHeight(){
    this.$nextTick(()=>{
      let table = this.$refs.table as any
      this.tableHeight = window.innerHeight - table.$el.offsetTop - 70;
      let self = this;
      window.onresize = function(){
        self.tableHeight = window.innerHeight - table.$el.offsetTop - 70;
      }
    });
  }
  private async get_host_list_field(){
    let res:any = await Service.get_host_list_field({
      is_op:'0'
    })
    if(res.code==="Success"){
      let key_list=['field_name','show_name'];
      let label_list=['prop','label'];
      let list:Array<any>=[]
      res.data.map(item=>{
        list=[...list,...item.filed];
        return item;
      })
      this.all_item = res.data;
      this.all_column_item = deal_list(list,label_list,key_list);
      this.get_custom_columns(this.$store.state.custom_host)

    }
  }
  private get_custom_columns(list){
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));
    this.custom_host.map(item=>{
      if(['host_name','out_band_address','host_ip','cpu','ram','ecs_num','gpu_model','ram_volume','create_time'].includes(item.prop)){
        item = Object.assign(item,{},{sortable:'custom'})
      }
      if(['cpu_with_model','net_card_with_model'].includes(item.prop)){
        item = Object.assign(item,{},{width:'180px'})
      }
      if(item.prop==='host_type_ch'){
        item = Object.assign(item,{},{column_key:'host_type',list:this.host_types})
      }
      if(item.prop==='host_purpose_ch'){
        item = Object.assign(item,{},{column_key:'host_purpose',list:this.host_uses})
      }
      if(item.prop==='host_attribution__name'){
        item = Object.assign(item,{},{column_key:'host_belong',list:this.host_belongs})
      }
      if(item.prop==='host_source'){
        item = Object.assign(item,{},{column_key:'host_source',list:this.host_source})
      }
      if(item.prop==='exclusive_spec_family'){
        item = Object.assign(item,{},{column_key:'ecs_family_id',multiple:true,list:this.spec_family_list})
      }
      if(item.prop==='net_nic'){
        item = Object.assign(item,{},{width:'180px'})
      }
      return item;
    })
  }
  private fn_search(data:any={}){
    this.search_data = {...data,...this.filter_data};
    this.page_info.current = 1
    this.get_physical_list()
  }
  private beforeDestroy() {
    this.$store.commit("SET_HOST_SEARCH",this.search_data)
  }
  private FnCustom(){
    this.custom_visible=true;
  }
  private refresh(){
    this.page_info.current = 1;
    this.get_physical_list()
  }
  private async get_physical_list(){
    const {
      az_id,
      room,
      host_name,
      host_belong,
      host_purpose,
      host_type,
      out_band_address,
      host_ip,
      gpu_model,
      host_rack,
      host_source,
      ecs_family_id,
      cpu_model,
      net_model,
    }=this.search_data
    let res:any=await Service.get_host_list({//缺少规格族字段筛选
      az_id,
      machine_room_name:room,
      host_name,
      out_band_address,
      host_ip,
      gpu_model,
      host_rack,
      cpu_model,
      net_model,
      page_index:this.page_info.current,
      page_size:this.page_info.size,
      sort_cpu:this.search_data.sort_cpu,
      sort_ram:this.search_data.sort_ram,
      sort_ecs_num:this.search_data.sort_ecs_num,
      host_attribution_id:host_belong ? host_belong[0] : undefined,
      sort_host_name:this.search_data.sort_host_name,
      sort_out_band_address:this.search_data.sort_out_band_address,
      sort_host_ip:this.search_data.sort_host_ip,
      host_purpose:host_purpose ? host_purpose[0] : undefined,
      host_type:host_type ? host_type[0] : undefined,
      host_source:host_source ? host_source[0] : undefined,
      ecs_family_list:ecs_family_id && ecs_family_id.length>0 ? ecs_family_id : undefined,
    })
    if(res.code==="Success"){
      this.list = res.data.host_list;
      this.page_info.total = res.data.page_info.count || 0
    }
  }
  private async getHostTypes(){
      let res:any =await Service.get_host_type({})
      if(res.code==='Success'){
        let key_list=['type','type_name','list'];
        let label_list=['value','text','list']
        this.host_types =deal_list(res.data,label_list,key_list);
        this.setList(this.host_types,'host_type_ch')
      }
      
  }
  private async getFamilyList(){
    let res:any =await ListService.get_family_data();
    if(res.code==='Success'){
      let key_list=['spec_family_id','name'];
      let label_list=['value','text']
      this.spec_family_list =deal_list(res.data.spec_family_list,label_list,key_list);
      // console.log('this.spec_family_list',this.spec_family_list);
      
    }
  }
  private async get_host_attribution (){
    let res:any =await Service.get_host_attribution({})
    if(res.code==="Success"){
      let key_list=['host_attribution_id','name'];
      let label_list=['value','text']
      this.host_belongs =deal_list(res.data.host_attribution_list,label_list,key_list) 
      this.setList(this.host_belongs,'host_attribution__name')
    }
  }
  private goEcs(id){
    this.$router.push({
      path:'/instance',
      query:{
        host_name:id
      }
    })
  }
   private async down(){
    const {
      az_id,
      room,
      host_name,
      out_band_address,
      host_ip,
      gpu_model,
      host_rack,
      host_source,
      host_type,
      host_purpose,
      host_belong,
      cpu_model,
      net_model,
      ecs_family_id
    }=this.search_data
    let obj = {//缺少规格族字段筛选
        az_id,
        machine_room_name:room,
        host_name,
        out_band_address,
        host_ip,
        cpu_model,
        net_model,
        gpu_model,
        host_rack,
        host_attribution_id:host_belong ? host_belong[0] : undefined,
        host_purpose:host_purpose ? host_purpose[0] : undefined,
        host_source:host_source ? host_source[0] : undefined,
        host_type:host_type ? host_type[0] : undefined,
        ecs_family_list:ecs_family_id && ecs_family_id.length>0 ? JSON.stringify(ecs_family_id) : undefined,
        field_names:JSON.stringify(this.custom_host.map(item=>item.prop)) 
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
  private async get_host_recycle_department(){
    let res:any = await Service.get_host_recycle_department({})
    if(res.code==="Success"){
      let key_list=['department_name','department_name'];
      let label_list=['value','text']
      this.host_source =deal_list(res.data,label_list,key_list)
      this.setList(this.host_source,'host_source')
    }
  }
  private handleSelectionChange(data){
    this.multi_rows = data
  }
  private FnSortChange(obj){
    this.search_data.sort_cpu =undefined
    this.search_data.sort_ram =undefined;
    this.search_data.sort_host_name =undefined
    this.search_data.sort_out_band_address =undefined
    this.search_data.sort_host_ip =undefined
    this.search_data.sort_ecs_num =undefined
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
    if(this.filter_data.host_type && this.filter_data.host_type.length>0){
      let key_list=['use_type','use_name'];
      let label_list=['value','text']
      let fil = this.host_types.filter(item=>item.value===this.filter_data.host_type[0]);
      this.host_uses =fil.length>0 ? deal_list(fil[0].list,label_list,key_list) :[];
      
    }else{
      this.host_uses=[]
    }
    this.setList(this.host_uses,'host_purpose_ch')
    this.fn_search(this.search_data)
  }
  
  //todo,根据状态限制操作，获取所有可用区
  private handle(label,value){
    if(this.multi_rows.length===0 && value!=='upload'){
      this.$message.warning("请先勾选物理机!");
      return;
    }
    if(value==='finish_validate'){
      if(this.multi_rows.every(item=>['init_error','init','offline'].includes(item.machine_status))){
        this.oper_type=value;
        this.oper_label = label
        this.visible=true;
        return;
      }else{
        this.$message.warning("物理机需为初始化状态或验证失败状态!");
        return;
      }
        
    }
    if(['upload','resource','update_attribute'].includes(value)){
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
      this.$message.warning(this.error_msg[value])
    }
    
    
  }
  private judge(val):any{
    const obj = getHostStatus(val)
    let flag_list = this.multi_rows.every(item=>{
      let power_flag =obj.power.length===0 ? true : obj.power.includes(item.power_status)
      let host_flag =obj.host.length===0 ? true : obj.host.includes(item.machine_status)
      let vm_flag= obj.vm ? obj.vm=== item.ecs_list.length + 1 : true;
      if(!vm_flag && ['shutdown_host','restart_host'].includes(val)){
        this.error_msg[val]=getHostStatus(val).msg2
      }else{
        this.error_msg[val]=getHostStatus(val).msg
      }
      return power_flag && host_flag && vm_flag
    })
    return flag_list
  }
  // private handleOperate(obj){
  //   const {label,value}=obj;
  //   this.multi_rows=[value]
  //   if(label==="physical_detail"){
  //     this.$router.push({name:label,query:{id:value.host_id,name:value.host_name}})
  //   }else if(label==="migrate"){
  //     if(this.judge(label)){
  //         this.oper_type=label;
  //         this.visible=true;
  //       }else{
  //         this.$message.warning(this.error_msg[label])
  //       }
  //   }else if(label==="out_of_band"){
  //     this.out_of_band()
  //   }else{
  //     this.visible=true
  //     this.oper_type=label
  //   }

  // }
  private async out_of_band(){
    let res:any=await Service.external_management({
      host_id:this.multi_rows[0].host_id
    })
    if(res.code==="Success"){
      window.open(res.data.url.out_bond_addr)
    }
  }
  private setList(list,prop){
    this.custom_host.map(item=>{
      if(item.prop===prop){
        item.list = list
      }
      return item;
    })
  }
  private close(val){
    this.oper_type==="upload" && this.get_room_list()
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
.net-model{
  display: flex;
}
.icon{
  width:100%;
  text-align: right;
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}
</style>