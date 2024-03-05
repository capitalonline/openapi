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
      >
        <template #default="scope" v-if="item.prop==='eip_info'">
          <span>{{ scope.row.eip_info[scope.row.pub_net] ? scope.row.eip_info[scope.row.pub_net].eip_ip : '-'}}</span>
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
import {Component, Vue} from "vue-property-decorator";
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
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private all_item:Array<any>=[]
  private custom_host=[]
  private show_custom:boolean=false;
  created(){
    this.get_field()
    this.get_pod_ecs_list()
  }
  private refresh(){
    this.get_pod_ecs_list()
  }
  private async get_field(){
     let res:any = await Service.get_pod_ecs_field()
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
    this.get_custom_columns(this.$store.state.pod.vm_host)

     }
  }
  private get_custom_columns(list) {
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
    this.custom_host.map((item:any)=>{
      item = Object.assign(item,{},{sortable:'custom'})
      if(['ecs_id','ecs_name','host_name','create_time','update_time','gpu_card_status'].includes(item.prop)){
        item = Object.assign(item,{},{width:'150px',overflow:true})
      }
      if(['gpu_card_status','eip_info','private_net','customer_id','customer_name','status_display','ecs_goods_name','pub_net','product_source'].includes(item.prop)){
        item = Object.assign(item,{},{width:'120px',overflow:true})
      }
      return item;
    })
  }
  private FnCustom() {
    this.show_custom = true;
  }
  private async get_pod_ecs_list(){
    let reqData = {
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      is_op:true,
      az_id:this.$store.state.az_id,
      pod_id:this.$route.params.id,
      [this.sort_prop_name]: this.sort_order,
    }
    let res:any = await Service.get_pod_ecs_list(reqData)
    if(res.code === 'Success'){
      this.list = res.data.ecs_list
      this.page_info.total = res.data.page.count
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
