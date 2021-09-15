<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search"></action-block>
        <!-- <div class="time_btns">
            <el-button 
                class="time_operate"
                v-for="item in tab_list" 
                :key="item.label" 
                :type="item.label===activityKey ? 'primary' : 'default'" 
                @click="changeTime(item.label)"
            >{{item.name}}</el-button>
        </div> -->
        <time-group @fn-emit="getTabTime" />
        <el-table :data="list" border class="event-table">
            <el-table-column prop="productType" label="产品类型"></el-table-column>
            <el-table-column prop="instanceID" label="故障资源ID"></el-table-column>
            <el-table-column prop="createTime" label="发生时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createTime ? moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="durationTime" label="持续时间"></el-table-column>
            <el-table-column prop="ruleName" label="规则名称"></el-table-column>
            <el-table-column prop="alarmType" label="报警类型"></el-table-column>
            <el-table-column prop="contactGroupName" label="通知对象"></el-table-column>
            <el-table-column prop="alarmMethod" label="通知方式"></el-table-column>
            <el-table-column 
                prop="dealStatus" 
                label="处理结果" 
                :filters="fil_list"
                :filter-method="fil_info"
                filter-placement="bottom-end"
            ></el-table-column>
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
import TimeGroup from '../../components/search/timeGroup.vue'
import moment from 'moment';
import Service from '../../https/alarm/list'
import {trans} from '../../utils/transIndex'
@Component({
    components:{
        ActionBlock,
        TimeGroup
    }
})
export default class Contact extends Vue{
    private type_list:any = [
        {type:'',label:'全部'},
        {type:'metric',label:'指标报警'},
        {type:'event',label:'事件报警'},
    ]
    private search:any = {
        ruleName:{placeholder:'请输入规则名称'},
        instanceID:{placeholder:'请输入资源ID'},
        type:{placeholder:'报警类型',list:this.type_list},
        contact:{placeholder:'报警联系人组',list:[]},
        // time:{
        //     type:'datetimerange',
        //     placeholder:['开始时间','结束时间'],
        //     clearable:false,
        //     width:360,
        //     dis_day:31,
        //     defaultTime:[moment(new Date()).format("YYYY-MM-DD 00:00:00"),moment(new Date()).format("YYYY-MM-DD HH:mm:ss")]
        // },
    }
    // private tab_list = [
    //     {label:'1',name:'1小时'},
    //     {label:'3',name:'3小时'},
    //     {label:'6',name:'6小时'},
    //     {label:'12',name:'12小时'},
    //     {label:'24',name:'1天'},
    //     {label:'72',name:'3天'},
    //     {label:'168',name:'7天'},
    // ]
    private fil_list = [
        {
            text:'已处理',
            value:'1'
        },
        {
            text:'未处理',
            value:'2'
        },
    ]
    
    private list=[{productType:'1',dealStatus:'未处理'},{productType:'2',dealStatus:'已处理'}]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private moment =moment
    private search_data:any = {}
    // private activityKey:string = ""
    private dealStatus = 0

    created() {
        this.getContactGroupList()
        // this.getAlarmList()
    }
    private async getContactGroupList(){
        let res:any=await Service.get_contact_group_list({
            page:1,
            pageSize:1000,
            name:''
        })
        if(res.code===0){
            this.search.contact.list = trans(res.data.datas,'name','id','label','type') 
            // this.search.contact.list = trans_index(res.data.datas,['id','name'],['type',';label']) || []
        }
    }
    private async getAlarmList(){
        const {search_data} = this
        let res:any=await Service.get_alarm_list({
            ruleName:search_data.ruleName,
            // instanceID:search_data.instanceID,
            alarmType:search_data.type,
            contactGroupName:search_data.contact,
            startTime:search_data.time ? moment(search_data.time[0]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD 00:00:00"),
            endTime:search_data.time ? moment(search_data.time[1]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            // dealStatus:this.dealStatus,
            page:this.current,
            pageSize:this.size
        })
        
        if(res.code===0){
            this.list = res.data.datas || []
            this.total = res.data.total || 0
        }
    }
    private fn_search(data:any={}){
        this.current = 1
        this.search_data = data
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
    // private changeTime(val:string){
    //     // this.activityKey = val
    //     const date:any = new Date()
    //     const time:any =  date - parseInt(val)*60*60*1000
    //     this.search_data = {...this.search_data,time:[time,new Date()]}
    //     this.getAlarmList()
    // }
    private getTabTime(val){
        console.log("getTabTime",val)
        this.search_data.time=val
        this.getAlarmList()
    }
    private fil_info(val,row){
        console.log("fil",val,row)
        this.dealStatus = val
        this.current = 1
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
</style>