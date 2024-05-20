<template>
  <div>
    <div class="search-box" >
      <el-input prefix-icon="el-icon-search"></el-input>
      <div class="icon m-bottom10">
        <el-tooltip content="自定义列表项" placement="bottom" effect="light">
          <el-button type="text" @click="FnCustom"><i class="el-icon-s-tools" ></i></el-button>
        </el-tooltip>
        <el-tooltip content="刷新" placement="bottom" effect="light">
          <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
        </el-tooltip>
<!--        <el-tooltip content="导出" placement="bottom" effect="light">-->
<!--          <el-button type="text" ><svg-icon icon="export" class="export"></svg-icon></el-button>-->
<!--        </el-tooltip>-->
      </div>
    </div>
    <el-table
      :data="list"
      border
      ref="table"
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
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index.vue';
import SearchFrom from "@/components/search/searchFrom.vue";
import CustomListItem from '@/views/physical/customListItem.vue';
import {deal_list} from "@/utils/transIndex";
import Service from "@/https/vmOp2/cluster/pod";
@Component({
  components: {
    SearchFrom,
    SvgIcon,
    CustomListItem
  }
})

export default class VmList extends Vue{
  private list=[]
  private all_column_item=[];
  private multi_rows:any=[];
  private search_data:any={}
  private sort_prop_name = '';
  private sort_order = undefined;
  private ecs_status_list:any=[];
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
  private all_item:Array<any>=[]
  private custom_host=[]
  private show_custom:boolean=false;
  private search_status=[]
  private search_card_status_type:string=''
  private search_product_source='';
  private search_ecs_goods_name = [];
  private ecs_goods_name_list = [];
  private product_source_list:any= []
  created(){
    this.FnGetCateGoryList()
    this.get_source_type()
    this.FnGetStatus()
    this.get_field()
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
        if(key!=='destroy'){
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
  private async get_pod_ecs_list(){
    if(!this.$store.state.az_id){
      return
    }
    let reqData = {
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      is_op:true,
      az_id:this.$store.state.az_id,
      //pod_id:this.$route.params.id,
      [this.sort_prop_name]: this.sort_order
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
      this.page_info.total = res.data.page_info.count
    }
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
    this.get_pod_ecs_list()
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_pod_ecs_list()
  }
  private handleCurrentChange(cur){
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
