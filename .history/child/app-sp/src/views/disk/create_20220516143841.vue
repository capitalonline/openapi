<template>
    <div class="root">
        <back-header title="创建云盘" back_url="/disk"></back-header>
        <div class="main_box">
            <div class="form_box">
                <el-form :model="form_data" ref="form" label-width="120px" class="demo-dynamic">
                    <el-card>
                        <el-form-item
                            prop="customer_id"
                            label="客户ID"
                            :rules="[
                                { required: true, trigger: 'blur', validator: validate_customer }
                            ]"
                        >
                            <el-input v-model="form_data.customer_id" />
                        </el-form-item>
                        <el-form-item
                            prop="customer_name"
                            label="客户名称"
                        >
                            <div>{{form_data.customer_name}}</div>
                        </el-form-item>
                        <el-form-item
                            prop="is_bill"
                            label="是否计费"
                        >
                            <el-switch 
                                v-model="form_data.is_bill" 
                                class="m-right10" 
                                :disabled="!form_data.customer_name" 
                                @change="changeBillMode"
                                active-value=1
                                inactive-value=0
                            ></el-switch>
                            <mark-tip :content="'未计费的云盘无法挂载至计费的实例上'"></mark-tip>
                        </el-form-item>
                    </el-card>
                    <el-card>
                        <el-form-item
                            prop="isMounted"
                            label="是否挂载"
                        >
                            <template>
                                <el-button :type="form_data.isMounted==='1' ? 'primary' : 'default'" @click="mount('1')" :disabled="!form_data.customer_name">挂载到实例</el-button>
                                <el-button :type="form_data.isMounted==='1' ? 'default' : 'primary'" @click="mount('0')" :disabled="!form_data.customer_name">暂不挂载</el-button>
                            </template>
                        </el-form-item>
                    </el-card>
                    <el-card>
                        <div class="card_inline">
                            <el-form-item
                                prop="area"
                                :label="form_data.isMounted==='1' ? 'ECS实例' : '地域及可用区'"
                            >
                                <Area :list="area_list" @get_area_id="get_area_id" :area="form_data.area" />
                            </el-form-item>
                            <el-form-item
                                prop="az"
                                label=""
                            >
                                <el-select v-model="form_data.az" placeholder="请选择可用区">
                                    <el-option v-for="item in az_list" :key="item.az_id" :label="item.az_name" :value="item.az_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                prop="ecs_id"
                                label=""
                                v-if="form_data.isMounted==='1'"
                            >
                                <el-select 
                                    v-model="form_data.ecs_id"                                      
                                    placeholder="请选择或输入实例名称（实例ID)"
                                    filterable
                                    :filter-method="get_instance_list"
                                    @visible-change="change_ecs">
                                    <el-option 
                                        v-for="item in ECS_instance_list" 
                                        :key="item.ecs_id" 
                                        :label="`${item.ecs_id} / ${item.ecs_name}`" 
                                        :value="item.ecs_id"
                                    >
                                    </el-option>
                                </el-select>
                                <div class="ecs-error" v-if="!form_data.ecs_id && form_data.isMounted==='1'">请选择或输入实例</div>
                            </el-form-item>
                        </div>
                        <template v-if="form_data.ecs_id && form_data.isMounted==='1'">
                            <el-form-item
                                prop="instance_detail"
                                label="实例详情"
                            >
                                <template>
                                    <div class="area">地域及可用区：{{`${config_info.regionAz.value.split('-')[1]}  ${config_info.regionAz.value.split('-')[2]}`}}</div>
                                    <div class="area">实例规格:  {{ecs_specifications}}</div>
                                </template>
                                <div class="prompt_message">提示：云盘挂载到实例后，您需要登录实例对挂载的云盘进行“分区格式化和挂载新分区”的操作后即可正式使用云盘</div>

                            </el-form-item>
                        </template>
                    </el-card>
                    <template v-if="form_data.isMounted==='1'">
                        <el-card>
                            <el-form-item
                                prop="del_set"
                                label="删除设置"
                            >
                                <el-checkbox v-model="form_data.del_set">云盘随实例删除</el-checkbox>
                            </el-form-item>
                        </el-card>
                    </template>
                    <el-card v-for="(inn,index) in form_data.disk_list" :key="index">
                        <el-form-item
                            prop="disk_name"
                            label="云盘名称"
                        >
                            <div class="disk-name">
                                <el-input v-model="inn.disk_name" minlength="2" maxlength="40" show-word-limit />
                                <span class="name-error" v-if="inn.disk_name.trim().length===1">云盘名称长度不能为1</span>
                                <span class="name-error" v-else-if="inn.disk_name.trim().length>1 && !(/^[A-Za-z][\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{1,39}$/.test(inn.disk_name))">云盘名称不符合规范</span>

                            </div>
                            <div class="remark">2-40个字符，可包含大小写字母、中文、数字、点号(.)、下划线(_)、半角冒号(:)、连字符(-)、英文括号(英文输入法下的括号)字符，以大小写字母开头</div>
                        </el-form-item>
                        <div class="card_inline">
                            <el-form-item
                                prop="ecs_goods_id"
                                label="类型/容量"
                            >
                                <el-select v-model="inn.ecs_goods_id" @change="change_type($event,index)">
                                    <el-option v-for="item in disk_type_list" :key="item.ecs_goods_id" :label="item.disk_value" :value="item.ecs_goods_id"></el-option>
                                </el-select>
                                <div class="prompt_message">当前区域已购买
                                    <span class="num_message">{{data_disk_info ? data_disk_info[inn.ecs_goods_id].disk_feature : ''}}</span>
                                    <span class="num_message"> {{inn ? inn.disk_size*inn.amount : 0}}</span> 
                                    {{data_disk_info ? data_disk_info[inn.ecs_goods_id].disk_unit : 'GB'}}，还可以购买的容量额度为：
                                    <span class="num_message">{{getResetCapacity(inn.ecs_goods_id,inn.disk_size,inn.amount)data_disk_info && (showResetVolume[data_disk_info[inn.ecs_goods_id].disk_feature] - inn.disk_size*inn.amount)>=0 ? (showResetVolume[data_disk_info[inn.ecs_goods_id].disk_feature] - inn.disk_size*inn.amount) : 0}}</span> 
                                    {{data_disk_info ? data_disk_info[inn.ecs_goods_id].disk_unit : 'GB'}}
                                </div>
                            </el-form-item>
                            <el-form-item
                                prop="disk_size"
                                label=""
                            >
                                <input-number
                                    :disable="form_data.customer_name ? false : true"
                                    :info="data_disk_info ?size_info : null"
                                    @func="change_capacity"
                                >
                                </input-number>
                                <!-- <el-input-number 
                                    v-model="inn.disk_size" 
                                    :disabled="!form_data.customer_name"
                                    :step="get_step_max(inn.ecs_goods_id).step" 
                                    :min="get_step_max(inn.ecs_goods_id).min" 
                                    :max="get_step_max(inn.ecs_goods_id).max" 
                                    @blur="change_capacity(inn.ecs_goods_id)"
                                    @change="change_capacity(inn.ecs_goods_id)"
                                >
                                </el-input-number> -->
                                &nbsp;{{data_disk_info ? data_disk_info[inn.ecs_goods_id].disk_unit : 'GB'}}
                                <span class="m-left20">IOPS: {{inn.iops}}&nbsp;{{data_disk_info ? data_disk_info[inn.ecs_goods_id].iops_unit : 'IOPS'}}</span>
                                <span class="m-left20">带宽： {{inn.throughput}}&nbsp;{{data_disk_info ? data_disk_info[inn.ecs_goods_id].throughput_unit : 'MB/s'}}</span>
                            </el-form-item>
                        </div>
                        <el-form-item
                            prop="amount"
                            label="数量"
                        >
                            <el-input-number 
                                v-model="inn.amount" 
                                :step="1" 
                                :min="1" 
                                :disabled="!form_data.customer_name"
                                :max="dis_change ? inn.amount : disk_total" 
                                @blur="changeNum(index,inn.amount)"
                                @change="changeNum(index,inn.amount)"
                            >
                            </el-input-number>&nbsp;块
                            <div class="prompt_message">还可以挂载&nbsp;<span class="num_message">{{data_disk_info && (showResetVolume[data_disk_info[inn.ecs_goods_id].disk_feature] - inn.disk_size*inn.amount)>=0 ? Math.floor((showResetVolume[data_disk_info[inn.ecs_goods_id].disk_feature] - inn.disk_size*inn.amount)/inn.disk_size) : 0}}</span>&nbsp;块盘， 已挂载&nbsp;<span class="num_message">{{inn.amount}}</span>&nbsp;块盘</div>

                            <!-- <div class="prompt_message" v-if="form_data.isMounted==='1'">还可以挂载&nbsp;<span class="num_message">{{disk_total - inn.amount}}</span>&nbsp;块盘， 已挂载&nbsp;<span class="num_message">{{inn.amount}}</span>&nbsp;块盘</div> -->

                        </el-form-item>
                    </el-card>
                    <el-card class="m-bottom10" v-if="form_data.is_bill==='1'">
                        <el-form-item
                            prop="fee"
                            label="计费方式"
                        >
                            <template>
                                <el-button type="primary">按需计费</el-button>
                            </template>
                        </el-form-item>
                    </el-card>
                </el-form>   
            </div>
            <div class="detail_box fixed-top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>当前配置信息</span>
                    </div>
                    <div class="config-info" v-for="(item,key) in config_info" :key="key">
                        <div>{{item.label}}</div>
                        <div v-if="key==='disk'">
                            <div v-if="getDiskConfigInfo().hdd > 0">
                                <span>HDD云盘  </span>
                                <span>{{getDiskConfigInfo().hdd}}GB</span>
                            </div>
                            <div v-if="getDiskConfigInfo().ssd > 0">
                                <span>SSD云盘  </span>
                                <span>{{getDiskConfigInfo().ssd}}GB</span>
                            </div>
                            <div class="num_message text-right" v-if="getDiskConfigInfo().ssd > 0 || getDiskConfigInfo().hdd > 0">{{total_price}}</div>
                        </div>
                        <div v-else-if="key==='ecs_name'" :class="[item.value==='--' ? '' : 'clickble']" @click="goToDetail(item.value)">{{item.value}}</div>
                        <div v-else>{{item.value}}</div>
                    </div>
                </el-card>
            </div>
            <div class="button_box">
                <el-card class="box-card">
                    <div class="flex-between m-bottom20">
                        <div>总价：</div>
                        <div class="num_message price">{{total_price}}</div>
                    </div>
                    <el-button type="primary" @click="create" :disabled="!form_data.customer_name || curTotal>showResetVolume[form_data.disk_list[0].disk_feature]">创建</el-button>
                </el-card>
            </div>
        </div>
        <template v-if="detail_visible">
            <Detail :visible = "detail_visible" :detail_id = "form_data.ecs_id" @close-detail = 'closeDetail' />
        </template>
        <template v-if="visible">
            <confirm-box :visible.sync="visible" @fn-create="createConfirm"></confirm-box>
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import backHeader from '../../components/backHeader.vue';
import Area from '../../components/Area.vue';
import Service from '../../https/instance/create';
import ServiceList from '../../https/instance/list';
import disk_service from '../../https/disk/create'
import detail_service from '../../https/instance/record_detail'
import Detail from '../instance/detail.vue';
import svgIcon from '../../components/svgIcon/index.vue'
import { Form } from "element-ui";
import getIops from '../../utils/getIops';
import { deal_list,deal_fee_info } from '../../utils/transIndex';
import MarkTip from '../../components/markTip.vue';
import ConfirmBox from '../../components/confirmBox.vue';
import InputNumber from '../../components/inputNumber.vue'
@Component({
    components: { 
        backHeader,
        Area,
        Detail,
        svgIcon,
        MarkTip,
        ConfirmBox,
        InputNumber
    },
})
export default class CreateDisk extends Vue{
    $router;
    $message;
    private form_data:any={
        customer_id:'',
        customer_name:'',
        isMounted:'1',
        is_bill:'1',
        area:'',
        az:'',
        ecs_id:'',
        del_set:false,
        disk_list:[
            {
                disk_name:'',
                ecs_goods_id:'',
                disk_size:128,
                amount:1,
                iops:2824,
                throughput:96,
                disk_feature:'',
                disk_max:1
            }
        ],
        
    }
    private data_disk_info:any=null
    private disk_total:number=16;//云盘限制数量
    private total:number=1;//已选择云盘数量
    private ecs_specifications:string=''//实例规格
    private az_list:any=[]
    private dis_change=false//判断挂载总数是否达到16
    private ECS_instance_list:any=[]
    private area_list=[]
    private disk_type_list=[];
    private detail_visible:Boolean = false;
    private customerID:string="";
    private billing_info:any={}
    private visible:boolean=false
    private total_price:string='￥0.00/天';
    private price_unit:string="￥";
    private showResetVolume:any={};
    private ecs_mounted_disk:number = 0;
    private size_info={}
    private config_info={
        regionAz:{label:'地域及可用区：',value:'--'},
        ecs_name:{label:'挂载实例名称：',value:'--'},
        disk:{label:'云盘规格：',value:'--'},
        amount:{label:'购买数量：',value:'1'},
        fee:{label:'计费方式',value:'按需计费'},
    }
    mounted() {
        const form = this.$refs.form as Form
        form.validate(valid=>{

        })
        
    }
    private validate_customer:any = (rule:any, value:string, callback:any)=>{
        if(!value){
            return callback(new Error("请输入客户ID"))
        }else if(value.length>0 && value.length<=6){
            return callback(new Error("请输入正确的客户ID"))
        }else{
            return callback()
        }
    }
    //监听客户ID
    @Watch("form_data.customer_id")
    private watch_customer_id(newVal){
        const form = this.$refs.form as Form;
        form.validate((valid:boolean)=>{
            if(valid){
                this.get_customer_name()
            }
        })
        
    }
    // @Watch("form_data.customer_id")
    //监听实例ID
    @Watch("form_data.ecs_id")
    private watch_ecs_id(newVal){
        if(!newVal){
            return;
        }
        this.get_mounted_num()
    }
    //监听可用区ID
    @Watch("form_data.az")
    private watch_az(newVal){
        let area_info = this.config_info.regionAz.value.split('-')
        let fil = this.az_list.filter(item=>item.az_id===newVal)
        area_info[2] = fil[0].az_name
        this.config_info.regionAz.value=area_info.join('-')
        this.get_instance_list()
        this.get_disk_info()
        
    }
    private get curTotal():number{//当前申请了多少
        return this.form_data.disk_list[0].disk_size * this.form_data.disk_list[0].amount
    }
    //获取客户名称
    private async get_customer_name(){
        const resData: any = await Service.get_customer_name({customer_id: this.form_data.customer_id});
        if (resData.code == 'Success') {
            this.form_data={...this.form_data,customer_name:resData.data.customer_name}
            this.mount(this.form_data.isMounted)
            this.customerID = resData.data.customer_id
            this.get_area_list();
            this.price_unit = resData.data.area_id
            this.total_price=this.price_unit==='$' ? "$0.00/day" : "￥0.00/天"
        }
    }
    //获取地区列表
    private async get_area_list(){
        const resData: any = await Service.get_region_az_list({customer_id: this.form_data.customer_id});
        if (resData.code == 'Success') {
            this.area_list = resData.data;
        }
    }
    //关闭面板时重新获取实例列表
    private change_ecs(val){
        if(!val && this.form_data.customer_id){
            this.get_instance_list()
        }
        
    }
    //是否开启计费
    private changeBillMode(val){
        // console.log("changeBillMode",val)
        this.form_data.is_bill = val
        this.form_data.ecs_id=""
        this.get_instance_list()
        this.config_info.ecs_name.value=""
        if(Number(val)===0){
            this.total_price=this.price_unit==='$' ? "$0.00/day" : "￥0.00/天"
            this.config_info.fee.value="不计费"
        }else{
            this.getDiskFee()
            this.config_info.fee.value="按需计费"
        }
    }
    //获取云盘计费
    private async getDiskFee(){
        if(Object.keys(this.billing_info).length===0){
            return;
        }
        const label_list = ['ebs_goods_id','storage_space','iops','ebs_number','handling_capacity','disk_feature'];
        const key_list=['ecs_goods_id','disk_size','iops','amount','throughput','disk_feature']
        let temp_disk = deal_list(this.form_data.disk_list,label_list,key_list)
        let temp_bill=deal_fee_info(this.billing_info)
        let res:any = await disk_service.get_price({
            az_id:this.form_data.az,
            customer_id:this.form_data.customer_id,
            number:1,
            is_gpu:0,
            billing_method:'0',
            disk_info:{
                billing_info:temp_bill,
                data_disk:temp_disk
            }

        })
        if(res.code==="Success"){
            const {price_symbol,price_unit,total_price} = res.data
            this.total_price = `${price_symbol}${Number(total_price).toFixed(2)}/${price_unit}`
             
        }
    }
    //获取实例列表
    private async get_instance_list(val:string=""){
        const resData: any = await ServiceList.get_instance_list({
            page_index:1,
            page_size:20,
            keyword:val,
            customer_id:this.form_data.customer_id,
            az_id:this.form_data.az,
            billing_method: 'all'
        });
        if (resData.code == 'Success') {
            /*todo
            增加筛选系统盘为云盘的GPU实例,本期不做gpu实例挂载
            */
            this.ECS_instance_list = resData.data.ecs_list.filter(item=>["running","shutdown"].includes(item.status) && !item.is_gpu && item.is_charge===Number(this.form_data.is_bill));
        }
    }
    //获取云盘规格信息
    private async get_disk_info(){
        const resData: any = await disk_service.get_disk_type({
            customer_id:this.form_data.customer_id,
            az_id:this.form_data.az,
            billing_method:'0'
        });
        if (resData.code == 'Success') {
            this.billing_info = resData.data.billing_info
            this.disk_type_list = resData.data.data_disk
            // this.disk_type_list = resData.data.data_disk.filter(item=>item.disk_feature==="HDD" || item.disk_feature==="SSD");
            this.disk_type_list.map(item=>{
                this.get_disk_limit(item.disk_feature);
                this.data_disk_info = Object.assign({},this.data_disk_info,{[item.ecs_goods_id]:item});
            })
            let fil = this.disk_type_list.filter(item=>item.disk_feature==="SSD");
            if(fil.length===0 || this.showResetVolume[fil[0].disk_feature]<fil[0].disk_min){
                fil = [this.disk_type_list[0]]
            }            
            this.form_data={...this.form_data,disk_list:this.form_data.disk_list.map((item,index)=>{
                item.ecs_goods_id = fil[0].ecs_goods_id;
                item.disk_feature = fil[0].disk_feature;
                this.change_type(item.ecs_goods_id,index)
                return item;
            })}
        }
    }
    //获取云盘各类型剩余可使用额度
    private async get_disk_limit(type){
        console.log("ccc")
        let res = await disk_service.get_disk_limit({
            customer_id:this.form_data.customer_id,
            az_id:this.form_data.az,
            feature:type,
        })
        if(res.code==='Success'){
            this.showResetVolume[type] = res.data.rest_volume;//各类型总剩余容量;
            // this.showResetVolume[type] = res.data.rest_volume;//显示当前可使用容量;
            // this.showResetVolume['HDD'] = 18;
            // this.showResetVolume['SSD'] = 101;
        }
    }
    //获取剩余显示信息
    getResetInfo(id:string,disk_size:number,amount:number):any{
        let capacity:number=0;
        let num:number=0
        if(Object.keys(this.data_disk_info).length===0 || this.showResetVolume[this.data_disk_info[id].disk_feature]<=0){
            capacity=0;
            num=0;
        }else{
            let reset:number = this.showResetVolume[this.data_disk_info[id].disk_feature] - disk_size*amount
             capacity = reset>0 ? reset : 0;
             num = reset>0 ? Math.floor(reset/disk_size) : 0
        }
        return {
            capacity,
            num
        }
    }
    private clearEcs(){
        this.form_data.ecs_id="";
        this.ecs_mounted_disk=0
        this.config_info.ecs_name.value = '--'
        this.ecs_specifications = ''
        this.get_instance_list()

    }
    //获取实例挂载数据盘数量
    private async get_mounted_num(){
        const resData: any = await detail_service.get_detail({
            ecs_id:this.form_data.ecs_id
        });
        if (resData.code == 'Success') {
            const {data:{disk,ecs_rule,ecs_name}}=resData
            let mounted_disk= disk.data_disk_conf ? disk.data_disk_conf.length : 0;
            if(mounted_disk===16){
                this.$message.warning('该实例云盘已挂满！')
                this.clearEcs()
                this.disk_total = 16
                this.ecs_mounted_disk = 0
                
            }else{
                this.ecs_mounted_disk = mounted_disk
                let num =this.showResetVolume[this.form_data.disk_list[0].disk_feature] / this.form_data.disk_list[0].disk_size
                this.disk_total = (16 - mounted_disk ) > num ? Math.floor(num) : (16 - mounted_disk)
                this.config_info.ecs_name.value = ecs_name
                this.ecs_specifications = ecs_rule.name+'  '+ecs_rule.cpu_num+ecs_rule.cpu_unit+ecs_rule.ram+ecs_rule.ram_unit
            }
            this.resetDiskMounted()
            this.get_disk_quantity()
            
        }
    }
    //重置云盘挂载数量
    private resetDiskMounted(){
        this.form_data={...this.form_data,disk_list:this.form_data.disk_list.map(item=>{
            item.amount=1
            return item
        })}
    }
    //设置云盘列表规格信息
    private getDiskConfigInfo(){
        const hddList = this.form_data.disk_list.filter(item=>item.disk_feature==="HDD")
        const ssdList = this.form_data.disk_list.filter(item=>item.disk_feature==="SSD")
        let hddSize = hddList.reduce((pre,cur)=>{
            return pre+cur.disk_size*cur.amount
        },0)
        let ssdSize = ssdList.reduce((pre,cur)=>{
            return pre+cur.disk_size*cur.amount
        },0)
        return {
            hdd:hddSize,
            ssd:ssdSize,
        }
    }
    set_disk_total(type){
        let num = this.showResetVolume[type] / this.form_data.disk_list[0].disk_size;//当前容量总共可挂载块数
        this.disk_total = this.form_data.isMounted==='1' ? (16 - this.ecs_mounted_disk) > num ? Math.floor(num) : (16 - this.ecs_mounted_disk) : Math.floor(num)
        this.form_data.disk_list[0].amount = this.disk_total > this.form_data.disk_list[0].amount ? this.form_data.disk_list[0].amount : this.disk_total//未挂载不用判断，挂载的时候amount不会超过当前实例允许的可以挂载量
        this.get_disk_quantity()

    }
    //设置挂载
    private mount(value:string){
        this.resetDiskMounted()
        this.clearEcs()
        let type = this.form_data.disk_list[0].disk_feature
        this.form_data={...this.form_data,isMounted:value}
        this.form_data.del_set=false
        let num = this.showResetVolume[type] ? (this.showResetVolume[type] / this.form_data.disk_list[0].disk_size) : 16;
        if(value==='1'){//挂载到实例
            this.disk_total= num > 16 ? 16 : Math.floor(num)//可挂载总量
        }else{
            this.disk_total= Math.floor(num)//可挂载总量
        }
        this.get_disk_quantity()
    }
    //设置区域ID,获取可用区列表
    private get_area_id (val:string){
        const {area_list}=this
        let area_name;
        let region_name;
        area_list.forEach(item=>{
            item.region_list && item.region_list.forEach(inn=>{
                if(inn.region_id===val){
                    region_name = inn.region_name
                    area_name = item.region_group_name
                    this.az_list = inn.az_list
                }
            })
        })
        this.form_data={...this.form_data,area:val,az:this.az_list[0].az_id}
        this.config_info.regionAz.value=area_name+'-'+region_name+'-'+this.az_list[0].az_name
        this.clearEcs()
    }
    // //新增云盘配置
    // private add(){
    //     if(this.form_data.disk_list.length===this.disk_total){
    //         return;
    //     }
    //     this.form_data={...this.form_data,disk_list:[...this.form_data.disk_list,{
    //         disk_name:'',
    //         ecs_goods_id:this.disk_type_list[0].ecs_goods_id,
    //         disk_size:this.disk_type_list[0].disk_min,
    //         iops:this.disk_type_list[0].min_iops,
    //         throughput:this.disk_type_list[0].min_throughput,
    //         amount:1,
    //         disk_feature:this.disk_type_list[0].disk_feature,
    //     }]}
    //     this.get_disk_quantity()
    // }
    // //删除云盘配置
    // private del(len) {
    //     if(this.form_data.disk_list.length===1){
    //         return;
    //     }
    //     const {disk_list}=this.form_data
    //     this.form_data={...this.form_data,disk_list:disk_list.slice(0,len ? len : disk_list.length-1)}
    //     this.get_disk_quantity()
    // }
    //修改云盘挂在实例数量
    private async changeNum(index,current){
        await this.$nextTick(()=>{
            if(!current)this.$set(this.form_data.disk_list[index],'amount',1);
            let type = this.form_data.disk_list[0].disk_feature;
            this.set_disk_total(type)
            
        });
        
    }
    //跳转至云服务器详情
    private goToDetail(value){
        if(value==='--'){
            return;
        }
        this.detail_visible = true
    }
    //关闭云服务器详情
    private closeDetail() {
        this.detail_visible = false
    }
    //计算云盘总的挂载数
    // private computDisk(){
    //     return this.form_data.disk_list.reduce((pre,cur)=>{
    //         return pre+cur.amount
    //     },0)
    // }
    //判断挂载总数是否达到16或者50
    private get_disk_quantity(){
        // this.total = this.computDisk()
        if(this.form_data.disk_list[0].amount>=this.disk_total){
            this.dis_change=true
            
        }else{
            this.dis_change=false
        }
        this.config_info.amount.value = this.total.toString()
        this.form_data.is_bill==='1' && this.getDiskFee()
    }
    private get_step_max(id){
        return this.data_disk_info ? {
            step:this.data_disk_info[id].disk_step,
            max:this.form_data.disk_list[0].disk_max,
            min:this.data_disk_info[id].disk_min
        }:{
            step:1,
            max:1,
            min:1
        }
    }
    //监听类型改变
    private change_type(id,index){
        this.form_data.disk_list[index].disk_feature = this.data_disk_info[id].disk_feature;
        let type = this.form_data.disk_list[index].disk_feature;
        this.form_data.disk_list[index].iops = getIops(this.data_disk_info[id]).iops
        this.form_data.disk_list[index].throughput = getIops(this.data_disk_info[id]).throughput
        this.form_data.disk_list[index].disk_size = this.data_disk_info[id].disk_min;
        this.form_data.disk_list[index].disk_max =this.showResetVolume[type] > this.data_disk_info[id].disk_max ? this.data_disk_info[id].disk_max : this.showResetVolume[type];
        this.form_data.is_bill==='1' && this.getDiskFee();
        this.set_disk_total(type)
        this.get_step_max(this.form_data.disk_list[index].ecs_goods_id)
        this.size_info = {...this.data_disk_info[id],disk_max:this.get_step_max(id).max,size:this.data_disk_info[id].disk_min}
    }
    //监听容量改变
    private async change_capacity(obj){
        // console.log("obj",obj)
        this.form_data.disk_list.map(item=>{
            if(item.ecs_goods_id===obj.ecs_goods_id){
                item.disk_size=obj.size;
                item.iops = getIops(obj,obj.size).iops;
                item.throughput = getIops(obj,obj.size).throughput;
            }
            return item;
        })
        this.set_disk_total(obj.disk_feature)
        // await this.$nextTick(()=>{
        //     let type = this.data_disk_info[id].disk_feature;
        //     this.set_disk_total(type)
        //     this.form_data.disk_list.map(item=>{
        //         if(item.ecs_goods_id===id){
        //             if(!item.disk_size){
        //                 item.disk_size = this.data_disk_info[id].disk_min;
        //             }else{
        //                 let newStep = Math.floor((item.disk_size-this.data_disk_info[id].disk_min)/this.data_disk_info[id].disk_step)
        //                 item.disk_size = newStep*this.data_disk_info[id].disk_step + this.data_disk_info[id].disk_min;
        //             }
        //             item.iops = getIops(this.data_disk_info[id],item.disk_size).iops;
        //             item.throughput = getIops(this.data_disk_info[id],item.disk_size).throughput;
        //         }
        //         return item;
        //     })
        // });
        
        // console.log("origin_size",min,origin_size,)
        // let size = origin_size ? origin_size : min;
        // // if(!origin_size)this.$set(this.form_data.disk_list[index],'disk_size',size);
        // // if(!origin_size)this.$refs.size[index].value = 128;
        // this.form_data.disk_list[index].iops = getIops(this.data_disk_info[id],size).iops;
        // this.form_data.disk_list[index].throughput = getIops(this.data_disk_info[id],size).throughput;
        /**
         * todo
         * 解决只改一次调两次获取价格接口
         */
        this.form_data.is_bill==='1' && this.getDiskFee()
    }
    private createConfirm(){
        const form = this.$refs.form as Form;
        const label_list = ['ebs_goods_id','disk_size','storage_space','disk_iops','iops','amount','band_mbps','handling_capacity','disk_feature', 'disk_name'];
        const key_list=['ecs_goods_id','disk_size','disk_size','iops','iops','amount','throughput','throughput','disk_feature', 'disk_name']
        let temp_disk = deal_list(this.form_data.disk_list,label_list,key_list)
        let temp_bill=deal_fee_info(this.billing_info,true)
        form.validate(async(valid)=>{
            if(valid){
                const {form_data:{ecs_id,del_set,az}} = this
                let res:any = await disk_service.create({
                    customer_id:this.customerID,
                    ecs_id,
                    is_follow_delete:del_set ? '1' : '0',
                    az_id:az,
                    disk_list: temp_disk,
                    billing_info:this.form_data.is_bill==='1' ? temp_bill : {}

                })
                if (res.code === 'Success') {
                    this.$message.success("云盘创建任务下发成功")
                }
                this.$router.push('/disk')
            }else{
                return false;
            }
        })
    }
    //创建、
    private async create(){
        if(this.form_data.ecs_id==="" && this.form_data.isMounted==="1"){
            return;
        }
        let reg = /^[A-Za-z][\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{1,39}$/
        if(this.form_data.disk_list.some(item=>item.disk_name.trim().length===1 || (item.disk_name.trim().length>1 && !reg.test(item.disk_name)))){
            return;
        }
        this.form_data.disk_list.map(item=>{
            item.disk_name = item.disk_name.trim().length===0 ? '' : item.disk_name
            return item;
        })
        this.visible = true
        
    }
}
</script>
<style lang="scss" scoped>
.root{
    .main_box{
        display: flex;
        .form_box{
            // flex: 1;
            width: calc(100% - 326px);
            .card_inline{
                display: flex;
                .ecs-error{
                    font-size: 12px;
                    color: #F56C6C;
                    position: absolute;
                    top: 28px;
                    left: 2px ;
                }
            }
            .area{
                margin-right: 50px;
                display: inline-block;
            }
            .operate_btns{
                width: 100%;
                // text-align: right;
                .el-icon-circle-plus:before,.el-icon-remove:before{
                    font-size:24px;
                    cursor: pointer;
                    margin-right: 10px;
                    color: #455cc6;
                    
                }
                .disk-num{
                    float: right;
                    font-size: 12px;
                    color: #666;
                    .num{
                        color: #455cc6;
                    }
                }
            }
            .el-card.is-always-shadow{
                margin-bottom: 20px !important;
            }
            .el-card.is-always-shadow:last-child{
                margin-bottom: 0px !important;
            }
            svg#svgIcon{
                color: #4359C0;
                margin-left: 5px;
            }
            .remark{
                font-size: 12px;
                color: #666;
            }
            .disk-name{
                display: flex;
                .name-error{
                    font-size: 12px;
                    color: #F56C6C;
                    margin-left: 20px;
                    line-height: 20px;
                    margin-top: 8px;
                }
            }
            
            .el-input{
                width: 420px !important;
            }
            .card_inline{
                .el-form-item{
                    margin-left: -80px !important;
                }
                .el-form-item:first-child{
                    margin-left: 0px !important;
                }
            }
        }
        .detail_box{
            width: 316px;
            padding-left: 20px;
            .config-info{
                line-height: 36px;
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                .ecs-name{
                    color: #4359C0;
                    cursor: pointer;
                }
            }
        }
        .button_box{
            position: fixed;
            bottom: 0;
            padding: 20px 0 20px 20px;
            width: 316px;
            right: 30px;
            .el-button{
                width: 100%;
                text-align: center;
            }
            .price{
                font-size: 16px;
                font-weight: 700;
            }
        }
    }
    

}
</style>
<style lang="scss">
.form_box{
    .el-form-item__label{
        text-align: left !important;
    }
}
</style>
