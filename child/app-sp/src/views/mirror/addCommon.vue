<template>
    <el-dialog
        :title="id? '编辑镜像' :'新增镜像'"
        :visible.sync="visible_sync"
        width="700px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <el-form :model="form_data" :rules="rules" ref="mirror_form" label-width="120px" class="demo-ruleForm" label-position="left" label-suffix=":">
            <el-form-item label="镜像ID" prop="id" v-if="form_data.id">
                <span>{{ form_data.id }}</span>
            </el-form-item>
            <el-form-item label="镜像名称" prop="name">
                <el-input v-model="form_data.name"></el-input>
            </el-form-item>
            <el-form-item label="镜像类型" prop="mirror_type">
                <span v-if="id">{{ form_data.mirror_type }}</span>
                <el-select v-model="form_data.mirror_type" v-else>
                    <el-option v-for="item in mirror_type_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="版本" prop="version">
                <span v-if="id">{{ form_data.version }}</span>
                <el-input v-else v-model="form_data.version"></el-input>
            </el-form-item>
            <el-form-item label="位数" prop="bit">
                <span v-if="id">{{ form_data.bit }}</span>
                <el-select v-model="form_data.bit" v-else>
                    <el-option v-for="item in bit_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="属性" prop="props">
                <span>公共镜像</span>
            </el-form-item>
            <el-form-item label="客户ID" prop="customer_id">
                <el-input v-model="form_data.customer_id"></el-input>
            </el-form-item>
            <el-form-item label="容量" prop="size" v-if="id">
                <span>{{ form_data.size }}</span>
            </el-form-item>
            <el-form-item label="可用区" prop="az">
                <span v-if="id">{{ form_data.az }}</span>
                <el-select v-model="form_data.az" v-else>
                    <el-option v-for="item in az_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="存储类型" prop="storage_type">
                <span v-if="id">{{ form_data.storage_type }}</span>
                <el-select v-model="form_data.storage_type" v-else>
                    <el-option v-for="item in storage_type_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计算类型" prop="compute_type">
                <span v-if="id">{{ form_data.compute_type }}</span>
                <el-select v-else v-model="form_data.compute_type" :class="{compute:!id}">
                    <el-option v-for="item in compute_type_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
                <el-tooltip :content=" '若是标准镜像，选择第三项：CPU/GPU' " placement="right" effect="light" v-if="!id">
                    <el-button type="text"><svg-icon icon="info" class="m-left10"></svg-icon></el-button>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="驱动类型" prop="drive_type">
                <span v-if="id">{{ form_data.drive_type }}</span>
                <el-select v-else v-model="form_data.drive_type">
                    <el-option v-for="item in drive_type_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="镜像文件类型" prop="file_type">
                <span v-if="id">{{ form_data.file_type }}</span>
                <el-select v-model="form_data.file_type" v-else>
                    <el-option v-for="item in file_type_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MD5" prop="md5" >
                <span v-if="id">{{ form_data.md5 }}</span>
                <el-input v-else type="textarea" autosize v-model="form_data.md5" :maxlength=" 256" show-word-limit resize="none"></el-input>
            </el-form-item>
            <div class="error_message file-tip" v-if=" form_data.fileList.length===0 && !id ">未找到目标镜像文件，请上传</div>
            <el-form-item label="" prop="file" v-if="!id">
                <el-upload
                    name="mirror"
                    class="upload-demo"
                    accept=""
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="before_upload"
                    :on-success="FnSuccess"
                    :file-list="form_data.fileList"
                    :headers="{
                        'Access-Token':$store.state.token
                    }"
                >
                    <el-button type="primary">上传文件</el-button>
                </el-upload>
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
@Component({
    components:{
        SvgIcon
    }
})
export default class AddCommon extends Vue{
    @Prop({default:''})id!:string;
    @PropSync('visible')visible_sync!:boolean;
    private mirror_type_list:any=[];
    private bit_list:any=[];
    private az_list:any=[];
    private storage_type_list:any=[];
    private compute_type_list:any=[];
    private drive_type_list:any=[];
    private file_type_list:any=[];
    private form_data={
        id:this.id,
        name:'',
        mirror_type:'',
        version:'',
        bit:'',
        customer_id:'',
        size:'',
        az:'',
        storage_type:'',
        compute_type:'',
        drive_type:'',
        file_type:'',
        md5:'',
        fileList:[]

    }
    private rules={
        name: [{ required: true, message: '请输入镜像名称', trigger: 'change' }],
        mirror_type: [{ required: true, message: '请选择镜像类型', trigger: 'change' }],
        version: [{ required: true, message: '请输入版本', trigger: 'change' }],
        bit: [{ required: true, message: '请选择位数', trigger: 'change' }],
        az: [{ required: true, message: '请选择可用区', trigger: 'change' }],
        storage_type: [{ required: true, message: '请选择存储类型', trigger: 'change' }],
        compute_type: [{ required: true, message: '请选择计算类型', trigger: 'change' }],
        file_type: [{ required: true, message: '请选择镜像文件类型', trigger: 'change' }],
        md5: [{ required: true, message: '请输入MD5', trigger: 'change' }],
       
    }
    private before_upload(file){
        console.log("before_upload",file)
    }
    private FnSuccess(response, file, fileList){

    }
    private confirm(){
        this.visible_sync=false
    }
    private cancel(){
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.el-select{
    width: 540px;
}
.compute{
    width: 280px;
}
.file-tip{
    margin-left: 120px;
}
</style>