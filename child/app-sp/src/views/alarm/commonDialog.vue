<template>
    <el-dialog
      :title="title"
      :visible.sync="visible_sync"
      width="760px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
        <div class="mount">
            <el-alert
                :title="alert_title"
                type="warning"
                center
                :closable="false">
            </el-alert>
            <el-table
                :data="contact_rows"
                border
                max-height="300"
            >
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱" v-if="title==='删除联系人'"></el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit, PropSync} from "vue-property-decorator";
import Service from '../../https/alarm/list'
@Component({})
export default class DelContact extends Vue{
    $message;
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>[]}) contact_rows!:any
    @Prop(String) title!:string;
    private alert_title:string = '确认删除以下联系人吗？删除后报警信息将无法通知到该联系人，且无法恢复'
    private async confirm(){
      const temp:Array<string> = []
        this.contact_rows.forEach(ele=>{
            temp.push(ele.id)
      })
      let res:any =this.title==='删除联系人' ? await Service.delete_contact({
        ids:temp
      }) : await Service.delete_contact_group({
        ids:temp
      })
      if (res.code==='Success') {
          this.$message.success(`${this.title}任务下发成功！`)
          this.back("1")
      }else{
        this.back("0")
      }
      
    }
    private cancel(){
      this.back("0")
    }
    @Emit("close")
    private back(val){
      
    }
}
</script>
<style lang="scss" scoped>
.mount{
  .table{
    margin: 20px 0;
  }
  .btn{
    padding: 20px;
    width: 100%;
    text-align: center;
  }
}

</style>