<template>
    <el-dialog
        title="设置属性"
        :visible.sync="visible_sync"
        width="600px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <el-form ref="form" :model="form_data" label-width="120px" class="demo-ruleForm">
            <el-form-item label="主机类型">
                <el-select v-model="form_data.type" @change="changeType" class="w-280">
                    <el-option v-for="item in host_types" :key="item.type" :value="item.type" :label="item.type_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主机用途" prop="use" :rules="[{required:true,message:'请选择主机用途'}]">
               <el-select v-model="form_data.use" class="w-280">
                    <el-option v-for="item in host_uses" :key="item.use_type" :value="item.use_type" :label="item.use_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="切分粒度">
                <el-input placeholder="若输入多个值，用英文逗号隔开" v-model="form_data.particle"></el-input> GB
                <el-tooltip content="每块GPU仅能按照一种显存大小进行切分；同物理机不同显卡切分粒度可以不同；故一台物理机切分粒度的数量不能多于物理机GPU数量。" placement="right" effect="light">
                    <el-button type="text">
                        <svg-icon icon="info" class="info"></svg-icon>
                    </el-button>
                </el-tooltip>
                <div class="error_message" v-if="form_data.particle.split(',').length>4">最多支持设置4种值</div>
            </el-form-item>
            <el-form-item label="专属客户">
                <el-select 
                    class="w-280"
                    v-model="form_data.customer_id" 
                    multiple
                    filterable 
                    remote
                    :remote-method="getCustomerList"
                    @visible-change="changeCustomer"
                >
                    <el-option v-for="item in customerList" :key="item.id" :value="item.id" :label="`${item.id}(${item.name})`">{{`${item.id}(${item.name})`}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品规格族">
                <el-select
                    class="w-280"
                    v-model="form_data.family" 
                    multiple 
                    filterable 
                    :filter-method="getFamilyList"
                    @visible-change="changeFamily"
                >
                    <el-option v-for="item in familyList" :key="item.spec_family_id" :value="item.spec_family_id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支持存储类型" prop="backend" :rules="[{required:true,message:'请选择支持存储类型'}]">
                <el-select
                    class="w-280"
                    v-model="form_data.backend" 
                >
                    <el-option v-for="item in backendList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="客户黑名单">
                <el-select 
                    class="w-280"
                    v-model="form_data.black_customer_id" 
                    multiple
                    filterable 
                    remote
                    :remote-method="getBlackCustomerList"
                    @visible-change="changeBlackCustomer"
                >
                    <el-option v-for="item in blackCustomerList" :key="item.id" :value="item.id" :label="`${item.id}(${item.name})`">{{`${item.id}(${item.name})`}}</el-option>
                </el-select>
            </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="back('0')">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,PropSync,Emit,Prop,Watch} from 'vue-property-decorator';
import Service from '../../https/physical/list';
import svgIcon from '@/components/svgIcon/index.vue';
@Component({
    components:{
        svgIcon
    }
})
export default class UpdateAttribute extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>[]}) rows!:any;
    private form_data:any={
        type:'',
        use:'',
        backend:'',
        customer_id:[],
        black_customer_id:[],
        family:[],
        particle:'',
    }
    // private type:String="";
    // private use:String = "";
    // private backend:string=''
    // private particle:string=''
    private host_types=[]
    private host_uses=[];
    // private customer_id:any=[];
    // private black_customer_id:any=[];
    private customerList:any=this.rows[0]?.exclusive_customers;
    private blackCustomerList:any=this.rows[0]?.exclusive_black_customers;
    // private family=[];
    private familyList=[]
    private flag:boolean=true;
    private flagFamily:boolean=true
    private backendList:any=[
        {id:'block',name:'云盘'},
        {id:'local',name:'本地盘'},
        {id:'local,block',name:'云盘/本地盘'}
    ]
    created() {
        console.log('rows',this.rows)
        this.form_data.customer_id = this.rows[0]?.exclusive_customers.map(item=>item.id);
        // this.form_data.black_customer_id = this.rows[0]?.exclusive_black_customers.map(item=>item.id)
        this.getHostTypes();
        this.getCustomerList('',true);
        this.getFamilyList();
        if(this.rows.length>1 || (this.rows.length===1 && this.rows[0].backend_type==='')){
            this.form_data.backend = 'local,block'
        }else{
            this.form_data.backend =this.rows[0]?.backend_type
        }
    }
    private async getHostTypes(){
        let res:any =await Service.get_host_type({})
        if(res.code==='Success'){
            this.host_types = res.data;
            if(this.rows.length>1 || (this.rows.length===1 && this.rows[0].host_type==='')){//多选
                this.form_data.type = this.host_types[0].type;
                this.host_uses = this.host_types[0].list;
                this.form_data.use = this.host_uses[0].use_type;
            }else{
                this.form_data.type =this.rows[0]?.host_type
                this.host_uses= this.rows[0].host_type ? this.host_types.filter(item=>item.type===this.rows[0].host_type)[0]?.list : this.host_types[0].list;
                console.log('this.rows[0].host_purpose',this.rows[0].host_purpose)
                this.form_data.use = this.rows[0].host_purpose ? this.rows[0].host_purpose : this.host_uses[0] ? this.host_uses[0].use_type : '';
            }
        }
        
    }
    private changeType(val){
        this.host_uses = this.host_types.filter(item=>item.type===val)[0].list;
        this.form_data.use = this.host_uses.length > 0 ? this.host_uses[0].use_type : ''
    }
    private changeFamily(val){
        if(!val){
            this.getFamilyList()
        }
    }
    private changeCustomer(val){
        if(val){
            this.customerList=[]
            // this.getCustomerList()
        }
    }
    // private changeBlackCustomer(val){
    //     if(val){
    //         this.blackCustomerList=[]
    //         // this.getCustomerList()
    //     }
    // }
    private async getFamilyList(val:string=""){
        let res:any=await Service.getFamilyList({
            host_ids:this.rows.map(item=>item.host_id),
            spec_family_name:val
        })
        if (res.code == 'Success'){
            this.familyList=res.data.spec_family_list;
            if(this.flagFamily)this.form_data.family = res.data.old_family_data_list;
            this.flagFamily=false;
        }
    }
    // @Watch("customer_id")
    // private watch_customer_id(nv){
    // }
    private async getCustomerList(val:string="",loading:boolean=false){
        if(!val && !loading){
            return
        }
        let res:any=await Service.getCustomerList({
            host_ids:this.rows.map(item=>item.host_id),
            customer_id:val
        })
        if (res.code == 'Success'){
            this.customerList=res.data.customer_list;
        }
    }
    // private async getBlackCustomerList(val:string="",loading:boolean=false){
    //     if(!val && !loading){
    //         return
    //     }
    //     let res:any=await Service.getCustomerList({
    //         host_ids:this.rows.map(item=>item.host_id),
    //         customer_id:val
    //     })
    //     if (res.code == 'Success'){
    //         this.blackCustomerList=res.data.customer_list;
    //     }
    // }
    private async confirm(){
        let form = this.$refs.form as any;
        form.validate(async valid=>{
            if(valid && this.form_data.particle.split(',').length<=4){
                let res:any =await Service.update_attribute({
                    host_ids:this.rows.map(item=>item.host_id),
                    host_purpose:this.form_data.use,
                    host_type:this.form_data.type,
                    customer_ids:this.form_data.customer_id,
                    spec_family_ids:this.form_data.family,
                    backend_type:this.form_data.backend,
                    // black_customer_ids:this.form_data.black_customer_id
                })
                if(res.code==='Success'){
                    if(res.data.fail_host_list.length>0){
                        this.$message.warning(res.message)
                        this.back("0");
                        return;
                    }
                    this.$message.success(res.message)
                    this.back("1")
                }else{
                    this.back("0")
                }
                    }
                })
        
        
    }
    @Emit("close")
    private back(val){
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.main-edit{
    span{
        width: 120px;
        display: inline-block;
        margin-right: 20px;
        text-align: right;
    }
    .el-select,.el-input{
        width: 340px;
    }
}
</style>
<style lang="scss">
.main-edit{
    .el-select .el-tag{
        width: 100% !important;
    }
}
</style>