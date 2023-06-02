<template>
    <el-dialog
        :title="oper_info.os_id? '编辑镜像' :'新增镜像'"
        :visible.sync="visible_sync"
        width="800px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        custom-class="add-common"
        @close="cancel"
    >
        <el-form :model="form_data" :rules="rules" ref="mirror_form" label-width="170px" class="demo-ruleForm" label-position="left" label-suffix=":">
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
                    <el-option label="Other" value="Other"></el-option>
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
                <customer-input @FnCustomer="FnCustomer" :customers="customer_list" :list="oper_info.customer_list"></customer-input>
                <!-- <el-input v-model="form_data.customer_ids"></el-input> -->
            </el-form-item>
            <el-form-item label="规格" prop="size">
                <span v-if="oper_info.os_id">{{ form_data.size ?`${ form_data.size }GB` : form_data.size}}</span>
                <template v-else>
                    <el-input-number v-model="form_data.size" :min="form_data.os_type==='Windows' ? 40 : 20"></el-input-number>  GB
                </template>
                
            </el-form-item>
            <el-form-item label="可用区" prop="az_id">
                <span v-if="oper_info.os_id">
                    <span class="az" v-for="item in oper_info.az_list" :key="item.az_id">{{item.az_name}}{{oper_info.az_list.length>0 ? ';' : ''}}</span>
                </span>
                <el-select v-model="form_data.az_id" v-else>
                    <el-option v-for="item in az_list" :key="item.az_id" :label="item.az_name" :value=" item.az_id "></el-option>
                </el-select>
            </el-form-item>
            <!-- support_product_source_type -->
            <el-form-item label="产品来源" prop="source_type">
                <!-- <span v-if="oper_info.os_id">{{ form_data.backend_type }}</span> -->
                <el-select v-model=" form_data.product_source">
                    <el-option v-for="item in product_source_type_list" :key="item" :label="item" :value=" item "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="存储类型" prop="backend_type">
                <!-- <span v-if="oper_info.os_id">{{ form_data.backend_type }}</span> -->
                <el-select v-model="form_data.backend_type">
                    <el-option v-for="item in storage_type_list" :key="item.id" :label="item.name" :value=" item.id "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计算类型" prop="support_type">
                <!-- <span v-if="oper_info.os_id">{{ form_data.support_type }}</span> -->
                <el-select v-model="form_data.support_type" :class="{compute:!oper_info.os_id}" :disabled="form_data.os_file_type==='iso'">
                    <el-option v-for="item in compute_type_list" :key="item" :label="item" :value=" item"></el-option>
                </el-select>
                <el-tooltip :content=" '若是标准镜像，选择第三项：CPU/GPU' " placement="right" effect="light" v-if="!oper_info.os_id">
                    <el-button type="text"><svg-icon icon="info" class="m-left10"></svg-icon></el-button>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="驱动类型" prop="support_gpu_driver" v-if="form_data.support_type==='GPU'">
                <!-- <span v-if="oper_info.os_id">{{ form_data.support_gpu_driver }}</span> -->
                <el-select v-model="form_data.support_gpu_driver">
                    <el-option v-for="item in drive_type_list" :key="item" :label="item" :value=" item "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="镜像文件类型" prop="os_file_type">
                <!-- <span v-if="oper_info.os_id">{{ form_data.os_file_type }}</span> -->
                <el-select v-model="form_data.os_file_type">
                    <el-option v-for="item in file_type_list" :key="item" :label="item" :value=" item "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MD5" prop="path_md5" >
                <!-- <span v-if="oper_info.os_id">{{ form_data.path_md5 }}</span> -->
                <el-input type="textarea" autosize v-model="form_data.path_md5" :maxlength="512" show-word-limit resize="none"></el-input>
            </el-form-item>
            <el-form-item v-if="!oper_info.os_id" label="镜像在对象存储文件名" prop="oss_file_name" >
                <!-- <span v-if="oper_info.os_id">{{ form_data.path_md5 }}</span> -->
                <el-input type="textarea" autosize v-model="form_data.oss_file_name" :maxlength="512" show-word-limit resize="none"></el-input>
            </el-form-item>
            <!-- <el-form-item label="上传日期" prop="upload_time" v-if="!oper_info.os_id">
                <el-date-picker
                    v-model="form_data.upload_time"
                    type="date"
                    :clearable="false"
                    :picker-options="{
                        disabledDate:FnDisable
                    }"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="prompt_message date-prompt">请选择该镜像在对象存储文件名的日期</div>
            </el-form-item> -->
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
import {Form} from 'element-ui';
import moment from 'moment'
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
    private bit_list:Array<any>=[{id:64,name:'64位'},{id:32,name:'32位'}];
    private az_list:Array<any>=[];
    private storage_type_list:Array<any>=[];
        // 产品来源
    private product_source_type_list:any=['云桌面','云主机','文件存储转发','容器'];

    private compute_type_list:any=['GPU','CPU','CPU/GPU']
    private drive_type_list:any=['Datacenter','Geforce','Enflame','GRID'];
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
        size:this.oper_info.os_id ? this.oper_info.size : 20,
        az_id:this.oper_info.az_list ? this.oper_info.az_list[0] : '',
        backend_type:this.oper_info.backend_type ? this.oper_info.backend_type : '',
        support_type:this.oper_info.support_type ? this.oper_info.support_type : this.compute_type_list[0],//计算类型
        // 产品来源
        product_source:this.oper_info.support_product_source_type ? this.oper_info.support_product_source_type:this.product_source_type_list[0],
        support_gpu_driver:this.oper_info.support_gpu_driver ? this.oper_info.support_gpu_driver : this.drive_type_list[0],
        os_file_type:this.oper_info.os_file_type ? this.oper_info.os_file_type : this.file_type_list[0],
        path_md5:this.oper_info.path_md5 ? this.oper_info.path_md5 : '',
        upload_time:this.oper_info.os_id ? this.oper_info.upload_time : new Date(),
        oss_file_name:''
    }
    private rules={
        display_name: [{ required: true, validator:this.validate_name, trigger: 'change' }],
        os_type: [{ required: true, message: '请选择镜像类型', trigger: 'change' }],
        os_version: [{ required: true, message: '请输入版本', trigger: 'change' }],
        os_bit: [{ required: true, message: '请选择位数', trigger: 'change' }],
        az_id: [{ required: true, message: '请选择可用区', trigger: 'change' }],
        backend_type: [{ required: true, message: '请选择存储类型', trigger: 'change' }],
        support_type: [{ required: true, message: '请选择计算类型', trigger: 'change' }],
        product_source: [{ required: true, message: '请选择产品来源', trigger: 'change' }],
        os_file_type: [{ required: true, message: '请选择镜像文件类型', trigger: 'change' }],
        path_md5:[{ required: true, message: '请输入MD5', trigger: 'change' }],
        oss_file_name:[{ required: true, message: '请输入镜像在对象存储文件名', trigger: 'change' }],
    }
    created(){
        // if(this.oper_info.os_id){
        //     this.rules.path_md5=[{required:false, message: '请输入MD5', trigger: 'change' }]
        // }else{
        //     this.get_mirror_type();
        //     this.get_disk_list()
        // }
        if(!this.oper_info.os_id){
            this.get_mirror_type();
        }
        this.get_disk_list()
    }
    private validate_name(rule, value, callback){
        if(!value){
            return callback(new Error('请输入镜像名称'))
        }else{
            Service.check_name({
                os_id:this.oper_info.os_id ? this.oper_info.os_id : '',
                display_name:value,
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
    private FnDisable(date){
        return date>new Date()
    }
    private async get_disk_list(){
        let res:any = await Service.get_disk_list({})
        if(res.code==="Success"){
            for(let i in res.data){
                this.storage_type_list.push({id:i,name:res.data[i]})
                if(this.oper_info.os_id && this.form_data.backend_type===res.data[i]){
                    this.form_data.backend_type=i
                }
            }
            if(!this.oper_info.os_id){
                this.form_data.backend_type = this.storage_type_list[0].id
            }
            
        }
    }
    @Watch('form_data.backend_type')
    private watch_backend_type(){
        if(!this.oper_info.os_id){
            this.form_data.az_id=''
            this.get_available_az()
        }
        
    }
    private async get_available_az(){
        let res:any = await Service.get_available_az({
            backend_type:this.form_data.backend_type
        })
        if(res.code==="Success"){
            this.az_list=res.data;
            this.form_data.az_id = this.az_list[0].az_id
        }
    }
    private async get_mirror_type(){
        let res:any = await Service.get_mirror_type({})
        if(res.code==="Success"){
            this.mirror_type_list=res.data.type_list;
            this.form_data.os_type = this.mirror_type_list[0]
        }
    }
//     private async get_az_list(){
//     let res:any=await EcsService.get_region_az_list({})
//     if(res.code==="Success"){
//       res.data.forEach(item=>{
//         item.region_list.forEach(inn=>{
//           this.az_list=[...this.az_list,...inn.az_list]
//         })
//       })
//       this.form_data.az_id = this.az_list[0].az_id
//     }
//   }
    private before_upload(file){
    }
    private FnSuccess(response, file, fileList){
    }
    @Watch('form_data.os_type')
    private watch_os_type(nv){
        if(nv==='Windows'){
            this.form_data.size = Math.max(this.form_data.size,40)
        }else{
            this.form_data.size = Math.max(this.form_data.size,20)
        }
    }
    @Watch('form_data.os_file_type')
    private watch_os_file_type(nv){
        if(nv==='iso'){
            this.form_data.support_type='CPU/GPU'
        }
        // this.query_url = str==="" ? "" : `?${str.slice(0,str.length-1)}`;
        //  console.log("this.query_url",this.query_url)

    }
    // @Watch("form_data",{immediate:true,deep:true})
    // private watch_form_data(){
    //     const {display_name,os_type,os_version,os_bit,customer_ids,az_id,backend_type,support_type,support_gpu_driver,os_file_type,path_md5}=this.form_data;
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
    // }
    private FnCustomer(val){
        this.form_data.customer_ids =val? val.join(',') : ''
    }
    private async confirm(){
        const form= this.$refs.mirror_form as Form;
        console.log(this.form_data,'this.form_data');
        
        const {product_source,display_name,os_type,os_version,os_bit,size,customer_ids,az_id,backend_type,support_type,support_gpu_driver,oss_file_name,os_file_type,path_md5,upload_time}=this.form_data
        form.validate(async valid=>{
            if(valid){
                if(this.oper_info.os_id){
                    let res:any = await Service.edit_pub_mirror({
                        os_id:this.oper_info.os_id,
                        display_name,
                        customer_ids:customer_ids==='' ? [] : customer_ids.split(','),
                        backend_type,
                        support_type,
                        product_source,
                        support_gpu_driver:support_type==='GPU' ? support_gpu_driver : undefined,
                        os_file_type,
                        path_md5
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
                        size,
                        backend_type,
                        support_type,
                        product_source,
                        support_gpu_driver:support_type==='GPU' ? support_gpu_driver : undefined,
                        os_file_type,
                        path_md5,
                        oss_file_name
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
.el-select,.el-date-picker{
    width: 530px;
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
.date-prompt{
    margin-top: -10px;
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