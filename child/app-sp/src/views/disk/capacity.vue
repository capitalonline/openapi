<template>
    <div class="root">
        <back-header title="云盘扩容" back_url="/disk"></back-header>
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
                    </template>
                </el-table-column>
                <el-table-column prop="status_name" label="状态"></el-table-column>
                <el-table-column prop="size" label="扩容后容量">
                    <template slot-scope="scope">
                        <el-input-number 
                            size="small" 
                            v-model="scope.row.size" 
                            :step="get_step_max(scope.row.disk_type,scope.row.feature).step" 
                            :max="get_step_max(scope.row.disk_type,scope.row.feature).max" 
                            :min="scope.row.capacity_size" 
                            step-strictly
                            @blur="change_capacity(scope.row.size,scope.row.disk_type,scope.row.feature,scope.$index,scope.row.disk_id)"
                        >
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="bill_way" label="计费方式"></el-table-column>
                <el-table-column prop="fee" label="费用"></el-table-column>
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
import {Table} from 'element-ui'
import getIops from '../../utils/getIops'
import { deal_list, get_featrues } from '../../utils/transIndex'

@Component({
    components:{
        backHeader
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
    created() {
        this.list = JSON.parse(this.$route.query.list)
        this.list.map(item=>{
            item.capacity_size = item.size
            return item;
        })
        this.get_disk_info()
    }
    private get_step_max(type,id){
        return this.data_disk_info && this.system_disk_info ? {
            step:type==='data' ? this.data_disk_info[id].disk_step : this.system_disk_info[id].disk_step,
            max:type==='data' ? this.data_disk_info[id].disk_max : this.system_disk_info[id].disk_max
        }:{
            step:1,
            max:100
        }
    }
    private async get_disk_info(){
        let res:any = await Create.get_disk_type({
            customer_id:this.list[0].customer_id,
            az_id:this.list[0].az_id,
            billing_method:'0'
        })
        if(res.code==="Success"){
            res.data.data_disk.filter(item=>item.disk_feature==="HDD" || item.disk_feature==="SSD").map(item=>{
                this.data_disk_info = Object.assign({},this.data_disk_info,{[item.disk_name]:item});
            })
            res.data.system_disk.filter(item=>{
                this.system_disk_info = Object.assign({},this.system_disk_info,{[item.disk_name]:item})
            })
            this.list.map(item=>{
                item.disk_iops = item.disk_type==="data" ? getIops(this.data_disk_info[item.feature],item.size).iops : getIops(this.system_disk_info[item.feature],item.size).iops;
                item.band_mbps = item.disk_type==="data" ? getIops(this.data_disk_info[item.feature],item.size).throughput : getIops(this.system_disk_info[item.feature],item.size).throughput;
                return item;
            })
        }
    }
    private change_capacity(origin_size,type,disk_name,index,disk_id){
        let size = origin_size ? origin_size : this.list[index].capacity_size
        if(!origin_size){
            this.list.map((item,ind)=>{
                if(ind===index){
                    item.size = size
                }
                return item;
            })
        }
        this.list[index].disk_iops = type==="data" ? getIops(this.data_disk_info[disk_name],size).iops : getIops(this.system_disk_info[disk_name],size).iops;
        this.list[index].band_mbps = type==="data" ? getIops(this.data_disk_info[disk_name],size).throughput : getIops(this.system_disk_info[disk_name],size).throughput;
        let ids = get_featrues(this.capacity_list,'disk_id')
        this.list.map((item,index)=>{
            if(ids.includes(item.disk_id)){
                this.capacity_list[index] = item
            }
        })
        
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
    private async confirm(){
        if(this.capacity_list.length===0){
            this.$message.success("请先勾选需要扩容的云盘")
            return;
        }
        const label_list=['disk_id','disk_type','current_spec','storage_space','iops','handling_capacity']
        const key_list=['disk_id','disk_type','capacity_size','size','disk_iops','band_mbps']
        let expansion_info = deal_list(this.capacity_list,label_list,key_list)
        let res:any=await Service.expansion({
            customer_id:this.capacity_list[0].customer_id,
            expansion_info: expansion_info
        })
        if (res.code == 'Success') {
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