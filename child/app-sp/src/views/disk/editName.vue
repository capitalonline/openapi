<template>
    <el-dialog
      title="修改云盘名称"
      :visible.sync="visible"
      width="700px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
        <el-alert
            title="是否确定要对以下云盘执行 修改名称 操作"
            type="warning"
            center
            :closable="false">
        </el-alert>
        <div class="content">
            <div class="label">云盘名称:</div>
            <el-input v-model="new_name" placeholder="请输入新的名称" minlength="2" maxlength="40" show-word-limit></el-input>
            <span class="name-error" v-if="new_name.trim().length<2">云盘名称长度最少为2</span>
        </div>
        <div class="remark">长度限制为2-40个字符</div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit} from 'vue-property-decorator';
import Service from '../../https/disk/list'
@Component({})
export default class EditName extends Vue{
    $message;
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>{}}) name!:any;
    private new_name:string = this.name.disk_name
    private async confirm(){
        if(this.new_name.trim().length<2){
            console.log("this.new_name.trim()",this.new_name.trim())
            return;
        }
        let res:any =await Service.edit_disk_name({
            customer_id:this.name.customer_id,
            disk_id:this.name.disk_id,
            disk_name:this.new_name==="" ? this.name.disk_name : this.new_name
        })
        if (res.code === 'Success') {
            this.$message.success("修改云盘名称任务下发成功！")
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
    .content{
        display: flex;
        padding: 10px 20px;
        align-items: center;
        .name-error{
            font-size: 12px;
            color: #F56C6C;
            margin-left: 20px;
            line-height: 20px;
        }
        .label{
            width: 80px;
            text-align: right;
            margin-right: 15px;
        }
        
    }
    .remark{
        padding-left: 115px;
        font-size: 12px;
        color: #666;
        margin-top: -5px;
    }
    .btn{
        text-align: center;
        margin-top: 30px;
    }
    .el-input{
        width: 380px !important;
    }
</style>