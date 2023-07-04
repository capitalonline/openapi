<template>
    <div>
      <div >
      <action-block :style="{'display': 'flex', 'flex-wrap': 'nowrap','overflow-x': 'auto','min-width':'1000px'}" :search_option="search" @fn-search="fn_search"></action-block>
      </div>
      <div class="prompt_message">重试：支持对失败状态的任务进行重试；忽略：支持对任务进行忽略，忽略的任务不展示</div>
      <el-table
        :data="event_list"
        ref="evenTable"
        border
        class="event-table"
        @filter-change="filterAttribute"
        @expand-change="rowClick"
      >
        <el-table-column type="expand">
          <template #default="scope">
            <div style="overflow: hidden;padding: 0 0 24px;">
              <ul>
                <li>
                  <h1>step1：<el-button type="primary" @click="getUnderlyingTasksInfo(scope.row.task_id)">检查底层任务状态</el-button></h1>
<!--                  <template v-if="step1_status">-->
<!--                    <div class="m-top10 m-bottom10"><b>主任务检查结果：</b></div>-->
<!--                    <div style="width:90%">-->
<!--                      <el-descriptions-->
<!--                        :column="2"-->
<!--                        border-->
<!--                      >-->
<!--                        <el-descriptions-item width="100" label="主任务Id">{{maintask.taskId}}</el-descriptions-item>-->
<!--                        <el-descriptions-item width="100" label="上一次执行结束时间">{{maintask.execEndTime}}</el-descriptions-item>-->
<!--                        <el-descriptions-item width="100" label="主任务执行参数"><div style="max-width: 700px;">{{JSON.stringify(maintask.globalContext)}}</div></el-descriptions-item>-->
<!--                      </el-descriptions>-->
<!--                    </div>-->

<!--                    <div class="m-top10 m-bottom10"><b>子任务检查结果：</b></div>-->
<!--                    <el-table :data="subtasks"-->
<!--                              border-->
<!--                              v-if="subtasks.length > 0"-->
<!--                              style="width:99%"-->
<!--                              class="event-table">-->
<!--                      <el-table-column prop="subtaskId" label="子任务Id"></el-table-column>-->
<!--                      <el-table-column prop="status" label="状态"></el-table-column>-->
<!--                      <el-table-column prop="errorMsg" label="失败原因"></el-table-column>-->
<!--                      <el-table-column prop="executorName" label="执行服务"></el-table-column>-->
<!--                      <el-table-column prop="subtaskName" label="子任务名称"></el-table-column>-->
<!--                      <el-table-column prop="execTime" label="执行时间"></el-table-column>-->
<!--                      <el-table-column label="执行参数">-->
<!--                        <template #default="step">-->
<!--                          {{step.row.status && step.row.status === 'failed' ? step.row.parameters : '-'}}-->
<!--                        </template>-->
<!--                      </el-table-column>-->
<!--                      <el-table-column label="回调参数">-->
<!--                        <template #default="step">-->
<!--                          {{step.row.callbackContent}}-->
<!--                        </template>-->
<!--                      </el-table-column>-->
<!--                    </el-table>-->
<!--                  </template>-->

                </li>
                <li v-if="((maintask.status == 'failed' || step2_mainTaskStatus) && step1_status) && !step2_noFaild && main_list">
                  <h1>step2：底层任务修复</h1>
                  <div class="m-top10 m-bottom10"><b>主任务：</b></div>
                  <el-table :data="maintaskList"
                            border
                            style="width:99%">
                    <el-table-column prop="taskId" width="260" label="主任务Id"></el-table-column>
                    <el-table-column prop="execEndTime" width="230" label="上一次执行结束时间"></el-table-column>
                    <el-table-column label="当前错误参数显示" :width="tableWidth_1">
                      <template #default="step">
                        <div @click="waclosed()">
                          <json-views :data="step.row.globalContext" :closed="is_closed" ></json-views>
                          <Clipboard  :content="JSON.stringify(step.row.globalContext)" v-if="step.row.globalContext"></Clipboard>
                        </div>
                      </template>
                    </el-table-column>
<!--                    <el-table-column label="预期修改" width="420">-->
<!--                      <template #default="step">-->
<!--                        <el-input type="textarea" class="eventTextarea" v-model="re_parameters" style="width: 370px;height: 150px;"></el-input>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
                  </el-table>
                  <div class="m-top10 m-bottom10"><b>子任务列表：</b></div>
                  <el-table :data="subtasks_step2"
                            border
                            v-if="subtasks_step2.length > 0"
                            style="width:99%">
                    <el-table-column width="55">
                      <template #default="step">
                        <el-checkbox v-model="step.row.isCheck" v-if="step.row.status == 'failed'"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column prop="subtaskId" label="子任务Id"></el-table-column>
                    <el-table-column prop="status" width="80" label="状态"></el-table-column>
                    <el-table-column prop="errorMsg" label="失败原因" >
                      <template slot-scope="scope">
                        <div class="text-container">
                          <div class="text-content" ref="textContent" :class="{ expanded: isExpanded[scope.$index] }">
                            <div v-if="isExpanded[scope.$index]">{{ scope.row.errorMsg }}</div>
                            <div v-else>{{ truncateText(scope.row.errorMsg, 3) }}</div>
                          </div>
                          <el-button v-if="scope.row.errorMsg " type="text" @click="toggleExpand(scope.$index)">
                            <i :class="isExpanded[scope.$index] ? 'el-icon-arrow-up': 'el-icon-arrow-down' "></i>
                          </el-button>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="executorName" label="执行服务"></el-table-column>
                    <el-table-column prop="subtaskName" label="子任务名称"></el-table-column>
                    <el-table-column prop="execTime" label="执行时间"></el-table-column>
                    <el-table-column label="回调参数" :width="tableWidth_2">
                      <template #default="step">
                        <div @click="waclosed_2()">
                        <json-views v-if="Object.keys(step.row.callbackContent).length >0"  :data="step.row.callbackContent" :closed="is_closed"></json-views>
                        <span v-else>-</span>
                        </div>
<!--                        {{step.row.callbackContent && JSON.stringify(step.row.callbackContent) !== '{}' ? JSON.stringify(step.row.callbackContent) : '-'}}-->
                      </template>
                    </el-table-column>
                    <el-table-column label="当前错误参数显示" :width="tableWidth_3">
                      <template #default="step">
                        <div @click="waclosed_3()">
                        <json-views :data="step.row.parameters" :closed="is_closed" @click="waclosed"></json-views>
                        </div>
<!--                        {{JSON.stringify(step.row.parameters)}}<br>-->
                        <Clipboard :content="JSON.stringify(step.row.parameters)" v-if="step.row.parameters"></Clipboard>
                      </template>
                    </el-table-column>
<!--                    <el-table-column label="预期修改" width="200">-->
<!--                      <template #default="step">-->
<!--                        <el-input type="textarea" class="eventTextarea" v-if="step.row.status == 'failed'" v-model="step.row.re_parameters" style="width: 170px;height: 150px;"></el-input>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
                  </el-table>
                  <el-button type="primary" class="m-top10 m-bottom10" @click="setReTasks(scope.row.task_id)" :disabled="step2_repair">底层任务修复执行</el-button>
<!--                  <span class="m-left10 step-result">{{step2_str}}</span>-->
                  <div style="width: 25%" v-if="step2_status && !step2_mainTaskStatus">
                    <el-progress :percentage="0"></el-progress>
                    <span class="step-result">{{step2_doing}}</span>
                  </div>
                  <div style="width: 25%" v-if="step2_status && step2_mainTaskStatus">
                    <el-progress :percentage="step2_progress"></el-progress>
                    <span class="step-result" v-if="step2_progress !==100">{{step2_doing}}</span><br/>
                    <span v-for="status in subtasks">
                      <span v-if="status.status == 'doing' && step2_progress !== 100 ">
                        {{ status.subtaskCnName}}</span>
                    </span>
                  </div>
                  <div class="step-result" v-if="step2_progress === 100 && step2_mainTaskStatus">执行结果：
                    <span v-if="maintask.status == 'failed'">任务失败
                      <div v-for="info in filter_info">
                      <span>{{ info.subtaskCnName }}</span><br/>
                      <span>{{info.errorMsg }}</span><br/>
                        <span class="error">底层任务修复失败，请联系相关研发处理</span>
                        </div>
                    </span>
                    <span v-else>任务成功</span>
                  </div>

                </li>
                <span v-else-if="step2_noFaild">
                  <li>
                  <h1>step2：底层任务修复</h1>
                  <span class="step-result">底层任务无需修复</span>
               </li>
                </span>
                <li v-if="step1_status && main_list ">
                  <h1>step3：修复业务层</h1>
                  <el-table :data="resources"
                            border
                            style="width:99%"
                            class="event-table">
                    <el-table-column prop="resource_id" label="资源id"></el-table-column>
                    <el-table-column prop="resource_type" label="资源类型"></el-table-column>
                    <el-table-column prop="need_repair" label="是否需要修复">
                      <template #default="step">
                        {{step.row.need_repair ? '是' : '否'}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="status_display" label="初始状态"></el-table-column>
                    <el-table-column prop="expect_status_display" label="期望状态"></el-table-column>
                    <el-table-column prop="after_status_display" label="修复后状态"></el-table-column>
<!--                    <el-table-column label="[操作]期望状态">-->
<!--                      <template #default="step">-->
<!--                        <el-select v-model="step.row.re_status" >-->
<!--                          <el-option v-for="m in step.row.re_status_list" :label="m.status_display" :value="m.status">{{m.status_display}}</el-option>-->
<!--                        </el-select>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
                  </el-table>
                  <el-button type="primary" class="m-top10 m-bottom10" @click="setTasksStatus(scope.row.task_id)" :disabled="step3_repair">修复业务层执行</el-button>
                  <div class="step-result" v-if="Object.keys(step3_str).length> 0">执行结果：
                    <div v-for="(value,key) in step3_str">
                    {{key}}:{{value}}
                    <br/>
                  </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="task_id" label="任务ID"></el-table-column>
        <el-table-column prop="task_type" label="任务名称"></el-table-column>
        <el-table-column prop="cloud_id" label="资源ID"></el-table-column>
        <el-table-column prop="customer_id" label="客户ID"></el-table-column>
        <el-table-column prop="customer_name" label="客户名称"></el-table-column>
        <el-table-column prop="az_name" label="可用区"></el-table-column>
        <el-table-column prop="task_state" label="任务状态"></el-table-column>
        <el-table-column prop="error_type" label="失败类型" :filter-multiple="false" column-key="error_type" :filters="error_type_list">
          <template slot-scope="scope">
            <span>{{scope.row.error_type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="subtask_name" label="当前执行流程"></el-table-column>
        <el-table-column prop="detail" label="失败原因">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.detail" popper-class="tooltip-width" placement="bottom" effect="light">
              <span>{{ scope.row.detail.length>20 ? `${scope.row.detail.slice(0,21)}...` : scope.row.detail }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.create_time ? moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column prop="update_time" label="更新时间">-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : '&#45;&#45;'}}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="end_time" label="完成时间">
          <template slot-scope="scope">
            <span>{{scope.row.end_time ? moment(scope.row.end_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
<!--            <el-button type="text"-->
<!--              @click="retry(scope.row.task_id,scope.row.event_id)"-->
<!--            >重试</el-button>-->
            <el-button type="text" @click="ignore(scope.row.task_id,scope.row.event_id)"
            >忽略</el-button>
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
  import EcsService from '../../https/instance/create'
  import {trans} from '../../utils/transIndex';
  import moment from 'moment';
  import Clipboard from "@/components/clipboard.vue";
  import JsonViews  from 'vue-json-views'

  @Component({
    components:{
      ActionBlock,
      Clipboard,
      JsonViews
    }
  })
  export default class List extends Vue {
    $router;
    $message;
    $store;
    private search:any = {
      // az_id:  {placeholder:'请选择可用区',list:[]},
      cloud_id:  {placeholder:'请输入资源ID',width: 120},
      task_id: {placeholder:'请输入任务ID',width: 120},
      // task_type: {placeholder:'请输入任务名称'},
      customer_id: {placeholder:'请输入客户ID',width: 118},
      // customer_name: {placeholder:'请输入客户名称'},
      time:{
        type:'datetimerange',
        placeholder:['开始时间','结束时间'],
        clearable:false,
        width:360,
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
    private tableWidth_1: string = '200'
    private tableWidth_2: string = '200'
    private tableWidth_3: string = '200'
    private event_list:any=[]
    private min_date:any = ""
    private search_data:any = {};
    private event_detail: boolean = false;
    private sort_prop_name:string='';
    private sort_value:string=''
    private error_type_list=[];
    private filter_obj={}
    private step1_status:boolean = false
    private maintask:any = {}
    private maintaskList:any = []
    private subtasks:any = []
    private subtasks_step2:any = []
    private resources:any = []
    private re_parameters:any = ''
    private step3_str:any = {}
    private step2_str:string = ''
    private step2_progress:number = 0
    private step2_status:boolean = false
    private clear = null;
    private step2_mainTaskStatus:boolean = false
    private step2_repair:boolean = false
    private step3_repair:boolean = false
    private filter_info = []
    private scrollPosition:number = 0
    private isExpanded :any = []
    private step2_noFaild:boolean = false
    private main_list:boolean = false
    private is_closed:boolean = true
    private step2_doing:string =''

    created() {
      // this.get_az_list();
      this.getFilterList()
      this.fn_search()
    }

    private waclosed(){
      this.tableWidth_1 = this.tableWidth_1 === '200' ? '450' : '200'; // 根据需要调整宽度值
    }
    private waclosed_2(){
      this.tableWidth_2 = this.tableWidth_2 === '200' ? '450' : '200'; // 根据需要调整宽度值
    }
    private waclosed_3(){
      this.tableWidth_3 = this.tableWidth_3 === '200' ? '450' : '200'; // 根据需要调整宽度值
    }

    // private async get_az_list(){
    //   //this.search.az_id.list=[]
    // let res:any=await EcsService.get_region_az_list({})
    //     if(res.code==="Success"){
    //         res.data.forEach(item=>{
    //             item.region_list.forEach(inn=>{
    //             //this.search.az_id.list=[...this.search.az_id.list,...trans(inn.az_list,'az_name','az_id','label','type')]
    //             })
    //         })
    //     }
    // }
    private async getFilterList(){
      let res:any=await service.get_filter_item({
        filed_names:['error_type']
      })
      if(res.code==='Success'){
        for(let i in res.data.error_type){
          this.error_type_list.push({text:res.data.error_type[i],value:i})
        }
      }
    }
    private fn_search(data:any={}){
      this.current = 1;
      this.search_data = {...data,...this.filter_obj}
      this.get_error_task_list()
    }
    private async get_error_task_list(loading:boolean = true) {
      if (!loading) {
        this.$store.commit('SET_LOADING', false);
      }
      const {search_data:data}=this
      const res:any = await service.get_repair_event_list({
        page_index:this.current,
        page_size:this.size,
        az_id:data.az_id || "",
        cloud_id:data.cloud_id || "",
        task_type:data.task_type || "",
        task_id:data.task_id || "",
        customer_id:data.customer_id || "",
        customer_name:data.customer_name || "",
        error_type:data.error_type ? data.error_type[0] : undefined,
        start_time:data.time ? moment(data.time[0]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD 00:00:00"),
        end_time:data.time ? moment(data.time[1]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      })
      if(res.code==="Success"){
        this.event_list = res.data?.task_list || []
        this.event_list = this.event_list.map(e => {
          return Object.assign({}, e, {isExpand: false})
        })


        this.total = res.data?.page_info?.count || 0
      }else{
          this.$message.error(res.msg || '操作错误')
        }
    }
    private handleSizeChange(size){
      this.size = size
      this.get_error_task_list()
    }
    private toggleExpand(index) {
      this.$set(this.isExpanded, index, !this.isExpanded[index]);
    }
    private truncateText(text, lines) {
      if (!text) return '';

      const linesArray = text.split('\n');
      const truncatedText = linesArray.slice(0, lines).join('\n');
      return truncatedText + (linesArray.length > lines ? '...' : '');
    }
    private calculateLines(errorMsg) {
      return errorMsg ? errorMsg.split('\r\n').length : 0;
    }
    private handleCurrentChange(cur){
      this.current = cur
      this.get_error_task_list()
    }
    private filterAttribute(obj:any){
      this.filter_obj = {...this.filter_obj,...obj};
      this.fn_search(this.search_data)
    }
    private async retry(task_id,event_id) {
      let res:any = await service.retry_task({
        task_id,
        event_id
      })
      if(res.code==='Success'){
        this.$message.success(res.message);
        this.get_error_task_list()
      }
    }
    private async ignore(task_id) {
      let res:any = await service.ignore({
        task_id,
      })
      if(res.code==='Success'){
        this.$message.success(res.message);
        this.get_error_task_list()
      }
    }
    private async getUnderlyingTasksInfo (task_id,loading:boolean = true,status:boolean = false) {
      if (!loading) {
        this.$store.commit('SET_LOADING', false);
        // this.step2_mainTaskStatus = status
      }
      let res:any = await service.getUnderlyingTasks({
        task_id
      })
      this.step1_status = true
      if(res.code==='Success'){
        if( res.data.maintask_record !== undefined && res.data.maintask_record !== null &&  Object.keys(res.data.maintask_record).length === 0){
          this.main_list = false
          this.$message.error('主任务不存在');
        } else {
          this.main_list = true
          this.maintask = res.data.maintask
          this.maintaskList = [res.data.maintask]
          this.subtasks = res.data.subtasks
          this.step2_progress = res.data.process
          this.step2_mainTaskStatus = status
          this.subtasks_step2 = res.data.subtasks.map(e => {
            return Object.assign({}, e, {
              re_parameters: '',
              isCheck: e.status === 'failed'
            })
          })
          if(!this.step2_mainTaskStatus && this.subtasks_step2.length> 0 ) {
            this.step2_noFaild = true;
            this.step2_repair = true;
            this.step3_repair = false;
            let is_doing = false;
            let is_failed = false;
            for (let subtask of this.subtasks_step2 ) {
              if ( subtask.status ==='doing' ||  subtask.status ==='wating') {
                is_doing = true;
              }
              if (this.maintask.status === 'failed' || subtask.status === 'failed'  ) {
                is_failed = true;
              }
            }
            if(is_failed){
              this.step2_noFaild = false;
              this.step3_repair = true;
              this.step2_repair = false;
            }
            if(is_doing){
              this.step2_noFaild = false;
              this.step3_repair = true;
              this.step2_repair = true;
            }
          } else {
            this.step3_repair = true;
            this.step2_repair = true;
            this.step2_noFaild = false;
            let is_doing = false;
            let is_failed = false;
            for (let subtask of this.subtasks_step2) {
              if ( subtask.status ==='doing' ||  subtask.status ==='wating' ||  subtask.status ==='retry_init'  ) {
                is_doing = true;
              }
              if (this.maintask.status === 'failed' || subtask.status === 'failed'  ) {
                is_failed = true;
              }
            }
            if(is_failed){
              this.step3_repair = true;
              this.step2_repair = false;
            }
            if(is_doing){
              this.step3_repair = true;
              this.step2_repair = true;
            }
            if(!is_failed && !is_doing){
              this.step3_repair = false;
              this.step2_repair = true;
            }
          }
        }
      }
      this.getResourceStatusInfo(task_id,loading)
      if(this.maintask.status !== 'doing'){
        if (this.clear) {
          this.FnClearTimer();
        }
      }
      if(this.step2_mainTaskStatus && this.maintask.status == 'failed'){
        this.filter_info = res.data.fail_subtasks.map(item =>{
          return {subtaskName: item.subtaskName , errorMsg:item.errorMsg}
        })
      } else if(this.step2_mainTaskStatus && this.maintask.status == 'success'){
        this.step3_repair = false;
      }
      // this.calculateLines();
    }
    // 获取任务资源类型的状态列表
    private async getResourceStatusInfo (task_id,loading:boolean = true) {
      if (!loading) {
        this.$store.commit('SET_LOADING', false);
      }
      if (!loading) {
        await Promise.all([
          service.getResourceStatus(),
          service.getTasksStatus({task_id})
        ]).then(([res, taskList]) => {
          if (res.code === 'Success' && taskList.code === 'Success') {
            if (taskList.data.resource_detail) {
              this.resources = Object.keys(taskList.data.resource_detail).map((key) => {
                const e = taskList.data.resource_detail[key];
                const list = res.data[e.resource_type];
                return Object.assign({}, e, {
                  re_status: list[0].status,
                  re_status_list: list,
                });
              });
            } else {
              this.step3_repair = true
              if(this.maintask.status === 'success' && this.step3_repair){
                this.$message.success('任务修复成功');
                this.get_error_task_list(false)
              }
            }
          }
        });
      } else {
        let res = await service.getResourceStatus();
        let taskList = await service.getTasksStatus({ task_id });

        if (res.code === 'Success' && taskList.code === 'Success') {
          if (taskList.data.resource_detail) {
            this.resources = Object.keys(taskList.data.resource_detail).map((key) => {
              const e = taskList.data.resource_detail[key];
              const list = res.data[e.resource_type];
              return Object.assign({}, e, {
                re_status: list[0].status,
                re_status_list: list,
              });
            });
            } else {
            this.step3_repair = true
          }
          }
        }
      // let res:any = await service.getResourceStatus()
      // let taskList:any = await service.getTasksStatus({
      //   task_id
      // })
      // if(res.code==='Success' && taskList.code === 'Success'){
      //   this.resources = taskList.data.resource_detail.map(e => {
      //     const list = res.data[e.resource_type]
      //     return Object.assign({}, e,{
      //       re_status: list[0].status,
      //       re_status_list: list
      //     })
      //   })
      // }
    }
    // step3的执行
    private async setTasksStatus (task_id) {
      let repairResources:any = this.resources.filter((e) => e.need_repair).map(e => {
          return {
            resource_id: e.resource_id,
            resource_type: e.resource_type,
            expect_status: e.re_status,
          }
      })
      let res:any = await service.setTasksStatus({
        task_id: task_id,
        repair_resource: repairResources
      })
      if(res.code==='Success'){
        const data = res.data.repair_list
        this.resources = this.resources.map(e => {
          return Object.assign({}, e, {
            after_status: data[e.resource_id].status,
            after_status_display: data[e.resource_id].status_display
          })
        })
        this.step3_str=res.data.repair_detail
        this.getResourceStatusInfo(task_id,false)
        this.resources.forEach((resource) => {
          if (resource.need_repair === true) {
            this.step3_repair = false;
          } else {
            this.step3_repair = true
          }
        });
        if( this.step3_repair){
          this.get_error_task_list(false)
          this.$message.success('任务修复成功');
        }
      }
    }
    // step2的执行
    private async setReTasks (task_id) {
      this.step2_doing = '任务正在修复，请耐心等待：'
      this.step2_repair = true
      this.step2_status = true
      this.$store.commit('SET_LOADING', false);
      let subtasks:any = this.subtasks_step2.filter(e => e.status === 'failed').map(e => {
        return {
          failedSubExecFlag: e.isCheck ? 1 : 0,
          subtaskId: e.subtaskId,
          parameters: e.re_parameters
        }
      })
      let res:any = await service.setReTasks({
        task_id: task_id,
        global_context: this.re_parameters !== '' ? this.re_parameters : undefined,
        subtasks: subtasks
      })
      if(res.code==='Success'){
        this.step2_str = res.message
        // this.$message.success(res.message);
        // this.step2_str = res.data.result_str
        this.FnSetTimer(task_id);
      } else {
        this.step2_repair = false
      }
    }

    private FnSetTimer(task_id) {
      if (this.clear) {
        this.FnClearTimer();
      }
      this.clear = setInterval(()=>{
        this.step2_str = ''
        this.getUnderlyingTasksInfo(task_id, false,true);
      },5000);
    }
    private FnClearTimer() {
      if (this.clear) {
        clearInterval(this.clear);
      }
    }

    private rowClick (row) {
      this.event_list.forEach(e => {
        if (row.task_id !== e.task_id) {
          (this.$refs['evenTable'] as any).toggleRowExpansion(e, false)
          // this.$refs.evenTable.toggleRowExpansion(e, false)
          e.isExpand = false
        } else {
          if (row.isExpand) {
            e.isExpand = false
          } else {
            e.isExpand = true
          }
          (this.$refs['evenTable'] as any).toggleRowExpansion(e, e.isExpand)
        }
      })
      this.clearTask()
    }
    private clearTask () {
      this.step1_status = false
      this.step2_noFaild =false
      this.maintask = {}
      this.maintaskList = []
      this.subtasks = []
      this.subtasks_step2 = []
      this.resources = []
      this.re_parameters = ''
      this.step3_str = {}
      this.step2_str = ''
      this.step2_status = false
      this.main_list = false
      this.filter_info = []
      this.step2_doing = ''
    }

  }
  </script>
  <style lang="scss">
    .step{
      display: flex; align-items: center
    }
    .step-result{
      color: forestgreen;
    }
    .eventTextarea .el-textarea__inner{
      height:150px !important;
    }

    .text-container {
      position: relative;
    }

    .text-content {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .text-content.expanded {
      -webkit-line-clamp: 99999;
    }
    .container {
      display: flex;
      flex-wrap: nowrap; /* 防止换行 */
    }


  </style>
