<template>
  <div>
     <el-dialog
      :title="title"
      :visible.sync="visible_sync"
      width="760px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
        <div>
            <el-alert
                title="操作重启请检查是否有虚机运行，若有，请谨慎操作！"
                type="warning"
                center
                v-if="oper_type==='restart_host'"
                :closable="false">
            </el-alert>
            <el-alert
                :title="alert_title"
                type="warning"
                center
                v-if="!['lock','maintenance'].includes(oper_type)"
                :closable="false">
            </el-alert>
          <el-alert
            :title="oper_type === 'lock' ? '请确认将下述机器置为锁定状态，置为锁定状态后，无法在此机器上开出云主机' : '请确认将下述机器置为维护状态，置为维护状态后，机器将屏蔽告警和任务下发等功能'"
            type="warning"
            center
            v-if="['lock','maintenance'].includes(oper_type)"
            :closable="false">
          </el-alert>
            <el-table
                :data="list"
                border
                max-height="253"
            >
                <el-table-column prop="host_name" label="主机名" width="150"></el-table-column>
                <el-table-column prop="out_band_address" label="宿主机带外" v-if="['lock','maintenance'].includes(oper_type)"></el-table-column>
                <el-table-column prop="az_name" label="区域" v-if="oper_type==='finish_validate'"></el-table-column>
                <el-table-column prop="machine_status_name" label="主机状态" v-if="![...status_list,...flag_list].includes(title)"></el-table-column>
                <el-table-column prop="ecs_num" label="虚拟机数量" width="150" v-if="['lock'].includes(oper_type)"></el-table-column>
                <el-table-column prop="power_status_name" label="电源状态" v-if="!['lock','maintenance'].includes(oper_type)"></el-table-column>
                <el-table-column prop="machine_status_name" label="机器状态" v-if="['schedule','migrate_flag','cheat'].includes(oper_type)"></el-table-column>
                <el-table-column prop="host_purpose" label="主机用途" v-if="oper_type==='finish_validate'"></el-table-column>
                <el-table-column prop="host_source" label="主机来源" v-if="['finish_validate','shelves'].includes(oper_type)"></el-table-column>
                <el-table-column prop="scheduled_display" label="允许调度" v-if="['schedule'].includes(oper_type)"></el-table-column>
                <el-table-column prop="migrated_display" label="允许迁移" v-if="['migrate_flag'].includes(oper_type)"></el-table-column>
                <el-table-column prop="dummy_display" label="欺骗器" v-if="['cheat'].includes(oper_type)"></el-table-column>
                <el-table-column prop="maintenance"  label="维护原因" v-if="['maintenance'].includes(oper_type)">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.maintenanceReason" type="textarea"  placeholder="请输入维护原因" maxlength="50" show-word-limit></el-input>
                    <div v-show="!scope.row.maintenanceReason" class="error_message">请输入维护原因</div>
                  </template>
               </el-table-column>
            </el-table>
          <div v-if="notSelectVmList.length > 0" class="m-top10">
            <span class="tip_message">仅支持对状态为“锁定中”且无虚拟机运行的宿主机进行“设置维护”操作，有{{notSelectVmList.length}}台宿主机不满足要求</span>
          </div>
            <el-form class="m-top20" ref="form" :model="form_data" label-width="100px" v-if="['shelves','finish_validate','schedule','migrate_flag','cheat'].includes(oper_type)" label-position="left">
              <el-form-item prop="valid" label="验证结果:" :rules="[{ required: true, message: '请选择验证结果', trigger: 'blur' }]" v-if="oper_type==='finish_validate'">
                <el-radio-group v-model="form_data.valid">
                  <el-radio :label="'1'">成功</el-radio>
                  <el-radio :label="'0'">失败</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="isFlag" :label="labelObj[oper_type]" v-if="['schedule','migrate_flag','cheat'].includes(oper_type)">
                <el-radio-group v-model="form_data.isSet">
                  <el-radio :label="'1'">{{ valueObj[oper_type][0] }}</el-radio>
                  <el-radio :label="'0'">{{ valueObj[oper_type][1] }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="reason" label="说明:" v-if="['schedule','migrate_flag','cheat'].includes(oper_type) || (oper_type==='finish_validate' && form_data.valid==='0')">
                <el-input v-model="form_data.reason" type="textarea" show-word-limit :maxlength="['schedule','migrate_flag','cheat'].includes(oper_type) ? 128 : 256" />
              </el-form-item>
              <el-form-item prop="recycleId" v-if="!['schedule','migrate_flag','cheat'].includes(oper_type)" :label="oper_type==='finish_validate' ? '通知对象：' : '回收部门：'" :rules="[{ required: true, message: `请选择${oper_type==='finish_validate' ? '通知对象' : '回收部门'}`, trigger: 'blur' }]">
                  <el-select v-model="form_data.recycleId">
                    <el-option v-for="item in recycle_list" :key="item.department_en" :label="item.department_name" :value="item.department_name"></el-option>
                  </el-select>
              </el-form-item>
            </el-form>
            <!-- <div v-if="oper_type==='finish_validate'" class="text-center m-top20">
              <span>验证结果:</span>

            </div>
            <div class="text-center m-top20" v-if="['shelves','finish_validate'].includes(oper_type)">
              <span>{{oper_type==='finish_validate' ? '通知对象：' : '回收部门：'}}</span>
              <el-select v-model="recycleId">
                <el-option v-for="item in recycle_list" :key="item.key" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </div> -->
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm" :disabled="list.length === 0">确认</el-button>
            <el-button @click="back('0')">取消</el-button>
        </span>
    </el-dialog>


    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue,PropSync } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import Service from '../../https/physical/list';
import moment from 'moment';
import {Form} from 'element-ui'
@Component({
  components:{
    ActionBlock
  }
})
export default class Operate extends Vue{
  $message;
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]}) rows!:any
  @Prop(String) title!:string;
  @Prop(String) oper_type!:string;
  private alert_title = `是否确定对以下${this.rows.length}台物理机执行${this.title}操作？`
  private status_list:Array<String> = ['开机','关机','重启'];
  private flag_list:Array<String> = ['调度标记','迁移标记','欺骗器管理'];
  private valid:number=1;
  private isFlag:number=1;
  private selectVmList =[]
  private notSelectVmList =[]
  private list:any=[]
  private labelObj={
    'schedule':'是否允许调度',
    'migrate_flag':'是否允许迁移',
    'cheat':'欺骗器',
  }
  private op_typ_list={
    'schedule':'set_host_scheduled',
    'migrate_flag':'set_host_migrated',
    'cheat':'set_host_dummy',
  }
  private op_typ_req={
    'schedule':'scheduled',
    'migrate_flag':'migrated',
    'cheat':'dummy',
  }
  private valueObj={
    'schedule':['是','否'],
    'migrate_flag':['是','否'],
    'cheat':['有','无'],
  }
  private recycle_list=[]
  private form_data={
    valid:'',
    recycleId:'',
    reason:'',
    isSet:this.oper_type==='cheat' ? '0' : '1',
  }
  private operate_info={
    'start_up_host':'host_operate',
    'shutdown_host':'host_operate',
    'restart_host':'host_operate',
    'online_maintenance':'host_maintenance',
    'offline_maintenance':'host_maintenance',
    'finish':'finish_maintenance',
    'shelves':'shelves',
    'disperse':'disperse',
    'finish_validate':'finish_validate',
    'schedule':'set_flag',
    'migrate_flag':'set_flag',
    'cheat':'set_flag',
    'under_sync':'update_ecs_info',
    'data_clear': 'crash_clear',
    'down_recover': 'crash_recover',
    'lock':'set_lock',
    'unlock':'set_unlock',
    'maintenance':'set_maintenance'
  }
  private created() {
      ['shelves','finish_validate'].includes(this.oper_type) && this.get_host_recycle_department()

    if(this.oper_type === 'maintenance'){
      this.rows.forEach(row => {
        if (row.machine_status === 'lock' && row.ecs_list.length === 0 ){
          this.selectVmList.push(row)
        } else {
          this.notSelectVmList.push(row)
        }
      })
      this.list = this.selectVmList.map(item => {
        return {...item, maintenanceReason: ''};
      });
    }else {
      this.list = []
      this.list = [...this.list,...this.rows]
    }
  }
  private async get_host_recycle_department(){
    let res:any = await Service.get_host_recycle_department({})
    if(res.code==="Success"){
      this.recycle_list = res.data
    }
  }
  private async confirm(){
    if(['shelves','finish_validate'].includes(this.oper_type)){
      let flag:boolean=true
      let form = this.$refs.form as Form;
      form.validate((valid)=>{
        if(!valid){
          flag = false
        }
      })
      if(!flag){
        return false
      }
    }
    if (this.oper_type === 'maintenance') {
      let flagReason = this.list.some(item => !item.maintenanceReason);
      if (flagReason) {
        return false
      }
    }
    const maintenance_detail = this.list.map(item=>{return {host_id:item.host_id,reason:item.maintenanceReason}})
    const lock_detail = this.list.map(item=>{return {host_id:item.host_id,reason:item.lockReason}})
    let req=this.status_list.includes(this.title) ? {
      op_type:this.oper_type,
      host_ids:this.rows.map(item=>item.host_id)
    }:['schedule','migrate_flag','cheat'].includes(this.oper_type) ? {
      host_ids:this.rows.map(item=>item.host_id),
      [this.op_typ_req[this.oper_type]]:Number(this.form_data.isSet),
      description:this.form_data.reason,
      op_type:this.op_typ_list[this.oper_type]
    } : ['online_maintenance','offline_maintenance'].includes(this.oper_type) ? {
      maintenance_type:this.oper_type,
      host_ids:this.rows.map(item=>item.host_id)
    }:this.oper_type==="finish_validate" ? {
      host_ids:this.rows.map(item=>item.host_id),
      status:this.form_data.valid==='1' ? 'READY' : 'INIT_ERROR',
      noticer:this.form_data.recycleId,
      reason:this.form_data.valid==='0' ?this.form_data.reason : undefined,
    } : this.oper_type==="shelves" ? {
      host_ids:this.rows.map(item=>item.host_id),
      department_name:this.form_data.recycleId
    } : this.oper_type==="under_sync" ? {
      pod_id: this.$store.state.pod_id,
      host_ecs: {}
    } : this.oper_type==="maintenance" ? {
        maintenance_detail:maintenance_detail,
        host_ids:this.list.map(item=>item.host_id)
      }:this.oper_type==="lock" ? {
      lock_detail:lock_detail,
      host_ids:this.list.map(item=>item.host_id)
      }: {host_ids:this.rows.map(item=>item.host_id)}

    // 底层同步接口数据组装
    if(this.oper_type==="under_sync") {
      for(let i of this.rows){
        req.host_ecs[i.host_id] = []
        if(i.ecs_list.length > 0) {
          i.ecs_list.map(item => {
            req.host_ecs[i.host_id].push(item.ecs_id)
          })
        }
      }
    }
    let res:any=await Service[this.operate_info[this.oper_type]]({
        ...req
    })

    if(res.code==="Success"){
      if(this.oper_type==="finish_validate" || this.oper_type==="disperse" || this.oper_type==="under_sync"){
        this.$message.success(res.message)
        this.back("1")
      }else if(this.oper_type==='data_clear' || this.oper_type==='down_recover') {
        if(res.data.fail_host_list.length>0) {
          this.$message.warning(res.message + '。' + res.data.error_msg)
          this.back("0");
          return;
        } else {
          this.$message.success(res.message)
          this.back("1")
        }
      } else{
        if(res.data.fail_host_list.length>0){
          if(this.oper_type === 'maintenance'){
            let message = "";
            for (let key in res.data.fail_msg_group_by_host) {
              message += res.data.fail_msg_group_by_host[key] + "\n";
            }
            this.$message.error(message);
            this.back("0");
          }else {
            this.$message.warning(res.message)
            this.back("0");
            return;
          }
        }else{
          this.$message.success(res.message)
          this.back("1")
        }
      }
    }else{
      this.back("0")
    }
  }
  @Emit("close")
  private back(val){
      this.visible_sync=false
  }

}
</script>
<style lang="scss">


</style>
