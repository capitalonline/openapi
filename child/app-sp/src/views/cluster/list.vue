<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="search"></action-block>
        <div class="warning_message m-bottom10">说明：使用率=已用容量/总容量*100%；分配率=已分配容量/总容量*100%</div>
        <el-table
            :data="list"
            border
            ref="disk_table"
        >
            <el-table-column prop="1" label="集群名称"></el-table-column>
            <el-table-column prop="2" label="可用区"></el-table-column>
            <el-table-column prop="3" label="总容量"></el-table-column>
            <el-table-column prop="4" label="已用容量"></el-table-column>
            <el-table-column prop="5" label="使用率"></el-table-column>
            <el-table-column prop="6" label="已分配容量"></el-table-column>
            <el-table-column prop="7" label="分配率"></el-table-column>
            <el-table-column prop="8" label="操作">
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
@Component({
    components:{
        ActionBlock
    }
})
export default class Cluster extends Vue{
    private search_dom = {
        name:{placeholder:'请输入集群名称'},
        az_id:{placeholder:'请选择可用区', list: []},
    }
    private list:any=[{1:'aaa'}]
    private current:number = 1;
    private size:number=20;
    private total:number = 0;
    created() {
        this.get_az_list()
    }
    private search(data:any={}){

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
    private view(row){
        this.$router.push('/storage')
    }
    private handleSizeChange(size){
        this.size = size
    }
    private handleCurrentChange(cur){
        this.current = cur
    }
}
</script>