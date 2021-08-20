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
        <div class="btn">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit} from 'vue-property-decorator'
@Component({})
export default class EditAttr extends Vue{
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>{}}) attr!:any;
    private checked:boolean = this.attr.is_follow_delete==='1' ? true : false
    created() {
        console.log("attr",this.attr)
    }
    private confirm(){
        console.log("checked",this.checked)
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