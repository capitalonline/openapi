<template>
  <div>
    <action-block :search_option="search" @fn-search="fn_search"></action-block>
    <div class="event-detail">
      <div>事件总数：{{event_num}}</div>
      <div class="finish">已完成:{{finish_num}}</div>
      <div>完成率：{{finished_percent}}</div>
      <div>失败：{{fail_num}}</div>
      <div class="error">失败率：{{error_percent}}</div>
    </div>
    <el-table
      :data="event_list"
      border
      class="event-table"
      @sort-change="FnSortChange"
      @filter-change="filterAttribute"
    >
      <el-table-column prop="event_id" label="事件ID">
        <template slot-scope="scope">
          <span class="clickble" @click="view(scope.row.event_id,scope.row.event_name)">{{scope.row.event_id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer" label="客户名称"></el-table-column>
      <el-table-column prop="event_name" label="事件名称"></el-table-column>
      <el-table-column prop="event_state_name" label="事件状态" :filter-multiple="false" column-key="status" :filters="status_list">
        <template slot-scope="scope">
          <span :class="[scope.row.status === 'failed'|| scope.row.status === 'part_fail' ? 'err' : '']">{{scope.row.event_state_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="implementation_name" label="任务执行情况"></el-table-column>
      <el-table-column prop="op_user" label="操作用户"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" sortable="custom">
        <template slot-scope="scope">
          <span>{{scope.row.create_time ? moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="完成时间" sortable="custom">
        <template slot-scope="scope">
          <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务">
        <template slot-scope="scope">
          <el-button type="text"
            @click="view(scope.row.event_id,scope.row.event_name)"
            :disabled="!event_detail"
          >查看</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue,Watch } from 'vue-property-decorator';
import ActionBlock from "../../components/search/actionBlock.vue";
import service from '../../https/event/list';
import {trans} from '../../utils/transIndex';
import moment from 'moment';
@Component({
  components:{
    ActionBlock,
  }
})
export default class List extends Vue {
  $router;
  $message;
  $store;
  private search:any = {
    event_id:  {placeholder:'请输入事件ID'},
    event_name:  {placeholder:'请输入事件名称'},
    resource_id: {placeholder:'请输入资源ID'},
    task_id: {placeholder:'请输入任务ID'},
    customer_id: {placeholder:'请输入客户ID'},
    customer_name: {placeholder:'请输入客户名称'},
    op_user: {placeholder:'请输入操作用户'},
    time:{
      type:'datetimerange',
      placeholder:['开始时间','结束时间'],
      clearable:false,
      width:360,
      dis_day:31,
      defaultTime:[moment(new Date()).format("YYYY-MM-DD 00:00:00"),moment(new Date()).format("YYYY-MM-DD HH:mm:ss")]
    },
  };

  private event_num:number = 0;
  private finish_num:number = 0;
  private finished_percent:string = '0.00%';
  private fail_num:number = 0;
  private error_percent:string = '0.00%';
  private err:string = 'err'
  private current:number = 1
  private size:number = 20
  private total:number = 0
  private moment =moment
  private event_list:any=[]
  private min_date:any = ""
  private search_data:any = {};
  private event_detail: boolean = false;
  private sort_prop_name:string='';
  private sort_value:string=''
  private status_list=[];
  private filter_obj={}
  created() {
    this.getFilterList()
    this.event_detail = !!this.$store.state.auth_info["event_detail"]
    this.fn_search()
  }
   @Watch("$store.state.pod_id")
    private watch_pod(nv){
      if(!nv){
        return;
      }
      this.fn_search(this.search_data)
    }
  private async getFilterList(){
    let res:any=await service.get_filter_list({
      filed_names:['event_status']
    })
    if(res.code==='Success'){
      for(let i in res.data.event_status){
        this.status_list.push({text:res.data.event_status[i],value:i})
      }
    }
  }
  private fn_search(data:any={}){
    this.current = 1;
    this.search_data = {...data,...this.filter_obj}
    this.getEventList()
  }
  private async getEventList() {
    const {search_data:data}=this
    const res:any = await service.get_event_list({
      pod_id:this.$store.state.pod_id,
      page_index:this.current,
      page_size:this.size,
      event_id:data.event_id || "",
      event_name:data.event_name || "",
      resource_id:data.resource_id || "",
      [this.sort_prop_name]:this.sort_value,
      task_id:data.task_id || "",
      customer_id:data.customer_id || "",
      customer_name:data.customer_name || "",
      op_user:data.op_user || "",
      event_status:data.status ? data.status[0] : undefined,
      start_time:data.time ? moment(data.time[0]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD 00:00:00"),
      end_time:data.time ? moment(data.time[1]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    })
    if(res.code==="Success"){
      this.event_list = res.data?.event_list || []
      this.total = res.data?.page_info?.count || 0
      this.event_num = res.data?.event_num || 0
      this.finish_num = res.data?.success_num || 0
      this.fail_num = res.data?.fail_num || 0
      this.finished_percent =this.event_num ?  ((this.finish_num / this.event_num)*100).toFixed(2) + '%' : '0.00%'
      this.error_percent =this.event_num ?   ((this.fail_num / this.event_num)*100).toFixed(2) + '%' : '0.00%'
    }else{
        this.$message.error(res.msg || '操作错误')
      }
  }
  private handleSizeChange(size){
    this.size = size
    this.getEventList()
  }
  private handleCurrentChange(cur){
    this.current = cur
    this.getEventList()
  }
  private FnSortChange(obj){
    this.sort_prop_name = `sort_${obj.prop}`;
    this.sort_value = obj.order==="descending" ? '0' :obj.order==="ascending" ? '1' : undefined
    this.getEventList()
  }
  private filterAttribute(obj:any){
    this.filter_obj = {...this.filter_obj,...obj};
    this.fn_search(this.search_data)
  }
  private view(id:string,name:string) {
    this.$router.push({path:`/event/${id}`,query:{name:name ? name : '123'}})
  }

}
</script>
<style lang="scss" scoped>
  .event-id{
    color: #455cc6;
  }
  .event-detail{
    display: flex;
    margin-top: -30px;
    div {
      margin-right: 20px;
      padding-left:20px
    }
    .finish{
      color:orange
    }
    .error{
      color:red
    }
  }
  .err{
    color:red
  }
  .event-table{
    margin-top:30px
  }
</style>
