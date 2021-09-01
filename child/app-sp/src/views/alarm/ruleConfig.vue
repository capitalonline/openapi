<template>
<div>
    <div class="product_box" v-for="pro in selected_products" :key="pro.id">
        <div class="title">
            <span>{{pro.name}}</span>
            <el-button type="text" @click="del_product(pro.id)">删除</el-button>
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
                    <el-popover
                        placement="top"
                        width="160"
                        v-model="del_rule_visible">
                        <p>确定删除这条规则吗？</p>
                        <div style="text-align: right; margin: 10px">
                            <el-button size="mini" type="text" @click="del_rule_visible = false">取消</el-button>
                            <el-button size="mini" type="text" @click="del_rule(pro.id,scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="text">删除</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div class="rule-box">
            <el-button type="text" @click="show_rule_box(pro.id)">添加规则</el-button>
            <div class="add-rule" v-show="pro.visible">
                <el-tabs v-model="tab_key" type="card" @tab-click="changeTab">
                    <el-tab-pane label="阈值报警" title="0" :disabled="edit_key==='1'">
                        <div class="rule-warn">
                            <el-form :model="rule_data" ref="rules_form" label-width="150px" class="demo-dynamic">
                                <el-form-item
                                    prop="name"
                                    label="规则名称"
                                    :rules="[{ required: true, message: '请输入规则名称', trigger: 'blur' }]"
                                >
                                    <el-input v-model="rule_data.name" placeholder="请输入规则名称" />
                                </el-form-item>
                                <el-form-item
                                    prop="level_name"
                                    label="指标名称"
                                    :rules="[{ required: true, message: '请选择指标名称', trigger: 'blur' }]"
                                >
                                    <el-cascader
                                        v-model="rule_data.level_name"
                                        :options="static_list.level_list"
                                        :show-all-levels="false"
                                        :props="{ expandTrigger: 'hover' }"
                                    >
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
                                        <el-input-number size="small" v-model="inn.num" controls-position="right" :min="1" :max="100"></el-input-number> %&nbsp;&nbsp;
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
                                                    <el-checkbox v-for="notice in static_list.notice_list" :key="notice" :label="notice"></el-checkbox>
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
                            <el-form :model="rule_data" ref="event_form" label-width="150px" class="demo-dynamic">
                                <el-form-item
                                    prop="name"
                                    label="规则名称"
                                    :rules="[{ required: true, message: '请输入规则名称', trigger: 'blur' }]"
                                >
                                    <el-input v-model="rule_data.name" placeholder="请输入规则名称" />
                                </el-form-item>
                                <el-form-item
                                    prop="event_type"
                                    label="事件类型"
                                    :rules="[{ required: true, message: '请选择事件类型', trigger: 'blur' }]"
                                >
                                    <el-select v-model="rule_data.event_type" placeholder="请选择事件类型">
                                        <el-option
                                            v-for="item in static_list.event_type"
                                            :key="item.id"
                                            :label="item.title"
                                            :value="item.id"
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
                                            <el-checkbox v-for="notice in static_list.notice_list" :key="notice" :label="notice"></el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="btn">
                    <el-button type="primary" @click="add_rule">确定</el-button>
                    <el-button type="cancel" @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
        
    </div>
    <el-select v-model="selected_product_id" placeholder="添加产品" @change="add_product">
        <el-option
            v-for="item in product_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        >
        </el-option>
    </el-select>
     
</div>   
</template>
<script lang="ts">
import { Component, Vue,Emit,Watch,PropSync,Prop } from 'vue-property-decorator';
import { Form } from "element-ui";
import {level_list,range_list,notice_list,alarm_type,cycle_num,cycle_time,event_type,event_name,productList}from '../../assets/data'
@Component({})
export default class RuleConfig extends Vue{
    private tab_key:string="0"
    private edit_key:string="";
    private selected_product_id:String="";
    private edit_rule_id:string=""
    private del_rule_visible:Boolean = false

    private rule_data:any={
        name:'',
        level_name:'',
        event_type:'',
        event_name:'',
        alram_type:'',
        notice:[],
        level:[{
            range:'>=',
            num:1,
            cycle_time:'1',
            cycle_num:'1',
            alram_type:'serious',
            notice:["邮箱"],
        }]
    }

    private static_list={
        level_list,
        range_list,
        notice_list,
        alarm_type,
        cycle_num,
        cycle_time,
        event_type,
        event_name,
    }
    private product_list:any=[]
    private selected_products:any = []
    created() {
        productList.forEach(item=>{
            this.product_list.push({...item,visible:false,rule_list:[]})
        })
    }
    private add_product(e){
        if(this.selected_products.filter(item=>item.id===e).length>0){
            return;
        }
        this.selected_products=[...this.selected_products,...this.product_list.filter(item=>item.id===e)]
    }
    private del_product(id:String){
        this.selected_products = this.selected_products.filter(item=>item.id!==id)
    }
    private show_rule_box(id:string=""){
        this.selected_products.map(item=>{
            if(item.id===id){
                item.visible = !item.visible
                if(this.edit_key==="" && item.visible){
                    this.clear()
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
            num:1,
            cycle_time:'1',
            cycle_num:'1',
            alram_type:'serious',
            notice:["邮箱"],
        }
        this.rule_data = {...this.rule_data,level:[...this.rule_data.level,obj]}
    }
    private del_level(){
        const {level}=this.rule_data
        this.rule_data = {...this.rule_data,level:level.filter((item,index)=>index<level.length-1)}
    }
    private add_rule(){
        const {alarm_type,event_name} = this.static_list
        const form = this.tab_key==="0" ? this.$refs.rules_form[0] as Form : this.$refs.event_form[0] as Form
        form.validate(async (valid)=>{
            if(valid){
                const {selected_products,tab_key,edit_key,edit_rule_id} = this
                selected_products.map(item=>{
                    if(item.visible){
                        if(edit_key===""){
                            const obj = {...this.rule_data,tab_key,id:item.id+Math.floor((Math.random()*9+1)*1000000)}
                            if(tab_key==="0"){
                                item.rule_list=[...item.rule_list,{
                                    ...obj,
                                    desc:this.rule_data.level.map(inn=>{
                                        return `${this.rule_data.name} ${inn.range} ${inn.num}% ${this.trans_arr(inn.alram_type,alarm_type)} 持续${inn.cycle_num}次就报警`
                                    })
                                }]
                            }else{
                                item.rule_list=[...item.rule_list,{
                                    ...obj,
                                    desc:[`${this.trans_arr(this.rule_data.alram_type,alarm_type)} | ${this.trans_arr(this.rule_data.event_name,event_name)}`]
                                }]
                            }
                        }else{
                            item.rule_list = item.rule_list.map(inn => {
                                if(inn.id === edit_rule_id){
                                    inn = {...inn,...this.rule_data}
                                    inn.desc = inn.tab_key==="0" ? inn.level.map(inner=>{
                                        return `${inn.name} ${inner.range} ${inner.num}% ${this.trans_arr(inner.alram_type,alarm_type)} 持续${inner.cycle_num}次就报警`
                                    }) : [`${this.trans_arr(inn.alram_type,alarm_type)} | ${this.trans_arr(inn.event_name,event_name)}`]
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
        console.log("pro_id",pro_id,id,this.selected_products)
        this.selected_products.map(item=>{
            if(item.id===pro_id){
                item.rule_list = item.rule_list.filter(inn=>inn.id!==id)
            }
            return item;
        })
        this.del_rule_visible = false
        console.log("del_rule",this.selected_products)
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
                num:1,
                cycle_time:'1',
                cycle_num:'1',
                alram_type:'serious',
                notice:["邮箱"],
            }
        ]
    }
    private edit_rules(pro_id:string,id:string,key:string){
        this.tab_key = key
        this.edit_key = key
        this.edit_rule_id=id
        this.show_rule_box(pro_id)
        const fil:any = this.selected_products.filter(item=>item.id === pro_id)
        const fil_rule:any = fil[0].rule_list.filter(item=>item.id===id)
        this.rule_data = JSON.parse(JSON.stringify(fil_rule[0])) 
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
            width: 1200px;
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
    }
    .check{
        display: flex;
    }
        
    
    

</style>
<style lang="scss">
    .rule-warn{
        
        .el-select.el-select--small {
            margin-right: 5px !important;
        }
        .el-input-number.el-input-number--small.is-controls-right{
            margin-right: 5px !important;
        }
    }
</style>