<template>
    <div class="customer">
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
    
</template>
<script lang="ts">
import {Vue,Component, Watch, Emit,Prop} from 'vue-property-decorator';
import Service from '../https/physical/list'
@Component({

})
export default class CustomerInput extends Vue{
    @Prop({default:()=>[]})customers!:any;
    @Prop({default:()=>[]})rows!:any;
    @Prop({default:()=>[]})list!:any;
    private customer_id:Array<string>=[];
    private customerList:any=[];
    private flag:boolean=true;
    created(){
        this.customerList = [...this.list];
        console.log("this.customerList",this.customerList,this.customers)
        this.customer_id = this.customers;
        this.getDefaultCustomerList()
    }
    private changeCustomer(val){
        if(val){
            this.customerList=[]
            // this.getCustomerList()
        }
    }
    private async getDefaultCustomerList(){
        if(this.list.length>0){
            return;
        }
        let res:any=await Service.getCustomerList({
            host_ids:this.rows.map(item=>item.host_id),
            customer_ids:this.customer_id,
        })
        if (res.code == 'Success'){
            this.customerList=res.data.customer_list;
        }
    }
    private async getCustomerList(val:string="",loading:boolean=false){
        if(!val && !loading){
            return
        };
        let res:any=await Service.getCustomerList({
            host_ids:this.rows.map(item=>item.host_id),
            customer_id:val,
        })
        if (res.code == 'Success'){
            this.customerList=res.data.customer_list;
        }
    }
    @Watch("customer_id",{immediate:true,deep:true})
    private watch_customer_id(){
        this.FnCustomer()
    }
    @Emit("FnCustomer")
    private FnCustomer(){
        return this.customer_id
    }
    
}
</script>
<style lang="scss">
    .customer{
        .el-select{
            width: 100%;
        }
        .el-select .el-tag{
            width: 100% !important;
        }
    }
    

</style>