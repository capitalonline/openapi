<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="search"></action-block>
        <el-table
            ref="message"
            :data="list"
            border
        >
            <el-table-column prop="op_content" label="操作内容"></el-table-column>
            <el-table-column prop="op_result" label="操作结果"></el-table-column>
            <el-table-column prop="result_detail" label="响应信息">
                <template slot-scope="scope">
                    <div>
                        <el-tooltip popper-class="tooltip-width"  v-if="scope.row.msg" :content="scope.row.msg" effect="light" placement="bottom">
                            <div class="long-msg">{{scope.row.msg}}</div>
                        </el-tooltip>
                        <div v-else>-</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="file_name" label="附件" width="400px" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="text" @click="down(scope.row.pipeline_group_id)">{{111}}</el-button> -->
                    <el-button type="text" @click="down(scope.row.pipeline_group_id)">{{scope.row.file_name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="op_user" label="操作人"></el-table-column>
            <el-table-column prop="finish_time" label="完成时间"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page_info.current"
            :page-sizes="[20, 50, 100]"
            :page-size="page_info.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_info.total"
        >
        </el-pagination>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import Service from '../../https/message/list';
import EcsService from '../../https/instance/create';
import {trans} from '../../utils/transIndex';
import moment from 'moment'
@Component({
    components:{
        ActionBlock
    }
})
export default class Message extends Vue{
    private search_dom:any={
        az_id:{placeholder:'请选择可用区',list:[]},
        op_content:{placeholder:'请选择操作内容',list:[]},
        create_time:{
            placeholder: ['开始时间', '结束时间'],
            type: 'datetimerange',
            width: '360',
            clearable: true,
            dis_day: 30,
            defaultTime: [] 
        },
        op_user:{placeholder:'请输入操作人'},
    }
    private page_info:any={
        current:1,
        size:20,
        total:0
    }
    private list:Array<any>=[];
    private search_data:any={};
    created(){
        this.get_az_list();
        this.get_inform_list()
        this.search();
    }
    private async get_az_list(){
        let res:any=await EcsService.get_region_az_list({})
        if(res.code==="Success"){
        res.data.forEach(item=>{
            item.region_list.forEach(inn=>{
            this.search_dom.az_id.list=[...this.search_dom.az_id.list,...trans(inn.az_list,'az_name','az_id','label','type')]
            })
        })
        }
    }
    private async get_inform_list(){
        let res:any=await Service.get_inform_list({})
        if(res.code==="Success"){
            this.search_dom.op_content.list=res.data
        }
    }
    private search(data:any={}){
        this.search_data = {...data};
        this.page_info.page_index=1;
        this.getList()
    }
    private async getList(){
        const {az_id,op_content,create_time,op_user} = this.search_data
        let res:any = await Service.get_message_list({
            az_id,
            op_content,
            op_user,
            create_time_start:create_time && create_time[0] ? moment(create_time[0]).format('YYYY-MM-DD HH:mm:ss') : undefined,
            create_time_end:create_time && create_time[1] ? moment(create_time[1]).format('YYYY-MM-DD HH:mm:ss') : undefined,
            page_index:this.page_info.current,
            page_size:this.page_info.size
        })
        if(res.code==='Success'){
            this.list = res.data.business_record_list;
            this.page_info.total = res.data.page_info.count
        }
    }
    private handleSizeChange(size:number){
        this.page_info.size = size
        this.getList()
    }
    private handleCurrentChange(cur){
        this.page_info.current = cur
        this.getList()
    }
    private down(id:string='111'){
        window.location.href=`/ecs_business/v1/host/download_test_report?pipeline_group_id=${id}`
    }
}
</script>