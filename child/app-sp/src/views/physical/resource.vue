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
                v-if="rows.length!==0"
                :title="alert_title"
                type="warning"
                center
                :closable="false">
            </el-alert>
            <el-table
                v-if="rows.length!==0"
                :data="rows"
                border
                max-height="253"
            >
                <el-table-column prop="host_name" label="主机名" width="150"></el-table-column>
                <el-table-column prop="az_name" label="节点"></el-table-column>
                <el-table-column prop="machine_status_name" label="机器状态"></el-table-column>
                <el-table-column prop="host_purpose" label="主机用途"></el-table-column>
                <el-table-column prop="host_attribution_name" label="主机归属"></el-table-column>
            </el-table>
            <div class="ecs-belong m-top20" v-if="['resource'].includes(oper_type)">
                <span class="m-right20">设置主机归属：</span>
                <el-select v-model="ecs_id" placeholder="请选择">
                    <el-option
                    v-for="item in ecs_list"
                    :key="item.host_attribution_id"
                    :label="item.name"
                    :value="item.host_attribution_id">
                    </el-option>
                </el-select>
            </div>
          <el-form class="m-top20" ref="form" :model="form_data" label-width="100px" v-else label-position="left">
            <el-form-item prop="tag" label="tag:" v-if="['service'].includes(oper_type)" :rules="[{ required: true, message: '请输入tag', trigger: 'blur' }]">
              <el-input v-model="form_data.tag" :maxlength="64"></el-input>
            </el-form-item>
            <el-form-item prop="az_id" label="节点:" v-if="rows.length===0" :rules="[{ required: true, message: '请选择节点', trigger: 'blur' }]">
              <el-select v-model="form_data.az_id" style="width: 100%">
                <el-option
                  v-for="item in az_list"
                  :key="item.az_id"
                  :value="item.az_id"
                  :label="item.az_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="serviceType" label="服务类型:" :rules="[{ required: true, message: '请选择服务类型', trigger: 'blur' }]">
              <el-radio-group v-model="form_data.serviceType">
                <el-radio :label="'cds-os-agent'">agent</el-radio>
                <el-radio :label="'monitor-instance'" disabled>monitor-instance</el-radio>
                <el-radio :label="'monitor-host'" disabled>monitor-host</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

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
import {Form} from 'element-ui'
import iService from '../../https/instance/create';

@Component({
  components:{
    ActionBlock
  }
})
export default class Resource extends Vue{
  $message;
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]}) rows!:any
  @Prop(String) title!:string;
  @Prop(String) oper_type!:string;
  private alert_title = `是否确定对以下${this.rows.length}台物理机执行${this.title}操作？`
  private ecs_list:any=[];
  private ecs_id:string="";
  private az_list:any =[]
  private form_data={
    tag:'',
    az_id:'',
    serviceType:'cds-os-agent',
  }
  created() {
    if(this.oper_type === 'resource'){
      this.get_host_attribution()
    }else {
      this.get_az_list()
    }
  }
  private async get_az_list(){
    this.az_list=[]
    let res:any=await iService.get_region_az_list({})
    if(res.code==="Success"){
      res.data.forEach(item=>{
        item.region_list.forEach(inn=>{
          this.az_list.push(...inn.az_list);
        })
      })
      this.form_data.az_id = this.az_list[0].az_id
    }
  }
  private async get_host_attribution (){
      let res:any =await Service.get_host_attribution({})
      if(res.code==="Success"){
          this.ecs_list = res.data.host_attribution_list
          this.ecs_id = this.ecs_list[0].host_attribution_id;
      }
  }
  private async confirm() {
    let res: any
    let flag:boolean=true
    if (this.oper_type === 'resource') {
      res = await Service.set_host_attribution({
        host_ids: this.rows.map(item => item.host_id),
        host_attribution_id: this.ecs_id
      });
    } else {
      let form = this.$refs.form as Form;
        form.validate((valid)=>{
          if(!valid){
            flag = false
          }
        })
      if(!flag){
        return false
      }
      const requestData = {
        az_id: this.rows.length===0 ? this.form_data.az_id : this.rows[0].az_id,
        host_ids: this.rows.map(item => item.host_id),
        server_name: this.form_data.serviceType,
        is_node_update: this.rows.length ===0 ? '1' : undefined
      }

      if (this.oper_type === 'service') {
        res = await Service.agent_update({
          ...requestData,
          server_tag: this.form_data.tag
        });
      } else {
        res = await Service.agent_rollback(requestData);
      }
    }
    if (res.code === "Success") {
      if (this.oper_type === 'resource') {
        if (res.data.fail_host_list.length > 0) {
          this.$message.warning(res.message);
          this.back("1");
        } else {
          this.$message.success(res.message);
          this.back("1");
        }
      }else {
        this.$message.success(res.message)
        this.back("1");
      }
    } else {
      this.back("0");
    }
  }

  @Emit("close")
  private back(val){
      this.visible_sync=false
  }

}
</script>
<style lang="scss">
.ecs-belong{
    text-align: center;
}

</style>
