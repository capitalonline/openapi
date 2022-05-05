<template>
  <div>
     <el-dialog
      :title="title"
      :visible.sync="visible_sync"
      width="780px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
        <div>
            <el-alert
                :title="alert_title"
                type="warning"
                center
                :closable="false">
            </el-alert>
            <el-table
                :data="rows"
                border
                max-height="253"
            >
                <el-table-column prop="host_name" label="主机名" width="150"></el-table-column>
                <el-table-column prop="az_name" label="区域" v-if="oper_type==='finish_validate'"></el-table-column>
                <el-table-column prop="machine_status_name" label="主机状态" v-if="!status_list.includes(title)"></el-table-column>
                <el-table-column prop="power_status_name" label="电源状态"></el-table-column>
                <el-table-column prop="host_purpose" label="主机用途" v-if="oper_type==='finish_validate'"></el-table-column>
                <el-table-column prop="host_source" label="主机来源" v-if="['finish_validate','shelves'].includes(oper_type)"></el-table-column>
            </el-table>
            <el-form class="m-top20" ref="form" :model="form_data" label-width="100px" v-if="['shelves','finish_validate'].includes(oper_type)" label-position="left">
              <el-form-item prop="valid" label="验证结果:" :rules="[{ required: true, message: '请选择验证结果', trigger: 'blur' }]" v-if="oper_type==='finish_validate'">
                <el-radio-group v-model="form_data.valid">
                  <el-radio :label="'1'">成功</el-radio>
                  <el-radio :label="'0'">失败</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="reason" label="说明:" v-if="oper_type==='finish_validate' && form_data.valid==='0'">
                <el-input v-model="form_data.reason" type="textarea" :maxlength="256" />
              </el-form-item>
              <el-form-item prop="recycleId" :label="oper_type==='finish_validate' ? '通知对象：' : '回收部门：'" :rules="[{ required: true, message: `请选择${oper_type==='finish_validate' ? '通知对象' : '回收部门'}`, trigger: 'blur' }]">
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
            <el-button type="primary" @click="confirm">确认</el-button>
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
  private valid:number=1;
  private recycle_list=[]
  private form_data={
    valid:'',
    recycleId:'',
    reason:'',
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
    'finish_validate':'finish_validate'
  }
  private created() {
      ['shelves','finish_validate'].includes(this.oper_type) && this.get_host_recycle_department()
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
    let req=this.status_list.includes(this.title) ? {
      op_type:this.oper_type,
      host_ids:this.rows.map(item=>item.host_id)
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
    } :{host_ids:this.rows.map(item=>item.host_id)}

    let res:any=await Service[this.operate_info[this.oper_type]]({
        ...req
    })
    
    if(res.code==="Success"){
      if(this.oper_type==="finish_validate"){
        this.$message.success(res.message)
        this.back("1")
      }else{
        if(res.data.fail_host_list.length>0){
          this.$message.warning(res.message)
          this.back("0");
          return;
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
