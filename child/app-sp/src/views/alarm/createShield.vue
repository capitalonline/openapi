<template>
    <div>
        <back-header :title="`${edit_id==='' ? '创建' : '编辑'}告警屏蔽`" back_url="/alarmInfo"></back-header>
        <el-form :model="shieldData" ref="form" label-width="100px" label-position="left" class="demo-dynamic" :rules="rules">
            <el-form-item prop="name" label="屏蔽名称">
                <el-input v-model="shieldData.name" minlength=2 maxlength=60 placeholder="2-60个字符" show-word-limit />
                <div class="prompt_message">可包含大小写字母,中文,数字,点号,下划线,半角冒号,连字符,英文括号</div>
            </el-form-item>
            <el-form-item prop="mechanism" label="告警机制">
                <el-select
                    v-model="shieldData.mechanism" 
                    placeholder="请选择已有策略"
                >
                    <el-option
                        v-for="item in mechanismList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="scope" label="抑制范围">
                <el-select
                    v-model="shieldData.scope" 
                    placeholder="请选择抑制范围"
                >
                    <el-option
                        v-for="item in scopeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="condition" label="条件">
                <div v-for="(con,index) in shieldData.condition" :key="con.label">
                    <el-select v-model="con.label">
                        <el-option
                            v-for="item in conditionList"
                            :disabled="selectedIds.includes(item.label)"
                            :key="item.label"
                            :label="item.name"
                            :value="item.label"
                        >
                        </el-option>
                    </el-select>
                    <el-select v-model="con.oper" class="m-left10 m-right10">
                        <el-option
                            v-for="item in operateIcon"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <template v-if="['id'].includes(con.label)">
                        <el-input v-model="con.value" class="w-420" />
                    </template>
                    <template v-else-if="['customer_id'].includes(con.label)">
                        <div class="w-420">
                            <customer :customers="[]"  @FnCustomer="FnCustomer"></customer>
                        </div>
                    </template>
                    <template v-else-if="['to_group','alertname'].includes(con.label)">
                        <!--策略和规则-->
                        <el-select
                            v-model="con.value" 
                            class="w-420"
                        >
                            <el-option
                                v-for="item in labelContent[con.label]"
                                :key="item.id"
                                filterable
                                :filter-method="con.label==='to_group'? getStrategyInfo : getRuleInfo"
                                @visible-change="changeValue($event,con.label)"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template v-else>
                        <el-select
                            v-model="con.value" 
                            class="w-420"
                        >
                            <el-option
                                v-for="item in labelContent[con.label]"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <el-button type="text" @click="delCondition(con.label)" v-if="index!==0"><i class="el-icon-remove"></i></el-button>
                </div>
                <el-button type="text" @click="addCondition"><i class="el-icon-circle-plus"></i></el-button>
                    
                
            </el-form-item>
            <el-form-item prop="time" label="静默时间">
                <el-select
                    v-model="shieldData.timeScope" 
                >
                    <el-option
                        v-for="item in timeScopeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <div v-if="shieldData.timeScope===0">
                <el-date-picker
                    v-model="shieldData.timeRange"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div v-if="shieldData.timeScope===1">
                <el-date-picker
                    v-model="shieldData.ensTime"
                    type="datetime"
                    placeholder="选择时间">
                </el-date-picker>
            </div>
            
        </el-form>
        <el-button type="primary" @click="confirm">创建</el-button>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import Service from '../../https/alarm/list';
import CreateService from '../../https/instance/create'
import BackHeader from '../../components/backHeader.vue';
import Customer from '../../components/customerInput.vue';
import {alarm_type} from '../../assets/alarm_data.ts';
import {deal_list} from '../../utils/transIndex'
import moment from 'moment';
@Component({
    components:{
        BackHeader,
        Customer
    }
})
export default class CreateShield extends Vue{
    private edit_id:string="";
    private shieldData:any={
        name:'',
        mechanism:'',
        scope:'',
        condition:[{
            label:'',
            oper:0,
            value:''
        }],
        timeScope:'',
        timeRange:[],
        endTime:'',
    }
    private mechanismList:any=[];
    private scopeList:any=[];
    private conditionList:any=[];
    private timeScopeList:any=[];
    private operateIcon:any=[{id:0,name:'等于'},{id:1,name:'正则'}];
    private labelContent:any={
        to_group:[],
        alertname:[],
        region:[],
        az:[],
        serverity:deal_list(alarm_type,['id','name'],['id','title'])
    }
    private rules:any={
        name:[
            {required:true,message:'请输入屏蔽名称',trigger:'blur'},
            { pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{2,60}$/,message:'名称长度应为2-60个字符',trigger:'blur' }
        ]
    }
    created() {
        this.get_create_info();
        this.getRegionAz();
        this.getStrategyInfo();
        this.getRuleInfo()
    }
    private async get_create_info(){
        let res:any=await Service.get_create_info({})
        if(res.code==='Success'){
            this.mechanismList = res.data.shield_mechanism;
            this.scopeList = res.data.shield_scope;
            this.conditionList = res.data.condition_object;
            this.timeScopeList = res.data.shield_time;
            this.shieldData.mechanism = this.mechanismList[0]?.id;
            this.shieldData.scope = this.scopeList[0]?.id
            this.shieldData.condition[0].label =this.conditionList[0]?.label
            this.shieldData.condition[0].oper = this.operateIcon[0].id
            this.shieldData.timeScope = this.timeScopeList[0]?.id
        }
    }
    private async getRegionAz(){
        this.labelContent.region=[];
        this.labelContent.az=[];
        let res:any = await CreateService.get_region_az_list({})
        if(res.code==='Success'){
            res.data.map(item=>{                
                this.labelContent.region = [...this.labelContent.region,...item.region_list];                
                item.region_list.map(inn=>{
                    this.labelContent.az = [...this.labelContent.az,...inn.az_list]
                })
            })
            this.labelContent.region = deal_list(this.labelContent.region,['id','name','az_list'],['region_id','region_name','az_list'])
            this.labelContent.az = deal_list(this.labelContent.az,['id','name'],['az_id','az_name'])
        }

    }
    private changeValue(val:boolean,label:string){
        if(!val){
            if(label==='to_group'){
                this.getStrategyInfo()
            }else{
                this.getRuleInfo()
            }
        }
        
    }
    private async getStrategyInfo(name:string=''){
        let res:any = await Service.get_strategy_info({
            name:name
        })
        if(res.code==='Success'){
            this.labelContent.to_group = deal_list(res.data.strategies,['id','name'],['id','strategy_name'])
        }
    }
    private async getRuleInfo(name:string=''){
        let res:any = await Service.get_rule_info({
            name:name
        })
        if(res.code==='Success'){
            this.labelContent.alertname = deal_list(res.data.rules,['id','name'],['id','rule_name'])
        }
    }
    private get selectedIds(){
        return this.shieldData.condition.map(item=>item.label)
    }
    private addCondition(){
        let selective:any = this.conditionList.filter(item=>!this.selectedIds.includes(item.label))
        if(selective.length===0){
            return
        }
        this.shieldData.condition.push({
            label:selective[0].label,
            oper:0,
            value:''
        })
    }
    private delCondition(label){
        this.shieldData.condition = this.shieldData.condition.filter(item=>item.label!==label)
    }
    private FnCustomer(val){
        this.shieldData.condition.map(item=>{
            if(item.label==='customer_id'){
                item.value = val.join(',')
            }
            return item;
        })
    }
    private confirm(){
        let form = this.$refs.form as any;
        form.validate(async valid=>{
            if(valid){
                let list = []
                this.shieldData.condition.map(item=>{
                    list.push({
                        condition_object:item.label,
                        operator:item.oper,
                        value:Array.isArray(item.value) ? item.value.join(',') : item.value
                    })
                    return item;
                })
                let res:any = await Service.create_shield({
                    shield_name:this.shieldData.name,
                    shield_mechanism:Number(this.shieldData.mechanism),
                    effective_scope:Number(this.shieldData.scope),
                    shield_time:Number(this.shieldData.timeScope),
                    shield_start_time:Number(this.shieldData.timeScope)===0 ? moment(this.shieldData.timeRange[0]).format('YYYY-MM-DD HH:mm:ss'):undefined,
                    shield_end_time:Number(this.shieldData.timeScope)===0 ? moment(this.shieldData.timeRange[1]).format('YYYY-MM-DD HH:mm:ss'):Number(this.shieldData.timeScope)===1 ? moment(this.shieldData.endTime).format('YYYY-MM-DD HH:mm:ss') :undefined,
                    conditions:list
                })
                if(res.code==='Success'){

                }
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.w-420{
    width: 420px;
    display: inline-block;
}
.el-icon-circle-plus:before,.el-icon-remove:before{
    font-size:24px;
    color: #455cc6;
}
.el-icon-remove:before{
    margin-top: 10px;
    margin-left: 10px;
}
</style>