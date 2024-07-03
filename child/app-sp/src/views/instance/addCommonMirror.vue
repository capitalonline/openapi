<template>
    <el-dialog
        title="制作公共镜像"
        :visible.sync="visible_sync"
        width="500px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <el-form :model="form_data" ref="form_ecs" label-position="left" label-width="100px" label-suffix=":">
            <el-form-item label="实例名称/ID" class="content">
                <span>{{ form_data.ecs }}</span>
            </el-form-item>
            <el-form-item label="客户名称/ID" class="content">
                <span>{{ form_data.customer }}</span>
            </el-form-item>
            <el-form-item label="可用区" class="content">
                <span>{{ form_data.az }}</span>
            </el-form-item>
            <el-form-item label="实例规格" class="content">
                <span>{{ form_data.spec }}</span>
            </el-form-item>
            <el-form-item label="系统盘" class="content">
                <span>{{ form_data.system_disk }}</span>
            </el-form-item>
            <el-form-item label="镜像" class="content">
                <span>{{ form_data.mirror }}</span>
            </el-form-item>
            <el-form-item label="镜像名称" prop="name" :rules="[{required: true, message:'请输入镜像名称',trigger:'blur'}]">
                <el-input v-model=" form_data.name"></el-input>
            </el-form-item>
            <el-form-item label="测试账户ID" prop="test_id" :rules="[{required: true,trigger:'blur',validator: validate_account}]" class="test">
                <div class="test"><customer-input @FnCustomer="FnCustomer"></customer-input></div>
                <el-tooltip content="请选择测试账户ID，待镜像制作完成进行测试" placement="right" effect="light">
                    <el-button type="text" class="m-left10"><svg-icon icon="info"></svg-icon></el-button>
                </el-tooltip>
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
import SvgIcon from '../../components/svgIcon/index.vue';
import Service from '../../https/instance/list';
import CustomerInput from '../../components/customerInput.vue'
@Component({
    components:{
        SvgIcon,
        CustomerInput
    }
})
export default class AddCommonMirror extends Vue{
    @PropSync('visible')visible_sync!:boolean;
    @Prop({default:()=>{}})ecs_info!:any;
    @Prop({default:false}) new!:boolean
    private form_data={
        ecs:`${this.ecs_info.ecs_name} / ${this.ecs_info.ecs_id}`,
        customer:`${this.ecs_info.customer_name} / ${this.ecs_info.customer_id}`,
        az:this.ecs_info.az_name,
        spec:this.ecs_info.is_gpu ? `${this.ecs_info.cpu_size}vCPU${this.ecs_info.ram_size}GiB  ${this.ecs_info.gpu_size}*${this.ecs_info.gpu_show_type}` : `${this.ecs_info.cpu_size}vCPU${this.ecs_info.ram_size}GiB`,
        system_disk: this.new ? `${this.ecs_info.disk_info.system.system_disk_type} ${this.ecs_info.disk_info.system.disk_size}GB` : `${this.ecs_info.system_disk_type} ${this.ecs_info.system_disk_size}GB`,
        mirror:this.ecs_info.os_name,
        name:'',
        test_id:'',
    }
    private FnCustomer(val){
        this.form_data.test_id =val
    }
    private validate_account(rule, value, callback){
        if(value.length===0){
            return callback(new Error('请选择测试账户ID'))
        }else{
            return callback()
        }
    }
    private async confirm(){
        let form = this.$refs.form_ecs as any;
        form.validate(async valid=>{
            if(valid){
                let res:any = await Service.add_common_mirror({
                    display_name:this.form_data.name,
                    az_id:this.ecs_info.az_id,
                    ecs_id:this.ecs_info.ecs_id,
                    customer_id:this.ecs_info.customer_id,
                    customer_ids:this.form_data.test_id,
                })
                if(res.code==='Success'){
                    this.$message.success(res.message)
                }
                this.visible_sync=false
            }
        })

    }
    private cancel(){
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.el-form-item.content{
    margin-bottom: 0;
}
.test{
    width: 90%;
    display: inline-block;
}
</style>
