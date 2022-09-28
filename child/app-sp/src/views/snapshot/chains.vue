<template>
    <div>
        <search-bar :search_option="search_option" @fn-search = "FnSearch" :action_icon_option="action_btns" @fn-icon="operateIcon"></search-bar>
        <el-table
            ref="chains_table"
            :data="list"
        >
            <el-table-column 
                v-for="item in column_list" 
                :key="item.prop" 
                :prop="item.prop" 
                :label="item.label" 
                :max-height="tableHeight"
            >   
                <template #default="scope" v-if="item.prop==='snapshot_chains_id'">
                    <div>
                        <el-tooltip 
                        :content="scope.row.snapshot_chains_id" 
                        placement="bottom" 
                        effect="light">
                            <span class="id-cell">{{ scope.row.snapshot_chains_id }}</span>
                        </el-tooltip>
                        <!-- <Clipboard :content="scope.row.snapshot_chains_id"></Clipboard> -->
                    </div>
                </template>
                <template #default="scope" v-else-if="item.prop==='instance_id'">
                    <template v-if="scope.row.instance_id">
                        <div>
                            <el-tooltip 
                                placement="right" 
                                popper-class="tooltip-width"
                                effect="light">
                                <div slot="content">{{scope.row.instance_name}}</div>
                                <div class="name-cell num_message">
                                    <pre>{{ scope.row.instance_name }}</pre>
                                </div>
                            </el-tooltip>
                        </div>
                        <div>
                            <el-tooltip 
                            :content="scope.row.instance_id" 
                            placement="bottom" 
                            effect="light">
                                <span class="id-cell">{{ scope.row.instance_id }}</span>
                            </el-tooltip>
                            <template v-if="scope.row.instance_id">
                                <Clipboard :content="scope.row.instance_id"></Clipboard>
                            </template>
                        </div>
                    </template>
                    <span v-else>-</span>
                    
                </template>
                <template #default="scope" v-else-if="item.prop==='disk_id'">
                    <div>
                        <el-tooltip 
                            placement="right" 
                            popper-class="tooltip-width"
                            effect="light">
                            <div slot="content">{{scope.row.disk_name}}</div>
                            <div class="name-cell num_message">
                                <pre>{{ scope.row.disk_name }}</pre>
                            </div>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip 
                        :content="scope.row.disk_id" 
                        placement="bottom" 
                        effect="light">
                            <span class="id-cell">{{ scope.row.disk_id }}</span>
                        </el-tooltip>
                        <Clipboard :content="scope.row.disk_id"></Clipboard>
                    </div>
                </template>
                <template #default="scope" v-else-if="item.prop==='disk_type'">
                    <span>{{diskObj[scope.row.disk_type]}}</span>
                </template>
                <template #default="scope" v-else-if="item.prop==='disk_size'">
                    <span>{{scope.row.disk_size}}GB</span>
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="detail(scope.row.snapshot_chains_id)">详情</el-button>
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
import { Component, Vue } from 'vue-property-decorator';
import Service from '../../https/snapshot/list';
// import Clipboard from '../../components/clipboard.vue';
import SearchBar from '../../components/search/actionBlock.vue'

interface Page{
    page_size:number,
    page_index:number,
    total:number,
    page_sizes?:Array<number>
}
@Component({
    components:{
        // Clipboard,
        SearchBar
    }
})
export default class Chains extends Vue {
    private search_option:any={
        az_id:{type:'az_id'},
        value:{type:'input-with-select',placeholder:'请选择',list:[
            {value:'snapshot_chains_info',label:'快照链名称/ID'},
            {value:'disk_info',label:'云盘名称/ID'},
            {value:'instance_info',label:'实例名称/ID'},
        ]}
    }
    private action_btns:Array<string>=['refresh']
    private tableHeight = 200
    private diskObj={
        system:'系统盘',
        data:'数据盘'
    }
    private column_list=[
        {prop:'snapshot_chains_id',label:'快照链ID'},
        {prop:'instance_id',label:'实例名称/ID'},
        {prop:'disk_id',label:'云盘名称/ID'},
        {prop:'disk_type',label:'源云盘属性'},
        {prop:'az_name',label:'可用区'},
        {prop:'disk_size',label:'源云盘容量'},
        {prop:'snapshot_number',label:'快照数量'},
        {prop:'snapshot_size',label:'快照容量'},
    ]
    
    private list:any=[]
    private pageInfo:Page={
        page_size:20,
        page_index:1,
        total:0,
    }
    private search_data:any={};
    private timer=null
    created() {
        this.getSnapshotChainsList()
        // this.getSnapshotChainsList('created');
    }
    private FnSearch(data:any={}){
        this.FnClearTimer()
        this.search_data = {...data};
        this.pageInfo.page_index=1
        this.getSnapshotChainsList()
    }
    private operateIcon(icon){
        this.FnClearTimer()
        this.getSnapshotChainsList()
    }
    private async getSnapshotChainsList(loading = true){
        if (!loading) {
            this.$store.commit('SET_LOADING', false);
        }
        let res:any = await Service.get_snapshot_chains_list({
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
            [this.search_data.sel_value ? this.search_data.sel_value : 'snapshot_info']:this.search_data.value ? this.search_data.value : undefined,
            region_id:this.search_data.region_id ? this.search_data.region_id :undefined,
            az_id:this.search_data.az_id ? this.search_data.az_id :undefined,
        })
        if(res.code==='Success'){
            this.list = res.data.snapshot_list;
            this.pageInfo.total = res.data.page_info.count
        }
        this.FnSetTimer()
    }
    // 下发定时任务前清除已有定时任务
    private FnSetTimer() {
        if (this.timer) {
        this.FnClearTimer();
        }
        this.timer = setTimeout(() => {
        this.getSnapshotChainsList(false)
        }, 1000*5)
    }
    private FnClearTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
    private detail(id){
        this.FnClearTimer()
        sessionStorage.setItem('chainId',id)
        this.$router.push({path:this.$route.name==='render_snapshot_list' ? '/render/chain/detail' :'/chain/detail',query:{
            id
        }})
    }
    private handleSizeChange(size){
        this.FnClearTimer()
        this.pageInfo = {...this.pageInfo,page_size:size}
        this.getSnapshotChainsList()
    }
    private handleCurrentChange(cur){
        this.FnClearTimer()
        this.pageInfo = {...this.pageInfo,page_index:cur}
        this.getSnapshotChainsList() 
    } 
    beforeDestroy() {
        this.FnClearTimer()
    }
}
</script>
