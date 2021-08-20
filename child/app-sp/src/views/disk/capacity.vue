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
                <el-table-column prop="disk_type" label="云盘类型"></el-table-column>
                <el-table-column prop="size" label="当前规格"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="capacity_size" label="扩容后容量">
                    <template slot-scope="scope">
                        <el-input-number size="small" v-model="scope.row.capacity_size" :step="100" :max="2000" :min="Number(scope.row.size)" @change="change_capacity"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="bill_way" label="计费方式"></el-table-column>
                <el-table-column prop="fee" label="费用"></el-table-column>
            </el-table>
        </div>
        
        <div class="footer">
            <el-checkbox v-model="isSelectedAll"></el-checkbox>
            <div class="btn">
                <el-button type="primary" @click="confirm">确定扩容</el-button>
                <el-button type="default" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator'
import backHeader from '../../components/backHeader.vue'
@Component({
    components:{
        backHeader
    }
})
export default class Capacity extends Vue{
    $route;
    $router;
    private list:any=[];
    private capacity_list:any=[];
    private isSelectedAll:boolean=false
    created() {
        console.log("list",JSON.parse(this.$route.query.list))
        this.list = JSON.parse(this.$route.query.list)
        this.list.map(item=>{
            item.capacity_size = Number(item.size)
            return item;
        })
        console.log("this.list",this.list)
    }
    @Watch("list",{immediate:true,deep:true})
    private watch_list(newVal){
        console.log("newVal",newVal)
    }
    private handleSelectionChange(val){
        this.capacity_list = val
    }
    private change_capacity(val){
        console.log("change_capacity",val)
    }
    private confirm(){
        this.$router.push('/disk')
    }
    private cancel(){
        this.$router.push('/disk')
    }
}
</script>
<style lang="scss" scoped>
.root{
    height: calc(100% - 107px);
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