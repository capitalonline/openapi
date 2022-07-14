<template>
    <div>
        <back-header :title="`${edit_id==='' ? '创建' : '编辑'}告警屏蔽`" back_url="/alarmStrategy"></back-header>
        <el-form :model="shieldData" ref="form" label-width="100px" label-position="left" class="demo-dynamic" :rules="rules">
            <el-form-item prop="name" label="屏蔽名称">
                <el-input v-model="shieldData.name" minlength=2 maxlength=60 placeholder="2-60个字符" show-word-limit />
                <div class="prompt_message">可包含大小写字母,中文,数字,点号,下划线,半角冒号,连字符,英文括号</div>
            </el-form-item>
            <el-form-item prop="name" label="告警机制">
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
                    placeholder="请选择已有策略"
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
                <div v-for="con in shieldData.condition" :key="con.label">
                    <el-select
                        v-model="shieldData.scope" 
                        placeholder="请选择已有策略"
                    >
                        <el-option
                            v-for="item in conditionList"
                            :key="item.label"
                            :label="item.name"
                            :value="item.label"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="shieldData.scope" 
                        placeholder="请选择已有策略"
                    >
                        <el-option
                            v-for="item in conditionList"
                            :key="item.label"
                            :label="item.name"
                            :value="item.label"
                        >
                        </el-option>
                    </el-select>
                    <template v-if="[].includes(con.label)">

                    </template>
                </div>
            </el-form-item>
            <el-form-item prop="time" label="静默时间">

            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import Service from '../../https/alarm/list'
import BackHeader from '../../components/backHeader.vue';

@Component({
    components:{
        BackHeader,
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
        timeScope:0
    }
    private mechanismList:any=[];
    private scopeList:any=[];
    private conditionList:any=[];
    private timeScopeList:any=[]
    private rules:any={
        name:[
            {required:true,message:'请输入屏蔽名称',trigger:'blur'},
            { pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{2,60}$/,message:'名称长度应为2-60个字符',trigger:'blur' }
        ]
    }
    created() {
        
    }
    private async get_create_info(){
        let res:any=await Service.get_create_info({})
        if(res.code==='Success'){
            this.mechanismList = res.data.shield_mechanism;
            this.scopeList = res.data.shield_scope;
            this.conditionList = res.data.condition_object;
            this.timeScopeList = res.data.shield_time
        }
    }
}
</script>