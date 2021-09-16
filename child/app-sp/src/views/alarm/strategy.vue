<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search">
            <template #default>
                <el-button type="primary" @click="create">创建策略</el-button>
                <el-button type="primary" @click="del">删除</el-button>
                <el-button type="primary" @click="apply(true)">应用</el-button>
                <el-button type="primary" @click="apply(false)">停用</el-button>
            </template>
        </action-block>
        <el-table
            :data="list"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="策略名称/ID">
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
                    <el-button type="text" @click="edit(scope.row.id)">修改</el-button>
                    <el-button type="text" @click="apply(true)" :disabled="scope.row.enable">应用</el-button>
                    <el-button type="text" @click="apply(false,scope.row)" :disabled="!scope.row.enable">停用</el-button>
                    <el-button type="text" @click="del(scope.row)">删除</el-button>
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
        <ApplyStrategy :drawer.sync="drawer" :list = "strategy_rows" :enable="enable" @close="close_apply" />
        <el-dialog
            title="删除策略"
            :visible.sync="del_visible"
            width="960px"
            :destroy-on-close="true"
            @close="cancel"
        >
            <div class="mount">
                确认删除
                <span v-for="(item,index) in strategy_rows" :key="item.id">{{item.name}}
                    <span v-if="index===strategy_rows.length-1">,</span>
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirm">确认</el-button>
                <el-button @click="cancel">取消</el-button>
            </span>
        </el-dialog>
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
    private moment:any = moment;
    private del_visible:boolean=false;
    private strategy_rows:any=[]
    private enable:Boolean=true
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
    private handleSelectionChange(val){
        this.strategy_rows = val
    }
    private create(){
        this.$router.push('/alarmStrategy/create')
    }
    private edit(id:string){
        this.$router.push({path:'/alarmStrategy/create',query:{id}})
    }
    private del(ids){
        if(!ids && this.strategy_rows.length===0){
            this.$message.warning("请先勾选策略！")
            return;
        }
        if(ids){
            this.strategy_rows=[ids]
        }
        this.del_visible=true
    }
    private cancel(){
        this.strategy_rows=[]
        this.del_visible=false
    }
    private confirm(){
        const ids = this.strategy_rows.map(item=>item.id)
        let res:any=Service.delete_strategy({
            ids
        })
        if(res.code===0){
            this.$message.success('删除策略任务下发成功！');
            console.log("aaa")
            this.cancel()
            this.getStrategyList()
        }
    }
    private operate(str:string){

    }
    private apply(enable:Boolean,row:any){
        if(row) this.strategy_rows=[row];
        if(!row && this.strategy_rows.length===0){
            this.$message.warning("请先勾选策略！")
            return;
        }
        if(!this.strategy_rows.every(item=>item.enable===!enable)){
            this.$message.warning(`只允许对${enable ? '未应用' :'已应用'}的策略执行批量操作！`)
            return;
        }
        this.drawer=true
        this.enable = enable
    }
    private close_apply(val){
        val==='1' && this.getStrategyList()
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