<template>
    <el-dialog
        :title="oper_info.os_id? '编辑镜像' :'新增镜像'"
        :visible.sync="visible_sync"
        width="700px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        custom-class="add-common"
        @close="cancel"
    >
        <el-form :model="form_data" :rules="rules" ref="mirror_form" label-width="120px" class="demo-ruleForm" label-position="left" label-suffix=":">
            <el-form-item label="镜像ID" prop="id" v-if="oper_info.os_id">
                <span>{{ form_data.id }}</span>
            </el-form-item>
            <el-form-item label="镜像名称" prop="display_name">
                <el-input v-model="form_data.display_name"></el-input>
            </el-form-item>
            <el-form-item label="镜像类型" prop="os_type">
                <span v-if="oper_info.os_id">{{ form_data.os_type }}</span>
                <el-select v-model="form_data.os_type" v-else>
                    <el-option v-for="item in mirror_type_list" :key="item" :label="item" :value=" item "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="版本" prop="os_version">
                <span v-if="oper_info.os_id">{{ form_data.os_version }}</span>
                <el-input v-else v-model="form_data.os_version"></el-input>
            </el-form-item>
            <el-form-item label="位数" prop="os_bit">
                <span v-if="oper_info.os_id">{{ form_data.os_bit }}</span>
                <el-select v-model="form_data.os_bit" v-else>
                    <el-option v-for="item in bit_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="属性" prop="props">
                <span>公共镜像</span>
            </el-form-item>
            <el-form-item label="客户ID" prop="customer_ids">
                <customer-input @FnCustomer="FnCustomer" :customers="customer_list"></customer-input>
                <!-- <el-input v-model="form_data.customer_ids"></el-input> -->
            </el-form-item>
            <el-form-item label="容量" prop="size" v-if="oper_info.os_id">
                <span>{{ form_data.size }}GB</span>
            </el-form-item>
            <el-form-item label="可用区" prop="az_id">
                <span v-if="oper_info.os_id">
                    <span class="az" v-for="item in oper_info.az_list" :key="item.az_id">{{item.az_name}}{{oper_info.az_list.length>0 ? ';' : ''}}</span>
                </span>
                <el-select v-model="form_data.az_id" v-else>
                    <el-option v-for="item in az_list" :key="item.az_id" :label="item.az_name" :value=" item.az_id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="存储类型" prop="backend_type">
                <span v-if="oper_info.os_id">{{ form_data.backend_type }}</span>
                <el-select v-model="form_data.backend_type" v-else>
                    <el-option v-for="item in storage_type_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计算类型" prop="support_type">
                <span v-if="oper_info.os_id">{{ form_data.support_type }}</span>
                <el-select v-else v-model="form_data.support_type" :class="{compute:!oper_info.os_id}" :disabled="form_data.os_file_type==='iso'">
                    <el-option v-for="item in compute_type_list" :key="item" :label="item" :value=" item"></el-option>
                </el-select>
                <el-tooltip :content=" '若是标准镜像，选择第三项：CPU/GPU' " placement="right" effect="light" v-if="!oper_info.os_id">
                    <el-button type="text"><svg-icon icon="info" class="m-left10"></svg-icon></el-button>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="驱动类型" prop="support_gpu_driver" v-if="form_data.support_type==='GPU'">
                <span v-if="oper_info.os_id">{{ form_data.support_gpu_driver }}</span>
                <el-select v-else v-model="form_data.support_gpu_driver">
                    <el-option v-for="item in drive_type_list" :key="item" :label="item" :value=" item "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="镜像文件类型" prop="os_file_type">
                <span v-if="oper_info.os_id">{{ form_data.os_file_type }}</span>
                <el-select v-model="form_data.os_file_type" v-else>
                    <el-option v-for="item in file_type_list" :key="item" :label="item" :value=" item "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MD5" prop="path_md5" >
                <span v-if="oper_info.os_id">{{ form_data.path_md5 }}</span>
                <el-input v-else type="textarea" autosize v-model="form_data.path_md5" :maxlength=" 256" show-word-limit resize="none"></el-input>
            </el-form-item>
            <!-- <div class="error_message file-tip" v-if=" os_file.length===0 && !oper_info.os_id ">未找到目标镜像文件，请上传</div>
            <el-form-item label="" prop="os_file" v-if="!oper_info.os_id">
                <el-upload
                    name="file"
                    ref="upload"
                    class="upload-demo"
                    :action="`/ecs_business/v1/img/create_pub_image/${query_url}`"
                    :before-upload="before_upload"
                    :file-list="os_file"
                    :auto-upload="false"
                    :on-success="FnSuccess"
                    :headers="{
                        'Access-Token':$store.state.token
                    }"
                >
                    <el-button type="primary">上传文件</el-button>
                </el-upload>
            </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync, Watch} from 'vue-property-decorator';
import SvgIcon from '../../components/svgIcon/index.vue';
import Service from '../../https/mirror/list';
import EcsService from '../../https/instance/create';
import CustomerInput from '../../components/customerInput.vue'
import {Form} from 'element-ui'
@Component({
    components:{
        SvgIcon,
        CustomerInput
    }
})
export default class AddCommon extends Vue{
    @Prop({default:()=>{}})oper_info!:any;
    @PropSync('visible')visible_sync!:boolean;
    private mirror_type_list:any=[];
    private bit_list:Array<any>=[{id:32,name:'32位'},{id:64,name:'64位'}];
    private az_list:Array<any>=[];
    private storage_type_list:Array<any>=[{id:'local',name:'本地盘'}];
    private compute_type_list:any=['GPU','CPU','CPU/GPU']
    private drive_type_list:any=['DataCenter','Geforce'];
    private file_type_list:any=['iso','qcow2'];
    private query_url:string="";
    private os_file:any=[];
    private customer_list:Array<String>=this.oper_info.os_id ? this.oper_info.white_customer_list : []
    private form_data:any={
        id:this.oper_info.os_id,
        display_name:this.oper_info.display_name ? this.oper_info.display_name : '',
        os_type:this.oper_info.os_type ? this.oper_info.os_type : '',
        os_version:this.oper_info.os_version ? this.oper_info.os_version : '',
        os_bit:this.oper_info.os_bit ? this.oper_info.os_bit+'位' : this.bit_list[0].id,
        customer_ids:'',
        size:this.oper_info.size ? this.oper_info.size : '',
        az_id:this.oper_info.az_id ? this.oper_info.az_id : '',
        backend_type:this.oper_info.backend_type ? this.oper_info.backend_type : this.storage_type_list[0].id,
        support_type:this.oper_info.support_type ? this.oper_info.support_type : this.compute_type_list[0],//计算类型
        support_gpu_driver:this.oper_info.support_gpu_driver ? this.oper_info.support_gpu_driver : this.drive_type_list[0],
        os_file_type:this.oper_info.os_file_type ? this.oper_info.os_file_type : this.file_type_list[0],
        path_md5:this.oper_info.path_md5 ? this.oper_info.path_md5 : '',

    }
    private rules={
        display_name: [{ required: true, validator:this.validate_name, trigger: 'change' }],
        os_type: [{ required: true, message: '请选择镜像类型', trigger: 'change' }],
        os_version: [{ required: true, message: '请输入版本', trigger: 'change' }],
        os_bit: [{ required: true, message: '请选择位数', trigger: 'change' }],
        az_id: [{ required: true, message: '请选择可用区', trigger: 'change' }],
        backend_type: [{ required: true, message: '请选择存储类型', trigger: 'change' }],
        support_type: [{ required: true, message: '请选择计算类型', trigger: 'change' }],
        os_file_type: [{ required: true, message: '请选择镜像文件类型', trigger: 'change' }],
        path_md5: [{ required: true, message: '请输入MD5', trigger: 'change' }],
    }
    created(){
        this.get_mirror_type();
        this.get_az_list();
        this.form_data.support_type='CPU/GPU'
        console.log("this.oper_info",this.oper_info)
    }
    private validate_name(rule, value, callback){
        if(!value){
            return callback(new Error('请输入镜像名称'))
        }else{
            Service.check_name({
                display_name:value
            }).then(res=>{
                if(res.code==='Success'){
                    if(res.data.usable){
                        return callback()
                    }else{
                        return callback('镜像名称重复,请重新输入')
                    }
                }else{
                    return callback('镜像名称重复,请重新输入')
                }
            }).catch(err=>{
                return callback('镜像名称重复,请重新输入')
            })
            
        }
    }
    private async get_mirror_type(){
        let res:any = await Service.get_mirror_type({})
        if(res.code==="Success"){
            this.mirror_type_list=res.data.type_list;
            this.form_data.os_type = this.mirror_type_list[0]
        }
    }
    private async get_az_list(){
    let res:any=await EcsService.get_region_az_list({})
    if(res.code==="Success"){
      res.data.forEach(item=>{
        item.region_list.forEach(inn=>{
          this.az_list=[...this.az_list,...inn.az_list]
        })
      })
      this.form_data.az_id = this.az_list[0].az_id
    }
  }
    private before_upload(file){
        console.log("before_upload",file)
    }
    private FnSuccess(response, file, fileList){
        console.log("response",response)
    }
    @Watch('form_data.os_file_type')
    private watch_os_file_type(nv){
        if(nv==='iso'){
            this.form_data.support_type='CPU/GPU'
        }
    }
    // @Watch("form_data",{immediate:true,deep:true})
    // private watch_form_data(){
    //     const {display_name,os_type,os_version,os_bit,customer_ids,az_id,backend_type,support_type,support_gpu_driver,os_file_type,path_md5}=this.form_data;
    //     console.log("customer_ids",customer_ids.split(','))
    //     let obj={
    //         display_name,
    //         os_type,
    //         os_version,
    //         os_bit,
    //         customer_ids,
    //         az_id,
    //         backend_type,
    //         support_type,
    //         support_gpu_driver,
    //         os_file_type,
    //         path_md5,
    //     }
    //     let str=""
    //     for (let i in obj){
    //         if(obj[i]){
    //             str =str+`${i}=${obj[i]}&`
    //         }
    //     }
    //     this.query_url = str==="" ? "" : `?${str.slice(0,str.length-1)}`;
    //      console.log("this.query_url",this.query_url)
    // }
    private FnCustomer(val){
        this.form_data.customer_ids =val? val.join(',') : ''
    }
    private async confirm(){
        const form= this.$refs.mirror_form as Form;
        const {display_name,os_type,os_version,os_bit,customer_ids,az_id,backend_type,support_type,support_gpu_driver,os_file_type,path_md5}=this.form_data
        form.validate(async valid=>{
            if(valid){
                if(this.oper_info.os_id){
                    let res:any = await Service.edit_pub_mirror({
                        os_id:this.oper_info.os_id,
                        display_name,
                        customer_ids:customer_ids==='' ? [] : customer_ids.split(',')
                    })
                    if(res.code==='Success'){
                        this.$message.success(res.message)
                    }
                }else{
                    // const upload = this.$refs.upload as any;
                    // upload.submit()
                    let res:any = await Service.add_pub_mirror({
                        display_name,
                        os_type,
                        os_version,
                        os_bit,
                        customer_ids,
                        az_id,
                        backend_type,
                        support_type,
                        support_gpu_driver:support_type==='GPU' ? support_gpu_driver : undefined,
                        os_file_type,
                        path_md5,
                    })
                    if(res.code==='Success'){
                        this.$message.success(res.message)
                    }
                }
                
                this.visible_sync=false
            }
        })
    }
    private cancel(){
        const form= this.$refs.mirror_form as Form;
        form.resetFields()
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
.az{
    margin-right: 3px;
}
</style>
<style lang="scss">
.add-common{
    .el-dialog__body{
        height: 500px;
        overflow: auto;
    }
}
</style>