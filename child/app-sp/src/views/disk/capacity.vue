<template>
    <div class="root">
        <back-header title="云盘扩容" back_url="/disk">
            <template #default>
                <el-button type="text" class="remove" @click="remove">移除</el-button>
                <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh" ></svg-icon></el-button>
            </template>

        </back-header>
        <div class="content">
            <el-alert
                title="仅支持对实例状态为运行且云盘状态为使用中，或云盘状态为待挂载的云盘执行扩容操作"
                type="warning"
                :closable="false">
            </el-alert>
            <el-table
                :data="list"
                border
                ref="capacity_table"
                @selection-change="handleSelectionChange"
                >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="disk_id" label="云盘名称/ID">
                    <template slot-scope="scope">
                        <pre>{{scope.row.disk_name}} / {{scope.row.disk_id}}</pre>
                    </template>
                </el-table-column>
                <el-table-column prop="az_name" label="可用区"></el-table-column>
                <el-table-column prop="feature" label="云盘类型"></el-table-column>
                <el-table-column prop="capacity_size" label="当前规格">
                    <template slot-scope="scope">
                        <span>容量：&nbsp;{{scope.row.capacity_size}}GB</span>
                        <div class="text-left">IOPS:&nbsp;{{scope.row.capacity_iops}}{{scope.row.iops_unit}}</div>
                        <div class="text-left">吞吐量：&nbsp;{{scope.row.capacity_throughput}}{{scope.row.mbps_unit}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="status_name" label="状态"></el-table-column>
                <el-table-column prop="size" label="扩容后容量" width="300">
                    <template slot-scope="scope">
                        <div class="expansion_spec">
                            <el-input-number 
                                size="small" 
                                v-model="scope.row.size" 
                                :step="get_step_max(scope.row).step" 
                                :max="scope.row.disk_max" 
                                :min="scope.row.capacity_size" 
                                @blur="change_capacity(scope.$index)"
                                @change="change_capacity(scope.$index)"
                            >
                            </el-input-number>
                            <div class="m-left10">
                                max:{{scope.row.disk_max}}:
                                <div class="text-left">IOPS:&nbsp;{{scope.row.disk_iops}}{{scope.row.iops_unit}}</div>
                                <div class="text-left">吞吐量：&nbsp;{{scope.row.band_mbps}}{{scope.row.mbps_unit}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bill_way" label="计费方式">
                    <template slot-scope="scope">
                        <span>{{!scope.row.billing_method_display ? '不计费' : scope.row.billing_method_display}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="fee" label="费用">
                    <template slot-scope="scope">
                        <span v-if="scope.row.is_charge===0">{{scope.row.fee}}</span>
                        <span class="num_message" v-else>{{scope.row.fee}}</span>
                        
                    </template>
                     
                </el-table-column>
            </el-table>
        </div>
        
        <div class="footer">
            <el-checkbox v-model="isSelectedAll" @change="select_all"></el-checkbox>
            <div class="btn">
                <el-button type="primary" @click="confirm">确认扩容</el-button>
                <el-button type="default" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator'
import backHeader from '../../components/backHeader.vue'
import Service from '../../https/disk/list'
import Create from '../../https/disk/create'
import ECS_Service from '../../https/instance/create';
import {Table} from 'element-ui'
import getIops from '../../utils/getIops'
import { deal_list, deal_fee_info,get_featrues } from '../../utils/transIndex'
import svgIcon from '../../components/svgIcon/index.vue'
@Component({
    components:{
        backHeader,
        svgIcon
    }
})
export default class Capacity extends Vue{
    $route;
    $router;
    $message
    private list:any=[];
    private capacity_list:any=[];
    private isSelectedAll:boolean=false
    private data_disk_info:any=null
    private system_disk_info:any=null
    private billing_info = {}
    private price_unit:string= "￥";
    private restVolume={};
    private showResetVolume={}
    created() {
        this.list = JSON.parse(this.$route.query.list)
        this.get_customer_name()
        console.log("this.list",this.list)
    }
    //获取客户名称
    private async get_customer_name(){
        const resData: any = await ECS_Service.get_customer_name({customer_id: this.list[0].customer_id});
        if (resData.code == 'Success') {
            this.price_unit = resData.data.area_id;
            this.get_disk_info()
        }
    }
    private get_step_max(row){
        return this.data_disk_info && this.system_disk_info ? {
            step:row.disk_type==='data' ? this.data_disk_info[row.feature].disk_step : this.system_disk_info[row.feature].disk_step,
            // max:row.disk_type==='data' ? this.data_disk_info[row.feature].disk_max : this.system_disk_info[row.feature].disk_max
        }:{
            step:1,
            // max:row.size
        }
    }
    private async get_disk_info(){
        let res:any = await Create.get_disk_type({
            customer_id:this.list[0].customer_id,
            az_id:this.list[0].az_id,
            billing_method:'0'
        })
        if(res.code==="Success"){
            this.billing_info = res.data.billing_info;
            res.data.data_disk.filter(item=>item.disk_feature==="HDD" || item.disk_feature==="SSD").map(item=>{
                this.data_disk_info = Object.assign({},this.data_disk_info,{[item.disk_name]:item});
            })
            res.data.system_disk.filter(item=>{
                this.system_disk_info = Object.assign({},this.system_disk_info,{[item.disk_name]:item})
            })
            this.get_disk_limit(res.data.data_disk.map(item=>item.disk_feature));
        }
    }
    //获取当前扩容列表指定类型所使用容量
    private getTypeUsed(feature){
        let fil = this.list.filter(item=>item.feature===feature)
        return fil.reduce((pre,cur)=>{
            return pre+cur.size
        },0)
    }
    //获取云盘各类型剩余可使用额度
    private async get_disk_limit(type){
        console.log("type",type)
        let res = await Create.get_disk_limit({
            customer_id:this.list[0].customer_id,
            az_id:this.list[0].az_id,
            feature:type,
        })
        if(res.code==='Success'){
            for(let i in res.data){
                this.showResetVolume[i] = res.data[i].rest_volume;//各类型总剩余容量;
                this.restVolume[type] = res.data.rest_volume;//各类型总剩余容量;
            }
            this.$nextTick(()=>{
                this.list.map(item=>{//初始化
                    item.capacity_size = item.size;
                    item.capacity_iops = item.disk_type==="data" ? getIops(this.data_disk_info[item.feature],item.size).iops : getIops(this.system_disk_info[item.feature],item.size).iops;
                    item.capacity_throughput = item.disk_type==="data" ? getIops(this.data_disk_info[item.feature],item.size).throughput : getIops(this.system_disk_info[item.feature],item.size).throughput;
                    item.disk_iops = item.capacity_iops
                    item.band_mbps = item.capacity_throughput;
                    item.disk_info = item.disk_type==="data" ? this.data_disk_info[item.feature] : this.system_disk_info[item.feature];

                    //每次改变容量最大值会变的,初始化容量最大值
                    let reset =Math.max(Math.min(this.showResetVolume[item.disk_info.disk_feature],item.disk_info.disk_max),item.capacity_size)
                    item.disk_max = reset;
                    return item;
                })
                let disk_ids =this.list.map(item=>{
                    if(item.is_charge!==0){
                        return item.disk_id
                    }
                })
                console.log("get_disk_limit",this.list)
                this.get_expansion_price(disk_ids,'init')
            })            
            
        }
    }
    private async get_expansion_price(ids,label){
        const temp={}
        this.list.map(item=>{
            if(ids.includes(item.disk_id)){
                const {ebs_goods_id,gic_goods_id,feature,size,disk_iops,band_mbps} = item
                temp[item.disk_id]={
                    billing_method:'0',
                    ebs_goods_id,
                    gic_goods_id,
                    disk_feature:feature,
                    handling_capacity:band_mbps,
                    iops:disk_iops,
                    storage_space:size,
                }
            }
        })
        let res:any=await Create.get_capacity_price({
            customer_id:this.list[0].customer_id,
            az_id:this.list[0].az_id,
            disks:{...temp}
        })
        if(res.code==="Success"){
            let disks = res.data.disks
            this.list.map(item=>{
                let fee:string;
                if(ids.includes(item.disk_id)){//初始化时为计费云盘
                    fee = `${res.data.price_symbol}${disks[item.disk_id].toFixed(2)}/${res.data.price_unit}`
                    
                }else{//初始化时未计费的云盘
                    if(label==="change"){
                        return;
                    }
                    fee=this.price_unit==="$" ? "$0.00/day" : "￥0.00/天"
                }
                this.$set(item, 'fee', fee);
                return item;
            })
        }
    }
    private async change_capacity(index){
        let content:any = this.list[index];
        let used = 
        console.log("content",content)
        let reset =Math.max(Math.min(this.showResetVolume[content.disk_info.disk_feature],content.disk_max),content.capacity_size)
        let size;
        if(!this.list[index].size){
            size =  this.list[index].capacity_size
        }else{
            size = Math.min(content.disk_max,this.list[index].size) //不能超过最大值
            let newStep = Math.floor((size-content.disk_info.disk_min)/content.disk_info.disk_step)
            size = newStep*content.disk_info.disk_step + content.disk_info.disk_min;
        }
        
        //size为当前使用量,可能是余量
        let add:number = size - content.capacity_size//增加的
         this.list[index].disk_iops = getIops(content.disk_info,size).iops;
         this.list[index].band_mbps = getIops(content.disk_info,size).throughput;
         this.list.map((item,ind)=>{
             if(ind===!index){
                 item.disk_max = Math.max((item.disk_max - add),item.size)
             }
             return item;
         })
        if(!this.list[index].size){
            await this.$nextTick(()=>{
                this.$set(this.list[index],'size',size)
                this.$set(this.list[index],'disk_max',reset)
            })
        }else{
            this.$set(this.list[index],'size',size)
            this.$set(this.list[index],'disk_max',reset)
        }
        
        this.list[index].is_charge!==0 && this.get_expansion_price([this.list[index].disk_id],'change')
    }
    private handleSelectionChange(val){
        if(val.length===this.list.length){
            this.isSelectedAll = true
        }else{
            this.isSelectedAll = false
        }
        
        this.capacity_list = val
        
    }
    private select_all(check){
        const table = this.$refs.capacity_table as Table
        if(check){
            table.toggleAllSelection()
        }else{
            table.clearSelection()
        }
    }
    private remove(){
        if(this.capacity_list.length===0){
            this.$message.warning("请先勾选需要移除的云盘")
            return;
        }
        if(this.capacity_list.length===this.list.length){
            this.$message.warning("至少保留一块云盘")
            return;
        }
        let ids = get_featrues(this.capacity_list,'disk_id')
        this.list = this.list.filter(item=>!ids.includes(item.disk_id))
        
        this.list.map((item,ind)=>{//扩容时只计算改变了的
            // let used = this.getTypeRemain()//获取当前页面已用额度
            let info = item.disk_type==="data" ? this.data_disk_info : this.system_disk_info;
            //每次改变容量最大值会变的
            // item.disk_max = this[`${item.disk_type}Remain`][item.feature] > info[item.feature].disk_max ? info[item.feature].disk_max : this[`${item.disk_type}Remain`][item.feature]
            return item;
        })
    }
    
    private refresh(){
        this.list.map(item=>{
            item.size = item.capacity_size;
            item.disk_iops = item.capacity_iops
            item.band_mbps = item.capacity_throughput;
            let info = item.disk_type==="data" ? this.data_disk_info : this.system_disk_info;
            // item.disk_max = this[`${item.disk_type}Remain`][item.feature] > info[item.feature].disk_max ? info[item.feature].disk_max : this[`${item.disk_type}Remain`][item.feature]
            return item;
        })
        let disk_ids =get_featrues(this.list,'disk_id')
        this.get_expansion_price(disk_ids,'change')
    }
    private async confirm(){
        if(this.capacity_list.length===0){
            console.log("Aaa")
            this.$message.warning("请先勾选需要扩容的云盘")
            return;
        }
        const label_list=['ecs_goods_id','gic_goods_id','disk_feature','is_charge','disk_id','disk_type','current_spec','current_iops','current_storage','status','storage_space','iops','handling_capacity']
        const key_list=['ebs_goods_id','gic_goods_id','feature','is_charge','disk_id','disk_type','capacity_size','capacity_iops','capacity_throughput','status','size','disk_iops','band_mbps']
        let expansion_info = deal_list(this.capacity_list,label_list,key_list)
        let bill_info = deal_fee_info(this.billing_info)
        for (let i in bill_info){
            bill_info[i].gic_goods_id= this.billing_info[i].gic_goods_id
        }
        let res:any=await Service.expansion({
            customer_id:this.capacity_list[0].customer_id,
            expansion_info: expansion_info,
            disk_ids:this.capacity_list.map(item=>item.disk_id),
            billing_info:bill_info

        })
        if (res.code ==='Success') {
            this.$message.success("云盘扩容任务下发成功！")
        }
        this.$router.push('/disk')
    }
    private cancel(){
        this.$router.push('/disk')
    }
}
</script>
<style lang="scss" scoped>
.root{
    .content{
        // height: calc(100% - 163px);
        // overflow-y: auto;
        margin-bottom: 56px;
        .expansion_spec{
            text-align: center;
            display: flex;
            align-items: center;
        }
    }
    .footer{
        display: flex;
        justify-content: space-between;
        background: #fff;
        box-shadow: 0px -2px 5px #dde2ef;
        position: fixed;
        height: 56px;
        line-height: 56px;
        width: calc(100% - 200px);
        margin-left: -20px;
        z-index: 999;
        bottom: 0;
        .el-checkbox{
            margin-left:24px;
        }
        .btn{
            margin-right: 20px;
        }
        .el-button:first-child{
            margin-right: 10px;
        }
    }
}

</style>