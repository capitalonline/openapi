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
            title="该功能只在特定异常故障时由运维人员操作使用。请核对如下信息，谨慎操作:"
            type="warning"
            :closable="false">
          </el-alert>
            <el-table
                :data="list"
                border
                max-height="253"
            >
                <el-table-column prop="customer_name" label="客户名称/客户ID" width="150">
                 <template slot-scope="scope">
                    <div>{{scope.row.customer_name}}</div>
                    <div>{{scope.row.customer_id}}</div>
                </template>
                </el-table-column>
                <el-table-column prop="ecs_name" label="云服务器名称/云服务器ID" width="160">
                    <template slot-scope="scope">
                        <div>{{scope.row.ecs_name}}</div>
                        <div>{{scope.row.ecs_id}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="calculation_specification" label="云服务器规格" width="200"></el-table-column>
                <el-table-column prop="status_display" label="状态"></el-table-column>
                <el-table-column prop="gpu_card_status" label="显卡状态" width="100"></el-table-column>
            </el-table>
            <el-form class="m-top20" ref="form" :model="form_data" label-width="100px"  label-position="left">
               <el-form-item prop="vm_status"  label-width="150px"  label="状态变更为：" :rules="[{ required: true, message: '请选择变更状态', trigger: 'blur' }]">
                  <el-radio-group v-model="form_data.vm_status">
                  <el-radio label="running">运行中</el-radio>
                  <el-radio label="shutdown">已关机</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
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
  @Prop(String) current_host_id!:string;

  private list:any=[]
  private form_data={
    vm_status:'running'
  }
  private created() {
      this.list = [...this.rows]
    }
  private async confirm(){
    const ecs_ids = this.list.map((item:any) => item.ecs_id)
    let req={
        host_id:this.current_host_id,
        status:this.form_data.vm_status,
        ecs_ids: ecs_ids
    }
    let res:any=await Service.update_ecs_status(req)
    if(res.code==="Success"){
      this.$message.success(res.message)
      this.back("1")
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