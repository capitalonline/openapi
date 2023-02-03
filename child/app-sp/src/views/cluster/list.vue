<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="search"></action-block>
        <div class="warning_message m-bottom10">说明：使用率=已用容量/总容量*100%；分配率=已分配容量/总容量*100%</div>
        <el-table
            :data="list"
            border
            ref="disk_table"
        >
            <el-table-column prop="cluster_name" label="集群名称"></el-table-column>
            <el-table-column prop="az_name" label="可用区"></el-table-column>
            <el-table-column prop="total_size" label="总容量">
                <template slot-scope="scope">
                    <span>{{ `${scope.row.total_size}G` }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="used_size" label="已用容量">
                <template slot-scope="scope">
                    <span>{{ `${scope.row.used_size}G` }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="usage" label="使用率">
                <template slot-scope="scope">
                    <span>{{ `${scope.row.usage}%` }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="need_used_size" label="已分配容量">
                <template slot-scope="scope">
                    <span>{{ `${scope.row.need_used_size}G` }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="need_usage" label="分配率">
                <template slot-scope="scope">
                    <span>{{ `${scope.row.need_usage}%` }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)">查看Storage Pool</el-button>
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
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import EcsService from "../../https/instance/create";
import { trans } from "../../utils/transIndex";
import Service from '../../https/cluster/list'
@Component({
    components:{
        ActionBlock
    }
})
export default class Cluster extends Vue{
    private search_dom = {
        cluster_name:{placeholder:'请输入集群名称'},
        az_id:{placeholder:'请选择可用区', list: []},
    }
    private search_data:any={}
    private list:any=[{1:'aaa'}]
    private current:number = 1;
    private size:number=20;
    private total:number = 0;
    created() {
        this.get_az_list();
        this.search()
    }
    private search(data:any={}){
        this.search_data = data;
        this.getList()
    }
    private async get_az_list() {
        const res = await EcsService.get_region_az_list({});
        if (res.code === "Success") {
            this.search_dom.az_id.list=[]
            res.data.forEach((item) => {
                item.region_list.forEach((inn) => {
                this.search_dom.az_id.list = [
                    ...this.search_dom.az_id.list,
                    ...trans(inn.az_list, "az_name", "az_id", "label", "type"),
                ];
                });
            });
        }
    }
    private async getList(){
        let res:any = await Service.get_cluster_list({
            cluster_name:this.search_data.cluster_name,
            az_id:this.search_data.az_id,
            page_index:this.current,
            page_size:this.size
        })
        if(res.code==='Success'){
            this.list = res.data.cluster_list;
            this.total = res.data.page.count
        }
    }
    private view(row){
        this.$router.push({path:'/storage',query:{
            id:row.cluster_id,
            az_id:row.az_id
        }})
    }
    private handleSizeChange(size){
        this.size = size;
        this.getList()
    }
    private handleCurrentChange(cur){
        this.current = cur;
        this.getList()
    }
}
</script>