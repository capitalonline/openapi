<template>
  <div>
    <div class="search-box" >
      <el-input prefix-icon="el-icon-search"></el-input>
      <div class="icon m-bottom10">
        <el-tooltip content="自定义列表项" placement="bottom" effect="light">
          <el-button type="text" @click="FnCustom"><i class="el-icon-s-tools" ></i></el-button>
        </el-tooltip>
        <el-tooltip content="刷新" placement="bottom" effect="light">
          <el-button type="text" ><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
        </el-tooltip>
        <el-tooltip content="导出" placement="bottom" effect="light">
          <el-button type="text" ><svg-icon icon="export" class="export"></svg-icon></el-button>
        </el-tooltip>
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
      >
        <template #default="scope" v-if="item.prop==='cpu'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.cpu"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='memory'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.memory"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='gpu'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.gpu"></el-progress>
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
import SvgIcon from '@/components/svgIcon/index';
import SearchFrom from "@/components/search/searchFrom.vue";
import CustomListItem from '@/views/physical/customListItem.vue';
import {deal_list} from "@/utils/transIndex";
@Component({
  components: {
    SearchFrom,
    SvgIcon,
    CustomListItem
  }
})

export default class VmList extends Vue{
  private list=[{customer_id:'1111',cpu:25 }]
  private all_column_item=[];
  private multi_rows:any=[];
  private search_data:any={}
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private all_item:Array<any>=[{
    "name": "基本信息",
    "filed": [
      {
        "field_name": "customer_id",
        "show_name": "虚拟机ID"
      },
      {
        "field_name": "nas_id_name",
        "show_name": "虚拟机名称"
      },
      {
        "field_name": "nas_type",
        "show_name": "状态"
      },
      {
        "field_name": "region_az_name",
        "show_name": "规格族"
      },
      {
        "field_name": "protocol_type",
        "show_name": "vCPU"
      },
      {
        "field_name": "vpc",
        "show_name": "内存"
      },
      {
        "field_name": "cpu_type",
        "show_name": "GPU"
      },
      {
        "field_name": "gpu_type",
        "show_name": "显卡状态"
      },
      {
        "field_name": "gpu_num",
        "show_name": "主机"
      },
      {
        "field_name": "vm",
        "show_name": "私网IP"
      },
      {
        "field_name": "cpu",
        "show_name": "公网IP"
      },
      {
        "field_name": "memory",
        "show_name": "网关IP"
      },
      {
        "field_name": "gpu",
        "show_name": "客户ID"
      },
      {
        "field_name": "name",
        "show_name": "客户名称"
      },
      {
        "field_name": "create",
        "show_name": "创建时间"
      },
      {
        "field_name": "update",
        "show_name": "更新时间"
      },
      {
        "field_name": "source",
        "show_name": "产品来源"
      },
    ]
  }
  ]
  private custom_host=[]
  private show_custom:boolean=false;
  created(){
    this.get_field()
  }
  private async get_field(){
    // let res:any = await Service.get_field({})
    // if(res.code==="Success"){
    let key_list=['field_name','show_name'];
    let label_list=['prop','label'];
    // let list:Array<any>=[]
    // res.data.map(item=>{
    //   list=[...list,...item.filed];
    //   return item;
    // })
    let list= [
      {
        "field_name": "customer_id",
        "show_name": "虚拟机ID"
      },
      {
        "field_name": "nas_id_name",
        "show_name": "虚拟机名称"
      },
      {
        "field_name": "nas_type",
        "show_name": "状态"
      },
      {
        "field_name": "region_az_name",
        "show_name": "规格族"
      },
      {
        "field_name": "protocol_type",
        "show_name": "vCPU"
      },
      {
        "field_name": "vpc",
        "show_name": "内存"
      },
      {
        "field_name": "cpu_type",
        "show_name": "GPU"
      },
      {
        "field_name": "gpu_type",
        "show_name": "显卡状态"
      },
      {
        "field_name": "gpu_num",
        "show_name": "主机"
      },
      {
        "field_name": "vm",
        "show_name": "私网IP"
      },
      {
        "field_name": "cpu",
        "show_name": "公网IP"
      },
      {
        "field_name": "memory",
        "show_name": "网关IP"
      },
      {
        "field_name": "gpu",
        "show_name": "客户ID"
      },
      {
        "field_name": "name",
        "show_name": "客户名称"
      },
      {
        "field_name": "create",
        "show_name": "创建时间"
      },
      {
        "field_name": "update",
        "show_name": "更新时间"
      },
      {
        "field_name": "source",
        "show_name": "产品来源"
      },
    ]
    //this.all_item = res.data;
    this.all_column_item = deal_list(list,label_list,key_list);
    console.log('this.all',this.all_column_item)
    this.get_custom_columns(this.$store.state.pod.host_list)


    // }
  }
  private get_custom_columns(list) {
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
    console.log('this.custom_host',this.custom_host)
    this.custom_host.map((item:any)=>{
      item = Object.assign(item,{},{sortable:'custom',width:'120px'})
      return item;
    })
  }
  private FnCustom() {
    this.show_custom = true;
  }
  private get_cluster_list(){

  }
  private handleSelectionChange(data){
    this.multi_rows = data
  }
  private FnSortChange(obj){
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_cluster_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_cluster_list()
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
