<template>
    <el-dialog
        title="状态变更"
        :visible.sync="visible_sync"
        width="600px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <el-form :model="form_data" ref="form_status" label-position="left" label-width="100px" label-suffix=":">
            <el-form-item label="镜像id">
                <span>{{ form_data.id }}</span>
            </el-form-item>
            <el-form-item label="镜像名称">
                <span>{{ form_data.name }}</span>
            </el-form-item>
            <el-form-item label="状态" prop="status" :rules="{required: true, message:'请选择变更状态',trigger:'blur'}">
                <el-radio-group v-model="form_data.status">
                    <el-radio :label="1">可用</el-radio>
                    <el-radio :label="0">停用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="说明" prop="remark">
                <el-input type="textarea" autosize v-model=" form_data.remark" :maxlength=" 256" show-word-limit resize="none"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
import {Form} from 'element-ui';
import Service from '../../https/mirror/list'
@Component({
    components:{
    }
})
export default class SyncMirror extends Vue{
    @PropSync('visible')visible_sync!:boolean;
    @Prop({default:()=>{}})oper_info!:any;
    private form_data:any={
        id:this.oper_info.os_id,
        name:this.oper_info.display_name,
        status:'',
        remark:''
    }
    private confirm(){
        const form= this.$refs.form_status as Form;
        const {id,status,remark} = this.form_data
        form.validate(async valid=>{
            if(valid){
                let res:any = await Service.change_status({
                    os_id:id,
                    is_running:Number(status),
                    context:remark
                })
                if(res.code==='Success'){
                    this.$message.success(res.message)
                }
                this.visible_sync=false
            }
        })
        
    }
    private cancel(){
        const form= this.$refs.form_status as Form;
        form.resetFields()
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.label{
    width:120px;
}
</style>
