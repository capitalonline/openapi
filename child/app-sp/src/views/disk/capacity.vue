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
            <div class="prompt_message m-top10 prompt" v-if="Object.keys(showResetVolume).length>0">
                <div v-for="(i,item) in usedVolume" :key="i">
                    当前可用区已购买<span class="num_message num-prompt">{{item}}</span>云盘<span class="num_message num-prompt">{{i}}</span>
                    GB,还可以购买的容量额度<span class="num_message num-prompt">{{showResetVolume[item]}}</span>GB
                </div>
            </div>
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
                        <!------ <div class="text-left">IOPS:&nbsp;{{scope.row.capacity_iops}}{{scope.row.iops_unit}}</div>
                        <div class="text-left">吞吐量：&nbsp;{{scope.row.capacity_throughput}}{{scope.row.mbps_unit}}</div> -->
                    </template>
                </el-table-column>
                <el-table-column prop="status_name" label="状态"></el-table-column>
                <el-table-column prop="size" label="扩容后容量" width="300">
                    <template slot-scope="scope">
                        <div class="expansion_spec">
                            <el-input-number 
                                size="small" 
                                v-model="scope.row.size" 
                                :step="scope.row.disk_step" 
                                :max="scope.row.disk_max" 
                                :min="scope.row.capacity_size" 
                                @blur="change_capacity(scope.$index)"
                                @change="change_capacity(scope.$index)"
                            >
                            </el-input-number>
                            <div class="m-left10">
                                <!-- max:{{scope.row.disk_max}}: -->
                                <!-- <div class="text-left">IOPS:&nbsp;{{scope.row.disk_iops}}{{scope.row.iops_unit}}</div>
                                <div class="text-left">吞吐量：&nbsp;{{scope.row.band_mbps}}{{scope.row.mbps_unit}}</div> -->
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
    private showResetVolume={}
    private volumeInfo:any=[];
    private usedVolume:any={}
    created() {
        this.list = JSON.parse(this.$route.query.list)
        this.get_customer_name()
    }
    //获取客户名称
    private async get_customer_name(){
        const resData: any = await ECS_Service.get_customer_name({customer_id: this.list[0].customer_id});
        if (resData.code == 'Success') {
            this.price_unit = resData.data.area_id;
            this.get_disk_info()
        }
    }
    private getTotalSize(type){//获取扩容的容量
        return this.capacity_list.filter(item=>item.feature.slice(0,-2)===type).reduce((pre,cur)=>{
            return pre+(cur.size-cur.capacity_size)
        },0)
    }
    private getAlerInfo(){
        this.volumeInfo=[]
        for(let i in this.showResetVolume){
            this.volumeInfo.push({feature : i,add:this.getTotalSize(i),remain:this.showResetVolume[i] - this.getTotalSize(i)})
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
            let ids = [];
            res.data.data_disk.filter(item=>item.disk_feature!=='local').map(item=>{
                ids.push(item.disk_feature)
                this.data_disk_info = Object.assign({},this.data_disk_info,{[item.disk_name]:item});
            })
            res.data.system_disk.filter(item=>{
                this.system_disk_info = Object.assign({},this.system_disk_info,{[item.disk_name]:item})
            })
            this.get_disk_limit(ids);
        }
    }
    //获取云盘各类型剩余可使用额度
    private async get_disk_limit(type){
        let res = await Create.get_disk_limit({
            customer_id:this.list[0].customer_id,
            az_id:this.list[0].az_id,
            feature:type,
        })
        if(res.code==='Success'){
            for(let i in res.data){
                this.usedVolume[i] = Math.max(res.data[i].current_volume,0)
                this.showResetVolume[i] = Math.max(res.data[i].rest_volume,0);//各类型总剩余容量;
            }
            this.$nextTick(()=>{
                this.list.map(item=>{//初始化
                    item.disk_info = item.disk_type==="data" ? this.data_disk_info[item.feature] : this.system_disk_info[item.feature];
                    item.capacity_size = item.size;
                    item.capacity_iops = getIops(item.disk_info,item.size).iops;
                    item.capacity_throughput = getIops(item.disk_info,item.size).throughput;
                    item.disk_iops = item.capacity_iops
                    item.band_mbps = item.capacity_throughput;

                    //每次改变容量最大值会变的,初始化容量最大值                    
                    let reset =Math.min(this.showResetVolume[item.feature.slice(0,-2)]+item.capacity_size,item.disk_info.disk_max)//最小为当前未扩容的额度
                    item.disk_max = reset;
                    item.disk_step = item.disk_info.disk_step
                    return item;
                })
                let disk_ids =this.list.map(item=>{
                    if(item.is_charge!==0){
                        return item.disk_id
                    }
                })
                this.get_expansion_price(disk_ids,'init')
                this.getAlerInfo()
            })            
            
        }
    }
    private async get_expansion_price(ids,label){
        const temp={}
        if(this.list.some(item=>item.size===0 || !item.size)){
            return;
        }
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
        await this.$nextTick(()=>{
            this.list.map((item,ind)=>{
                if(ind===index){
                    let size:number;
                    if(!item.size){
                        size = item.capacity_size
                    }else{
                        let newStep = Math.floor((Math.min(item.size,item.disk_max) - item.capacity_size) / item.disk_info.disk_step)
                        size = item.disk_info.disk_step*newStep + item.capacity_size
                    }                    
                    item.disk_iops = getIops(item.disk_info,size).iops
                    item.band_mbps = getIops(item.disk_info,size).throughput;
                    // this.capacity_list[index] = item
                    if(this.capacity_list.length>0) this.capacity_list[index] = item
                    this.$set(item,'size',size)
                    item.is_charge!==0 && this.get_expansion_price([this.list[index].disk_id],'change')
                }
                return item;
            })
            this.getAlerInfo()
        });
    }
    private handleSelectionChange(val){
        if(val.length===this.list.length){
            this.isSelectedAll = true
        }else{
            this.isSelectedAll = false
        }
        
        this.capacity_list = val
        this.getAlerInfo()
        
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
    }
    
    private refresh(){
        this.list.map(item=>{
            item.size = item.capacity_size;
            item.disk_iops = item.capacity_iops
            item.band_mbps = item.capacity_throughput;
            return item;
        })
        let disk_ids =get_featrues(this.list,'disk_id')
        this.get_expansion_price(disk_ids,'change')
    }
    private async confirm(){
        if(this.capacity_list.length===0){
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
            az_id:this.capacity_list[0].az_id,
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
            // display: flex;
            // align-items: center;
        }
    }
    .prompt{
        padding: 8px 16px;
        background: #fdf6ec ;
        .num-prompt{
            width: 30px;
            display: inline-block;
            margin: 0 5px;
            text-align: center;
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