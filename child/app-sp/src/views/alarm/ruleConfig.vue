<template>
<div>
    <div class="product_box" v-for="pro in selected_products" :key="pro.id">
        <div class="title">
            <span>{{pro.name}}</span>
            <el-button type="text" @click="del_product(pro.id)" v-if="selected_products.length > 1">删除</el-button>
        </div>
        <el-table :data="pro.rule_list" class="event-table">
            <el-table-column prop="name" label="规则名称"></el-table-column>
            <el-table-column prop="desc" label="规则描述">
                <template slot-scope="scope">
                    <span v-if="tab_key==='1'">{{scope.row.desc.join(",")}}</span>
                    <div v-else>
                        <div v-for="item in scope.row.desc" :key="item">{{item}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit_rules(pro.id,scope.row.id,scope.row.tab_key)" style="margin:0 10px 0 0">编辑</el-button>
                    <el-button type="text" @click="del_rule(pro.id,scope.row.id)" v-if="!(selected_products.length === 1 && selected_products[0].rule_list.length===1)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="rule-box">
            <el-button type="text" @click="show_rule_box(pro.id,'add')"><i class="el-icon-circle-plus"></i>&nbsp;添加规则</el-button>
            <div class="add-rule" v-show="pro.visible">
                <el-tabs v-model="tab_key" type="card" @tab-click="changeTab">
                    <el-tab-pane label="阈值报警" title="0" :disabled="edit_key==='1'">
                        <div class="rule-warn">
                            <el-form :model="rule_data" ref="rules_form" key="rules_form" label-width="150px" class="demo-dynamic">
                                <el-form-item
                                    prop="name"
                                    label="规则名称"
                                    :rules="[
                                        { required: true, message: '请输入规则名称', trigger: 'blur' },
                                        { pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{2,60}$/,message:'名称长度应为2-60个字符',trigger:'blur' }
                                    ]"
                                >
                                    <el-input v-model="rule_data.name" placeholder="请输入规则名称,2-60个字符" minlength=2 maxlength=60 show-word-limit />
                                    <div class="prompt_message">可包含大小写字母,中文,数字,点号,下划线,半角冒号,连字符,英文括号</div>
                                </el-form-item>
                                <el-form-item
                                    prop="metricID"
                                    label="指标名称"
                                    :rules="[{ required: true, message: '请选择指标名称', trigger: 'blur' }]"
                                >
                                    <el-cascader
                                        v-model="rule_data.metricID"
                                        :options="index_list"
                                        :show-all-levels="false"
                                        :props="{ expandTrigger: 'hover' }"
                                    >
                                    <template slot-scope="{ node, data }">
                                        <el-tooltip class="item" effect="dark" :content="data.description" placement="right" v-if="node.isLeaf">
                                            <span>{{data.label}}</span>
                                        </el-tooltip>
                                        <span v-else>{{ data.label }}</span>
                                    </template>
                                    </el-cascader>
                                </el-form-item>
                                <el-form-item
                                    prop="level"
                                    label="阈值及报警级别"
                                    :rules="[{ required: true, message: '请选择阈值及报警级别' }]"
                                >
                                    <div class="rule-level" v-for="(inn,index) in rule_data.level" :key="inn.id">
                                        <el-select v-model="inn.range" size="small">
                                            <el-option
                                                v-for="item in static_list.range_list"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-input
                                            size="small"
                                            v-model.number="inn.num">
                                            <span slot="suffix">{{inn.metricUnit}}</span>
                                        </el-input>
                                        <span class="error_message remark" v-if="inn.num==='' || !Number.isInteger(inn.num)">{{inn.num==='' ? '请输入指标项值' : '指标项值需为数字'}}</span>
                                        
                                     <el-select v-model="inn.cycle_time" size="small">
                                            <el-option
                                                v-for="item in static_list.cycle_time"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="inn.cycle_num" size="small">
                                            <el-option
                                                v-for="item in static_list.cycle_num"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="inn.alram_type" size="small">
                                            <el-option
                                                v-for="item in static_list.alarm_type"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <div class="notice">
                                            <div class="check">
                                                <span>通知：</span>
                                                <el-checkbox-group v-model="inn.notice">
                                                    <el-checkbox v-for="notice in static_list.notice_list" :key="notice.id" :label="notice.id">{{notice.name}}</el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                            <div class="level-btn" v-if="index===rule_data.level.length-1">
                                                <i class="el-icon-circle-plus" type="primary" @click="add_level"></i>
                                                <i class="el-icon-remove" @click="del_level" v-if="rule_data.level.length>1"></i>
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="事件报警" title="1" :disabled="edit_key==='0'">
                        <div class="rule-warn">
                            <el-form :model="rule_data" ref="event_form" key="event_form" label-width="150px" class="demo-dynamic">
                                <el-form-item
                                    prop="name"
                                    label="规则名称"
                                    :rules="[
                                        { required: true, message: '请输入规则名称', trigger: 'blur' },
                                        { pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{2,60}$/,message:'名称长度应为2-60个字符',trigger:'blur' }
                                    ]"
                                >
                                    <el-input v-model="rule_data.name" placeholder="请输入规则名称,2-60个字符" minlength=2 maxlength=60 show-word-limit />
                                    <div class="prompt_message">可包含大小写字母,中文,数字,点号,下划线,半角冒号,连字符,英文括号</div>
                                </el-form-item>
                                <el-form-item
                                    prop="event_type"
                                    label="事件类型"
                                    :rules="[{ required: true, message: '请选择事件类型', trigger: 'blur' }]"
                                >
                                    <el-select v-model="rule_data.event_type" placeholder="请选择事件类型">
                                        <el-option
                                            v-for="item in static_list.event_type"
                                            :key="item.event_type"
                                            :label="item.type_name"
                                            :value="item.event_type"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    prop="event_name"
                                    label="事件名称"
                                    :rules="[{ required: true, message: '请选择事件名称', trigger: 'blur' }]"
                                >
                                    <el-select v-model="rule_data.event_name" multiple  placeholder="请选择事件名称">
                                        <el-option
                                            v-for="item in static_list.event_name"
                                            :key="item.id"
                                            :label="item.title"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    prop="alram_type"
                                    label="事件等级及报警"
                                    :rules="[{ required: true, message: '请选择事件等级及报警', trigger: 'blur' }]"
                                >
                                    <el-select v-model="rule_data.alram_type" placeholder="请选择事件等级及报警">
                                        <el-option
                                            v-for="item in static_list.alarm_type"
                                            :key="item.id"
                                            :label="item.title"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    prop="notice"
                                    label=""
                                    :rules="[{ required: true, message: '请选择通知方式', trigger: 'blur' }]"
                                >
                                    <div class="check">
                                        <span>通知：</span>
                                        <el-checkbox-group v-model="rule_data.notice">
                                            <el-checkbox v-for="notice in static_list.notice_list" :key="notice.id" :label="notice.id">{{notice.name}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="btn">
                    <el-button type="primary" @click="add_rule()">确定</el-button>
                    <el-button type="cancel" @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
        
    </div>
    <el-dropdown @command="handle" class="m-top10">
        <el-button type="primary">
            添加产品<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in product_list" :command="item.id" :key="item.id">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <!-- <el-select v-model="selected_product_id" placeholder="添加产品" @change="add_product">
        <el-option
            v-for="item in product_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        >
        </el-option>
    </el-select> -->
     
</div>   
</template>
<script lang="ts">
import { Component, Vue,Emit,Watch,PropSync,Prop } from 'vue-property-decorator';
import { Form } from "element-ui";
import {range_list,notice_list,alarm_type,cycle_num,cycle_time,event_type,event_name,productList}from '../../assets/alarm_data';
import Service from '../../https/alarm/list'
import {deal_list} from '../../utils/transIndex';
@Component({})
export default class RuleConfig extends Vue{
    @Prop({default:()=>[]})strategy_data!:any
    private tab_key:string="0"
    private edit_key:string="";
    private selected_product_id:String="";
    private edit_rule_id:string=""
    private index_list:any=[]
    private rule_data:any={
        name:'',
        metricID:[],
        event_type:'',
        event_name:[],
        alram_type:'',
        notice:[],
        level:[{
            range:'>=',
            num:'',
            cycle_time:'1',
            cycle_num:'1',
            alram_type:'2',
            notice:["email"],
            metricUnit:''
        }]
    }
    private static_list={
        range_list,
        notice_list,
        alarm_type,
        cycle_num,
        cycle_time,
        event_type,
        event_name:[],
    }
    private product_list:any=[]
    private selected_products:any = []
    created() {
        productList.forEach(item=>{
            this.product_list.push({...item,visible:false,rule_list:[]})
        })
        this.get_index_list()
        this.getEventList()
    } 
    private valid(name){
        this.$nextTick(()=>{
            const form = this.$refs[name] as Form
            form && form[0].validate(async (valid)=>{
            
            })  
        })
        
    }
    private get event(){
        const {event_type,event_name,alram_type,notice}=this.rule_data
        return {
            event_type,
            event_name,
            alram_type,
            notice,
        }
    }
    @Watch('event',{immediate:true,deep:true})
    private watch_event(newVal){
        this.valid('event_form')
    }
    @Watch("rule_data.metricID")
    private watch_metricID(newVal){
        this.valid('rules_form')
        let unit:string=""
        this.index_list.forEach(item=>{
            item.children.forEach(inn=>{
                if(inn.value===newVal[1]){
                    unit = inn.unit
                }
            })
        })
        this.rule_data.level.map(item=>item.metricUnit = unit)
    }
    @Watch("rule_data.event_type")
    private watch_event_type(nv){
        let key_list=['event_name_zh','event_id']
        let label_list=['title','id']
        let fil:any = this.static_list.event_type.filter((item:any)=>item.event_type===nv)
        this.static_list.event_name =fil.length>0 ? deal_list(fil[0].list,label_list,key_list) : [];
        const ids = this.static_list.event_name.map(item=>item.id)//事件列表所有的id
        if((new Set([...ids,...this.rule_data.event_name])).size>ids.length){//如果属于当前这个事件名称里，长度最大为ids的长度
            this.rule_data.event_name=[]
        }
        
    }
    private async getEventList(){
        let res:any=await Service.get_event_list({})
        if(res.code==="Success"){
            let key_list=['event_name_zh','event_id']
            let label_list=['title','id']
            this.static_list.event_type = res.data;
            //为了渲染初始化时已有规则的列表描述
            res.data.map(item=>{
                this.static_list.event_name=[...this.static_list.event_name,...item.list]
            })
            this.static_list.event_name=deal_list(this.static_list.event_name,label_list,key_list)
        }
    }
    private get_index_list_by_value(value){
        let arr = []
        this.index_list.forEach(item=>{
            item.children.forEach(inn=>{
                if(inn.value===value){
                    arr=[item.value,value]
                }
            })
        })
        return arr;
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
        }
    }
    //编辑或者选中某个已有的规则
    @Watch("strategy_data",{immediate:true,deep:true})
    private watch_strategy_data(newVal,ov){
        if(Object.keys(newVal).length===0){
            return;
        }
        this.selected_products=[]
        newVal.rules.forEach(element=>{
            const list=[]
            element.ruleRecords.forEach(item=>{
                list.push({
                    range:item.metricCondition,
                    num:item.metricValue,
                    cycle_time:item.metricPeriod.toString(),
                    cycle_num:item.metricPeriodNum.toString(),
                    alram_type:item.alarmType==="event" ? '' : item.level.toString(),
                    notice:item.alarmType==="event" ? [] : item.alarmMethod,
                    metricUnit:item.metricUnit
                })
            })
            const obj = {//相当于rule_data
                id:element.id,
                tab_key:element.ruleRecords[0].alarmType==="event" ? '1' : '0',
                name:element.name,
                metricID:this.get_index_list_by_value(element.ruleRecords[0].metricID),
                event_type:element.ruleRecords[0].eventType,
                event_name:element.ruleRecords[0].eventId,
                metricUnit:element.ruleRecords[0].alarmType==="event" ? '' : element.ruleRecords[0].metricUnit,
                alram_type:element.ruleRecords[0].alarmType==="event" ? element.ruleRecords[0].level.toString() : '',
                notice:element.ruleRecords[0].alarmType==="event" ? element.ruleRecords[0].alarmMethod : [],
                level:list,
                desc:element.ruleRecords[0].alarmType==="event" ?
                [`${this.trans_arr(element.ruleRecords[0].level.toString(),this.static_list.alarm_type)} | ${this.trans_arr(element.ruleRecords[0].eventId,this.static_list.event_name)}`] 
                
                    :
                    list.map(inn=>{
                    return `${this.getDescription(element.ruleRecords[0].metricID)} ${inn.range} ${inn.num}${inn.metricUnit} ${this.trans_arr(inn.alram_type,this.static_list.alarm_type)} 持续${inn.cycle_num}次就报警`
                })
            }
            const fil:any = this.selected_products.filter(item=>item.id===element.productType)
            if(fil.length>0){
                this.selected_products.map(item=>{
                    if(item.id===element.productType){
                        item.rule_list = [...item.rule_list,obj]
                    }
                    return item;
                })
            }else{
                this.selected_products.push({
                    id : element.productType,
                    name : element.productType,
                    visible : false,
                    rule_list : [obj],
                })
            }
        })
        // console.log("this.selected_products",this.selected_products)
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
    private handle(obj){
        this.add_product(obj)
    }
    private add_product(e){
        if(this.selected_products.filter(item=>item.id===e).length>0){
            return;
        }
        const fil = this.product_list.filter(item=>item.id===e)
        fil[0].rule_list = []
        this.selected_products=[...this.selected_products,...fil ]
    }
    private del_product(id:String){
        this.selected_products = this.selected_products.filter(item=>item.id!==id)
        if(this.selected_products.length===0){
            this.selected_product_id=""
        }
    }
    private show_rule_box(id:string="",val:String="add"){
        this.selected_products.map(item=>{
            if(item.id===id){
                item.visible = !item.visible
                if(this.edit_key==="" && item.visible){
                    this.static_list.event_name=[]
                    this.clear()
                }
                if(val==="edit" && !item.visible){
                    this.edit_key=""
                }
                
            }else{
                item.visible = false
            }
            return item;
        })
    }
    private add_level(){
        let len:number = this.rule_data.level.length
        const obj={
            range:'>=',
            num:'',
            cycle_time:'1',
            cycle_num:'1',
            alram_type:'2',
            notice:["email"],
            metricUnit:this.rule_data.level[0].metricUnit
        }
        this.rule_data = {...this.rule_data,level:[...this.rule_data.level,obj]}
    }
    private del_level(){
        const {level}=this.rule_data
        this.rule_data = {...this.rule_data,level:level.filter((item,index)=>index<level.length-1)}
    }
    private add_rule(){//确定添加规则或者编辑规则
        const form = this.tab_key==="0" ? this.$refs.rules_form[0] as Form : this.$refs.event_form[0] as Form
        form.validate(async (valid)=>{
            if(valid){
                if(this.tab_key==="0" && this.rule_data.level.some(item=>item.num==="" || !Number.isInteger(item.num))){
                    return;
                }
                const {selected_products,tab_key,edit_key,edit_rule_id} = this
                selected_products.map(item=>{
                    if(item.visible){
                        
                        if(edit_key===""){//新增
                            const obj = {...this.rule_data,tab_key,id:item.id+Math.floor((Math.random()*9+1)*1000000)}
                            if(tab_key==="0"){//阈值报警
                                item.rule_list=[...item.rule_list,{
                                    ...obj,
                                    desc:this.rule_data.level.map(inn=>{
                                        return `${this.getDescription(this.rule_data.metricID[1])} ${inn.range} ${inn.num}${inn.metricUnit} ${this.trans_arr(inn.alram_type,this.static_list.alarm_type)} 持续${inn.cycle_num}次就报警`
                                    })
                                }]
                            }else{//事件报警
                                item.rule_list=[...item.rule_list,{
                                    ...obj,
                                    desc:[`${this.trans_arr(this.rule_data.alram_type,this.static_list.alarm_type)} | ${this.trans_arr(this.rule_data.event_name,this.static_list.event_name)}`]
                                }]
                            }
                        }else{
                            item.rule_list = item.rule_list.map(inn => {
                                if(inn.id === edit_rule_id){
                                    inn = {...inn,...this.rule_data}
                                    inn.desc = inn.tab_key==="0" ? inn.level.map(inner=>{
                                        return `${this.getDescription(this.rule_data.metricID[1])} ${inner.range} ${inner.num}${inner.metricUnit}${this.trans_arr(inner.alram_type,this.static_list.alarm_type)} 持续${inner.cycle_num}次就报警`
                                    }) : [`${this.trans_arr(inn.alram_type,this.static_list.alarm_type)} | ${this.trans_arr(inn.event_name,this.static_list.event_name)}`]
                                }
                                return inn;
                            })
                        }
                        
                        
                    }
                    return item;
                })
                
                this.edit_key=""
                this.edit_rule_id=""
                this.show_rule_box()

            }
        })
    }
     
    private cancel(){
        this.edit_key=""
        this.show_rule_box()
        
    }
    private del_rule(pro_id:string,id:string){        
        this.selected_products.map(item=>{
            if(item.id===pro_id){
                item.rule_list = item.rule_list.filter(inn=>inn.id!==id)
            }
            return item;
        })
    }
    private clear(){
        this.tab_key="0"
        const rules_form = this.$refs.rules_form[0] as Form 
        const event_form = this.$refs.event_form[0] as Form
        rules_form.resetFields()
        event_form.resetFields()
        this.rule_data.level=[
            {
                range:'>=',
                num:'',
                cycle_time:'1',
                cycle_num:'1',
                alram_type:'2',
                notice:["email"],
                metricUnit:''
            }
        ]
    }
    private edit_rules(pro_id:string,id:string,key:string){
        this.tab_key = key
        this.edit_key = key
        this.edit_rule_id=id
        this.show_rule_box(pro_id,'edit')
        const fil:any = this.selected_products.filter(item=>item.id === pro_id)
        const fil_rule:any = fil[0].rule_list.filter(item=>item.id===id)
        this.rule_data = JSON.parse(JSON.stringify(fil_rule[0])) 
        // console.log("rule_data",this.rule_data)
    }
    private change_rule_notice(val){
    }
    private changeTab(val){
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
}
</script>
<style lang="scss" scoped>
.product_box{
    .title{
        display: flex;
        justify-content: space-between;
        span{
            font-size: 16px;
            margin-bottom: 20px;
        }
    }
    button.el-button.add-rule.el-button--text {
        display: block;
        margin: 15px 0;
        font-size: 14px;
    }
    .rule-box{
        position: relative;
        .el-button{
            margin: 10px 0 ;
        }
        .add-rule{
            max-width: 1200px;
            width: 100%;
            position: absolute;
            top: 30px;
            transform-origin: left center;
            z-index: 2001;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            padding: 12px;
            color: #606266;
            line-height: 1.4;
            text-align: justify;
            font-size: 14px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0, 0.1);
            word-break: break-all;
            background-color: #fff;
            .btn{
                padding: 10px;
                text-align: right;
                .el-button{
                    margin: 0;
                    margin-right: 10px;
                }
            }
        }
    }
    .add-rule:after{
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    
}
    .rule-level{
        background: #f5f6fa;
        margin-bottom: 10px;
        padding: 10px 5px 0 5px;
        position: relative;
        .unit{
            margin: 0 5px;
        }
        .notice{
            display: flex;
            justify-content: space-between;
            .level-btn{
                text-align: right;
                .el-icon-circle-plus:before,.el-icon-remove:before{
                    font-size:24px;
                    cursor: pointer;
                    margin-right: 10px;
                    color: #455cc6;
                    
                }
            }
        }
        // .index-value{
        //     width: 193px;
        //     margin-right: 3px;
        //     position: relative;
        //     display: inline-block;
        //     padding-bottom: 12px;
        //     span{
        //         position: absolute;
        //         width: 100%;
        //         left: 0;
        //         bottom: -15px;

        //     }
            
        // }
        .remark{
            position: absolute;
            top: 35px;
            left: 208px;
        }
        .el-input.el-input--small.el-input--suffix{
                width: 193px;
                margin-right: 5px;
            }
        
    }
    .check{
        display: flex;
    }
        
    
    

</style>
<style lang="scss">
    .rule-warn{
        
        .el-select.el-select--small {
            margin-right: 5px !important;
            margin-bottom: 10px !important;
        }
    }
</style>