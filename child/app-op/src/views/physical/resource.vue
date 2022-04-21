<template>
  <div>
     <el-dialog
      title="分配资源"
      :visible.sync="visible_sync"
      width="760px"
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
                max-height="300"
            >
                <el-table-column prop="host_name" label="主机名"></el-table-column>
                <el-table-column prop="az_name" label="主机名"></el-table-column>
                <el-table-column prop="machine_status_name" label="机器状态"></el-table-column>
                <el-table-column prop="host_purpose" label="主机用途"></el-table-column>
                <el-table-column prop="host_attribution__name" label="主机归属"></el-table-column>
            </el-table>
            <div class="ecs-belong m-top20">
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

@Component({
  components:{
    ActionBlock
  }
})
export default class Resource extends Vue{
  $message;
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]}) rows!:any
  private alert_title = `是否确定对以下${this.rows.length}台物理机执行分配资源操作吗？`
  private ecs_list:any=[];
  private ecs_id:string="";
  created() {
      this.get_host_attribution()
  }
  private async get_host_attribution (){
      let res:any =await Service.get_host_attribution({})
      if(res.code==="Success"){
          this.ecs_list = res.data.host_attribution_list
          this.ecs_id = this.ecs_list[0].host_attribution_id;
      }
  }
  private async confirm(){
    let res:any=await Service.set_host_attribution({
        host_ids:this.rows.map(item=>item.host_id),
        host_attribution_id:this.ecs_id
    })
    if(res.code==="Success"){
      if(res.data.fail_host_list.length>0){
        this.$message.warning(res.message)
        this.back("1");
        return;
      }else{
        this.$message.success(res.message)
        this.back("1")
      }
      // this.$message.success(res.message)
      // this.back("1")
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
.ecs-belong{
    text-align: center;
}

</style>