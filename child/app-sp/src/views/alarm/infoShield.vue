<template>
    <el-dialog
      :title="'屏蔽'"
      :visible.sync="visibleSync"
      width="600"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
        <div>
            <el-form :model="formData" ref="form" label-width="100px" label-position="left" class="demo-dynamic">
                <el-form-item label="故障资源 ID">
                    <span>{{formData.instanceID}}</span>
                </el-form-item>
                <el-form-item label="规则名称">
                    <span>{{formData.ruleName}}</span>
                </el-form-item>
                <el-form-item 
                    prop="name" 
                    label="屏蔽名称" 
                    :rules="[
                        {required:true,message:'请输入屏蔽名称',trigger:'blur'},
                        { pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{2,60}$/,message:'名称长度应为2-60个字符',trigger:'blur' }
                    ]"
                >
                    <el-input v-model="formData.name" minlength=2 maxlength=60 placeholder="2-60个字符" show-word-limit />
                    <div class="prompt_message">可包含大小写字母,中文,数字,点号,下划线,半角冒号,连字符,英文括号</div>
                </el-form-item>
                <el-form-item prop="time" label="静默时间">
                    <el-select
                        v-model="formData.timeScope" 
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
                <div v-if="formData.timeScope===0" class="time">
                    <el-date-picker
                        v-model="formData.timeRange"
                        :clearable="false"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div v-if="formData.timeScope===1" class="time">
                    <el-date-picker
                        v-model="formData.endTime"
                        :clearable="false"
                        type="datetime"
                        placeholder="选择时间">
                    </el-date-picker>
                </div>
                <div class="time error_message m-top10" v-if="(Number(formData.timeScope)===0 && formData.timeRange.length===0) || (Number(formData.timeScope)===1 && !formData.endTime)">请选择时间</div>
            </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="visibleSync = false">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
import Service from '../../https/alarm/list';
import moment from 'moment';
@Component({})
export default class InfoShield extends Vue{
    @Prop({default:()=>{}})info!:any;
    @PropSync('visible')visibleSync!:boolean;
    private formData={
        instanceID:this.info.instanceID,
        ruleName:this.info.strategyName,
        name:'',
        timeScope:'',
        timeRange:[],
        endTime:'',
    }
    private timeScopeList:any=[];
    created() {
        this.get_create_info()
    }
    private async get_create_info(){
        let res:any=await Service.get_create_info({})
        if(res.code==='Success'){
            this.timeScopeList = res.data.shield_time;
            this.formData.timeScope = this.timeScopeList[0]?.id
        }
    }
    private confirm(){
        let form = this.$refs.form as any;
        form.validate(async valid=>{
            if(valid){
                if((Number(this.formData.timeScope)===0 && this.formData.timeRange.length===0) || (Number(this.formData.timeScope)===1 && !this.formData.endTime)){
                    return;
                }
                let res:any = await Service[this.info.shieldID? 'edit_shield' :'create_shield']({
                    shield_name:this.formData.name,
                    shield_mechanism:0,
                    recordID:this.info.id,
                    effective_scope:this.info.productType==='云服务器' ? 0 : 1,
                    shield_time:Number(this.formData.timeScope),
                    shield_start_time:Number(this.formData.timeScope)===0 ? moment(this.formData.timeRange[0]).format('YYYY-MM-DD HH:mm:ss'):undefined,
                    shield_end_time:Number(this.formData.timeScope)===0 ? moment(this.formData.timeRange[1]).format('YYYY-MM-DD HH:mm:ss'):Number(this.formData.timeScope)===1 ? moment(this.formData.endTime).format('YYYY-MM-DD HH:mm:ss') :undefined,
                    conditions:[
                        {
                            condition_object:'id',
                            operator:0,
                            condition_value:this.formData.instanceID
                        }
                    ]
                })
                if(res.code==='Success'){
                    this.$message.success(res.message)
                    this.visibleSync=false
                }
            }
        })
    }
    
}
</script>
<style lang="scss" scoped>
.time{
    margin-left: 100px;
}
</style>