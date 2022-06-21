<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search">
            <el-button type="primary" v-for="(item,i) in headerOperateBtns" :key="i" @click="handle(i)">{{item}}</el-button>
        </action-block>
        <el-table :data="list" border class="event-table">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="productType" label="屏蔽名称"></el-table-column>
            <el-table-column prop="instanceID" label="产品类型"></el-table-column>
            <el-table-column prop="createTime" label="屏蔽状态"></el-table-column>
            <el-table-column prop="durationTime" label="创建时间"></el-table-column>
            <el-table-column prop="ruleName" label="修改时间"></el-table-column>
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
    }
    private async getAlarmList(){
        const {search_data} = this
        
        let res:any=await Service.get_alarm_list({
            ruleName:search_data.ruleName,//输入这个字段可以进行规则名称或者资源ID进行搜索
            instanceID:search_data.instanceID,
            alarmType:search_data.type,
            contactGroupName:search_data.contact,
            startTime:search_data.time ? moment(search_data.time[0]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD 00:00:00"),
            endTime:search_data.time ? moment(search_data.time[1]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            dealStatus:this.dealStatus.length===0 ? "" : this.dealStatus[0],
            page:this.current,
            pageSize:this.size
        })
        
        if(res.code==='Success'){
            this.list = res.data.datas || []
            this.total = res.data.total || 0
        }
    }
    private view_contact(list){
        this.visible = true
        this.notice_list = list
    }
    private fn_search(data:any={}){
        this.current = 1
        this.search_data = {...this.search_data,...data}
        // this.activityKey = ""
        this.getAlarmList()
    }
    private handleSizeChange(size){
        this.size = size
        this.getAlarmList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getAlarmList()
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