<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search">
            <el-button type="primary" v-for="(item,i) in headerOperateBtns" :key="i" @click="handle(i)">{{item}}</el-button>
        </action-block>
        <el-table :data="list" border class="event-table">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="shield_name" label="屏蔽名称"></el-table-column>
            <el-table-column prop="createTime" label="屏蔽状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.enable===1" class="running">屏蔽中</span>
                     <span v-else class="build_fail">已停用</span>
                </template>
            </el-table-column>
            <el-table-column prop="created_time" label="创建时间"></el-table-column>
            <el-table-column prop="updated_time" label="修改时间"></el-table-column>
            <el-table-column prop="operation" label="操作">
                <el-button type="text" v-for="(item,i) in operateBtns" :key="item" @click="handle(i)">{{item}}</el-button>
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
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import moment from 'moment';
import Service from '../../https/alarm/list'
@Component({
    components:{
        ActionBlock,
    }
})
export default class Shield extends Vue{
    private search:any = {
        name:{placeholder:'请输入屏蔽名称'},
    }
    private list=[{productType:'1'}]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any = {}
    private headerOperateBtns={
        create:'创建屏蔽',
        del:'删除',
        apply:'应用',
        stop:'停用'
    }
    private operateBtns={
        detail:'详情',
        edit:'修改',
        apply:'应用',
        stop:'停用',
        del:'删除',
    }
    created() {
        this.get_shield_list()
    }
    private async get_shield_list(){
        let res:any = await Service.get_shield_list({
            page:this.current,
            size:this.size,
            name:this.search_data.name
        })
        if(res.code==='Success'){
            this.list = res.data.datas;
            this.total = res.data.total
        }
    }
    private fn_search(data:any={}){

    }
    private handleSizeChange(size){
        this.size = size
    }
    private handleCurrentChange(cur){
        this.current = cur
    }
    private handle(val:String){
        if(val==='create'){
            this.$router.push('/alarmInfo/create')
        }
    }
}
</script>
<style lang="scss" scoped>
.time_btns{
    margin-bottom: 20px;
    
}
.event-table{
    margin-top: 20px;
}
button.el-button.time_operate {
    border-radius: 0;
    border-right: none;
    width: 80px;
    text-align: center;
    height: 34px;
    // line-height: 34px;
    margin:0 !important
}
button.el-button.time_operate:last-child{
    border: 1px solid #DCDFE6;
}
i.el-icon-document{
    cursor: pointer;
    margin-left: 15px;
}
.el-icon-document:before {
    content: "\e785";
    color: #455cc6;
}
</style>