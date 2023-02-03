<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="search"></action-block>
        <div class="warning_message m-bottom10">说明：使用率=已用容量/总容量*100%；分配率=已分配容量/总容量*100%</div>
        <el-table
            :data="list"
            border
            ref="disk_table"
        >
            <el-table-column prop="storage_pool_name" label="Storage Pool 名称"></el-table-column>
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
import Service from '../../https/cluster/list'
@Component({
    components:{
        ActionBlock
    }
})
export default class Cluster extends Vue{
    private search_dom = {
        storage_pool_name:{placeholder:'请输入Storage Pool名称'},
    }
    private list:any=[{1:'aaa'}]
    private current:number = 1;
    private size:number=20;
    private total:number = 0;
    private search_data:any={}
    created() {
        this.search()
    }
    private search(data:any={}){
        this.search_data = data;
        this.getList()
    }
    private async getList(){
        let res:any = await Service.get_storage_pool_list({
            storage_pool_name:this.search_data.storage_pool_name,
            az_id:this.$route.query.az_id,
            cluster_id:this.$route.query.id,
            page_index:this.current,
            page_size:this.size
        })
        if(res.code==='Success'){
            this.list = res.data.storage_pool_list;
            this.total = res.data.page.count
        }
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