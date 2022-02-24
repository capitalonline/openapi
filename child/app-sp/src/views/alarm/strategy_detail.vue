<template>
    <div>
        <el-dialog
            title="报警策略详情"
            :visible.sync="detail_visible"
            width="800px"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            @close="back"
            >
            <div>
                <div class="m-bottom10">
                    <span>策略名称：</span>
                    <span>{{this.rows[0].name}}</span>
                </div>
                <div v-for="item in list" :key="item.id" class="m-bottom10">
                    <p class="m-bottom10">{{item.id}}</p>
                    <el-table
                        :data="item.rule_list"
                        max-height="350"
                        border
                        v-loading="loading"
                    >
                        <el-table-column  prop="name"  label="规则名称"></el-table-column>
                        <el-table-column  prop="desc"  label="规则描述">
                            <template slot-scope="scope">
                                <!-- <span v-if="tab_key==='1'">{{scope.row.desc.join(",")}}</span> -->
                                <div>
                                    <div v-for="item in scope.row.desc" :key="item">{{item}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="notie"  label="通知方式">
                            <template slot-scope="scope">
                                <div v-for="(item,index) in scope.row.notice" :key="index">{{item}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="back">
                    <el-button @click="back('0')">返回</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
        
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch,PropSync } from 'vue-property-decorator';
import {alarm_type,event_name}from '../../assets/alarm_data';
import Service from '../../https/alarm/list';
import {deal_list} from '../../utils/transIndex'
@Component({})
export default class InsDetail extends Vue{
    @PropSync("visible") detail_visible!:Boolean;
    @Prop({default:()=>[]}) rows!:any
    private list:any=[]
    private index_list:any=[]
    private loading:boolean=true;
    private event_name:any=[]
    created() {
        
        this.getEventList()
    }
    private async getEventList(){
        let res:any=await Service.get_event_list({})
        if(res.code==="Success"){
            let key_list=['event_name_zh','event_id']
            let label_list=['title','id']
            //为了渲染初始化时已有规则的列表描述
            res.data.map(item=>{
                this.event_name=[...this.event_name,...item.list]
            })
            this.event_name=deal_list(this.event_name,label_list,key_list)
            this.get_index_list()
        }
    }
    //获取指标项列表
    private async get_index_list(){
        let res:any = await Service.get_index_list({})
        if(res.code==='Success'){
            res.data && res.data.forEach(element => {
                let temp=[]
                element.metric_infos.forEach(item=>{
                    temp.push({
                        value:item.metric,
                        label:item.metric,
                        unit:item.unit,
                        description:item.description,
                    })
                })
                this.index_list.push({
                    value:element.name,
                    label:element.name,
                    children:temp
                })
            });
            this.get_list()
            
        }
    }
    private get_list(){
        this.rows.length===1 && this.rows[0].rules.forEach(item=>{
            const temp_list=[]
            item.ruleRecords.forEach(element=>{
                temp_list.push({
                    range:element.metricCondition,
                    num:element.metricValue,
                    cycle_num:element.metricPeriodNum.toString(),
                    alram_type:element.alarmType==="event" ? '' : element.level.toString(),
                    notice:element.alarmType==="event" ? [] : element.alarmMethod,
                    metricUnit:element.metricUnit
                })
            })
            const obj = {
                id:item.id,
                name:item.name,
                desc:item.ruleRecords[0].alarmType==="event" ?
                [`${this.trans_arr(item.ruleRecords[0].level.toString(),alarm_type)} | ${this.trans_arr(item.ruleRecords[0].eventId,this.event_name)}`] 
                
                    :
                    temp_list.map(inn=>{
                    return `${this.getDescription(item.ruleRecords[0].metricID)} ${inn.range} ${inn.num}${inn.metricUnit} ${this.trans_arr(inn.alram_type,alarm_type)} 持续${inn.cycle_num}次就报警`
                }),
                notice:item.ruleRecords[0].alarmType==="event" ? [this.getNotice(item.ruleRecords[0].alarmMethod)] :temp_list.map(inn=>{
                    return this.getNotice(inn.notice)
                })
            }
            const fil:any = this.list.filter(ele=>ele.id===item.productType)
            if(fil.length>0){
                this.list.map(ele=>{
                    if(ele.id===item.productType){
                        ele.rule_list = [...ele.rule_list,obj]
                    }
                    return ele;
                })
            }else{
                this.list.push({
                    id : item.productType,
                    name : item.productType,
                    rule_list : [obj],
                })
            }
        })
        this.loading=false
    }
    private getDescription(id){
        let name=""
        this.index_list.forEach(item=>{
            item.children.forEach(inn=>{
                if(inn.value===id){
                    name = inn.description
                }
            })
        })
        return name
    }
    getNotice(list){
        const obj={
            email:'邮件',
            phone:"短信"
        }
        const temp = list.map(item=>{
            return obj[item]
        })
        return temp.join(' | ')
    }
    private trans_arr(id,arr){
        if(typeof id==="string"){
            const fil = arr.filter(item=>item.id===id)
            return fil[0].title
        }else{
            let fil = []
            arr.map(item=>{
                if(id.indexOf(item.id)>-1){
                    fil.push(item.title)
                }
            })
            return fil
        }
        
        
    }
    @Emit("close")
    private back(val){
        this.detail_visible=false
    }
}
</script>
<style lang="scss" scoped>
.back{
    padding: 10px 0;
    text-align: right;
}
</style>