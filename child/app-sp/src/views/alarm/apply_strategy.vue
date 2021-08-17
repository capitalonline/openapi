<template>
    <el-drawer
        title="应用策略"
        :visible.sync="drawer"
    >
        <div class="drawer">
            <el-form :model="form_data" ref="form" label-width="150px" class="demo-dynamic">
                <el-form-item
                    prop="customer_id"
                    label="客户ID："
                >
                    <el-select v-model="form_data.customer_id" placeholder="请选择客户ID">
                        <el-option
                            v-for="item in list"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="area"
                    label="地域："
                >
                    <el-select v-model="form_data.area" placeholder="请选择地域">
                        <el-option
                            v-for="item in list"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="use_area"
                    label="可用区:"
                >
                    <el-select v-model="form_data.use_area" placeholder="请选择可用区">
                        <el-option
                            v-for="item in list"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="cycle"
                    label="通道沉默周期:"
                    :rules="[{required:true,message:'请选择通道沉默周期',trigger:'blur'}]"

                >
                    <el-select v-model="form_data.cycle" placeholder="请选择通道沉默周期">
                        <el-option
                            v-for="item in list"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="time"
                    label="生效时间:"
                    :rules="[{required:true,message:'请选择生效时间',trigger:'blur'}]"
                >
                    <el-time-picker
                        is-range
                        v-model="form_data.time"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        :picker-options="{
                            format: 'HH:mm'
                        }"
                    >
                    </el-time-picker>
                </el-form-item>
                <el-form-item
                    prop="address"
                    label="报警回调:"
                    :rules="[{required:true,message:'请输入报警回调地址',trigger:'blur'}]"
                >
                    <el-input v-model="form_data.address" placeholder="请输入报警回调地址" />
                </el-form-item>
                
                <el-form-item
                    prop="notice_user"
                    label="通知对象:"
                    :rules="[{required:true,message:'请选择通知对象',trigger:'blur'}]"
                >
                    <el-select v-model="form_data.notice_user" placeholder="请选择通知对象">
                        <el-option
                            v-for="item in list"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>
<script lang="ts">
import {Vue,Prop,Component} from 'vue-property-decorator'
@Component({})
export default class ApplyStrategy extends Vue{
    @Prop() drawer!:Boolean;
    private form_data:any={
        customer_id:'',
        area:'',
        use_area:'',
        cycle:'',
        address:'',
        time:'',
        notice_user:''

    }
    private list:any=[
        {id:1,title:'测试1'},
        {id:2,title:'测试2'},
        {id:3,title:'测试3'},
        {id:4,title:'测试4'},
    ]
}
</script>
<style lang="scss" scope>
.drawer{
    padding: 0 20px 20px 20px;
}
</style>