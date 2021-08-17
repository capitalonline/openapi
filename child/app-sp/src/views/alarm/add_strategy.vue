<template>
    <el-card class="create">
        <el-form :model="form_data" ref="form" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="title"
                label="策略名称"
                :rules="[{required:true,message:'请输入策略名称',trigger:'blur'}]"
            >
                <el-input v-model="form_data.title" minlength=2 maxlength=60 placeholder="请输入策略名称" />
            </el-form-item>
            <el-form-item
                prop="stategy"
                label="选择已有策略"
            >
                <el-select v-model="form_data.stategy" placeholder="请选择已有策略">
                    <el-option
                        v-for="item in strategy_list"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="product_box" v-for="pro in add_product_list" :key="pro.id">
            <div class="title">
                <span>{{pro.title}}</span>
                <el-button type="text" @click="del_product(pro.id)">删除</el-button>
            </div>
            <el-table :data="pro.rule_list" border class="event-table">
                <el-table-column prop="title" label="规则名称"></el-table-column>
                <el-table-column prop="desc" label="规则描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="edit_rule(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="del_rule">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-popover
                placement="bottom"
                width="800"
                offset=700
                v-model="visible"
                trigger="manual">
                <el-tabs v-model="model_key" type="card" @tab-click="handleClick">
                    <el-tab-pane label="阈值报警" title="1">
                        <div class="rule-warn">
                            <el-form :model="rule_data" ref="rule_form" label-width="150px" class="demo-dynamic">
                                <el-form-item
                                    prop="title"
                                    label="规则名称"
                                >
                                    <el-input v-model="rule_data.title" placeholder="请输入规则名称" />
                                </el-form-item>
                                <el-form-item
                                    prop="index_title"
                                    label="指标名称"
                                >
                                    <el-select v-model="rule_data.index_title" placeholder="请选择指标名称">
                                        <el-option
                                            v-for="item in strategy_list"
                                            :key="item.id"
                                            :label="item.title"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    prop="level"
                                    label="阈值及报警级别"
                                >
                                    <div class="rule-level" v-for="(inn,index) in rule_data.level" :key="inn.id">
                                        <el-select v-model="inn.range" size="small">
                                            <el-option
                                                v-for="item in range_list"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-input-number size="small" v-model="inn.num" controls-position="right" :min="1" :max="100">%</el-input-number>
                                        <el-select v-model="inn.time" size="small">
                                            <el-option
                                                v-for="item in range_list"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="inn.cycle" size="small">
                                            <el-option
                                                v-for="item in range_list"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="inn.warn_level" size="small">
                                            <el-option
                                                v-for="item in range_list"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                        <div class="notice">
                                            <div>
                                                <span>通知：</span>
                                                <el-checkbox-group v-model="inn.notice" @change="change_rule_notice">
                                                    <el-checkbox label="邮箱"></el-checkbox>
                                                    <el-checkbox label="短信"></el-checkbox>
                                                    <el-checkbox label="微信"></el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                            <div class="level-btn" v-if="index===rule_data.level.length-1">
                                                <el-button type="text" class="add-level" @click="add_level">+</el-button>
                                                <el-button type="text" class="del-level" @click="del_level" v-if="rule_data.level.length>1">-</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="事件报警" title="2">
                        <div class="rule-warn">
                            <el-form :model="event_data" ref="event_form" label-width="150px" class="demo-dynamic">
                                <el-form-item
                                    prop="title"
                                    label="规则名称"
                                >
                                    <el-input v-model="event_data.title" placeholder="请输入规则名称" />
                                </el-form-item>
                                <el-form-item
                                    prop="event_type"
                                    label="事件类型"
                                >
                                    <el-select v-model="event_data.event_type" placeholder="请选择事件类型">
                                        <el-option
                                            v-for="item in strategy_list"
                                            :key="item.id"
                                            :label="item.title"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    prop="event_title"
                                    label="事件名称"
                                >
                                    <el-select v-model="event_data.event_title" placeholder="请选择事件名称">
                                        <el-option
                                            v-for="item in strategy_list"
                                            :key="item.id"
                                            :label="item.title"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    prop="event_warn"
                                    label="事件等级及报警"
                                >
                                    <el-select v-model="event_data.event_warn" placeholder="请选择事件等级及报警">
                                        <el-option
                                            v-for="item in strategy_list"
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
                                >
                                    <div class="notice-event">
                                        <span>通知：</span>
                                        <el-checkbox-group v-model="event_data.notice">
                                            <el-checkbox label="邮箱"></el-checkbox>
                                            <el-checkbox label="短信"></el-checkbox>
                                            <el-checkbox label="微信"></el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <el-divider></el-divider>
                <div class="popover-btn">
                    <el-button type="primary" @click="add_rule">确定</el-button>
                    <el-button type="cancel">取消</el-button>
                </div>
                
                <el-button type="text" @click="visible=!visible" class="add-rule" slot="reference">添加规则</el-button>
            </el-popover>
        </div>
        <el-select v-model="product_id" placeholder="添加产品" @change="add_product">
            <el-option
                v-for="item in product_list"
                :key="item.id"
                :label="item.title"
                :value="item.id"
            >
            </el-option>
        </el-select>
    </el-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from "element-ui";
@Component({})
export default class Index extends Vue{
    private form_data:any={
        title:'',
        stategy:''
    };
    private strategy_list:any=[
        {id:1,title:'策略1'},
        {id:2,title:'策略2'},
    ]
    private product_list=[
        {id:'1',title:'产品1'},
        {id:'2',title:'产品2'},
        {id:'3',title:'产品3'},
        {id:'4',title:'产品4'},
    ]
    private add_product_list=[]
    private range_list=[
        {id:'>=',title:'>='},
        {id:'<=',title:'<='},
        {id:'>',title:'>'},
        {id:'<',title:'<'},
    ]
    private product_id:String="";
    private rule_list:any=[];
    private model_key:String="1"
    private rule_data:any={
        title:'',
        index_title:'',
        level:[{
            id:1,
            range:'',
            num:1,
            time:'',
            cycle:'',
            warn_level:'',
            notice:[],
        }]
    }
    private event_data:any={
        title:'',
        event_type:'',
        event_title:'',
        event_warn:'',
        notice:["短信"]
    }
    private level_list:any=[]
    private visible:Boolean=false
    private add_product(e){
        console.log("add_product",e)
        if(this.add_product_list.filter(item=>item.id===e).length>0){
            return;
        }
        this.add_product_list=[...this.add_product_list,...this.product_list.filter(item=>item.id===e)]
    }
    private del_product(id:String){
        this.add_product_list = this.add_product_list.filter(item=>item.id!==id)
    }
    private edit_rule(id:string){

    }
    private del_rule(){
        
    }
    private add_rule(){
        this.visible=false
        const {model_key}=this
        if(model_key==='1'){

        }
    }
    private handleClick(){
        
    }
    private add_level(){
        let len:number = this.rule_data.level.length
        const obj={
            id:len+1,
            range:'',
            num:1,
            time:'',
            cycle:'',
            warn_level:'',
            notice:[],
        }
        this.rule_data = {...this.rule_data,level:[...this.rule_data.level,obj]}
        console.log("add_level",this.rule_data)
    }
    private del_level(){
        const {level}=this.rule_data
        this.rule_data = {...this.rule_data,level:level.filter((item,index)=>index<level.length-1)}
        console.log("del_level",this.rule_data)
    }
    private change_rule_notice(val){
        console.log("val",val)
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
.notice{
    display: flex;
    justify-content: space-between;
    .el-checkbox-group{
        display: inline-block;
    }
}
.notice-event{
    .el-checkbox-group{
        display: inline-block;
    }
}
.popover-btn{
    text-align: right;
}
</style>
<style lang="scss">
    .rule-warn{
        .el-form-item{
            margin-bottom: 5px !important;
        }
        .el-select.el-select--small {
            margin-right: 5px !important;
        }
        .el-input-number.el-input-number--small.is-controls-right{
            margin-right: 5px !important;
        }
    }
</style>