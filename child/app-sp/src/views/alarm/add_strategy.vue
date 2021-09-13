<template>
    <div class="create-stategy">
        <back-header title="创建报警策略" back_url="/alarmStrategy"></back-header>
        <div class="main_box">
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
                        <el-select v-model="form_data.stategy" placeholder="请选择已有策略" @change="change_stategy">
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
                <RuleConfig :strategy_data="strategy_data" />
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
import {mock,create_obj}from '../../assets/data'
import Service from '../../https/alarm/list'
@Component({
    components:{
        RuleConfig,
        BackHeader
    }
})
export default class Index extends Vue{
    private form_data:any={
        name:'',
        stategy:''
    };
    private strategy_list:any=[]
    private strategy_data:any=[]
    created() {
        this.getStrategyList()
        this.strategy_list = [{id:'',name:'全部'},...create_obj.data]
    }
    private async getStrategyList(){
        let res:any = await Service.get_strategy_list({
            name:'',
        })
        if(res.code===0){
            this.strategy_list = res.data.datas || []
        }

    }
    private async change_stategy(value){
        const res:any = await Service.get_strategy_detail({
            id:value
        })
        if(res.code===0){
            this.strategy_data = res.data
        }
        
    }
    private create(){

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