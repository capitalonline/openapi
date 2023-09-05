<template>
  <div>
    <action-block :search_option="search_option" @fn-search="search"></action-block>
    <el-table
      :data="list"
      border
      class="event-table"
    >
      <el-table-column prop="operation_type" label="操作类型">
        <template slot-scope="scope">
              <span v-for="item in operation_type">
                <span v-if="item.type === scope.row.operation_type">
                  {{ item.label }}
                </span>
              </span>
        </template>
      </el-table-column>
      <el-table-column prop="cloud_type" label="操作对象类型">
        <template slot-scope="scope">
              <span v-for="item in cloud_type">
                <span v-if="item.type === scope.row.cloud_type">
                  {{ item.label }}
                </span>
              </span>
        </template>
      </el-table-column>
      <el-table-column prop="cloud_name" label="对象名称"></el-table-column>
      <el-table-column prop="cloud_id" label="对象ID"></el-table-column>
      <el-table-column prop="content" label="操作内容"></el-table-column>
      <el-table-column prop="status" label="操作结果">
        <template #default="scope">
              <span :class="scope.row.status">
                <span v-if="scope.row.status === 'failed'">失败</span>
                <span v-if="scope.row.status === 'success' || scope.row.status === 'finish'">成功</span>
              </span>
        </template>
      </el-table-column>
      <el-table-column prop="response" label="失败原因">
        <template #default="scope">
          <span v-if="scope.row.response">{{scope.row.response}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="os_id" label="操作对象列表/内容">-->
<!--        <template #default="scope">-->
<!--        <el-popover-->
<!--          placement="bottom"-->
<!--          width="400"-->
<!--          trigger="click">-->
<!--          <el-table :data="clickData">-->
<!--            <el-table-column width="150" property="date" label="对象名称"></el-table-column>-->
<!--            <el-table-column width="150" property="name" label="对象ID"></el-table-column>-->
<!--            <el-table-column width="100" property="address" label="操作内容"></el-table-column>-->
<!--          </el-table>-->
<!--          <el-button slot="reference" type="text">{{'共'+ scope.row.num + '条'}}</el-button>-->
<!--        </el-popover>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="create_time" label="操作时间"></el-table-column>
      <el-table-column prop="op_user" label="操作人"></el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page_info.page_index"
      :page-sizes="page_info.page_sizes"
      :page-size="page_info.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page_info.total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ActionBlock from "../../components/search/actionBlock.vue";
import Service from "../../https/log/list";
import moment from "moment";
import EcsService from "@/https/instance/create";
import {trans} from "@/utils/transIndex";

@Component({
  components: {
    ActionBlock,
  }
})
export default class LogList extends Vue{
  private operation_type:any = [
    {type:'create',label:'创建'},
    {type:'change',label:'变更'},
    {type:'delete',label:'删除'}
  ]
  private cloud_type:any = [
    {type:'host',label:'宿主机'},
    {type:'ecs',label:'云主机'},
    {type:'image',label:'镜像'},
    {type:'disk',label:'云盘'},
    {type:'troubleshoot',label:'故障处理任务'},
  ]
  private search_option:any={
    operation_type: {placeholder: "请选择操作类型", list:this.operation_type},
    cloud_type: {placeholder: "请选择操作对象", list: this.cloud_type},
    az_id: {placeholder: "请选择可用区", list:[]},
    cloud_id:{placeholder:'请输入操作对象ID'},
    op_user:{placeholder:'请输入操作人'},
    create_time:{
      placeholder:['开始时间','结束时间'],
      type:'daterange',
      width:'360',
      clearable:true,
      dis_day:1,
      defaultTime:[]
    }
  }
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  };
  private list:Array<any>=[]
  private search_data:any={};
  private current:number = 1

  created(){
    this.getLogList()
    this.get_az_list()
  }
  private async get_az_list(){
    this.search_option.az_id.list=[]
    let res:any=await EcsService.get_region_az_list({})
    if(res.code==="Success"){
      res.data.forEach(item=>{
        item.region_list.forEach(inn=>{
          this.search_option.az_id.list=[...this.search_option.az_id.list,...trans(inn.az_list,'az_name','az_id','label','type')]
        })
      })
    }
  }
  //handleSizeChange
  private handleSizeChange(val){
    this.page_info.page_size = val;
    this.getLogList()
  }
  private handleCurrentChange(cur){
    this.page_info.page_index = cur
    this.getLogList();
  }
  private search(data:any={}){
    this.search_data = {
      operation_type:data.operation_type,
      cloud_type:data.cloud_type,
      cloud_id:data.cloud_id,
      op_user:data.op_user,
      az_id:data.az_id,
      create_time_start:
        data.create_time && data.create_time[0]
          ? moment(data.create_time[0]).local().format("YYYY-MM-DDTHH:mm:ss[Z]")
          : undefined,
      create_time_end:
        data.create_time && data.create_time[1]
          ? moment(data.create_time[1]).local().format("YYYY-MM-DDTHH:mm:ss[Z]")
          : undefined
    }
    this.current = 1;
    this.getLogList()
  }
  private async getLogList(){
    let res:any = await Service.get_log_list({
      page_index: this.page_info.page_index,
      page_size: this.page_info.page_size,
      ...this.search_data
    })
    if(res.code === 'Success'){
      this.list = res.data.operation_log_list
      this.page_info.total = res.data.page_info.count;
    } else {
      this.$message.error(res.message)
    }
  }
}
</script>

<style scoped>

</style>
