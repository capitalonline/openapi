<template>
    <div class="ecs-snapshot">
        <template v-if="type!=='detail'">
            <search-bar :search_option="search_option" @fn-search = "FnSearch" :action_icon_option="action_btns" @fn-icon="operateIcon"></search-bar>
        </template>
        <!-- <list-table ref="list_table"></list-table> -->
        <el-table
            ref="snapshot_table"
            :data="list"
            @selection-change="handleSelectionChange"
            @filter-change="handleFilter"
        >
            <el-table-column type="selection" />
            <el-table-column 
                v-for="item in column_list" 
                :key="item.prop" 
                :prop="item.prop" 
                :label="item.label" 
                :column-key="item.prop"
                :filters ="item.column_key? item.filters : null"
                :filter-multiple="false"
            >
                <template #default="scope" v-if="item.prop==='snapshot_id'">
                    <div>
                        <el-tooltip 
                            placement="right" 
                            popper-class="tooltip-width"
                            effect="light">
                            <div slot="content">{{scope.row.snapshot_name}}</div>
                            <div class="num_message">
                                <pre>{{ scope.row.snapshot_name }}</pre> 
                            </div>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip 
                        :content="scope.row.snapshot_id" 
                        placement="bottom" 
                        effect="light">
                            <span>{{ scope.row.snapshot_id }}</span>
                        </el-tooltip>
                    </div>
                </template>
                <template #default="scope" v-else-if="item.prop==='disk_id'">
                    <div>
                        <el-tooltip 
                            placement="right" 
                            popper-class="tooltip-width"
                            effect="light">
                            <div slot="content">{{scope.row.disk_name}}</div>
                            <div>
                                <pre class="num_message">{{ scope.row.disk_name }}</pre>
                            </div>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip 
                        :content="scope.row.disk_id" 
                        placement="bottom" 
                        effect="light">
                            <span>{{ scope.row.disk_id }}</span>
                        </el-tooltip>
                    </div>
                </template>
                <template #default="scope" v-else-if="item.prop==='disk_size'">
                    <span>{{scope.row.disk_type==='data' ? '数据盘' : '系统盘'}}/</span>
                    <span>{{scope.row.disk_size}}GB</span>
                </template>
                <template #default="scope" v-else-if="item.prop==='az_name'">
                    <span>{{scope.row.region_name}}-{{scope.row.az_name}}</span>
                </template>
                <template #default="scope" v-else-if="item.prop==='snapshot_status_cn'">
                    <span :class="scope.row.snapshot_status">{{scope.row.snapshot_status_cn}}</span>
                </template>
                <template #default="scope" v-else-if="item.prop==='disk_status_cn'">
                    <span :class="scope.row.disk_status">{{scope.row.disk_status_cn}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text">操作记录</el-button>
                </template>
             </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.page_index"
            :page-sizes="[20, 50, 100]"
            :page-size="pageInfo.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch,Prop } from 'vue-property-decorator';
import Service from '../../https/snapshot/list';
import SvgIcon from '../../components/svgIcon/index.vue';
// import Clipboard from '../../components/clipboard.vue';
import SearchBar from '../../components/search/actionBlock.vue'
// import { FnGetRegion } from "../../utils/getRegionInfo";
interface Page{
    page_size:number,
    page_index:number,
    total:number,
    page_sizes?:Array<number>
}
@Component({
    components:{
        SvgIcon,
        // Clipboard,
        SearchBar,
    }
})
export default class Snapshot extends Vue {
    @Prop({default:'list'})type!:string;
    @Prop({default:''})snapshot_chains_id!:string;
    private diskTypeList:any=[
            {text:'系统盘',value:'system'},
            {text:'数据盘',value:'data'}
        ]
    private search_option:any={
        snapshot_id:{placeholder:'请输入快照ID'},
        snapshot_name:{placeholder:'请输入快照名称'},
        disk_id:{placeholder:'请输入云盘ID'},
        customer_id:{placeholder:'请输入客户ID'},
        customer_name:{placeholder:'请输入客户名称'},
    }
    private column_list=this.type==='list'? [
        {prop:'customer_id',label:'客户ID'},
        {prop:'customer_name',label:'客户名称'},
        {prop:'disk_id',label:'云盘名称/ID'},
        {prop:'disk_status_cn',label:'云盘状态'},
        {prop:'disk_size',label:'属性/容量'},
        {prop:'az_name',label:'可用区'},
        {prop:'snapshot_id',label:'快照名称/ID'},
        {prop:'create_time',label:'创建时间'},
        {prop:'retention_time',label:'保留时间'},
        {prop:'snapshot_status_cn',label:'状态'},
        {prop:'op_source',label:'创建来源'},
    ] : [
        {prop:'snapshot_id',label:'快照名称/ID'},
        {prop:'create_time',label:'创建时间'},
        {prop:'retention_time',label:'保留时间'},
        {prop:'snapshot_status_cn',label:'状态'},
    ]
    private search_data:any = {};
    private action_btns:Array<string>=['refresh'];
    private diskObj={
        system:'系统盘',
        data:'数据盘'
    }
    private operate=[
        {label:'删除',value:'del'},
        {label:'回滚云盘',value:'rollback'},
        // {label:'创建自定义镜像',value:'createImg'},
        {label:'修改快照名称',value:'editName'},

    ]
    private timer=null
    private list=[];
    private multiSelect:any=[];
    private visible:boolean=false;
    private statusObj:any={
        msg:'',
        status:true
    }
    private operateType:String='';
    private rollbackCheck:boolean=true;
    // private search_data:any={};
    private filterInfo:any={}
    private pageInfo:Page={
        page_size:20,
        page_index:1,
        total:0,
    }
    created() {
        // if (this.$route.name === "render_snapshot_list") {
        //     FnGetRegion().then(() => {
        //         this.$store.commit("SET_REGION_ID", "");
        //     });
        // }
        // this.getStatusList();
        this.getSnapshotList();
    }
   
    private FnSearch(data:any={}){        
        this.FnClearTimer()
        this.search_data = {...data};
        this.pageInfo.page_index=1;
        this.getSnapshotList()
    }
    @Watch("visible")
    private watch_visible(nv){
        if(!nv){
            this.getSnapshotList();
            this.operateType='';
            this.multiSelect=[]
        }
    }
    public async getSnapshotList(loading = true){
        let multiple_selection = [];
        if (!loading) {
            this.$store.commit('SET_LOADING', false);
            multiple_selection = this.multiSelect.map((row: any) => {
                return row.snapshot_id;
            });
        }
        const data = this.search_data;
        let res:any = await Service.get_snapshot_list({
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
            ...this.search_data
        })
        if(res.code==='Success'){
            this.list = res.data.snapshot_list;
            this.pageInfo.total = res.data.page_info.count;
            var rows = [];
            if (multiple_selection.length > 0) {
                rows = res.data.snapshot_list.filter(row => multiple_selection.includes(row.snapshot_id));
            }
            if (rows && rows.length > 0) {
                this.$nextTick(() => {
                    rows.forEach(row => {
                        (this.$refs.snapshot_table as any).toggleRowSelection(row);
                    })
                })
            }
        } 
        this.FnSetTimer()
    }
    // 下发定时任务前清除已有定时任务
  private FnSetTimer() {
    if (this.timer) {
      this.FnClearTimer();
    }
    this.timer = setTimeout(() => {
      this.getSnapshotList(false)
    }, 1000*5)
  }
  private FnClearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
    private operateIcon(icon){
        this.FnClearTimer()
        this.getSnapshotList(false)
    }
    private handleSelectionChange(data){
        this.multiSelect = data
    }
    private handleFilter(obj:any){
        this.FnClearTimer()
        this.filterInfo={...this.filterInfo,...obj}
        console.log('filterInfo',this.filterInfo)
        this.getSnapshotList()
    }
    private handleSizeChange(size){
        this.FnClearTimer()
        this.pageInfo = {...this.pageInfo,page_size:size}
        this.getSnapshotList()
    }
    private handleCurrentChange(cur){
        this.FnClearTimer()
        this.pageInfo = {...this.pageInfo,page_index:cur}
        this.getSnapshotList()
    }
    public del(){
        this.FnClearTimer()
        if(this.multiSelect.length===0){
            this.$message.warning('请选择快照')
            return;
        }
        if(this.multiSelect.some(item=>!['running','create_fail'].includes(item.snapshot_status))){
            this.$message.warning('仅支持删除可用或创建失败的快照')
            return;
        }
        this.visible=true;
        this.operateType='del'

    }
    private getStatus(val,row){
        let msg:string='';
        let status:boolean=true
        if(val==='rollback'){
            if(row.snapshot_status!=='running'){
                msg = `只有可用状态的快照才可以回滚云盘,当前快照状态${row.snapshot_status_cn}`;
                status=false
                // this.$message.warning(`只有可用状态的快照才可以回滚云盘,当前快照状态${row.snapshot_status_cn}`);
                // return;
            }
            if(!['running','waiting'].includes(row.disk_status)){
                msg =`只有待挂载或使用中的云盘才可以回滚云盘,当前云盘状态${row.disk_status_cn}`;
                status=false
                // this.$message.warning(`只有待挂载或使用中的云盘才可以回滚云盘,当前云盘状态${row.disk_status_cn}`);
                // return;
            }
            if(row.disk_status==='running' && row.ecs_status!=='shutdown'){
                msg = `使用中的云盘只有已关机的实例才可以回滚云盘,当前实例状态${row.ecs_status_cn}`;
                status=false
                // this.$message.warning(`使用中的云盘只有已关机的实例才可以回滚云盘,当前实例状态${row.ecs_status_cn}`);
                // return;
            }
            // if(!(row.snapshot_status==='running' && ((row.disk_status==='running' && row.ecs_status==='shutdown') || row.disk_status==='waiting'))){
            //     this.$message.warning('当前状态不支持回滚云盘')
            //     return;
            // }
        }else if(val==='del'){
            if(!['running','create_fail'].includes(row.snapshot_status)){
                msg = '仅支持删除可用或创建失败的快照';
                status=false
                // this.$message.warning('仅支持删除可用或创建失败的快照')
                // return;
            }
        }else{
            if(row.snapshot_status!=='running'){
                msg = '当前状态不支持修改快照名称';
                status=false
                // this.$message.warning('当前状态不支持修改快照名称')
                // return;
            }
        }
        return ({
            msg,
            status
        })
    }
    private handle(val,row){
        this.FnClearTimer()
        // if(val==='rollback'){
        //     if(row.snapshot_status!=='running'){
        //         this.$message.warning(`只有可用状态的快照才可以回滚云盘,当前快照状态${row.snapshot_status_cn}`);
        //         return;
        //     }
        //     if(!['running','waiting'].includes(row.disk_status)){
        //         this.$message.warning(`只有待挂载或使用中的云盘才可以回滚云盘,当前云盘状态${row.disk_status_cn}`);
        //         this.statusObj={
        //             msg:`只有待挂载或使用中的云盘才可以回滚云盘,当前云盘状态${row.disk_status_cn}`,
        //             status:false
        //         }
        //         return;
        //     }
        //     if(row.disk_status==='running' && row.ecs_status!=='shutdown'){
        //         this.$message.warning(`使用中的云盘只有已关机的实例才可以回滚云盘,当前实例状态${row.ecs_status_cn}`);
        //         this.statusObj={
        //             msg:`使用中的云盘只有已关机的实例才可以回滚云盘,当前实例状态${row.ecs_status_cn}`,
        //             status:false
        //         }
        //         return;
        //     }
        //     // if(!(row.snapshot_status==='running' && ((row.disk_status==='running' && row.ecs_status==='shutdown') || row.disk_status==='waiting'))){
        //     //     this.$message.warning('当前状态不支持回滚云盘')
        //     //     return;
        //     // }
        // }else if(val==='del'){
        //     if(!['running','create_fail'].includes(row.snapshot_status)){
        //         this.$message.warning('仅支持删除可用或创建失败的快照')
        //         return;
        //     }
        // }else{
        //     if(row.snapshot_status!=='running'){
        //         this.$message.warning('当前状态不支持修改快照名称')
        //         return;
        //     }
        // }
        if(!this.getStatus(val,row).status){
            this.$message.warning(this.getStatus(val,row).msg);
            return
        }
        this.visible=true;
        this.operateType=val
        this.multiSelect = [row]
    }
    private create(val){
        this.FnClearTimer()
        this.operateType='create';
        this.rollbackCheck = val
    }
    beforeDestroy() {
        this.FnClearTimer()
    }
}
</script>
<style lang="scss" scope>
// .ecs-snapshot{
//     .el-tabs__header{
//         margin: 0 24px !important;
//     }
//     .el-tabs__nav-wrap::after{
//         display: none !important;
//     }
// }
.el-tabs__header{
        margin: 0;
        padding: 0 24px !important;
        border-top: 1px solid #ebebf7;
    }
    .el-tabs__nav-wrap::after{
        display: none !important;
    }
</style>
