<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search">
            <template #default>
                <el-button type="primary" @click="create" :disabled="!auth_list.includes('alarm_strategy_create')">创建策略</el-button>
                <el-button type="primary" @click="del(false)" :disabled="!auth_list.includes('delete')">删除</el-button>
                <el-button type="primary" @click="apply(true)" :disabled="!auth_list.includes('apply')">应用</el-button>
                <el-button type="primary" @click="apply(false)" :disabled="!auth_list.includes('stop')">停用</el-button>
            </template>
        </action-block>
        <el-table
            :data="list"
            border
            ref="strategy_table"
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
                        <span class="app" v-if="scope.row.instances && scope.row.instances.length>2"> {{scope.row.instances ? scope.row.instances.length>2 ? `${scope.row.instances[0].instance_name};${scope.row.instances[1].instance_name};...` : scope.row.instances.join(';') : '--'}}</span>
                        <template v-else-if="scope.row.instances.length>0 && scope.row.instances.length<=2">
                            <span v-for="(item,index) in scope.row.instances" :key="index">{{item.instance_name}}<span v-if="index!==scope.row.instances.length-1">;</span></span>
                        </template>
                        <span v-else>--</span>
                        <i class="el-icon-document" v-if="scope.row.instances" @click="go_detail(scope.row)"></i>
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
                    <el-button type="text" @click="edit(scope.row.id)" :disabled="!auth_list.includes('edit') || scope.row.enable">修改</el-button>
                    <el-button type="text" @click="detail(scope.row)" :disabled="!auth_list.includes('detail')">详情</el-button>
                    <el-button type="text" @click="apply(true,scope.row)" :disabled="!auth_list.includes('apply')">{{scope.row.enable ? '应用详情' :'应用'}}</el-button>
                    <el-button type="text" @click="apply(false,scope.row)" :disabled="!scope.row.enable || !auth_list.includes('stop')">停用</el-button>
                    <el-button type="text" @click="del(scope.row)" :disabled="!auth_list.includes('delete') || scope.row.enable">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[2,20, 50, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <template v-if="drawer">
            <ApplyStrategy :drawer.sync="drawer" :list = "strategy_rows" :enable="enable" @close="close_apply" />
        </template>
        <template v-if="del_visible">
            <common-del :visible.sync="del_visible" :title="'删除策略'" :rows="strategy_rows" @close ="close_apply" />
        </template>
        <template v-if="detail_visible">
            <apply-detail :visible.sync="detail_visible" :rows="strategy_rows" @close="close_apply" />
        </template>
        <template v-if="strategy_detail">
            <Detail :visible.sync="strategy_detail" :rows="strategy_rows" @close="close_apply" />
        </template>
        
    </div>
</template>
<script lang="ts">
import { Component, Vue,Watch } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import ApplyStrategy from './apply_strategy.vue';
import Detail from './strategy_detail.vue'
import Service from '../../https/alarm/list'
import CommonDel from './commonDel.vue';
import ApplyDetail from './apply_product_detail.vue'
import moment from 'moment';
import {Table} from 'element-ui'
@Component({
    components:{
        ActionBlock,
        ApplyStrategy,
        CommonDel,
        ApplyDetail,
        Detail
    }
})
export default class Strategy extends Vue{
    $router;
    $route;
    private search:any={
        name:{placeholder:'请输入策略名称'}
    }
    private list=[]
    private drawer:Boolean=false
    private search_data:any={}
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private moment:any = moment;
    private del_visible:boolean=false;
    private detail_visible:Boolean=false
    private strategy_detail:Boolean=false
    private strategy_rows:any=[]
    private enable:Boolean=true;
    private auth_list:any=[]
    created() {
        this.fn_search()
        this.auth_list=this.$store.state.auth_info[this.$route.name]
    }
    @Watch("drawer")
    private watch_drawer(newVal){
        this.clear_info(newVal)
    }
    @Watch("del_visible")
    private watch_del_visible(newVal){
        this.clear_info(newVal)
    }
    @Watch("strategy_detail")
    private watch_strategy_detail(newVal){
        this.clear_info(newVal)
    }
    private clear_info(newVal){
        if(!newVal){
            this.strategy_rows=[]
            this.toggleSelection()
        }
    }
    private toggleSelection() {
        const table = this.$refs.strategy_table as Table
        table.clearSelection()
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
            page:this.current,
            pageSize:this.size,
        })
        if(res.code==='Success'){
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
    private go_detail(row){
        this.strategy_rows=[row]
        this.detail_visible=true
    }
    private edit(id:string){
        this.$router.push({path:'/alarmStrategy/create',query:{id}})
    }
    private detail(row){
        this.strategy_rows=[row]
        this.strategy_detail=true
    }
    private del(ids){
        if(!ids && this.strategy_rows.length===0){
            this.$message.warning("请先勾选策略！")
            return;
        }
        if(!this.strategy_rows.every(item=>!item.enable)){
            this.$message.warning("已启用的策略不能被删除！")
            return;
        }
        if(ids){
            this.strategy_rows=[ids]
        }
        this.del_visible=true
    }
    private async stop(){
        const temp:any=[]
        this.strategy_rows.map(item=>{
            const {az,callbackURL,contactGroupIDs,customerID,regions,silentPeriod,effectStartTime,effectEndTime,enable,id,name} =item
            let obj={
                az,
                callbackURL,
                contactGroupIDs,
                customerID,
                regions,
                silentPeriod,
                effectStartTime,
                effectEndTime,
                enable:!enable,
                id,
                name
            }
            temp.push(obj)
            return item;
        })
        let res:any = await Service.apply_strategy({
            data:temp
        })
        if(res.code==='Success'){
            this.$message.warning("停用策略任务下发成功！")
            this.strategy_rows=[]
            this.getStrategyList()
        }
    }
    private apply(enable:Boolean,row:any){
        if(row) this.strategy_rows=[row];
        if(!row && this.strategy_rows.length===0){
            this.$message.warning("请先勾选策略！")
            return;
        }
        if(!row && !this.strategy_rows.every(item=>item.enable===!enable)){
            this.$message.warning(`只允许对${enable ? '未应用' :'已应用'}的策略执行批量操作！`)
            return;
        }
        if(!enable){
            const names = this.strategy_rows.map(item=>item.name);
            const h = this.$createElement;
            this.$msgbox({
                title: '提示',
                message: h('p', null, [
                    h('span', null, '确定停用 '),
                    h('i', { style: 'color: #455cc6' }, `${names.join(',')}`),
                    h('span', null, '  这些策略吗, 是否继续?'),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                iconClass: 'el-icon-warning',
                }).then(() => {
                    this.stop()
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消停用'
                    }); 
                    this.strategy_rows=[]
                    this.toggleSelection()

            })
        }else{
            this.drawer=true
            this.enable = enable
        }
        
    }
    private close_apply(val){
        this.strategy_rows=[]
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