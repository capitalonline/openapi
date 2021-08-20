<template>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="960px"
      :destroy-on-close="true"
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
                :data="mount_id"
                border
            >
                <el-table-column prop="customer_id" label="客户ID"></el-table-column>
                <el-table-column prop="customer_name" label="客户名称"></el-table-column>
                <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
                <el-table-column prop="disk_name" label="云盘名称"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit} from "vue-property-decorator";
@Component({})
export default class MountDisk extends Vue{
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>[]}) mount_id!:any
    @Prop(String) title!:string;
    private alert_title:string = `是否确定要对以下云盘执行 ${this.title} 操作`
    private confirm(){
      
    }
    private cancel(){
      this.back()
    }
    @Emit("close")
    private back(){
      
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