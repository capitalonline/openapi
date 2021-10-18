<template>
    <div class="create-stategy">
        <back-header :title="`${edit_id==='' ? '创建' : '编辑'}报警策略`" back_url="/alarmStrategy"></back-header>
        <div class="main_box">
            <el-card class="create">
                <el-form :model="form_data" ref="form" label-width="100px" label-position="left" class="demo-dynamic">
                    <el-form-item
                        prop="name"
                        label="策略名称"
                        :rules="[
                            {required:true,message:'请输入策略名称',trigger:'blur'},
                            { pattern: '^[\u4e00-\u9fa5_a-zA-Z0-9._:-()]{2,60}$',message:'请输入正确的策略名称' }
                        ]"
                    >
                        <el-input v-model="form_data.name" minlength=2 maxlength=60 placeholder="2-60个字符" />
                        <span class="prompt_message m-left10">可包含大小写字母,中文,数字,点号,下划线,半角冒号,连字符,英文括号</span>
                    </el-form-item>
                    <el-form-item
                        prop="stategy"
                        label="选择已有策略"
                        v-if="edit_id===''"
                    >
                        <el-select v-model="form_data.stategy" placeholder="请选择已有策略">
                            <el-option
                                v-for="item in strategy_list"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                :disabled="edit_id!==''"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <RuleConfig :strategy_data="strategy_data" ref="rule_config" />
            </el-card>
            <div class="button_box">
                <el-card class="box-card">
                    <el-button type="primary" @click="create">创建</el-button>
                </el-card>
            </div>
        </div>
    </div>
    
</template>
<script lang="ts">
import { Component, Vue,Prop, Watch } from 'vue-property-decorator';
import { Form } from "element-ui";
import RuleConfig from './ruleConfig.vue'
import BackHeader from '../../components/backHeader.vue';
import Service from '../../https/alarm/list'
@Component({
    components:{
        RuleConfig,
        BackHeader
    }
})
export default class Index extends Vue{
    $message;
    $router;
    $route;
    private form_data:any={
        name:'',
        stategy:''
    };
    private edit_id:string=""
    private strategy_list:any=[]
    private strategy_data:any={}
    
    created() {
        this.edit_id = this.$route.query.id ? this.$route.query.id : ''
        this.getStrategyList()
    }
    // private validate_name:any = (rule:any, value:string, callback:any)=>{
    //     let pattern = /^[\u4e00-\u9fa5_a-zA-Z0-9._:-()]{2,60}$/;
    //     if(pattern.test(value)){
    //         return callback()
    //     }else{
    //         return callback(new Error("请输入正确的策略名称"))
    //     }
    // }
    private async getStrategyList(){
        let res:any = await Service.get_strategy_list({
            name:'',
        })
        if(res.code==='Success'){
            this.strategy_list = res.data.datas || []
            if(this.edit_id!==""){
                this.form_data.stategy = this.edit_id
            }
        }

    }
    @Watch("form_data.stategy")
    private async change_stategy(value){
        const res:any = await Service.get_strategy_detail({
            id:value
        })
        if(res.code==='Success'){
            this.strategy_data = res.data
            if(this.edit_id!==""){
                this.form_data.name = res.data.name
            }
            
        }
        
    }
    private create(){
        const form = this.$refs.form as Form
        const rule_config = this.$refs.rule_config as any
        
        form.validate(async (valid)=>{
            if(valid){
                const selected_products = rule_config.selected_products
                if(selected_products.length===0){
                    this.$message.warning("请添加产品！")
                    return;
                }
                if(selected_products[0].rule_list.length===0){
                    this.$message.warning("请添加规则！")
                    return;
                }
                const list=[]
                selected_products.forEach(item=>{//最外层产品
                    console.log("item",item)
                    item.rule_list.forEach(inn=>{//第二层规则
                        const temp=[]
                        inn.level.map(lev=>{//第三层阈值及报警级别指标项
                            const temp_obj={
                                metricID:inn.metricID[1],
                                metricCondition:lev.range,
                                metricValue:parseInt(lev.num),
                                metricPeriod:parseInt(lev.cycle_time),
                                metricPeriodNum:parseInt(lev.cycle_num),
                                level:parseInt(lev.alram_type),
                                alarmType:inn.tab_key==="0" ?'metric' : 'event',
                                alarmMethod:lev.notice ? lev.notice : [],
                                metricUnit:inn.metricUnit
                            }
                            temp.push(temp_obj)
                        })
                        const obj = {
                            name:inn.name,
                            productType:item.id,
                            ruleRecords:inn.tab_key==="0" ? temp : [{
                                metricID:'',
                                alarmType:inn.tab_key==="0" ?'metric' : 'event',
                                alarmMethod:inn.notice ? inn.notice : [],
                                eventName:inn.event_name,
                                eventType:inn.event_type,
                                level:parseInt(inn.alram_type),

                            }],
                            
                        }
                        list.push(obj)
                    })
                })
                if(this.edit_id===""){
                    let res:any =await Service.add_strategy({
                        name:this.form_data.name,
                        rules:list
                    })
                    if(res.code==='Success'){
                        this.$message.success("创建策略任务下发成功")
                        this.$router.push('/alarmStrategy')
                    }
                }else{
                    const {az,callbackURL,effectEndTime,effectStartTime,enable,id,regions,contactGroupIDs}=this.strategy_data
                    let res:any =await Service.update_strategy({
                        name:this.form_data.name,
                        rules:list.map(item=>{
                            item=Object.assign({},item,{strategyID:this.edit_id})
                            return item;
                        }),
                        az,
                        callbackURL,
                        contactGroupID:contactGroupIDs,
                        effectEndTime,
                        effectStartTime,
                        enable,
                        id,
                        regions,
                        
                    })
                    if(res.code==='Success'){
                        this.$message.success("编辑策略任务下发成功")
                        this.$router.push('/alarmStrategy')
                    }
                }
                

                

            }
        })
    }
   
    
    
    
    
}
</script>
<style lang="scss" scoped>
.create-stategy{
    height: 100%;
    .main_box{
        display: flex;
        height: calc(100% - 58px);
        padding-bottom: 20px;
        .create{
            width: calc(100% - 400px);
            height: 100%;
            overflow-y: auto;
            .el-input{
                width: 420px !important;
            }
            .name-error{
                color: #F56C6C;
                margin: 5px 0 0 2px;
            }
        }
        .button_box{
            position: fixed;
            bottom: 0;
            padding: 20px 0 20px 20px;
            width: 380px;
            right: 20px;
            .el-button{
                width: 100%;
                text-align: center;
            }
        }
    }

}


</style>