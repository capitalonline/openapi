<template>
    <el-dialog
        title="编辑"
        :visible.sync="visibleSync"
        width="600px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" label-suffix=":" label-position="left">
            <el-form-item label="可用区编号" prop="az_id">
                <span v-text="formData.az_id"></span>
            </el-form-item>
            <el-form-item label="可用区名称" prop="az_name">
                <span v-text="formData.az_name"></span>
            </el-form-item>
            <el-form-item label="所属地域" prop="region_name">
                <span v-text="formData.region_name"></span>
            </el-form-item>
            <el-form-item label="所属地域编号" prop="region_id">
                <span v-text="formData.region_id"></span>
            </el-form-item>
             <el-form-item label="AZ Code" prop="az_code">
                <el-input v-model="formData.az_code" placeholder="输入可用区的小写拼音" :disabled="formData.az_code!==''"></el-input>
            </el-form-item>
            <el-form-item label="公网类型" prop="net_type">
                <el-radio v-for="(item,i) in publicList" :key="i" v-model="formData.net_type" :label="i">{{item}}</el-radio>
            </el-form-item>
            <el-form-item label="存储类型" prop="backend_types">
                <el-checkbox-group v-model="formData.backend_types">
                    <el-checkbox v-for="(item,i) in backend_list" :key="i" :label="i">{{item}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="formData.status" placeholder="请选择">
                    <el-option
                        v-for="(item,i) in statusList"
                        :key="i"
                        :label="item"
                        :value="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户ID" prop="customer_ids">
                <customer-input @FnCustomer="FnCustomer" :customers="formData.customer_ids"></customer-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formData.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="visibleSync = false">取 消</el-button>
            
        </span>
    </el-dialog>
</template>

<script lang="ts">
import {Vue,Component,PropSync,Prop} from 'vue-property-decorator';
import CustomerInput from '../../components/customerInput.vue';
import Service from '../../https/az/list'
import { Form } from 'element-ui';
@Component({
    components:{
        CustomerInput
    }
})
export default class Edit extends Vue{
    @PropSync('visible')visibleSync!:boolean;
    @Prop({default:()=>{}})info!:any;
    private formData:any={
        az_id:this.info.az_id,
        az_name:this.info.az_name,
        region_name:this.info.region_name,
        region_id:this.info.region_id,
        az_code:this.info.az_code,
        net_type:'',
        backend_types:[],
        status:'',
        customer_ids:this.info.customer,
        remark:this.info.remark,
    }
    private rules:any={
        net_type:[{ required: true, message: '请选择公网类型'}],
        backend_types:[{ required: true, message: '请选择存储类型'}],
        status:[{ required: true, message: '请选择状态'}],
    }
    private backend_list:any={}
    private statusList:any={};
    private publicList:any={};
    private customerList:any=[];
    private FnCustomer(val){
        this.formData.customer_ids = val
    }
    created() {
        this.getBackendTypes();
        this.gtStatusList();
        this.getNetType()
    }
    private async getNetType(){
        let res:any = await Service.get_net_type();
        if(res.code==='Success'){
            this.publicList = res.data;
            this.formData.net_type =this.info.net_type[0]
        }
    }
    private async getBackendTypes(){
        let res:any = await Service.get_backend_types();
        if(res.code==='Success'){
            this.backend_list = res.data;
            this.formData.backend_types = this.info.backend_types
        }
    }
    private async gtStatusList(){
        let res:any = await Service.get_status();
        if(res.code==='Success'){
            this.statusList = res.data;
            this.formData.status = this.info.status
        }
    }
    private confirm(){
        let form = this.$refs.ruleForm as Form;
        const {az_id,az_code,net_type,backend_types,status,customer_ids,remark}=this.formData
        form.validate(async valid=>{
            if(valid){
                let res:any = await Service.edit({
                    az_id,
                    az_code,
                    net_type,
                    backend_types:backend_types.join(','),
                    status,
                    customer_ids:customer_ids.join(','),
                    remark
                })
                if(res.code==='Success'){
                    this.$message.success(res.message)
                }
                this.visibleSync=false
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.el-form-item{
    margin-bottom: 14px;
}
</style>