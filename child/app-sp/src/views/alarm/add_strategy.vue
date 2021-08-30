<template>
    <el-card class="create">
        <el-form :model="form_data" ref="form" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="name"
                label="策略名称"
                :rules="[{required:true,message:'请输入策略名称',trigger:'blur'}]"
            >
                <el-input v-model="form_data.name" minlength=2 maxlength=60 placeholder="请输入策略名称" />
            </el-form-item>
            <el-form-item
                prop="stategy"
                label="选择已有策略"
            >
                <el-select v-model="form_data.stategy" placeholder="请选择已有策略">
                    <el-option
                        v-for="item in strategy_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="product_box" v-for="pro in add_product_list" :key="pro.id">
            <div class="title">
                <span>{{pro.name}}</span>
                <el-button type="text" @click="del_product(pro.id)">删除</el-button>
            </div>
            <el-table :data="pro.rule_list" border class="event-table">
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
                        <el-button type="text" @click="edit_rules(pro.id,scope.row.id,scope.row.tab_key)">编辑</el-button>
                        <el-button type="text" @click="del_rule">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
             <div class="rule-box">
                <el-button type="text" @click="show_rule_box(pro.id)">添加规则</el-button>
                <div class="add-rule" v-if="pro.visible">
                    <rule-config :rule_data.sync="rule_data" @get_tab = "get_tab" :edit_key="edit_rule.edit_key" />
                    <div class="btn">
                        <el-button type="primary" @click="add_rule">确定</el-button>
                        <el-button type="cancel" @click="cancel">取消</el-button>
                    </div>
                </div>
            </div>
            
        </div>
        <el-select v-model="product_id" placeholder="添加产品" @change="add_product">
            <el-option
                v-for="item in product_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
        </el-select>
    </el-card>
</template>
<script lang="ts">
import { Component, Vue,Prop, Watch } from 'vue-property-decorator';
import { Form } from "element-ui";
import RuleConfig from './ruleConfig.vue'
import {productList,create_obj,alarm_type,event_name}from '../../assets/data'
@Component({
    components:{
        RuleConfig
    }
})
export default class Index extends Vue{
    private form_data:any={
        name:'',
        stategy:''
    };
    private strategy_list:any=[]
    
    private add_product_list=[]
    private product_id:String="";
    private product_list:any = [];
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
    private visible:Boolean=false
    private tab_key:string="0"
    private edit_rule:any={
        edit:false,
        pro_id:'',
        id:'',
        edit_key:""
    }
    private form:Form = null
    created() {
        productList.forEach(item=>{
            this.product_list.push({...item,visible:false,rule_list:[]})
        })
        this.strategy_list = [{id:'',name:'全部'},...create_obj.data]
    }

    private add_product(e){
        console.log("add_product",e)
        if(this.add_product_list.filter(item=>item.id===e).length>0){
            console.log("aaa")
            return;
        }
        this.add_product_list=[...this.add_product_list,...this.product_list.filter(item=>item.id===e)]
        console.log("add_product",this.add_product_list)
    }
    private del_product(id:String){
        this.add_product_list = this.add_product_list.filter(item=>item.id!==id)
    }
    @Watch("rule_data",{immediate:true,deep:true})
    private watch_rule_data(newVal){
        // console.log("watch_rule_data",this.rule_data)
    }
    private show_rule_box(id:string=""){
        this.product_list.map(item=>{
            if(item.id===id){
                item.visible = !item.visible
            }else{
                item.visible = false
            }
            return item;
        })
    }
    private add_rule(){
        this.form.validate(async (valid)=>{
            if(valid){
                const {product_list,add_product_list,tab_key,edit_rule:{edit,id}} = this
                const fil = product_list.filter(item=>item.visible)
                console.log("fil",fil)
                add_product_list.map(item=>{
                    if(item.id===fil[0].id){
                        if(!edit){
                            const obj = {...this.rule_data,tab_key,id:item.id+Math.floor((Math.random()*9+1)*1000000)}
                            if(tab_key==="0"){
                                item.rule_list=[...item.rule_list,{
                                    ...obj,
                                    desc:this.rule_data.level.map(inn=>{
                                        return `${this.rule_data.name} ${inn.range} ${inn.num}% ${this.trans_arr(inn.alram_type,alarm_type)} 持续${inn.cycle_num}次就报警`
                                    })
                                }]
                                console.log("rule_list",item.rule_list)
                            }else{
                                item.rule_list=[...item.rule_list,{
                                    ...obj,
                                    desc:[`${this.trans_arr(this.rule_data.alram_type,alarm_type)} | ${this.trans_arr(this.rule_data.event_name,event_name)}`]
                                }]
                                console.log("rule_list",item.rule_list)
                            }
                        }else{
                            item.rule_list = item.rule_list.map(inn=>{
                                if(inn.id === id){
                                    inn = {...inn,...this.rule_data}
                                    inn.desc = inn.tab_key==="0" ? inn.level.map(inner=>{
                                        return `${inn.name} ${inner.range} ${inner.num}% ${this.trans_arr(inner.alram_type,alarm_type)} 持续${inner.cycle_num}次就报警`
                                    }) : [`${this.trans_arr(inn.alram_type,alarm_type)} | ${this.trans_arr(inn.event_name,event_name)}`]
                                    return inn
                                }
                                
                            })
                            console.log("rule_list",item.rule_list)
                        }
                        
                        
                    }
                    console.log("item",item)
                    return item;
                })
                console.log("add_rule",add_product_list)
                // if(!edit){\
                    this.form.resetFields()
                    this.show_rule_box()
                    
                    this.edit_rule = {
                        edit:false,
                        pro_id:'',
                        id:'',
                        edit_key:""
                    }
                // }
              

            }
        })
    }
    private cancel(){
        this.show_rule_box()
        this.form.resetFields()
    } 
    private edit_rules(pro_id:string,id:string,key:string){
        console.log("add_product_list",this.add_product_list,pro_id,id)
        this.show_rule_box(pro_id)
        this.tab_key = key
        this.edit_rule={
            edit:true,
            pro_id,
            id,
            edit_key:key
        }
        const fil:any = this.add_product_list.filter(item=>item.id === pro_id)
        const fil_rule:any = fil[0].rule_list.filter(item=>item.id===id)
        this.rule_data = JSON.parse(JSON.stringify(fil_rule[0])) 
    }
    private get_tab(val,form){
        console.log("get_tab",val)
        this.tab_key = val
        this.form = form
    }
    private del_rule(){
        
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
            console.log("fil",fil)
            return fil
        }
        
        
    }
    
    
}
</script>
<style lang="scss" scoped>
.create{
    width: 80%;
    padding-left: 5%;
    padding-right: 5%;
    margin: auto;
    height: 100%;    
    overflow-y: auto;
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
        
        
    }
}
label.el-form-item__label{
    text-align: left;
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