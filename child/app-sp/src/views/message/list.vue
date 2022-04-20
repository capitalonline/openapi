<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="search"></action-block>
        <el-table
            ref="message"
            :data="list"
            border
        >
            <el-table-column prop="selection" label="操作内容"></el-table-column>
            <el-table-column prop="selection" label="操作结果"></el-table-column>
            <el-table-column prop="msg" label="响应信息">
                <template slot-scope="scope">
                    <div>
                        <el-tooltip popper-class="tooltip-width"  v-if="scope.row.msg" :content="scope.row.msg" effect="light" placement="bottom">
                            <div class="long-msg">{{scope.row.msg}}</div>
                        </el-tooltip>
                        <div v-else>-</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="selection" label="附件" width="400px" align="center"></el-table-column>
            <el-table-column prop="selection" label="操作人"></el-table-column>
            <el-table-column prop="selection" label="完成时间"></el-table-column>
            <el-table-column prop="selection" label="创建时间"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="getList()"
            @current-change="getList()"
            :current-page.sync="page_info.page_index"
            :page-sizes="page_info.page_sizes"
            :page-size.sync="page_info.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_info.total">
        </el-pagination>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
@Component({
    components:{
        ActionBlock
    }
})
export default class Message extends Vue{
    private search_dom:any={
        content:{placeholder:'请选择操作内容',list:[{label:'业务测试',type:"test"}]},
        create_time:{
            placeholder: ['开始时间', '结束时间'],
            type: 'daterange',
            width: '360',
            clearable: true,
            dis_day: 30,
            defaultTime: [] 
        },
        user:{placeholder:'请输入操作人'},
    }
    private page_info={
        page_sizes: [20, 50, 100],
        page_size: 20,
        page_index: 1,
        total: 0

    }
    private list:Array<any>=[];
    private search_data:any={}
    private search(data:any={}){
        this.search_data = data;
        this.page_info.page_index=1;
        this.getList()
    }
    private getList(){

    }
}
</script>