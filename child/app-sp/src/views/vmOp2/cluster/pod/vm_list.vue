<template>
  <div>
      <action-block :search_option="search_con" @fn-search="FnSearch" :type="true"></action-block>
<!--      <el-input prefix-icon="el-icon-search"></el-input>-->
      <div class="icon m-bottom10">
        <el-tooltip content="自定义列表项" placement="bottom" effect="light">
          <el-button type="text" @click="FnCustom"><i class="el-icon-s-tools" ></i></el-button>
        </el-tooltip>
        <el-tooltip content="刷新" placement="bottom" effect="light">
          <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
        </el-tooltip>
        <el-tooltip content="导出" placement="bottom" effect="light">
          <el-button type="text" @click="FnExport" v-loading="loading">
            <svg-icon icon="export" class="export"></svg-icon>
          </el-button>
        </el-tooltip>
<!--        <el-tooltip content="导出" placement="bottom" effect="light">-->
<!--          <el-button type="text" ><svg-icon icon="export" class="export"></svg-icon></el-button>-->
<!--        </el-tooltip>-->
      </div>
    <el-table
      :data="list"
      border
      ref="table"
      @row-click="FnOperRow"
      @row-contextmenu="FnRightClick"
      :row-class-name="rowStyle"
      @selection-change="handleSelectionChange"
      @sort-change="FnSortChange"
      @filter-change="handleFilterChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        v-for="(item) in custom_host"
        :filter-multiple="item.column_key ? item.multiple : null"
        :key="item.prop"
        :prop="item.prop"
        :column-key="item.column_key ? item.column_key : null"
        :filters="item.column_key ? item.list : null"
        :sortable="item.sortable ? item.sortable : null"
        :width="item.width ? item.width : null"
        :type="item.type"
        :label="item.label"
        :show-overflow-tooltip='item.overflow'
      >
        <template #default="scope" v-if="item.prop==='eip_info'">
          <span>{{ scope.row.eip_info[scope.row.pub_net] ? scope.row.eip_info[scope.row.pub_net].eip_ip : '-'}}</span>
        </template>
        <template #default="scope" v-else-if="item.prop==='status_display'">
          <div :class="scope.row.status">{{ scope.row.status_display }}</div>
          <div class="warning_message" v-if="scope.row.no_charge_shutdown_ecs && scope.row.status==='shutdown'">关机不计费</div>
        </template>
        <template #default="scope" v-else-if="item.prop==='private_net'">
          <div v-for="net in  scope.row.private_net.split(';')" :key="net">
          <span>
            {{scope.row.eip_info[net] ?  net : '-' }}
<!--            （vlan {{ scope.row.eip_info[net].vlan_id }}）-->
          </span>
          </div>
        </template>
        <template #default="scope" v-else-if="item.prop==='pub_net'">
          <span>{{scope.row.pub_net ? scope.row.pub_net : '-'}}</span>
        </template>
        <template #default="scope" v-else-if="item.prop==='product_source'">
          <span v-for="item in product_list">
            <span v-if="item.key === scope.row.product_source">
              {{item.value}}
            </span>
          </span>
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
    <custom-list-item
      :visible.sync="show_custom"
      :all_item="all_item"
      :all_column_item="all_column_item"
      @fn-custom="get_custom_columns"
      :type="'pod_vm'"
    ></custom-list-item>
    <template v-if="record_visible">
      <Record
        :visible="record_visible"
        :record_id="record_id"
        @close="closeRecord"
      />
    </template>
    <template v-if="detail_visible">
      <Detail
        :visible="detail_visible"
        :detail_id="detail_id"
        @close-detail="closeDetail"
      />
    </template>
    <template v-if="common_visible">
      <add-common
        :visible.sync="common_visible"
        :ecs_info="ecs_info"
      />
    </template>
    <template v-if="net_visible">
      <net-set
        :visible.sync="net_visible"
        :ecs_list="multiple_selection"
      />
    </template>
    <operate
      :title="operate_title"
      :visible.sync="show_operate_dialog"
      :oper_type="default_operate_type"
      :multiple_selection="multiple_selection"
      :customer_id="customer_id"
      :az_id="az_id"
      :is_gpu="is_gpu"
      :multiple_selection_id="multiple_selection_id"
      @close="close">
    </operate>
    <right-click :multi_rows="multiple_selection" :menus="menus" :name=" multiple_selection.length>0 ? multiple_selection[0].ecs_name: ''" :error_msg="error_msg"  @fn-click="infoClick"></right-click>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index.vue';
import SearchFrom from "@/components/search/searchFrom.vue";
import CustomListItem from '@/views/physical/customListItem.vue';
import {deal_list} from "@/utils/transIndex";
import Service from "@/https/vmOp2/cluster/pod/instance";
import {rightClick} from "@/utils/vmOp2/rightClick";
import {hideMenu} from "@/utils/vmOp2/hideMenu";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import Record from "@/views/instance/record.vue"
import Detail from "@/views/instance/detail.vue"
import AddCommon from '@/views/instance/addCommonMirror.vue'
import netSet from '@/views/instance/netSet.vue'
import Operate from "@/components/vmOp2/cluster/pod/instance/operate.vue";
import {Table} from "element-ui";
import getInsStatus from "@/utils/getStatusInfo";
import actionBlock from "@/components/search/actionBlock.vue";
import moment from "moment";
import InstanceService from "@/https/instance/list";
import storage from "@/store/storage";
import EcsService from "@/https/instance/list";
@Component({
  components: {
    Operate,
    SearchFrom,
    SvgIcon,
    CustomListItem,
    RightClick,
    Record,
    Detail,
    AddCommon,
    netSet,
    actionBlock
  }
})

export default class VmList extends Vue{
  private list=[]
  private all_column_item=[];
  private multiple_selection:any=[];
  private search_data:any={}
  private sort_prop_name = '';
  private sort_order = undefined;
  private ecs_status_list:any=[];
  private search_reqData = {};
  private search_billing_method = "all";
  private search_op_source = "";
  // 产品线来源
  private search_product_source='';
  private search_ecs_goods_name = [];
  private search_status=[]
  private instance_list: Array<Object> = [];
  private customer_id: string = "";
  private az_id: string = "";
  private is_gpu: number = 0;
  private origin_disk_size: number = 0;
  private support_gpu_driver: string = "";
  private spec_family_id: string = "";
  private gpu_card_operate:string=''
  private os_type = "";
  private billing_method: string = "0";
  private multiple_selection_id: Array<string> = [];
  private operate_auth = [];
  private show_operate_dialog: boolean = false;
  private operate_title: string = "";
  private default_operate_type: string = "";
  private shutdown_ecs_type: string = "shutdown_ecs";
  private restart_ecs_type: string = "restart_ecs";
  private record_visible: boolean = false;
  private record_id: string = "";
  private detail_visible: boolean = false;
  private detail_id: string = "";
  private net_visible:boolean=false;
  // 产品来源
  private product_source_list:any= []
  // 服务账号ID
  private product_server_id:string=''
  private search_card_status_type:string=''
  private search_product_status_type:string=''
  private billing_method_relation = {
    "": "不计费",
    0: "按需计费",
    1: "包年包月"
  };
  private billing_method_list = [];
  private ecs_goods_name_list = [];
  private timer = null;
  private os_info = {};
  private ecs_info = {};
  private common_visible:boolean=false
  private disk_billing_info = {};
  private total_price = "";
  private ecs_list_price = {};
  private loading = false;
  private select_tag =[]
  private isComponentDestroying:boolean = false
  private ecs_id=""
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private gpu_status_list:any=[
    {text:'正常',value:'0'},
    {text:'卸载',value:'1'},
    {text:'关闭',value:'2'},
    {text:'非GPU无显卡',value: '3'}
  ]
  private product_list:any=[
    {key:"", value: "云主机"},
    {key: "gcw", value: "云桌面"},
    {key: "nas", value: "文件存储转发"},
    {key: "eks", value: "容器"},
    {key: "slb", value: "负载均衡"},
    {key: "paas", value: "数据库"},
    {key: "bm", value: "裸金属"}
  ]
  private search_con = {
    ecs_id: { placeholder: "请输入云服务器ID" },
    ecs_name: { placeholder: "请输入云服务器名称" },
    customer_id: { placeholder: "请输入客户ID" },
    customer_name: { placeholder: "请输入客户名称" },
    os_info: { placeholder: "请输入操作系统ID/名称"},
    private_net: { placeholder: "请输入私网IP" },
    public_net: { placeholder: "请输入公网IP" },
    host_id: { placeholder: "请输入物理机ID"},
    host_name: { placeholder: "请输入物理机名称", },
    host_ip: { placeholder: "请输入物理机管理IP"},
    out_band_address: { placeholder: "请输入物理机带外IP"},
    create_time: {
      placeholder: ["开始时间", "结束时间"],
      type: "daterange",
      width: "360",
      clearable: true,
      dis_day: 1,
      defaultTime: []
    },
  };
  private all_item:Array<any>=[]
  private custom_host=[]
  private show_custom:boolean=false;
  private switch_power:any= [
    {label:'开机',value:'start_up_ecs',disabled:false},
    {label:'关机',value:'shutdown_ecs',disabled:false},
    {label:'重启',value:'restart_ecs',disabled:false},
  ]
  private menus= [
    {label: '详情',value: 'instance_detail',single:true,disabled:false},
    {label:'开关机',value:'start_or_shutdown', list:this.switch_power,disabled:false},
    {label:'操作记录',value:'instance_record',single:true,disabled:false},
    {label: '监控',value: 'monitor',single:true,disabled:false},
    {label: '远程连接',value: 'vnc',single:true,disabled:false},
    {label: '制作公共镜像',value: 'add_common_mirror',single:true,disabled:false},
    {label: '显卡管理',value: 'gpu_manage',single:true,disabled:false},
    {label: '逻辑删除',value: 'delete_ecs',disabled:false},
    {label: '销毁',value: 'destroy_ecs',disabled:false},
    {label: '恢复',value: 'restore',disabled:false},
    {label: '更换实例规格',value: 'update_spec',disabled:false},
    {label: '更换操作系统',value: 'update_system',disabled:false},
    {label: '重置密码',value: 'reset_pwd',disabled:false},
    {label: '网络设置',value: 'net_set',disabled:false},
  ]
  private error_msg={
    vnc:'已选虚拟机状态需为运行中',
    add_common_mirror:'仅内部账号且状态为已关机的实例支持操作',
    gpu_manage:'仅支持对GPU型实例支持显卡管理',
    net_set:'实例需为运行中'
  }
  @Watch('multiple_selection',{immediate:true,deep:true})
  private watch_multi(){
    this.handleMenus()
  }
  private handleMenus() {
    // 处理菜单项
    for (const item of this.menus) {
      if (!item.list) {
        switch(item.value) {
          case 'gpu_manage':
            item.disabled = !this.multiple_selection.every(gpu => gpu.is_gpu);
            break;
          case 'vnc':
            //item.disabled = !this.operate_auth.includes(item.value) || this.multiple_selection.every(vnc => vnc.status !== 'running');
            item.disabled = this.multiple_selection.every(vnc => vnc.status !== 'running');
            break;
          case 'add_common_mirror':
            item.disabled = this.multiple_selection.every(vnc => vnc.status !== 'shutdown') || this.multiple_selection.every(vnc => vnc.customer_type !== '内部') || !this.operate_auth.includes(item.value);
            break;
          case 'net_set':
            item.disabled = this.multiple_selection.every(vnc => vnc.status !== 'running');
            break;
          case 'restore':
            item.disabled = true
            break;
          default:
            item.disabled = false
        }
      } else {
        // 处理子菜单项
        for (const inn of item.list) {
          inn.disabled = false
        }
      }
    }
    console.log('this.menus',this.menus)
  }

  created(){
    this.FnGetCateGoryList()
    this.get_source_type()
    this.FnGetStatus()
    this.get_field()
    this.operate_auth = this.$store.state.auth_info['instance_list'];
  }
  private FnSearch(data: any = {}) {
    this.FnClearTimer();
    this.search_reqData = {
      pod_id:this.$store.state.pod_id,
      ecs_id: data.ecs_id,
      ecs_name: data.ecs_name,
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      os_info: data.os_info,
      private_net: data.private_net,
      public_net: data.public_net,
      host_id: data.host_id,
      host_name: data.host_name,
      host_ip: data.host_ip,
      out_band_address: data.out_band_address,
      start_time:
        data.create_time && data.create_time[0]
          ? moment(data.create_time[0]).format("YYYY-MM-DD")
          : undefined,
      end_time:
        data.create_time && data.create_time[1]
          ? moment(data.create_time[1]).format("YYYY-MM-DD")
          : undefined
    };
    this.page_info.page_index = 1;
    this.get_pod_ecs_list();
  }
  private infoClick(item) {
    const {label, value}=item
    if(!item.list && !item.disabled){
      if(value === 'instance_record'){
        this.record_id = this.ecs_id
        this.record_visible = true;
      }
      if(value === 'instance_detail'){
        this.detail_id = this.ecs_id;
        this.detail_visible = true;
      }
      if(value === 'add_common_mirror'){
        this.ecs_info = this.multiple_selection[0]
        this.common_visible = true;
      }
      if(value === 'vnc'){
        this.FnToVnc(this.ecs_id)
      }
      if(value === 'gpu_manage'){
        this.operateGpu()
      }
      if(value === 'monitor'){
        this.$router.push({path: `/vm_monitor/${this.multiple_selection[0].ecs_id}`});
      }
      if(['start_up_ecs','shutdown_ecs','restart_ecs','delete_ecs','restore','destroy_ecs','update_spec','update_system','reset_pwd','net_set'].includes(value)) {
        const operate_info = getInsStatus.getInsOperateAuth(value);
        if (
          ["reset_pwd", "update_spec", "update_system", "open_bill", "net_set"].indexOf(
            value
          ) >= 0
        ) {
          if (!this.FnJudegCustomerAz(operate_info, value)) {
            return;
          }
          if (item.value === "open_bill") {
            this.FnGetEcsPrice();
            hideMenu()
          }
          if (item.value === 'net_set') {
            this.net_visible=true;
            hideMenu()
            return;
          }
        } else {
          if (!this.FnJudgeCustomer(operate_info, value)) {
            return;
          }
        }
        this.operate_title = operate_info.label;
        this.show_operate_dialog = true;
        this.default_operate_type = value;
        this.FnClearTimer();
      }
      hideMenu()
    }
  }
  private async operateGpu() {
    let {ecs_id} = this.multiple_selection[0]
    const resData: any = await Service.update_gpu_status({ecs_id})
    if (resData.code === 'Success') {
      this.FnGetGraphics(ecs_id)
    }
  }
  private async FnGetGraphics(ecs_id) {
    let reqData = {
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      is_op:true,
      az_id:this.$store.state.az_id,
      pod_id:this.$store.state.pod_id,
      [this.sort_prop_name]: this.sort_order,
    }
    reqData["ecs_id"] = ecs_id
    const resData: any = await InstanceService.get_instance_list(reqData);
    if (resData.code == 'Success') {
      this.multiple_selection=resData.data.ecs_list;
      this.show_operate_dialog = true;
      this.operate_title = '显卡管理';
      this.default_operate_type = 'gpu_manage';
      this.FnClearTimer();
    }
  }
  private async FnToVnc(id) {
    let resData: any = await Service.get_vnc_url({
      ecs_id: id
    });
    if (resData.code === "Success") {
      let vnc_info = resData.data.vnc_info.split("/vnc_lite.html");
      let url = `${vnc_info[0]}/vnc_lite.html?op-token=${this.$store.state.token}?path=/?id=${id}`;
      window.open(url);
    }
  }
  private close(val){
    this.get_pod_ecs_list()
    this.show_operate_dialog=false;
    this.default_operate_type='';
    this.operate_title=""
    this.multiple_selection=[]
    const table =this.$refs.table as Table
    table.clearSelection()
  }
  private FnJudgeCustomer(operate_info, type): boolean {
    this.customer_id = "";
    let flag = true;
    this.multiple_selection_id = [];
    for (let index = 0; index < this.multiple_selection.length; index++) {
      let item: any = this.multiple_selection[index];
      this.multiple_selection_id.push(item.ecs_id);
      if (index === 0) {
        this.customer_id = item.customer_id;
        this.is_gpu = Number(item.is_gpu);
      }
      if (item.customer_id !== this.customer_id) {
        this.$message.warning("只允许对同一客户的实例进行批量操作！");
        flag = false;
        break;
      }
      if (["recover_ecs"].indexOf(type) >= 0 && item.is_gpu != this.is_gpu) {
        this.$message.warning(
          `只允许对同一类型实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (operate_info.auth.indexOf(item.status) < 0) {
        this.$message.warning(operate_info.msg);
        flag = false;
        break;
      }
    }
    return flag;
  }
  private FnJudegCustomerAz(operate_info, type): boolean {
    this.customer_id = "";
    this.az_id = "";
    this.billing_method = "0";
    this.origin_disk_size = 0;
    this.support_gpu_driver = "";
    this.spec_family_id = "";
    this.os_type = "";
    let flag = true;
    this.multiple_selection_id = [];

    for (let index = 0; index < this.multiple_selection.length; index++) {
      let item: any = this.multiple_selection[index];
      this.multiple_selection_id.push(item.ecs_id);
      if (index === 0) {
        this.customer_id = item.customer_id;
        this.az_id = item.az_id;
        this.billing_method = item.billing_method;
        this.is_gpu = Number(item.is_gpu);
        this.support_gpu_driver = item.support_gpu_driver;
        this.spec_family_id = item.spec_family_id;
        this.os_type = item.os_type;
      }
      if (item.customer_id !== this.customer_id || item.az_id !== this.az_id) {
        this.$message.warning(
          "只允许对同一客户的同一可用区下实例进行批量操作！"
        );
        flag = false;
        break;
      }
      if (
        ["update_spec", "update_system"].indexOf(type) >= 0 &&
        (item.is_gpu != this.is_gpu ||
          item.billing_method !== this.billing_method)
      ) {
        this.$message.warning(
          `只允许对同一类型同一计费方式实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (type === "open_bill" && item.is_charge) {
        this.$message.warning("只允许对未开启计费的实例开启计费！");
        flag = false;
        break;
      }
      if (
        type === "update_system" &&
        item.support_gpu_driver != this.support_gpu_driver
      ) {
        this.$message.warning(
          `只允许对同一驱动类型实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (
        type === "update_system" &&
        item.spec_family_id != this.spec_family_id
      ) {
        this.$message.warning(
          `只允许对同一规格族实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (type === "update_system" && item.os_type != this.os_type) {
        this.$message.warning(`Windows和linux系统不可以互换重装！`);
        flag = false;
        break;
      }
      if (type === "update_spec" && this.is_gpu) {
        this.$message.warning(`不允许对GPU实例${operate_info.label}操作！`);
        flag = false;
        break;
      }
      if(['update_spec','update_system'].includes(type) && item.no_charge_shutdown_ecs){
        this.$message.warning(`不允许对关机不计费的实例${operate_info.label}操作！`);
        flag = false;
        break;
      }
      if (operate_info.auth.indexOf(item.status) < 0) {
        this.$message.warning(operate_info.msg);
        flag = false;
        break;
      }
      this.origin_disk_size = Math.max(
        this.origin_disk_size,
        item.system_disk_size
      );
    }
    return flag;
  }
  private async FnGetEcsPrice() {
    this.ecs_list_price = {};
    const resData = await Service.each_resource_price({
      customer_id: this.customer_id,
      az_id: this.az_id,
      billing_method: "0",
      resource_ids: this.multiple_selection_id,
      resource_type: "ecs"
    });
    if (resData.code === "Success") {
      for (let item in resData.data.total_price) {
        this.$set(
          this.ecs_list_price,
          item,
          resData.data.price_symbol +
          resData.data.total_price[item].toFixed(2) +
          "/" +
          resData.data.price_unit
        );
      }
    }
  }
  private FnSetTimer() {
    if (this.timer) {
      this.FnClearTimer();
    }
    this.timer = setTimeout(() => {
      this.get_pod_ecs_list(false);
    }, 1000 * 5);
  }
  private FnClearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
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
    this.get_pod_ecs_list()
  }
  private async FnExport() {
    this.loading = true;
    let spec_family_ids = this.search_ecs_goods_name.map(item => item.toString());
    let obj = Object.assign(
      {
        billing_method:
          this.search_billing_method == ""
            ? "no"
            : this.search_billing_method,
        op_source: this.search_op_source,
        spec_family_ids:spec_family_ids,
        // 产品来源
        product_source:this.search_product_source,
      },
      this.search_reqData
    )
    const resData = await EcsService.export_list(
      obj
    );
    if (resData) {
      this.loading = false;
      let blob = new Blob([resData], {
        type: "application/octet-stream"
      });
      let reader = new FileReader();
      let title ='云服务器-'+storage.get('pod_name') +'-'+ moment(new Date()).format('YYYYMMDD')
      reader.readAsText(blob, "utf-8");
      reader.onload = () => {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = title + ".xlsx";
        link.click();
        window.URL.revokeObjectURL(link.href);
      };
    }
  }
  private async get_source_type(){
    let res:any = await Service.get_product_source()
    if(res.code==="Success"){
      res.data.map(item=>{
        this.product_source_list.push({text:item.value,value:item.value})
      })

    }
  }
  // 获取云服务器类型信息
  private async FnGetCateGoryList() {
    const resData = await Service.get_family_data();
    if (resData.code === "Success") {
      for (let item of resData.data.spec_family_list) {
          this.ecs_goods_name_list.push({
            value: item.spec_family_id,
            text: item.name
          });
      }
    }
  }
  private async get_field(){
     let res:any = await Service.get_pod_ecs_field()
     if(res.code==="Success"){
    let key_list=['field_name','show_name'];
    let label_list=['prop','label'];
    let list:Array<any>=[]
    this.all_item = res.data.map(item=>{
      list=[...list,...item.filed];
      return item;
    })
    this.all_column_item = deal_list(list,label_list,key_list);
    this.get_custom_columns(this.$store.state.pod.vm_host)
    this.get_custom_columns(this.$store.state.pod.vm_host)

     }
  }
  private get_custom_columns(list) {
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
    this.custom_host.map((item:any)=>{
     if(!['gpu_card_status','status_display','ecs_goods_name','product_source'].includes(item.prop)) {
       item = Object.assign(item, {}, {sortable: 'custom'})
     }
      if(['ecs_id','ecs_name','host_name','create_time','update_time','gpu_card_status'].includes(item.prop)){
        item = Object.assign(item,{},{width:'150px',overflow:true})
      }
      if(['gpu_card_status','eip_info','private_net','customer_id','customer_name','status_display','ecs_goods_name','pub_net','product_source'].includes(item.prop)){
        item = Object.assign(item,{},{width:'120px',overflow:true})
      }
      if(item.prop==='status_display'){
        item = Object.assign(item,{},{column_key:'status',list:this.ecs_status_list,multiple:true})
      }
      if(item.prop==='gpu_card_status'){
        item = Object.assign(item,{},{column_key:'card_status_type',list:this.gpu_status_list,multiple:false})
      }
      if(item.prop==='ecs_goods_name'){
        item = Object.assign(item,{},{column_key:'ecs_goods_name',list:this.ecs_goods_name_list,multiple:true})
      }
      if(item.prop==='product_source'){
        item = Object.assign(item,{},{column_key:'product_source',list:this.product_source_list,multiple:false})
      }
      return item;
    })
  }
  private async FnGetStatus() {
    const resData = await Service.get_vm_status_list();
    if (resData.code === "Success") {
      this.ecs_status_list = [];
      for (let key in resData.data) {
        if(key!=='destroy_ecs'){
          this.ecs_status_list.push({
            text: resData.data[key],
            value: key
          });
        }
      }
      this.get_pod_ecs_list()
    }
  }
  // 筛选实例来源
  private handleFilterChange(val) {
    this.FnClearTimer();
    setTimeout(()=>{
      if(val.status){
        this.search_status = val.status;
      }
      if(val.card_status_type){
        this.search_card_status_type = val.card_status_type[0];
      }
      if (val.ecs_goods_name) {
        this.search_ecs_goods_name = val.ecs_goods_name;
      }
      if(val.product_source){
        this.search_product_source = val.product_source[0]
      }
      this.get_pod_ecs_list();
    },500)

  }
  private FnCustom() {
    this.show_custom = true;
  }
  private async get_pod_ecs_list(loading: boolean = true){
    if(!this.$store.state.az_id){
      return
    }
    this.multiple_selection_id = [];
    if (!loading) {
      this.$store.commit("SET_LOADING", false);
      this.multiple_selection_id = this.multiple_selection.map((row: any) => {
        return row.ecs_id;
      });
    }
    let reqData = {
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      is_op:true,
      az_id:this.$store.state.az_id,
      //pod_id:this.$route.params.id,
      [this.sort_prop_name]: this.sort_order,
      ...this.search_reqData
    }
    if(this.$store.state.node === 'pod'){
      reqData['pod_id'] = this.$route.params.id
    }
    if(this.$store.state.node === 'cluster'){
      reqData['cluster_id'] = this.$route.params.id
    }
    if(this.$store.state.node === 'host'){
      reqData['host_id'] = this.$route.params.id
    }
    if (this.search_status.length > 0) {
      reqData["status"] = this.search_status.join(',')
    }
    if (this.search_card_status_type) {
      reqData["card_status_type"] = this.search_card_status_type;
    }
    if (this.search_ecs_goods_name.length > 0) {
      reqData["spec_family_ids"] = this.search_ecs_goods_name.join(',')
    }
    // 产品来源
    if(this.search_product_source){
      reqData["product_source"] = this.search_product_source;
    }
    let res:any = await Service.get_pod_ecs_list(reqData)
    if(res.code === 'Success'){
      this.list = res.data.result
      // var rows = [];
      // if (this.multiple_selection_id.length > 0) {
      //   rows = res.data.result.filter(row =>
      //     this.multiple_selection_id.includes(row.ecs_id)
      //   );
      // }
      // if (rows && rows.length > 0) {
      //   this.$nextTick(() => {
      //     rows.forEach(row => {
      //       (this.$refs.table as any).toggleRowSelection(row);
      //     });
      //   });
      // }
      this.page_info.total = res.data.page_info.count
    }
    // if (!this.isComponentDestroying) { // 检查销毁标记
    //   this.FnSetTimer(); // 仅当组件未销毁时才重新设置定时器
    // }
  }
  //右键弹出操作
  FnRightClick(row,column,event){
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.multiple_selection.some(item => item.ecs_id === row.ecs_id);
    if (!isSelected) {
      (this.$refs.table as any).toggleRowSelection(row)
    }
    this.ecs_id = row.ecs_id
    rightClick(row,column,event)
  }
  //改变点击行得选中状态
  private FnOperRow(row){
    (this.$refs.table as any).toggleRowSelection(row)
  }
  //改变选中行的背景颜色
  rowStyle({row}) {
    const isSelected = this.multiple_selection.some(item => item.ecs_id === row.ecs_id);
    if (isSelected) {
      return 'rowStyle'
    }
  }
  private closeRecord() {
    this.record_visible = false;
  }
  private closeDetail() {
    this.detail_visible = false;
  }
  private handleSelectionChange(data){
    this.multiple_selection = data
  }
  private FnSortChange(val){
    this.FnClearTimer();
    let relation = {};
    this.all_item.forEach(item => {
      item.filed.forEach(inn => {
        relation[inn.field_name] = `sort_${inn.field_name}`;
      });
    });
    this.sort_prop_name = relation[val.prop];
    this.sort_order = val.order === "ascending" ? '0' : val.order === "descending" ? '1' : undefined;
    this.get_pod_ecs_list()
  }
  private handleSizeChange(size){
    this.FnClearTimer();
    this.page_info.size = size
    this.get_pod_ecs_list()
  }
  private handleCurrentChange(cur){
    this.FnClearTimer();
    this.page_info.current = cur
    this.get_pod_ecs_list()
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
