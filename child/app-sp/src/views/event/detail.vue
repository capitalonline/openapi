<template>
  <div>
    <back-header :title="event_name" back_url="/event"></back-header>

    <!-- <div class="title">
      <span @click="back">{{" &lt; 返回"}}</span>
      <span>{{event_name}}</span>
    </div> -->
    <div class="content">
      <!-- <action-block :search_option="search" @fn-search="fn_search"></action-block> -->
      <div class="event-content">
        <div class="event-search">
          <el-input v-model="cloud_id" placeholder="请输入资源ID或资源名称查询" clearable></el-input>
          <el-button type="primary" @click="getTaskList">搜索</el-button>
        </div>
        <div class="event-detail">
          <div>任务总数:{{task_num}}</div>
          <div class="destroy">已完成任务数:{{finish_num}}</div>
          <div>完成率：{{finished_percent}}</div>
          <div>成功任务数:{{success_num}}</div>
          <div class="error">失败任务数:{{fail_num}}</div>
          <div class="nonExecution">不执行:{{ none_exec_num }}</div>
        </div>
      </div>
      
      <el-table 
        :data="task_list" 
        border 
        class="event-table" 
        v-loading = "loading"
        @sort-change="FnSortChange"
        @filter-change="filterAttribute"
      >
        <el-table-column prop="task_id" label="任务ID">
          <template slot-scope="scope">
            <span>{{ scope.row.task_id ? scope.row.task_id : '-' }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="event_id" label="事件ID"></el-table-column> -->
        <el-table-column prop="customer_id" label="客户ID" :filter-multiple="false" column-key="customer_id" :filters="customer_id_list"></el-table-column>
        <el-table-column prop="customer_name" label="客户名称" :filter-multiple="false" column-key="customer_name" :filters="customer_name_list">
          <template slot-scope="scope">
            <span>{{ scope.row.customer_name ? scope.row.customer_name : '-' }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="cloud_id" label="操作资源ID"></el-table-column> -->
        <!-- <el-table-column prop="az__name" label="可用区"></el-table-column> -->
        <el-table-column prop="resource_name" label="资源名称">
          <template slot-scope="scope">
            <el-button v-if="scope.row.resource_name != ''" type="text" @click="toPhysical">{{ scope.row.resource_name }}</el-button>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="cloud_id" label="资源ID"></el-table-column>
        <el-table-column prop="" label="资源配置">
          <template slot-scope="scope">
            <div v-if="scope.row.resource_name.length > 0" class="resource_name">
              <el-popover
                title=""
                placement="top-start"
                width="200"
                trigger="hover"
                :content="getResourceConfig(scope.row)">
                <span slot="reference" class="isButton">{{ scope.row.spec_family_name }}</span>
              </el-popover>
            </div>
            <!--   -->
            <div v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="task_type" label="任务名称"></el-table-column>
        <el-table-column prop="task_state" label="任务状态" :filter-multiple="false" column-key="status" :filters="status_list">
          <template slot-scope="scope">
            <div class="taskStatus">
              <div class="tip-icon status-init" v-if="scope.row.status==='init'"></div>
              <div class="tip-icon status-doing" v-else-if="scope.row.status==='doing'"></div>
              <div class="tip-icon status-success" v-else-if="scope.row.status==='success'"></div>
              <div class="tip-icon status-failed" v-else-if="scope.row.status==='failed'"></div>
              <div class="tip-icon status-failed" v-else></div>
              <span>{{scope.row.task_state}}</span>
            </div>
            
          </template>
        </el-table-column>
        <el-table-column prop="detail" label="执行结果">
            <template slot-scope="scope">
              <span v-if="scope.row.detail">{{scope.row.detail}}</span>
              <span v-else>--</span>
            </template>
        </el-table-column>
         <el-table-column prop="error_type" label="失败类型" :filter-multiple="false" column-key="error_type" :filters="fail_type_list">
          <template slot-scope="scope">
            <span>{{scope.row.error_type ? scope.row.error_type : '-'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="失败原因">
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row.detail)" v-if="scope.row.status==='failed'">查看</el-button>
            <span v-else>-</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="create_time" label="创建时间" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.create_time ? moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="完成时间" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.end_time ? moment(scope.row.end_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
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
    <div class="err-record">
      <el-dialog
        title="错误记录"
        :visible.sync="visible"
        width="40%">
          <div class="err_record">{{err_record}}</div>
      </el-dialog>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue ,Watch} from 'vue-property-decorator';
import ActionBlock from "../../components/search/actionBlock.vue"
import service from '../../https/event/detail';
import EventService from '../../https/event/list'
import backHeader from '../../components/backHeader.vue';
import moment from 'moment'
@Component({
  components:{
    ActionBlock,
    backHeader
  }
})
export default class Detail extends Vue {
  $router;
  $route;
  $message
    private stateList = [
      {
        type:'',
        label:'全部'
      },
      {
        type:'doing',
        label:'执行中'
      },
      {
        type:'success',
        label:'成功'
      },
      {
        type:'failed',
        label:'失败'
      },
    ]
    private search:any={
      // state:{list:this.stateList}
    }
    private task_num:number = 0;
    private finish_num:number = 0;
    private finished_percent:string = '0.00%';
    private fail_num:number = 0;
    private success_num:number = 0;
    private none_exec_num:number = 0;
    private err = 'err'
    private loading = false
    private visible = false
    private err_record:string="";
    private moment =moment;
    private event_name:string = ""
    private task_list:any=[]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any = {}
    private status_list=[]
    private fail_type_list=[];
    private sort_prop_name:string='';
    private sort_value:string='';
    private filter_obj:any={}
    private cloud_id:string="" //资源id或资源名称查询
    private customer_id_list=[];
    private customer_name_list=[];
    created() {
      this.getFilterList()
      this.getTaskList()
      this.getCurCustomer()
    }
    mounted() {
      this.event_name = this.$route.query.name
    }
    @Watch("$store.state.pod_id")
    private watch_pod(nv){
      if(!nv){
        return;
      }
      this.current = 1
      this.getTaskList()
    }
    private fn_search(data:any={}){
      this.current = 1;
      this.search_data = {...data,...this.filter_obj}
      this.getTaskList()
    }
    private async getFilterList(){
      let res:any = await EventService.get_filter_list({
        filed_names:['status','error_type']
      })
      if(res.code==='Success'){
        for(let i in res.data.status){
          this.status_list.push({text:res.data.status[i],value:i})
        }
        for(let i in res.data.error_type){
          this.fail_type_list.push({text:res.data.error_type[i],value:i})
        }
      }
    }
    private async getTaskList(){
      const {filter_obj:data}=this;
      const id = this.$route.params.id
      let params = {
        pod_id:this.$store.state.pod_id,
        status:data.status && data.status.length>0 ? data.status[0] : '',
        event_id:id,
        page_index:this.current,
        page_size:this.size,
        [this.sort_prop_name]:this.sort_value,
        error_type:data.error_type ? data.error_type[0] : undefined,
        cloud_id:this.cloud_id ? this.cloud_id : '',
      }
      let res:any = await service.get_task_list(params)
      if(res.code === "Success"){
        this.task_list = res.data?.event_list
        this.total = res.data?.page_info?.count || 0
        this.task_num = res.data?.task_num
        this.finish_num = res.data?.finish_num
        this.fail_num = res.data?.fail_num
        this.success_num = res.data?.success_num
        this.finished_percent =this.task_num ? ((this.finish_num / this.task_num)*100).toFixed(2) + '%' : '0.00%'
        this.none_exec_num = res.data?.none_exec_num
      }else{
        this.$message.error(res.msg)
      }
    }
    private handleSizeChange(size){
      this.size = size
      this.getTaskList()
    }
    private handleCurrentChange(cur){
      this.current = cur
      this.getTaskList()
    }
    private FnSortChange(obj){
      this.sort_prop_name = `sort_${obj.prop}`;
      this.sort_value = obj.order==="descending" ? '0' :obj.order==="ascending" ? '1' : undefined
      this.getTaskList()
    }
    private filterAttribute(obj:any){
      this.filter_obj = {...this.filter_obj,...obj};
      this.fn_search(this.search_data)
    }
    private view(str:string):void{
      this.err_record = str
      this.visible=true
    }
    private async reTry(id:string){
      let res:any = await service.reTry({
        task_id:id
      })
      if(res.code === "Success"){
        this.$message.success(res.msg)
        this.getTaskList()
      }else{
        this.$message.error(res.msg || '操作错误')
      }
    }
    private back(){
      this.$router.go(-1)
    }
    // 获取当前事件下用户
    private getCurCustomer() {
      let params = {
        event_id: this.$route.params.id,
      }
      service.get_customer_list(params).then(res => {
        if(res.code === "Success") {
          if(res.data.customer_list.length > 0) {
            for (let i in res.data.customer_list) {
              this.customer_id_list.push({text: res.data.customer_list[i].id, value: i})
              this.customer_name_list.push({text: res.data.customer_list[i].name, value: i})
            }
          }
          
        }
      })
    }
    private getResourceConfig(row) {
      let config = ''
      if(row.gpu_type.length > 0) {
        config = row.cpu_size + 'C | ' + row.ram_size + 'G | ' + row.gpu_type + ' | ' + row.system_disk_size + 'G ' + row.system_disk_type
      } else {
        config = row.cpu_size + 'C | ' + row.ram_size + 'G | -- | ' + row.system_disk_size + 'G ' + row.system_disk_type
      }
      return config
    }
    private toPhysical() {
      this.$router.push({
        path:'/physical',
      })
    }
}
</script>
<style lang="scss" scoped>
  .title{
    height: 50px;
    position: fixed;
    top: 51px;
    background: #fff;
    width: calc(100% - 200px);
    box-shadow: 2px 0 3px #fff;
    line-height: 50px;
    padding: 0 20px;
    left: 200px;
    z-index: 999;
    span:first-child{
      color: #455cc6;
      cursor: pointer;
      font-size: 12px;
    }
    span:last-child{
      margin-left: 20px;
      font-size: 18px;
      color: #455cc6;
      
    }
  }
  .content{
    .event-content {
      padding: 20px;
      background: #f2f2f2;
      border: 1px solid #e7e7e7;
      .event-search {
        margin-bottom: 20px;
        .el-input {
          width: 220px;
          margin-right: 20px;
        }
      }
      .event-detail{
        display: flex;
        div {
          margin-right: 20px;
          // padding-left:20px
        }
        .error{
          color: red;
        }
        .nonExecution {
          color: #455cc6
        }
      }
    }
    
    
    .err{
      color:red
    }
    .event-table{
      margin-top:30px
    }
  }
  .taskStatus {
    display: flex;
    .tip-icon {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      margin-top: 6px;
      margin-right: 5px;
    }
    .status-init {
      background-color: #455cc6;
    }
    .status-doing {
      background-color: #e6a23c;
    }
    .status-success {
      background-color: #2DA867;
    }
    .status-failed {
      background-color: #DA3B18;
    }
    .status-omit-non {
      background-color: #666
    }
  }
  
  .isButton {
    color: #455cc6;
  }
  
  
</style>
<style lang="scss">
.err-record{
  .el-dialog__body{
    border-top: 1px solid #ccc !important;
    background-color: #f5f6fa !important;
  }
}
</style>