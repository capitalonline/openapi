<template>
    <el-dialog
      title="修改云盘名称"
      :visible.sync="visible"
      width="600px"
      :destroy-on-close="true"
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
            <el-input v-model="new_name" placeholder="请输入新的名称"></el-input>
        </div>
        <div class="remark">长度限制为2-40个字符</div>
        <div class="btn">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit} from 'vue-property-decorator'
@Component({})
export default class EditName extends Vue{
    @Prop(Boolean) visible!:Boolean;
    @Prop(String) name!:string;
    private new_name:string = this.name
    private confirm(){
        console.log("checked",this.new_name)
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
        align-items: center;
        .label{
            width: 150px;
            text-align: right;
            margin-right: 15px;
        }
        
    }
    .remark{
        padding-left: 150px;
        font-size: 12px;
        color: #666;
        margin-top: -5px;
    }
    .btn{
        text-align: center;
        margin-top: 30px;
    }
</style>