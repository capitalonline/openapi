<template>
    <el-dialog
        title="卸载云盘"
        :visible.sync="visible"
        width="600px"
        :destroy-on-close="true"
        @close="back"
    >
        <el-alert
            title="是否确定要对以下云盘执行 卸载 操作"
            type="warning"
            center
            :closable="false">
        </el-alert>
        <div class="table">
            <el-table
                :data="mount_id"
                max-height="161"
                border
            >
                <el-table-column prop="disk_id" label="待挂载云盘ID"></el-table-column>
                <el-table-column prop="ecs_id" label="源实例ID"></el-table-column>
                <el-table-column prop="az_name" label="地域及可用区"></el-table-column>
            </el-table>
            <div class="remark">
                <div>1.执行卸载操作前,请停止云盘数据的读写。</div>
                <div>2.执行卸载操作前,请确认预设的文件索引已被删除,避免引起实例重启。</div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确定卸载</el-button>
            <el-button @click="cancel">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit} from "vue-property-decorator";
import {Form} from 'element-ui'
@Component({})
export default class MountDisk extends Vue{
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>[]}) mount_id!:any
    
    private confirm(){
      this.back()
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
.table{
//   .table{
//     margin: 20px 0;
//   }
    .remark{
        padding: 20px;
        background-color: #eef1f6;
        color: #909399;
        font-size: 12px;
        margin: 20px 0 ;
        div:first-child{
            margin-bottom: 5px;
        }
    }
    .btn{
        padding: 20px 20px 0 20px;
        width: 100%;
        text-align: center;
    }
}

</style>