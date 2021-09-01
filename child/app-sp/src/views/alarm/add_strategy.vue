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
        <RuleConfig />
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
    created() {
        
        this.strategy_list = [{id:'',name:'全部'},...create_obj.data]
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
    
}
label.el-form-item__label{
    text-align: left;
}

</style>