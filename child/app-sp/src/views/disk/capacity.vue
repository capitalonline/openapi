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
                        <span>{{scope.row.disk_name}} / {{scope.row.disk_id}}</span>
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
                        <el-input-number size="small" v-model="scope.row.size" :step="scope.row.disk_type==='data' ? 128 : 8" :max="scope.row.disk_type==='data' ? 2048 : 504" :min="Number(scope.row.capacity_size)"></el-input-number>
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
import {Table} from 'element-ui'
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
    created() {
        this.list = JSON.parse(this.$route.query.list)
        this.list.map(item=>{
            item.capacity_size = item.size
            return item;
        })
        console.log("this.list",this.list)
    }
    // @Watch("list",{immediate:true,deep:true})
    // private watch_list(newVal){
    //     console.log("newVal",newVal,this.list)
    // }
    private handleSelectionChange(val){
        if(val.length===this.list.length){
            this.isSelectedAll = true
        }else{
            this.isSelectedAll = false
        }
        
        this.capacity_list = val
        
    }
    private select_all(check){
        console.log("check",check)
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
        const temp:any=[];
        this.capacity_list.forEach(item=>{
            temp.push({
                disk_id:item.disk_id,
                disk_type:item.disk_type,
                current_spec:parseInt(item.capacity_size),
                status:item.status,
                expansion_spec:parseInt(item.size),
            })
        })
        console.log("capacity_list",this.capacity_list)
        let res:any=await Service.expansion({
            customer_id:this.capacity_list[0].customer_id,
            expansion_info:temp
        })
        if (res.code == 'Success') {
            this.$message.success("扩容成功")
            
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
        height: calc(100% - 163px);
        overflow-y: auto;
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