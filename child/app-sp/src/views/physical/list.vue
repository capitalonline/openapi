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
        @expand-change="FnExpand"
        :max-height="tableHeight"
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
          :class-name="item.className ? item.className : null"
        >
          <template slot="header" slot-scope="scope" >
            <template v-if="item.prop==='ecs_num'">
               <span>虚拟机数量</span>
               <el-tooltip popper-class="tooltip-width" content="云桌面/文件存储转发的虚机未纳入统计，所以主机属性为云桌面/文件存储转发的物理机虚机数量为0不代表无虚机。" effect="light">
                 <el-button type="text" class="m-left5 m-right5"><svg-icon icon="info" viewBox="0 0 20 20" class="more"></svg-icon></el-button>
               </el-tooltip>
            </template>
             <span v-else>{{item.label}}</span>
          </template>
          <template #default="scope" v-if="item.prop==='machine_status_name'">
            <div>{{scope.row.machine_status_name}}</div>
            <div v-if="scope.row.machine_status==='off_shelves'" class="destroy">{{scope.row.recycle_department}}</div>
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
          <template #default="scope" v-else-if="item.prop==='cpu'">
            <span>{{(parseFloat(scope.row.cpu)).toFixed(2)+'%'}}</span>
          </template>
          <template #default="scope" v-else-if="item.prop==='ram'">
            <span>{{(parseFloat(scope.row.ram)).toFixed(2)+'%'}}</span>
          </template>
          <template #default="scope" v-else-if="item.prop==='ecs_num'">
            <el-button type="text">{{scope.row.ecs_num}}</el-button>
          </template>
          <template #default="props" v-else-if="item.prop==='ecs_num_expand'">
              <el-table :data="props.row.ecs_detail" v-if="props.row.ecs_detail" :max-height="400" v-loading="loading">
                <el-table-column v-for="inn in ecs_fields" ref="ecs_list" :key="inn.prop" :label="inn.label" :prop="inn.prop" :width="inn.width ? inn.width : null">
                  <template #default="scope" v-if="inn.prop==='ecs_name'">
                    <span class="clickble" @click="FnToDetail(scope.row.ecs_id)">{{scope.row.ecs_name}}</span>
                  </template>
                  <template #default="scope" v-else-if="inn.prop==='status'">
                    <span :class="scope.row.status">{{scope.row.status_display}}</span>
                  </template>
                  <template #default="scope" v-else-if="inn.prop==='private_net'">
                    <div v-if="scope.row.private_net">
                      {{ scope.row.private_net }}
                      （vlan {{ scope.row.vlan[FnGetNet(scope.row.private_net)] }}）
                    </div>
                  </template>
                  <template #default="scope" v-else-if="inn.prop==='pub_net'">
                    <div v-if="scope.row.pub_net">
                      <span class="circel-border" v-if=" scope.row.eip_info[scope.row.pub_net] && scope.row.eip_info[scope.row.pub_net].conf_name" >
                        {{ scope.row.eip_info[scope.row.pub_net].conf_name }}
                      </span>
                      {{ scope.row.pub_net }}（vlan {{ scope.row.vlan[FnGetNet(scope.row.pub_net)] }}）
                    </div>
                    <div v-for="i in scope.row.virtual_net" :key="i">
                      <span class="circel-border" v-if="scope.row.eip_info[i] && scope.row.eip_info[i].conf_name">
                        {{ scope.row.eip_info[i].conf_name }}
                      </span>
                      {{ i }}（vlan {{ scope.row.vlan[FnGetNet(i)] }}）</div>
                  </template>
                  <template #default="scope" v-else-if="inn.prop==='pub_ip'">
                    <div v-if="scope.row.eip_info[scope.row.pub_net] &&scope.row.eip_info[scope.row.pub_net].conf_name">
                      <span class="circel-border">
                        {{ scope.row.eip_info[scope.row.pub_net].conf_name }}
                      </span>
                      {{ scope.row.eip_info[scope.row.pub_net].eip_ip }}
                    </div>
                    <div v-for="item in scope.row.virtual_net" :key="item">
                      <template v-if=" scope.row.eip_info[item] && scope.row.eip_info[item].conf_name " >
                        <span class="circel-border">{{ scope.row.eip_info[item].conf_name }}</span>
                        {{ scope.row.eip_info[item].eip_ip }}
                      </template>
                    </div>
                  </template>
                  <template #default="scope" v-else-if="inn.prop==='ecs_info'">
                    {{ scope.row.ecs_goods_name }} <br />
                    {{ scope.row.cpu_size }}vCPU | {{ scope.row.ram_size }}GiB <br />
                    <span v-if="scope.row.gpu_size">| {{ scope.row.gpu_size }}*{{ scope.row.card_name }}</span>
                  </template>
                  <template #default="scope" v-else-if="inn.prop==='disk'">
                    <div>系统盘：{{scope.row.system_disk_type}}{{scope.row.system_disk_size}}{{scope.row.system_disk_unit}}</div>
                    <div v-if="scope.row.data_list_list.length>0" class="disk">
                      <span>数据盘：</span>
                      <div>
                        <p v-for="item in scope.row.data_list_list" :key="item.feature">{{item.feature}}云盘{{item.size}}{{item.unit}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
          </template>
          <template #default="scope" v-else-if="item.prop==='cpu_with_model'">
            <span v-if="scope.row.cpu_model">{{scope.row.cpu_model}} * {{scope.row.cpu_model_count}}</span>
          </template>
          <template #default="scope" v-else-if="item.prop==='backend_type'">
            <span>{{backendObj[scope.row.backend_type]}}</span>
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
              <span v-if="scope.row.net_model"> * {{scope.row.net_model_count}}</span>
            </div>
            
          </template>
        </el-table-column>
        <el-table-column label="操作栏">
          <template slot-scope="scope">
            <el-dropdown @command="handleOperate">
              <el-button type="text"><svg-icon icon="more" class="more"></svg-icon></el-button>

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
      <template v-if="visible && !['upload','migrate','record','resource','update_attribute','business_test'].includes(oper_type)">
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
      <template v-if="detail_visible">
        <Detail
          :visible="detail_visible"
          :detail_id="detail_id"
          @close-detail="closeDetail"
        />
      </template>
      <template v-if="visible && oper_type==='update_attribute'">
        <update-attribute :visible.sync="visible" :rows="multi_rows" @close="close"></update-attribute>
      </template>
      <template v-if="visible && oper_type==='business_test'">
        <business-test :visible.sync="visible" :az_info="az_info"></business-test>
      </template>
      
      <custom-list-item 
        :visible.sync="custom_visible" 
        :all_item="all_item"
        :all_column_item="all_column_item" 
        @fn-custom="get_custom_columns"
      ></custom-list-item>
      <!-- :all_item="all_item" -->
      <!-- :all_column_item="all_column_item"  -->
    </div>
</template>
<script lang="ts">
import { Component, Vue,Watch } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import Operate from './operate.vue';
import UploadFile from './upload.vue'
import {Table} from 'element-ui';
import Migrate from './migrate.vue';
import Service from '../../https/physical/list';
import EcsService from '../../https/instance/create';
import EcsListService from '../../https/instance/list'
import {trans,deal_list} from '../../utils/transIndex';
import {getHostStatus} from '../../utils/getStatusInfo';
import Record from '../../views/instance/record.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Resource from './resource.vue';
import UpdateAttribute from './updateAttribute.vue';
import CustomListItem from './customListItem.vue';
import BusinessTest from './businessTest.vue'
import Detail from '../instance/detail.vue'
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
    CustomListItem,
    BusinessTest,
    Detail
  }
})
export default class PhysicalList extends Vue {
  $message;
  $router;
  $route;
  $store;
  private search_option:any={
    out_band_address:{placeholder:'请输入带外IP'},
    host_ip:{placeholder:'请输入管理网IP'},
    host_name:{placeholder:'请输入主机名称'},
    host_id:{placeholder:'请输入主机ID'},
    vm_id:{placeholder:'请输入虚拟机ID'},
    cpu:{placeholder:'请输入CPU型号'},
    gpu_model:{placeholder:'请输入显卡型号'},
    nic:{placeholder:'请输入网卡型号'},
    room:{placeholder:'请选择机房',list:[]},
    host_rack:{placeholder:'请输入机柜编号'},
    create_time: {
      placeholder: ['开始时间', '结束时间'],
      type: 'datetimerange',
      width: '360',
      clearable: true,
      dis_day: 31,
      defaultTime: [] 
    },
  }
  private operate_btns:any=[
    {label:'导入',value:'upload'},
    {label:'完成验证',value:'finish_validate'},
    {label:'开机',value:'start_up_host'},
    {label:'关机',value:'shutdown_host'},
    {label:'重启',value:'restart_host'},
    {label:'在线维护',value:'online_maintenance'},
    {label:'离线维护',value:'offline_maintenance'},
    {label:'完成维护',value:'finish'},
    // {label:'下架',value:'shelves'},
    {label:'驱散',value:'disperse'},
    {label:'业务测试',value:'business_test'},
    // {label:'分配资源',value:'resource'},
    // {label:'更改属性',value:'update_attribute'},
  ]
  private rows_operate_btns:any=[
    {label:'详情',value:'physical_detail'},
    {label:'迁移',value:'migrate'},
    {label:'操作记录',value:'record'},
    {label:'分配资源',value:'resource'},
  ]
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
  private power_list=[];
  private machine_list=[]
  private host_source=[];
  private all_column_item=[];
  private custom_visible:boolean = false;
  private tableHeight=70;
  private az_info:any={}
  private all_item:Array<any>=[];
  private loading:boolean=false;
  private expand_rows:any=[]
  private new_prop_list:Array<string>=[];
  private filter_info:any={}
  private detail_id="";
  private detail_visible=false 
  private ecs_fields:any=[
    {label:'客户ID',prop:'customer_id'},
    {label:'客户名称',prop:'customer_name'},
    {label:'云服务器ID',prop:'ecs_id'},
    {label:'云服务器名称',prop:'ecs_name'},
    {label:'状态',prop:'status'},
    {label:'私网IP',prop:'private_net'},
    {label:'虚拟出网网关IP',prop:'pub_net'},
    {label:'公网IP',prop:'pub_ip'},
    {label:'计算规格',prop:'ecs_info'},
    {label:'存储',prop:'disk',width:'160px'},
    {label:'操作系统',prop:'os_name'},
    {label:'更新时间',prop:'update_time'},
    {label:'创建时间',prop:'create_time'},
  ]
  private filed_name_list:Array<string>=[
        "supplier", "bios_version", "out_bond_version", "host_brand", "switch_one__name",
        "switch_two__name", "switch_three__name", "switch_four__name",
        "out_band_switch__name","net_model"
    ]
  private custom_host=[
    'host_name','host_ip','out_band_address','machine_status_name','power_status_name',
    'ecs_num','host_type_ch','host_purpose_ch','host_attribution__name','host_source',
    'cpu_model','gpu_model','gpu_count','net_nic','cpu','ram','create_time'
  ]
  private backendObj:any={
    'block':'云盘',
    'local':'本地盘',
    'local,block':'云盘/本地盘'
  }
  created() {
      this.get_host_list_field()
      this.get_room_list()
      this.get_az_list()
      this.get_status_list()
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
      }
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
    let res:any = await Service.get_host_list_field({})
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
      this.get_custom_columns(this.$store.state.custom_host)


    }
  }
  private async get_custom_columns(list){
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
    this.new_prop_list = this.custom_host.filter((item:any)=>this.filed_name_list.includes(item.prop)).map((item:any)=>item.prop);
    if(this.new_prop_list.length>0){
      this.get_host_filter_item();
    }
    this.custom_host.map((item:any)=>{
      if(['host_name','out_band_address','host_ip','cpu','ram','ecs_num','create_time','gpu_count'].includes(item.prop)){
        item = Object.assign(item,{},{sortable:'custom'})
        if(item.prop==='ecs_num'){
          item = Object.assign(item,{},{className:'physical',width:'140px'})
        }
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
        item = Object.assign(item,{},{column_key:'host_attribution_id',list:this.host_belongs})
      }
      if(item.prop==='host_source'){
        item = Object.assign(item,{},{column_key:'host_source',list:this.host_source})
      }
      if(item.prop==='power_status_name'){
        item = Object.assign(item,{},{column_key:'power_status',list:this.power_list})
      }
      if(item.prop==='machine_status_name'){
        item = Object.assign(item,{},{column_key:'machine_status',list:this.machine_list})
      }
      if(item.prop==='net_nic'){
        item = Object.assign(item,{},{width:'180px'})
      }
      if(this.filed_name_list.includes(item.prop)){
        item = Object.assign(item,{},{column_key:item.prop,list:[]})
      }
      return item;
    })
    let ids:Array<string> = this.custom_host.map((item:any)=>item.prop);
    if(ids.includes('ecs_num_expand')){
      return;
    }
    let num = ids.indexOf('ecs_num')
    if(num>-1){
      let obj:any={
        type:'expand',label:'',prop:'ecs_num_expand'
      }
      this.custom_host.splice(num+1,0,obj)
    }
  }
  private fn_search(data:any={}){
    this.search_data = {...data};
    this.page_info.current = 1;
    this.judgeColumns()
    this.get_physical_list();
    
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
  @Watch("$store.state.pod_id")
  private watch_pod(nv){
    if(!nv){
      return;
    }
    this.refresh()
  }
  private async get_physical_list(){
    const {
      room,
      host_name,
      vm_id,
      out_band_address,
      host_ip,
      host_id,
      gpu_model,
      host_rack,
      create_time,
      cpu,
      nic,
    }=this.search_data;
    let res:any=await Service.get_host_list({
      pod_id:this.$store.state.pod_id,
      machine_room_name:room,
      host_name,
      vm_id,
      out_band_address,
      host_ip,
      host_id,
      gpu_model,
      host_rack,
      cpu,
      nic,
      start_time:create_time && create_time[0] ? moment(create_time[0]).format('YYYY-MM-DD HH:mm:ss') : undefined,
      end_time:create_time && create_time[1] ? moment(create_time[1]).format('YYYY-MM-DD HH:mm:ss') : undefined,
      page_index:this.page_info.current,
      page_size:this.page_info.size,
      sort_cpu:this.search_data.sort_cpu,
      sort_ram:this.search_data.sort_ram,
      sort_create_time:this.search_data.sort_create_time,
      sort_gpu_count:this.search_data.sort_gpu_count,
      sort_ecs_num:this.search_data.sort_ecs_num,
      sort_host_name:this.search_data.sort_host_name,
      sort_out_band_address:this.search_data.sort_out_band_address,
      sort_host_ip:this.search_data.sort_host_ip,
      ...this.filter_info,
      
    })
    if(res.code==="Success"){
      this.list = res.data.host_list;
      this.list.map(item=>{
        item.ecs_detail = [];
        return item;
      })
      this.page_info.total = res.data.page_info.count || 0;

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
  private async get_host_filter_item(){
    let res:any = await Service.get_host_filter_item({
      filed_names:this.new_prop_list
    })
    if(res.code==='Success'){
      let ids:Array<string> = this.custom_host.map((item:any)=>item.prop);
      for(let i in res.data){
        let num  = ids.indexOf(i);
        let item = this.custom_host[num];
        let list:any=[]
        res.data[i].map(inn=>{
          list.push({text:inn,value:inn})
        })
        let obj:any=Object.assign(item,{},list)
        this.custom_host.splice(num,1,obj);
      }
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
  private FnToDetail(id) {
    this.detail_id = id;
    this.detail_visible = true;
  }
  private closeDetail() {
    this.detail_visible = false;
  }
  // 获取网段
  private FnGetNet(ip) {
    let data = ip.split('.')
    return [data[0], data[1], data[2], '0'].join('.')
  }
  // private goEcs(id){
  //   this.$router.push({
  //     path:'/instance',
  //     query:{
  //       host_id:id
  //     }
  //   })
  // }
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
      nic
    }=this.search_data
    let obj = {
        pod_id:this.$store.state.pod_id,
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
  private async get_az_list(){
    let res:any=await EcsService.get_region_az_list({})
    if(res.code==="Success"){
      res.data.forEach(item=>{
        item.region_list.forEach(inn=>{
          // this.search_option.az_id.list=[...this.search_option.az_id.list,...trans(inn.az_list,'az_name','az_id','label','type')]
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
      for(let i in res.data.power_status){
        this.power_list.push({text:res.data.power_status[i],value:i})
      }
      for(let i in res.data.machine_status){
        this.machine_list.push({text:res.data.machine_status[i],value:i})
      }
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
    this.search_data.sort_create_time =undefined
    this.search_data.sort_gpu_count=undefined
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
  //校验列表项是否存在此项
  private judgeColumns(){
    let keys = Object.keys(this.filter_data)
    let temp = [...this.new_prop_list,'power_status','machine_status','host_attribution_id','host_purpose','host_type','host_source']
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
    this.filter_data = {...this.filter_data,...obj};
    this.judgeColumns()
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
  private async FnExpand(row,expandedRows){
    //上一次与这一次的差别，如果上一次多，则这一次为关闭，如果上一次少，则这一次为增加,如果相等，则为上一次关闭一个，然后再打开一个
    let expandedRowIds = expandedRows.map(item=>item.host_id);
    if(expandedRowIds.includes(row.host_id) && row.ecs_list.length>0){
      if(expandedRows.length>=this.expand_rows.length){/**todo,待优化 */
        this.loading=true;
      }
      let res:any = await EcsListService.get_instance_list({
        ecs_ids:row.ecs_list.map(item=>item.ecs_id)
      })
      if(res.code==='Success'){
        this.list.map(item=>{
          if(item.host_id===row.host_id){
            this.$set(item,'ecs_detail',res.data.ecs_list)
          }
        })
        this.loading=false        
      } 
      this.expand_rows = expandedRows
    }
  }
  //todo,根据状态限制操作，获取所有可用区
  private handle(label,value){
    if(this.multi_rows.length===0 && !['upload','business_test'].includes(value)){
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
    if(['upload','resource','update_attribute','business_test'].includes(value)){
      if(value==='business_test'){
        if(this.list.length===0){
          this.$message.warning('当前无宿主机可进行业务测试!')
          return;
        }
        this.az_info={
          az_id:this.list[0].az_id,
          az_name:this.list[0].az_name,
        }
      }
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
      if(!vm_flag && ['shutdown_host'].includes(val)){
        this.error_msg[val]=getHostStatus(val).msg2
      }else{
        this.error_msg[val]=getHostStatus(val).msg
      }
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
          this.$message.warning(this.error_msg[label])
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
  private setList(list,prop){
    this.custom_host.map((item:any)=>{
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
.disk{
  display: flex;
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}
.circel-border {
  display: inline-block;
  width: 30px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #888;
  border-radius: 30px;
}
</style>
<style lang="scss">
  td.physical.el-table__cell{
      border-right: none;
  }
</style>
