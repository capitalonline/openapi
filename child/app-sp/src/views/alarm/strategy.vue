<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search">
            <template #default>
                <el-button type="primary" @click="create">创建策略</el-button>
                <el-button type="primary" @click="operate('del')">删除</el-button>
                <el-button type="primary" @click="apply">应用</el-button>
                <el-button type="primary" @click="operate('stop')">停用</el-button>
            </template>
        </action-block>
        <el-table
            :data="list"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="customer_id" label="策略名称/ID">
                <template slot-scope="scope">
                    <span>{{scope.row.name}} / {{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="instances" label="被应用过的产品">
                <template slot-scope="scope">
                    <div class="used-products">
                        <span class="app"> {{scope.row.instances ? scope.row.instances.length>2 ? `${scope.row.instances[0]};${scope.row.instances[1]};...` : scope.row.instances.join(';') : ''}}</span>
                        <i class="el-icon-document" v-if="scope.row.instances"></i>
                    </div>
                    
                </template>
            </el-table-column>
            <el-table-column prop="enable" label="策略状态">
                <template slot-scope="scope">
                    <span>{{scope.row.enable ? '已启用' :'未启用'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createTime ? moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间">
                <template slot-scope="scope">
                    <span>{{scope.row.updateTime ? moment(scope.row.updateTime).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作栏">
                <template slot-scope="scope">
                    <el-button type="text" @click="operateRecord(scope.row.disk_id)">修改</el-button>
                    <el-button type="text" @click="apply">应用</el-button>
                    <el-button type="text" @click="operateRecord(scope.row.disk_id)">停用</el-button>
                    <el-button type="text" @click="operateRecord(scope.row.disk_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[20, 50, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <template v-if="drawer">
            <ApplyStrategy :drawer="drawer" />
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import ApplyStrategy from './apply_strategy.vue'
import Service from '../../https/alarm/list'
import moment from 'moment'
@Component({
    components:{
        ActionBlock,
        ApplyStrategy
    }
})
export default class Strategy extends Vue{
    $router;
    private search:any={
        name:{placeholder:'请输入策略名称'}
    }
    private list=[{customer_id:1}]
    private drawer:Boolean=false
    private search_data:any={}
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private moment:any = moment
    created() {
        this.fn_search()
    }
    private fn_search(data:any={}){
        this.current =1
        this.search_data = data
        this.getStrategyList()
    }
    private async getStrategyList(){
        const {search_data:{name}} = this
        let res:any = await Service.get_strategy_list({
            name,
        })
        if(res.code===0){
            this.list = res.data.datas || []
            this.total = res.data.total || 0
        }

    }
    private handleSizeChange(size){
        this.size = size
        this.getStrategyList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getStrategyList()
    }
    private handleSelectionChange(){

    }
    private create(){
        this.$router.push('/alarmStrategy/create')
    }
    private operate(str:string){

    }
    private apply(){
        this.drawer=true
        console.log("this.drawer",this.drawer)
    }
}
</script>
<style lang="scss" scoped>
.used-products{
    display: flex;
    justify-content: space-between;
    align-items: center;
    i.el-icon-document{
        cursor: pointer;
    }
    .el-icon-document:before {
        content: "\e785";
        color: #455cc6;
    }
}
</style>