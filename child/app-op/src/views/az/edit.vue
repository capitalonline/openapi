<template>
    <el-dialog
        title="编辑"
        :visible.sync="visibleSync"
        width="600px"
    >
        <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" label-suffix=":" label-position="left">
            <el-form-item label="可用区编号" prop="az_id">
                <span v-model="formData.az_id"></span>
            </el-form-item>
            <el-form-item label="可用区名称" prop="az_name">
                <span v-model="formData.az_name"></span>
            </el-form-item>
            <el-form-item label="所属地域" prop="region_name">
                <span v-model="formData.region_name"></span>
            </el-form-item>
            <el-form-item label="所属地域编号" prop="region_id">
                <span v-model="formData.region_id"></span>
            </el-form-item>
             <el-form-item label="AZ Code" prop="az_code">
                <el-input v-model="formData.az_code" placeholder="输入可用区的小写拼音"></el-input>
            </el-form-item>
            <el-form-item label="公网类型" prop="net_type">
                <el-radio v-model="formData.net_type" label="1">三线三IP</el-radio>
            </el-form-item>
            <el-form-item label="存储类型" prop="backend_types">
                <el-checkbox-group v-model="formData.backend_types">
                    <el-checkbox label="disk">云盘</el-checkbox>
                    <el-checkbox label="local">本地盘</el-checkbox>
                    <el-checkbox label="nas">文件存储</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="formData.status" placeholder="请选择">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户ID" prop="customer_ids">
                <el-select v-model="formData.customer_ids" placeholder="请选择">
                    <el-option
                        v-for="item in customerList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formData.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="visibleSync = false">确 定</el-button>
            <el-button @click="visibleSync = false">取 消</el-button>
            
        </span>
    </el-dialog>
</template>

<script lang="ts">
import {Vue,Component,PropSync,Prop} from 'vue-property-decorator'
@Component({})
export default class Edit extends Vue{
    @PropSync('visible')visibleSync!:boolean;
    @Prop({default:()=>{}})info!:any;
    private formData:any={
        az_id:this.info.az_id,
        az_name:this.info.az_name,
        region_name:this.info.region_name,
        region_id:this.info.region_id,
        az_code:'',
        net_type:'1',
        backend_types:[],
        status:'',
        customer_ids:[],
        remark:'',
    }
    private rules:any={
        net_type:[{ required: true, message: '请选择公网类型'}],
        backend_types:[{ required: true, message: '请选择存储类型'}],
        status:[{ required: true, message: '请选择状态'}],
    }
    private statusList:any=[];
    private customerList:any=[]
}
</script>

<style lang="scss" scoped>
.el-form-item{
    margin-bottom: 14px;
}
</style>