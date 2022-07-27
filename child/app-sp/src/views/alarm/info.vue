<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search"></action-block>
        <time-group @fn-emit="getTabTime" />
        <el-table :data="list" border class="event-table" @filter-change="fil_info">
            <el-table-column prop="productType" label="产品类型"></el-table-column>
            <el-table-column prop="instanceID" label="故障资源ID"></el-table-column>
            <el-table-column prop="createTime" label="发生时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createTime ? moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="durationTime" label="持续时间">
                <template slot-scope="scope">
                    <span class="m-right10">{{scope.row.metricPeriodNum ? `${scope.row.metricPeriodNum}个周期` :'-'}}</span>
                    <span>{{scope.row.metricPeriod ? scope.row.metricPeriod===60 ? '1小时1周期' :`${scope.row.metricPeriod}分钟1周期` :'-'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="strategyName" label="策略名称"></el-table-column>
            <el-table-column prop="ruleName" label="规则名称"></el-table-column>
            <el-table-column prop="alarmType" label="报警类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.alarmType!==''">{{scope.row.alarmType==='metric' ? '指标报警' :'事件报警'}}</span>
                    <span v-else>--</span>
                </template>
            </el-table-column>
            <el-table-column prop="contactGroup" label="通知对象">
                <template slot-scope="scope">
                    <span>{{scope.row.contactGroup.join(',')}}</span>
                    <i class="el-icon-document" @click="view_contact(scope.row.notyfyList)"></i>
                </template>
            </el-table-column>
            <el-table-column prop="alarmMethod" label="通知方式">
                <template slot-scope="scope">
                    <span>{{scope.row.alarmMethod.length===2 ? '邮箱+短信' : notice[scope.row.alarmMethod[0]]}}</span>
                </template>
            </el-table-column>
            <el-table-column 
                prop="dealStatus" 
                label="处理结果" 
                :filters="fil_list"
                :filter-multiple="false"
                filter-placement="bottom-end"
                column-key='dealStatus'
            >
                <template slot-scope="scope">
                    <span>{{scope.row.dealStatus ? '已处理' : '未处理'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="action" label="操作栏">
                <template slot-scope="scope">
                    <el-button type="text" @click="detail(scope.row)" :disabled="!authList.includes('infoDetail')">详情</el-button>
                    <el-button type="text" @click="shield(scope.row)" :disabled="scope.row.enable===1 || !(authList.includes('alarm_create') && authList.includes('edit'))">屏蔽</el-button>
                    <el-button type="text" @click="stopShield(scope.row)" :disabled="!scope.row.shieldID || scope.row.enable===0 || !authList.includes('stop')">停止屏蔽</el-button>
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
        <template v-if="visible">
            <notice-contact :visible.sync="visible" :list="notice_list" />
        </template>
        <template v-if="operateVisible && operateType==='detail'">
            <info-detail :visible.sync="operateVisible" :info="info" />
        </template>
        <template v-if="operateVisible  && operateType==='shield'">
            <info-shield :visible.sync="operateVisible" :info="info" />
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import TimeGroup from '../../components/search/timeGroup.vue'
import moment from 'moment';
import Service from '../../https/alarm/list'
import {trans} from '../../utils/transIndex';
import NoticeContact from './notice_contact.vue';
import InfoDetail from './infoDetail.vue';
import InfoShield from './infoShield.vue';
@Component({
    components:{
        ActionBlock,
        TimeGroup,
        NoticeContact,
        InfoDetail,
        InfoShield
    }
})
export default class Contact extends Vue{
    private notice={
        email:'邮箱',
        phone:'短信'

    }
    private type_list:any = [
        {type:'metric',label:'指标报警'},
        {type:'event',label:'事件报警'},
    ]
    private search:any = {
        ruleName:{placeholder:'请输入规则名称'},
        instanceID:{placeholder:'请输入资源ID'},
        type:{placeholder:'报警类型',list:this.type_list},
        contact:{placeholder:'报警联系人组',list:[]},
        strategyName:{placeholder:'请输入策略名称'},
    }
    private authList:any=[]
    private fil_list = [
        {
            text:'已处理',
            value:'1'
        },
        {
            text:'未处理',
            value:'0'
        },
    ]
    
    private list=[]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private moment =moment
    private search_data:any = {}
    private dealStatus:Array<string> = [];
    private visible:boolean= false;
    private operateVisible:boolean= false
    private operateType:string=''
    private notice_list:any=[];
    private info:any={}
    created() {
        this.getContactGroupList()
        this.authList = this.$store.state.auth_info[this.$route.name]
        // this.getAlarmList()
    }
    private async getContactGroupList(){
        let res:any=await Service.get_contact_group_list({})
        if(res.code==='Success'){
            this.search.contact.list = trans(res.data.datas,'name','id','label','type') 
        }
    }
    private async getAlarmList(){
        const {search_data} = this
        let res:any=await Service.get_alarm_list({
            ruleName:search_data.ruleName,//输入这个字段可以进行规则名称或者资源ID进行搜索
            instanceID:search_data.instanceID,
            alarmType:search_data.type,
            contactGroupName:search_data.contact,
            strategyName:search_data.strategyName,
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
    private getTabTime(val){
        this.search_data.time=val
        this.getAlarmList()
    }
    private fil_info(obj){
        this.dealStatus = obj.dealStatus
        this.current = 1
        this.getAlarmList()
    }
    private detail(row){
        this.info=row;
        this.operateType='detail'
        this.operateVisible=true
    }
    private shield(row){
        this.info=row;
        this.operateType='shield'
        this.operateVisible=true
    }
    private stopShield(row){
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, `确定停止 `),
            h('i', { style: 'color: #455cc6' },`${row.shieldName} `),
            h('span', null, ' 屏蔽策略吗? ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async action => {
            let res:any = await Service.shield_apply({
                ids:[row.shieldID],
                enable:0
            })
            if(res.code==='Success'){
                this.$message.success(res.message)
                this.getAlarmList()
            }
        })
    }
    @Watch('operateVisible')
    private watchOperateVisible(nv){
        if(!nv){
            this.getAlarmList()
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