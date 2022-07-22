<template>
    <el-dialog
        title="设置属性"
        :visible.sync="visible_sync"
        width="600px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <div class="main-edit">
            <div class="m-bottom20">
                <span>主机类型</span>
                <el-select v-model="type" @change="changeType">
                    <el-option v-for="item in host_types" :key="item.type" :value="item.type" :label="item.type_name"></el-option>
                </el-select>
            </div>
            <div class="m-bottom20">
                <span>主机用途</span>
                <el-select v-model="use">
                    <el-option v-for="item in host_uses" :key="item.use_type" :value="item.use_type" :label="item.use_name"></el-option>
                </el-select>
            </div>
            <div class="m-bottom20">
                <span>专属客户</span>
                <el-select 
                    v-model="customer_id" 
                    multiple
                    filterable 
                    remote
                    :remote-method="getCustomerList"
                    @visible-change="changeCustomer"
                >
                    <el-option v-for="item in customerList" :key="item.id" :value="item.id" :label="`${item.id}(${item.name})`">{{`${item.id}(${item.name})`}}</el-option>
                </el-select>
            </div>
            <div class="m-bottom20">
                <span>产品规格族</span>
                <el-select
                    v-model="family" 
                    multiple 
                    filterable 
                    :filter-method="getFamilyList"
                    @visible-change="changeFamily"
                >
                    <el-option v-for="item in familyList" :key="item.spec_family_id" :value="item.spec_family_id" :label="item.name"></el-option>
                </el-select>
            </div>
            <div class="m-bottom20">
                <span>支持存储类型</span>
                <el-select
                    v-model="backend" 
                >
                    <el-option v-for="item in backendList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="back('0')">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,PropSync,Emit,Prop,Watch} from 'vue-property-decorator';
import Service from '../../https/physical/list'
@Component({})
export default class UpdateAttribute extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>[]}) rows!:any
    private type:String="";
    private use:String = "";
    private backend:string=''
    private host_types=[]
    private host_uses=[];
    private customer_id:any=[];
    private customerList:any=[];
    private family=[];
    private familyList=[]
    private flag:boolean=true;
    private flagFamily:boolean=true
    private backendList:any=[
        {id:'block',name:'云盘'},
        {id:'local',name:'本地盘'},
        {id:'local,block',name:'云盘/本地盘'}
    ]
    created() {
        this.getHostTypes();
        this.getCustomerList('',true);
        this.getFamilyList();
        if(this.rows.length>1 || (this.rows.length===1 && this.rows[0].backend_type==='')){
            this.backend = 'local,block'
        }else{
            this.backend =this.rows[0]?.backend_type
        }
    }
    private async getHostTypes(){
        let res:any =await Service.get_host_type({})
        if(res.code==='Success'){
            this.host_types = res.data;
            this.type = this.host_types[0].type
            this.host_uses = this.host_types[0].list;
            this.use = this.host_uses[0].use_type;
        }
        
    }
    private changeType(val){
        this.host_uses = this.host_types.filter(item=>item.type===val)[0].list;
        this.use = this.host_uses.length > 0 ? this.host_uses[0].use_type : ''
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
    private async getFamilyList(val:string=""){
        let res:any=await Service.getFamilyList({
            host_ids:this.rows.map(item=>item.host_id),
            spec_family_name:val
        })
        if (res.code == 'Success'){
            this.familyList=res.data.spec_family_list;
            if(this.flagFamily)this.family = res.data.old_family_data_list;
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
            if(this.flag)this.customer_id = res.data.old_customers_data_list;
            this.flag=false;
        }
    }
    
    private async confirm(){
        let res:any =await Service.update_attribute({
            host_ids:this.rows.map(item=>item.host_id),
            host_purpose:this.use,
            host_type:this.type,
            customer_ids:this.customer_id,
            spec_family_ids:this.family,
            backend_type:this.backend
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