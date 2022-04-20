<template>
  <div>
    <back-header :title="event_name" back_url="/event"></back-header>

    <!-- <div class="title">
      <span @click="back">{{" &lt; 返回"}}</span>
      <span>{{event_name}}</span>
    </div> -->
    <div class="content">
      <action-block :search_option="search" @fn-search="fn_search"></action-block>
      <div class="event-detail">
        <div>任务总数:{{task_num}}</div>
        <div>已完成任务数:{{finish_num}}</div>
        <div>完成率：{{finished_percent}}</div>
        <div>成功任务数:{{success_num}}</div>
        <div class="error">失败任务数:{{fail_num}}</div>
      </div>
      <el-table :data="task_list" border class="event-table" v-loading = "loading">
        <el-table-column prop="task_id" label="任务ID"></el-table-column>
        <el-table-column prop="event_id" label="事件ID"></el-table-column>
        <el-table-column prop="cloud_id" label="操作资源ID"></el-table-column>
        <el-table-column prop="task_type" label="任务名称"></el-table-column>
        <el-table-column prop="task_state" label="任务状态">
        <!-- <el-table-column prop="task_state" label="任务状态" :filter-multiple="false" column-key="task_state" :filters="status_list"> -->
          <template slot-scope="scope">
            <span :class="[scope.row.status === 'failed' ? 'err' : '']">{{scope.row.task_state}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="error_type" label="失败类型"></el-table-column>
        <!-- <el-table-column prop="fail_type" label="失败类型" :filter-multiple="false" column-key="fail_type" :filters="fail_type_list"></el-table-column> -->
        <el-table-column label="失败原因">
          <template slot-scope="scope">
            <el-button type="text" @click="view(scope.row.detail)" v-if="scope.row.status==='failed'">查看</el-button>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
        <!-- <el-table-column prop="create_time" label="创建时间" sortable="custom"> -->
          <template slot-scope="scope">
            <span>{{scope.row.create_time ? moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
        <!-- <el-table-column prop="update_time" label="更新时间" sortable="custom"> -->
          <template slot-scope="scope">
            <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="完成时间">
        <!-- <el-table-column prop="end_time" label="完成时间" sortable="custom"> -->
          <template slot-scope="scope">
            <span>{{scope.row.end_time ? moment(scope.row.end_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="reTry(scope.row.task_id)">重试</el-button>
          </template>
        </el-table-column> -->
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
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from "../../components/search/actionBlock.vue"
import service from '../../https/event/detail'
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
      state:{list:this.stateList}
    }
    private task_num:number = 0;
    private finish_num:number = 0;
    private finished_percent:string = '0.00%';
    private fail_num:number = 0;
    private success_num:number = 0;
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
    private status_list=[
      {text:'成功',value:'success'},
      {text:'失败',value:'failed'},
      {text:'部分失败',value:'part_fail'},
    ]
    private fail_type_list=[
      {text:'计算',value:'success'},
      {text:'存储',value:'failed'},
      {text:'镜像',value:'part_fail'},
      {text:'调度',value:'dd'},
    ]
    created() {
      this.fn_search()
    }
    mounted() {
      this.event_name = this.$route.query.name
    }
    private fn_search(data:any={}){
    console.log("####",data)
    this.current = 1;
    this.search_data = data
    this.getTaskList()
  }
    private async getTaskList(){
      const {search_data:data}=this
      const id = this.$route.params.id
      let res:any = await service.get_task_list({
        status:data.state || '',
        event_id:id,
        page_index:this.current,
        page_size:this.size,
      })
      if(res.code === "Success"){
        this.task_list = res.data?.event_list
        this.total = res.data?.page_info?.count || 0
        this.task_num = res.data?.task_num
        this.finish_num = res.data?.finish_num
        this.fail_num = res.data?.fail_num
        this.success_num = res.data?.success_num
        this.finished_percent =this.task_num ? ((this.finish_num / this.task_num)*100).toFixed(2) + '%' : '0.00%'
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
    .event-detail{
      display: flex;
      margin-top: -46px;
      div {
        margin-right: 20px;
        padding-left:20px
      }
      .error{
        color: red;
      }
      
    }
    .err{
      color:red
    }
    .event-table{
      margin-top:30px
    }
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