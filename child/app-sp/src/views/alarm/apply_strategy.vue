<template>
    <el-drawer
        title="应用策略"
        :visible.sync="drawer_sync"
        :wrapperClosable="false"
    >
        <div class="drawer">
            <el-form :model="form_data" ref="form" label-width="150px" class="demo-dynamic">
                <el-form-item
                    prop="customer_id"
                    label="客户ID"
                    :rules="[
                        { required: false, trigger: 'blur', validator: validate_customer }
                    ]"
                >
                    <el-input v-model="form_data.customer_id" :disabled="!enable" />
                </el-form-item>
                <el-form-item
                    prop="customer_name"
                    label="客户名称"
                >
                    <div>{{form_data.customer_name}}</div>
                </el-form-item>
                <el-form-item
                    prop="area"
                    label="地域："
                >
                    <Region :region_id="form_data.area" :list="area_list" @get_area_id="get_area_id" :disabled="!enable" />
                </el-form-item>
                <el-form-item
                    prop="az"
                    label="可用区:"
                >
                    <Region :region_id="form_data.az" :list="az_list" @get_area_id="get_az_id" :disabled="!enable" />
                </el-form-item>
                <el-form-item
                    prop="cycle"
                    label="通道沉默周期:"

                >
                    <el-select v-model="form_data.cycle" placeholder="请选择通道沉默周期" :disabled="!enable">
                        <el-option
                            v-for="item in cycle_list"
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
                >
                <div class="time">
                    <el-time-select
                        v-model="form_data.start_time"
                        :disabled="!enable"
                        :clearable="false"
                        :editable="false"
                        :picker-options="{
                            format: 'HH:mm',
                            start: '00:00',
                            step: '01:00',
                            end: '23:00'
                        }"
                        placeholder="开始时间">
                    </el-time-select>&nbsp;至&nbsp;
                    <el-time-select
                        v-model="form_data.end_time"
                        :clearable="false"
                        :editable="false"
                        :disabled="!enable"
                        :picker-options="{
                            format: 'HH:mm',
                            start: '00:59',
                            step: '01:00',
                            end: '23:59'
                        }"
                        placeholder="结束时间">
                    </el-time-select>
                </div>
                </el-form-item>
                <el-form-item
                    prop="address"
                    label="报警回调:"
                >
                    <el-input v-model="form_data.address" :disabled="!enable" placeholder="请输入报警回调地址" />
                </el-form-item>
                
                <el-form-item
                    prop="notice_user"
                    label="通知对象:"
                    :rules="[{required:true,message:'请选择通知对象',trigger:'blur'}]"
                >
                    <el-select 
                        v-model="form_data.notice_user" 
                        multiple 
                        placeholder="请选择通知对象"
                        :disabled="!enable"
                        filterable
                        :filter-method="getContactGroupList"
                    >
                        <el-option
                            v-for="item in contact_group_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="foot-btn">
                <el-button type="primary" @click="confirm">确认应用</el-button>
                <el-button @click="close('0')">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script lang="ts">
import {Vue,PropSync,Component,Emit,Watch, Prop} from 'vue-property-decorator'
import { Form } from "element-ui";
import {trans} from '../../utils/transIndex'
import Service from '../../https/instance/create';
import ServiceStrategy from '../../https/alarm/list'
import Region from '../../components/alarm/region.vue';
import {cycle_period} from '../../assets/alarm_data'
@Component({
    components:{
        Region
    }
})
export default class ApplyStrategy extends Vue{
    @PropSync("drawer") drawer_sync!:Boolean;
    @Prop({default:()=>{}})list!:any;
    @Prop(Boolean)enable!:Boolean
    private form_data:any={
        customer_id:'',
        customer_name:'',
        area:[],
        az:[],
        cycle:'86400',
        address:'',
        start_time:'00:00',
        end_time:'23:59',
        notice_user:[]

    }
    private area_list:any=[]
    private az_list:any=[]
    private contact_group_list:any=[]
    private cycle_list = cycle_period
    created() {
        // this.get_area_list();
        // this.getContactGroupList('')
    }
    //获取联系人组列表
     private async getContactGroupList(name){
        let res:any = await ServiceStrategy.get_contact_group_list({
            name
        })
        if(res.code==='Success'){
            this.contact_group_list = res.data.datas
        }
    }
    private validate_customer:any = (rule:any, value:string, callback:any)=>{
        if(value.length>6 || value.length===0){
            return callback()
        }else{
            return callback(new Error("请输入正确的客户ID"))
        }
    }
    //监听客户ID
    @Watch("form_data.customer_id")
    private watch_customer_id(newVal){
        const form = this.$refs.form as Form
        form.validateField(['customer_id'],(err:string)=>{
            if(!err){
                this.get_customer_name()
            }
        }) 
    }
    //获取客户名称
    private async get_customer_name(){
        const resData: any = await Service.get_customer_name({customer_id: this.form_data.customer_id});
        if (resData.code == 'Success') {
            this.form_data={...this.form_data,customer_name:resData.data.customer_name}
            this.get_area_list();
        }
    }
    //获取地区列表
    private async get_area_list(){
        const resData: any = await Service.get_region_az_list({customer_id: this.form_data.customer_id});
        if (resData.code == 'Success') {
            this.area_list = resData.data;
            
        }
    }
    //设置区域ID
    private get_area_id(obj:any){
        const {region_info,region_key} = obj
        let temp_az:any=[]
        this.form_data={...this.form_data,area:region_key,az:[]}
        this.area_list.map(item=>{
            item.region_list.map(inn=>{
                if(region_info[item.region_group_id].includes(inn.region_id)){
                    temp_az.push({
                        region_group_id:inn.region_id,
                        region_group_name:inn.region_name,
                        region_list:trans(inn.az_list,'az_name','az_id','region_name','region_id')
                    })
                }
            })
            
        })
        this.az_list = temp_az
    }
    //设置可用区ID
    private get_az_id(val){
        const {region_info,region_key} = val
        this.form_data={...this.form_data,az:region_key}
    }
    private confirm(){
        const {customer_id,area,az,cycle,address,start_time,end_time,notice_user}=this.form_data
        const form = this.$refs.form as Form
        form.validate(async(valid)=>{
            if(valid){
                const temp:any=[]
                this.list.map(item=>{
                    let obj={
                        az:az,
                        callbackURL : address,
                        contactGroupIDs : notice_user,
                        customerID : customer_id,
                        regions : area,
                        silentPeriod : parseInt(cycle),
                        effectStartTime : start_time,
                        effectEndTime : end_time,
                        enable:this.enable,
                        id:item.id,
                        name:item.name
                    }
                    temp.push(obj)
                    return item;
                })
                let res:any = await ServiceStrategy.apply_strategy({
                    data:temp
                })
                if(res.code==='Success'){
                    this.$message.warning("应用策略任务下发成功！")
                    this.close('1')
                }
            }
        })
        
    }
    
    @Emit("close")
    private close(val){
        this.drawer_sync=false
    }
}
</script>
<style lang="scss" scope>
.drawer{
    padding: 0 20px 20px 20px;
    .foot-btn{
        width: 100%;
        margin-top: 30px;
        text-align: right;
    }
    .time{
        display: flex;
    }
}
</style>