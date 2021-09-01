<template>
    <el-tabs v-model="model_key" type="card" @tab-click="changeTab">
        <el-tab-pane label="阈值报警" title="0" :disabled="edit_key==='1'">
            <div class="rule-warn">
                <el-form :model="rules" ref="rule_form" label-width="150px" class="demo-dynamic">
                    <el-form-item
                        prop="name"
                        label="规则名称"
                        :rules="[{ required: true, message: '请输入规则名称', trigger: 'blur' }]"
                    >
                        <el-input v-model="rules.name" placeholder="请输入规则名称" />
                    </el-form-item>
                    <el-form-item
                        prop="level_name"
                        label="指标名称"
                        :rules="[{ required: true, message: '请选择指标名称', trigger: 'blur' }]"
                    >
                        <el-cascader
                            v-model="rules.level_name"
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
                        <div class="rule-level" v-for="(inn,index) in rules.level" :key="inn.id">
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
                                <div class="level-btn" v-if="index===rules.level.length-1">
                                    <i class="el-icon-circle-plus" type="primary" @click="add_level"></i>
                                    <i class="el-icon-remove" @click="del_level" v-if="rules.level.length>1"></i>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="事件报警" title="1" :disabled="edit_key==='0'">
            <div class="rule-warn">
                <el-form :model="rules" ref="event_form" label-width="150px" class="demo-dynamic">
                    <el-form-item
                        prop="name"
                        label="规则名称"
                        :rules="[{ required: true, message: '请输入规则名称', trigger: 'blur' }]"
                    >
                        <el-input v-model="rules.name" placeholder="请输入规则名称" />
                    </el-form-item>
                    <el-form-item
                        prop="event_type"
                        label="事件类型"
                        :rules="[{ required: true, message: '请选择事件类型', trigger: 'blur' }]"
                    >
                        <el-select v-model="rules.event_type" placeholder="请选择事件类型">
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
                        <el-select v-model="rules.event_name" multiple  placeholder="请选择事件名称">
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
                        <el-select v-model="rules.alram_type" placeholder="请选择事件等级及报警">
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
                            <el-checkbox-group v-model="rules.notice">
                                <el-checkbox v-for="notice in static_list.notice_list" :key="notice" :label="notice"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>    
</template>
<script lang="ts">
import { Component, Vue,Emit,Watch,PropSync,Prop } from 'vue-property-decorator';
import { Form } from "element-ui";
import {level_list,range_list,notice_list,alarm_type,cycle_num,cycle_time,event_type,event_name}from '../../assets/data'
@Component({})
export default class RuleConfig extends Vue{
    @PropSync('rule_data') rules!:any;  
    @Prop(String)edit_key!:string
    private model_key:String=this.edit_key==="" ? "0" : this.edit_key

    private static_list={
        level_list,
        range_list,
        notice_list,
        alarm_type,
        cycle_num,
        cycle_time,
        event_type,
        event_name
    }
    private add_level(){
        let len:number = this.rules.level.length
        const obj={
            range:'>=',
            num:1,
            cycle_time:'1',
            cycle_num:'1',
            alram_type:'serious',
            notice:["邮箱"],
        }
        this.rules = {...this.rules,level:[...this.rules.level,obj]}
        console.log("add_level",this.rules)
    }
    mounted() {
        const form = this.$refs.rule_form as Form
        this.get_tab(this.model_key,form)
    }
    private del_level(){
        const {level}=this.rules
        this.rules = {...this.rules,level:level.filter((item,index)=>index<level.length-1)}
        console.log("del_level",this.rules)
    }
    private change_rule_notice(val){
        console.log("val",val)
    }
    private changeTab(val){
        console.log("val",val)
        const form =val.index==="0" ? this.$refs.rule_form as Form : this.$refs.event_form as Form
        this.get_tab(val.index,form)
    }
    @Emit("get_tab")
    private get_tab(val,form){
    }
}
</script>
<style lang="scss" scoped>
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