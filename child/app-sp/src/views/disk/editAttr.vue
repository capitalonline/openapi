<template>
    <el-dialog
      title="修改云盘属性"
      :visible.sync="visible"
      width="600px"
      :destroy-on-close="true"
      @close="back"
    >
        <el-alert
            title="是否确定要对以下云盘执行 修改属性 操作"
            type="warning"
            center
            :closable="false">
        </el-alert>
        <div class="content">
            <div class="label">云盘ID/名称:</div>
            <div>{{attr.disk_id}} / {{attr.disk_name}}</div>
        </div>
        <div class="content">
            <div class="label">云盘种类:</div>
            <div>{{attr.feature}}</div>
        </div>
        <div class="content">
            <div class="label">删除设置:</div>
            <el-checkbox v-model="checked">云盘随实例删除</el-checkbox>
        </div>
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
export default class EditAttr extends Vue{
    $message;
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>{}}) attr!:any;
    private checked:boolean = this.attr.is_follow_delete
    created() {
        console.log("attr",this.attr)
    }
    private confirm(){
        console.log("checked",this.checked)
        let res:any = Service.edit_disk_attr({
            disk_id:this.attr.disk_id,
            is_follow_delete:this.checked ? '1' : '0'
        })
        if (res.code == 'Success') {
            this.$message.success("修改成功")
        }
        this.back("1")
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
        .label{
            width: 150px;
            text-align: right;
            margin-right: 15px;
        }
        
    }
    .btn{
        text-align: center;
        margin-top: 30px;
    }
</style>