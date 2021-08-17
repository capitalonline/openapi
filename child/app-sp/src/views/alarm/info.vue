<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search"></action-block>
        <div class="time_btns">
            <el-button 
                class="time_operate"
                v-for="item in tab_list" 
                :key="item.label" 
                :type="item.label===activityKey ? 'primary' : 'default'" 
                @click="changeTime(item.label)"
            >{{item.name}}</el-button>
        </div>
        <el-table :data="list" border class="event-table">
            <el-table-column prop="type" label="产品类型"></el-table-column>
            <el-table-column prop="resource_id" label="故障资源ID"></el-table-column>
            <el-table-column prop="customer" label="发生时间">
                <template slot-scope="scope">
                    <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="event_name" label="持续时间"></el-table-column>
            <el-table-column prop="event_state_name" label="规则名称"></el-table-column>
            <el-table-column prop="implementation_name" label="报警类型"></el-table-column>
            <el-table-column prop="op_user" label="通知对象"></el-table-column>
            <el-table-column prop="create_time" label="通知方式"></el-table-column>
            <el-table-column 
                prop="update_time" 
                label="处理结果" 
                :filters="fil_list"
                :filter-method="fil_info"
                filter-placement="bottom-end"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue';
import moment from 'moment'
@Component({
    components:{
        ActionBlock
    }
})
export default class Contact extends Vue{
    private type_list:any = [
        {type:'0',label:'全部'},
        {type:'1',label:'指标报警'},
        {type:'2',label:'事件报警'},
    ]
    private contact_list:any = [
        {type:'0',label:'全部'},
        {type:'1',label:'group1'},
        {type:'2',label:'group2'},
    ]
    private search:any = {
        name:{placeholder:'请输入规则名称或资源ID'},
        type:{placeholder:'报警类型',list:this.type_list},
        contact:{placeholder:'报警联系人组',list:this.contact_list},
        time:{
            type:'datetimerange',
            placeholder:['开始时间','结束时间'],
            clearable:true,
            width:360,
            picker:{disabledDate:this.dis_date,onPick:this.onPicker}
        },
    }
    private tab_list = [
        {label:'0',name:'1小时'},
        {label:'1',name:'3小时'},
        {label:'2',name:'6小时'},
        {label:'3',name:'12小时'},
        {label:'4',name:'1天'},
        {label:'5',name:'3天'},
        {label:'6',name:'7天'},
    ]
    private fil_list = [
        {
            text:'已处理',
            value:'0'
        },
        {
            text:'未处理',
            value:'1'
        },
    ]
    
    private list=[]
    private current:number = 1
    private size:number = 3
    private total:number = 0
    private moment =moment
    private min_date:any = ""
    private search_data:any = {}
    private activityKey:string = ""
    private active = "active_btn"
    private unActive = "un_active_btn"

    private dis_date(cur){
        let date = new Date()
        if(!this.min_date || this.min_date===""){
            return cur.getTime() > date.getTime()+1000*60*60*24*29
        }
        return cur.getTime() > this.min_date+1000*60*60*24*29 || cur.getTime() < this.min_date-1000*60*60*24*29
    }
    private onPicker({ maxDate, minDate }){
        this.min_date = minDate.getTime()

    }
    private changeTime(val:string){
        this.activityKey = val
    }
    private fn_search(){

    }
    private fil_info(){

    }
}
</script>
<style lang="scss" scoped>
.time_btns{
    margin-bottom: 20px;
    
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