<template>
    <div class="ecs-snapshot">
        <template>
            <search-bar :search_option="search_option" @fn-search = "FnSearch" :isShowBg="type==='list' ? true : false" :action_icon_option="action_btns" @fn-icon="operateIcon"></search-bar>
        </template>
        <!-- <list-table ref="list_table"></list-table> -->
        <el-table
            ref="snapshot_table"
            :data="list"
            @filter-change="handleFilter"
        >
            <el-table-column 
                v-for="item in column_list" 
                :key="item.prop" 
                :prop="item.prop" 
                :label="item.label" 
                :column-key="item.prop"
                :filters ="item.column_key? item.filters : null"
                :filter-multiple="true"
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
                <template #default="scope" v-else-if="item.prop === 'speed'">
                    <span v-if="scope.row.is_accelerate" class="running">开启</span>
                    <span v-if="!scope.row.is_accelerate">-</span>
                </template>
            </el-table-column>
             <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="record(scope.row)">操作记录</el-button>
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
        <template v-if="visible">
            <Record :visible="visible" :record_id="multiSelect[0].snapshot_id" @close = "close" :type="'snapshot'" />
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch,Prop } from 'vue-property-decorator';
import Service from '../../https/snapshot/list';
import SvgIcon from '../../components/svgIcon/index.vue';
import Record from '../instance/record.vue';
// import Clipboard from '../../components/clipboard.vue';
import d_Service from '../../https/disk/list';
import SearchBar from '../../components/search/actionBlock.vue'
import {trans} from '../../utils/transIndex'
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
        Record
    }
})
export default class Snapshot extends Vue {
    @Prop({default:'list'})type!:string;
    @Prop({default:''})snapshot_chains_id!:string;
    private diskTypeList:any=[
            {text:'系统盘',value:'system'},
            {text:'数据盘',value:'data'}
        ]
    private search_option:any=this.type==='list'? {
        type:{placeholder:'请输入',list:[
            {type:'snapshot_info',label:'快照名称/ID'},
            {type:'disk_info',label:'云盘名称/ID'}
        ],type:'composite',width:340},
        customer_id:{placeholder:'请输入客户ID'},
        customer_name:{placeholder:'请输入客户名称'},
        
    }:{
        type:{placeholder:'请输入',list:[
            {type:'snapshot_id',label:'快照ID'},
            {type:'snapshot_name',label:'快照名称'}
        ],type:'composite',width:340},
    }
    private visible:boolean=false;
    private operate_type:string=''
    private column_list=this.type==='list'? [
        {prop:'customer_id',label:'客户ID'},
        {prop:'customer_name',label:'客户名称'},
        {prop:'disk_id',label:'云盘名称/ID'},
        {prop:'disk_status_cn',label:'云盘状态',column_key:'disk_status',filters:[]},
        {prop:'disk_size',label:'属性/容量'},
        {prop:'az_name',label:'可用区'},
        {prop:'snapshot_id',label:'快照名称/ID'},
        {prop:'create_time',label:'创建时间'},
        {prop:'retention_time',label:'保留时间'},
        {prop:'snapshot_status_cn',label:'状态'},
        {prop:'speed',label:'加速优化'},
        {prop:'op_source',label:'创建来源'},
    ] : [
        {prop:'snapshot_id',label:'快照名称/ID'},
        {prop:'snapshot_size',label:'快照容量'},//todo
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
        this.get_disk_state();
        this.getSnapshotList();
    }
    @Watch("$store.state.pod_id")
    private watch_pod(nv){
      if(!nv){
        return;
      }
      this.FnSearch(this.search_data)
    }
    //获取云盘状态列表
    private async get_disk_state(){
        let res:any = await d_Service.get_disk_state({})
        if(res.code==="Success"){
            if(this.type==='list'){
                this.column_list[3].filters = trans(res.data,'status_name','status','text','value') 
            }
        }
    }
   private record(row){
    this.multiSelect=[row]
    this.visible=true
   }
   private close(){
    this.multiSelect=[]
    this.visible=false;
   }
    private FnSearch(data:any={}){ 
        console.log('data',data)  
        this     
        this.FnClearTimer()
        this.search_data = {...data};
        this.pageInfo.page_index=1;
        this.getSnapshotList()
    }
    // @Watch("visible")
    // private watch_visible(nv){
    //     if(!nv){
    //         this.getSnapshotList();
    //         this.operateType='';
    //         this.multiSelect=[]
    //     }
    // }
    public async getSnapshotList(loading = true){
        if (!loading) {
            this.$store.commit('SET_LOADING', false);
        }
        let res:any = await Service.get_snapshot_list({
            pod_id:this.$store.state.pod_id,
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
            customer_id:this.search_data.customer_id,
            customer_name:this.search_data.customer_name,
            //todo,云盘状态筛选
            disk_status:this.filterInfo.disk_status_cn ? this.filterInfo.disk_status_cn : [],
            [this.search_data.typesub]:this.search_data.type,
            snapshot_chains_id:this.type!=='list' ? this.snapshot_chains_id : undefined,
        })
        if(res.code==='Success'){
            this.list = res.data.snapshot_list;
            this.pageInfo.total = res.data.page_info.count;
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
