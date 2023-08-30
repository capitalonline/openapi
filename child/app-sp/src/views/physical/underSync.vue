<template>
  <el-dialog
    title="同步确认"
    :visible.sync="visible_sync"
    width="700px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <div>
      请确认是否同步宿主机“
      <span v-for="(item,index) in rows" :key="index" class="host_name">
        <span v-if="index < rows.length - 1">{{item.host_name}}，</span>
        <span v-else>{{item.host_name}}</span>
      </span>
      ”底层信息？
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="visible_sync=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync,Emit} from 'vue-property-decorator';
import Service from '../../https/physical/list'
@Component({})
export default class UnderSync extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>{}})rows!:any
    private async confirm() {
      let params = {
        pod_id: this.$store.state.pod_id,
        host_ecs: {}
      }
      for(let i of this.rows){
        params.host_ecs[i.host_id] = []
        if(i.ecs_list.length > 0) {
          i.ecs_list.map(item => {
            params.host_ecs[i.host_id].push(item.ecs_id)
          })
        }
      }
      Service.update_ecs_info(params).then(res => {
        if(res.code === 'Success') {
          this.$message.success(res.message)
          this.back("1")
        }else{
            this.back("0")
        }
      })
    }
    @Emit("close")
    private back(val){
        this.visible_sync=false
    }
}
</script>
<style scoped lang="scss">
.host_name{
  color: #455cc6;
}
</style>
