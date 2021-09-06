<template>
    <div class="root">
        <back-header title="创建云盘" back_url="/disk"></back-header>
        <div class="main_box">
            <div class="form_box">
                <el-form :model="form_data" ref="form" label-width="100px" class="demo-dynamic">
                    <el-card>
                        <el-form-item
                            prop="customer_id"
                            label="客户ID"
                            :rules="[
                                {required:true,message:'请输入客户ID',trigger:'blur'},
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
                    </el-card>
                    <el-card>
                        <el-form-item
                            prop="isMounted"
                            label="是否挂载"
                        >
                            <template>
                                <el-button :type="form_data.isMounted==='1' ? 'primary' : 'default'" @click="mount('1')">挂载到实例</el-button>
                                <el-button :type="form_data.isMounted==='1' ? 'default' : 'primary'" @click="mount('0')">暂不挂载</el-button>
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
                            <template v-if="form_data.isMounted==='1'">
                            <el-form-item
                                prop="ecs_id"
                                label=""
                            >
                                <el-select 
                                    v-model="form_data.ecs_id"                                      
                                    placeholder="请选择ECS实例名称（实例ID)"
                                    filterable
                                    :filter-method="get_instance_list"
                                >
                                    <el-option 
                                        v-for="item in ECS_instance_list" 
                                        :key="item.ecs_id" 
                                        :label="`${item.ecs_id} / ${item.ecs_name}`" 
                                        :value="item.ecs_id"
                                        :disabled="item.az_id!==form_data.az || (item.status!=='running' && item.status!=='shutdown')"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            </template>
                        </div>
                        <template v-if="form_data.ecs_id!=='' && form_data.isMounted==='1'">
                            <el-form-item
                                prop="instance_detail"
                                label="实例详情"
                            >
                                <template>
                                    <div class="area">地域及可用区：
                                        <span>{{form_data.az!=="" ? trans_label(form_data.area,area_list,"region_id","region_name","region_list")[1] : ''}}</span>
                                        <span v-if="form_data.az!==''">&nbsp;&nbsp;{{trans_label(form_data.az,az_list,"az_id","az_name")}}</span>
                                    </div>
                                    <div class="area">实例规格:  {{ecs_specifications[0]}}&nbsp;&nbsp;&nbsp;{{ecs_specifications[1]}}</div>
                                </template>
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
                            <el-input v-model="inn.disk_name" minlength="2" maxlength="60" show-word-limit />
                            <div class="remark">{{disk_validate_msg}}</div>
                        </el-form-item>
                        <div class="card_inline">
                            <el-form-item
                                prop="ecs_goods_id"
                                label="类型/容量"
                            >
                                <el-select v-model="inn.ecs_goods_id">
                                    <el-option v-for="item in disk_type_list" :key="item.ecs_goods_id" :label="item.disk_value" :value="item.ecs_goods_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                prop="disk_size"
                                label=""
                            >
                                <el-input-number v-model="inn.disk_size" :step="128" :min="128" :max="2048" @change="change_capacity"></el-input-number>&nbsp;GB
                            </el-form-item>
                        </div>
                        <el-form-item
                            prop="amount"
                            label="数量"
                        >
                            <el-input-number v-model="inn.amount" :step="1" :min="0" :max="dis_change ? inn.amount : disk_total" @change="changeNum(index,$event)"></el-input-number>&nbsp;块
                        </el-form-item>
                        <template v-if="index===form_data.disk_list.length-1">
                            <el-form-item
                                prop="btn"
                                label=""
                            >
                                <div class="operate_btns">
                                    <i class="el-icon-circle-plus" type="primary" @click="add" v-if="!dis_change"></i>
                                    <i class="el-icon-remove" @click="del(index)" v-if="form_data.disk_list.length>1"></i>
                                    <span class="disk-num">您已选择&nbsp;<span class="num">{{total}}</span>&nbsp;块盘， 还可以添加&nbsp;<span class="num">{{disk_total - total}}</span>&nbsp;块盘</span>
                                </div>
                            </el-form-item>
                        </template>
                        
                    </el-card>
                    <el-card>
                        <el-form-item
                            prop="fee"
                            label="是否开始计费"
                        >
                            <el-radio-group v-model="form_data.fee">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-card>
                </el-form>
                    
                    
            </div>
            <div class="detail_box">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>当前配置信息</span>
                    </div>
                    <div class="config-info">
                        <div>地域及可用区：</div>
                        <div>
                            <span>{{form_data.az!=="" ? trans_label(form_data.area,area_list,"region_id","region_name","region_list").join('-'):'--'}}</span>
                            <span v-if="form_data.az!==''">-{{trans_label(form_data.az,az_list,"az_id","az_name")}}</span>
                        </div>
                    </div>
                    <div class="config-info" v-if="form_data.isMounted==='1'">
                        <div>挂载实例名称：</div>
                        <div>{{ecs_specifications.length===3 ? ecs_specifications[2] : '--'}}</div>
                    </div>
                    <div v-for="(item,index) in form_data.disk_list" :key="index">
                        <div class="config-info">
                            <div>云盘规格：</div>
                            <div>
                                <span>{{disk_type_list.length > 0 ? `${trans_label(item.ecs_goods_id,disk_type_list,"ecs_goods_id","disk_value")}` : '--'}}</span>
                                <span v-if="disk_type_list && item.ecs_goods_id">&nbsp;|&nbsp;{{item.disk_size}}GB</span>
                            </div>
                        </div>
                        <div class="config-info">
                            <div>购买数量：</div>
                            <div>{{item.amount ? item.amount : '--'}}</div>
                        </div>
                    </div>
                    
                </el-card>
            </div>
            <div class="button_box">
                <el-card class="box-card">
                    <el-button type="primary" @click="create">创建</el-button>
                </el-card>
            </div>
        </div>
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
import { Form } from "element-ui";
import scrollDirective from '../../utils/select-directive';
import moment from 'moment'
interface Page {
    current:number,
    size:number,
    total:any
}
@Component({
    components: { 
        backHeader,
        Area,
    },
    // directives:{
    //     scrollDirective
    // }


})
export default class CreateDisk extends Vue{
    
    $router;
    $message;
    
    private form_data:any={
        customer_id:'',
        customer_name:'',
        isMounted:'1',
        area:'',
        az:'',
        ecs_id:'',
        instance_detail:'',
        del_set:false,
        disk_list:[
            {
                disk_name:'',
                ecs_goods_id:'',
                disk_size:128,
                amount:0,
            }
        ],
        fee:''
        
    }
    private disk_total:number=16;//云盘限制数量
    private total:number=0;//已选择云盘数量
    private mounted_disk:number=0;//实例已挂载云盘数量
    private ecs_specifications:Array<string>=[]//实例规格
    private disk_validate_msg:string="2-60个字符，可包含大小写字母、中文、数字、点号、下划线、半角冒号、连字符、英文括号等常用字符";
    private az_list:any=[]
    private ECS_instance_list:any=[]
    private area_list=[]
    private disk_type_list=[]
    private validate_customer:any = (rule:any, value:string, callback:any)=>{
        if(value.length>6){
            return callback()
        }else{
            return callback(new Error("请输入正确的客户ID"))
        }
    }
    //监听客户ID
    @Watch("form_data.customer_id")
    private watch_customer_id(newVal){
        const form = this.$refs.form as Form
        form.validate((valid:boolean)=>{
            if(valid){
                this.get_customer_name()
            }
        })
    }
    //监听实例ID
    @Watch("form_data.ecs_id")
    private watch_ecs_id(newVal){
        if(newVal!==""){
            this.get_mounted_num()
        }
    }
    //监听可用区ID
    @Watch("form_data.az")
    private watch_az(newVal){
        console.log("form_data.az",newVal)
        // this.get_instance_list("")
    }
    //监听云盘名称
    @Watch("form_data.disk_list",{ immediate: true, deep: true })
    private watch_disk_name(newVal){
    }
    //获取客户名称
    private async get_customer_name(){
        const resData: any = await Service.get_customer_name({customer_id: this.form_data.customer_id});
        if (resData.code == 'Success') {
            this.form_data={...this.form_data,customer_name:resData.data.customer_name}
            this.get_area_list();
            this.get_instance_list("")
            this.get_disk_type()
        }
    }
    //获取地区列表
    private async get_area_list(){
        const resData: any = await Service.get_region_az_list({customer_id: this.form_data.customer_id});
        if (resData.code == 'Success') {
            this.area_list = resData.data;
        }
    }
    //获取实例列表
    private async get_instance_list(val){
        const resData: any = await ServiceList.get_instance_list({
            page_index:1,
            page_size:20,
            ecs_name:val,
            status: "running"
        });
        if (resData.code == 'Success') {
            this.ECS_instance_list = resData.data.ecs_list;
        }
    }
    

    //获取云盘类型信息
    private async get_disk_type(){
        const resData: any = await disk_service.get_disk_type({
            customer_id:this.form_data.customer_id
        });
        if (resData.code == 'Success') {
            this.disk_type_list = resData.data.system_disk;
        }
    }
    //获取实例挂载数据盘数量
    private async get_mounted_num(){
        const resData: any = await detail_service.get_detail({
            ecs_id:this.form_data.ecs_id
        });
        if (resData.code == 'Success') {
            const {data:{disk,ecs_rule,ecs_name}}=resData
            this.mounted_disk= disk.data_disk_conf ? disk.data_disk_conf.length : 0;
            this.ecs_specifications = [ecs_rule.name,`${ecs_rule.cpu_num}${ecs_rule.cpu_unit}${ecs_rule.ram}${ecs_rule.ram_unit}`,ecs_name]
            this.disk_total = 16 - this.mounted_disk
            const {form_data:{disk_list}}=this
            this.form_data={...this.form_data,disk_list:disk_list.map(item=>{
                item.amount=0
                return item
            })}
            
            this.get_disk_quantity()
        }
    }

    
    //设置挂载
    private mount(value:string){
        this.disk_total=value==="1" ? 16 - this.mounted_disk : 50
        this.get_disk_quantity()
        const {form_data:{isMounted,disk_list}}=this
        if(value==="1" && isMounted==='0'){
            this.dis_change=false
            this.total=0
            this.form_data={...this.form_data,disk_list:disk_list.map(item=>{
                item.amount=0
                return item
            })}
            this.form_data = {...this.form_data,ecs_id:''}
            this.ecs_specifications=[]
        }
        this.form_data={...this.form_data,isMounted:value}
    }
    private dis_change=false//判断挂载总数是否达到16
    //设置区域ID,获取可用区列表
    private get_area_id (val:string){
        const {area_list}=this
        area_list.forEach(item=>{
            item.region_list && item.region_list.forEach(inn=>{
                if(inn.region_id===val){
                    this.az_list = inn.az_list
                }
            })
        })
        this.form_data={...this.form_data,area:val,az:""}
    }
    //新增云盘配置
    private add(){
        if(this.form_data.disk_list.length===this.disk_total){
            return;
        }
        this.form_data={...this.form_data,disk_list:[...this.form_data.disk_list,{
            disk_name:'',
            ecs_goods_id:'',
            disk_size:128,
            amount:0
        }]}
    }
    //删除云盘配置
    private del(ind) {
        if(this.form_data.disk_list.length===1){
            return;
        }
        const {disk_list}=this.form_data
        this.form_data={...this.form_data,disk_list:disk_list.slice(0,disk_list.length-1)}
        this.get_disk_quantity()
    }
    //修改云盘挂在实例数量
    private changeNum(index,current){
        this.get_disk_quantity()
    }
    //判断挂载总数是否达到16或者50
    private get_disk_quantity(){
        const {disk_list}=this.form_data
        this.total = disk_list.reduce((pre,cur)=>{
            return pre+cur.amount
        },0)
        if(this.total>=this.disk_total){
            this.dis_change=true
            
        }else{
            this.dis_change=false
        }
    }
    //将对应id转换成对应的label
    private trans_label(id,arr,label,name,level){
        if(!level){
            let fil:any =  arr.filter(item=>item[label]===id)
            return fil.length===0 || !fil[0][name] ? '--' : fil[0][name]
        }else{
            let str:Array<string>=[]
            arr.map(item=>{
                item[level].map(inn=>{
                    if(inn[label]===id){
                        str = [item.region_group_name,inn[name]]
                    }
                    return inn;
                })
                return item;
            })
            return str;
        }
        
        
    }
    //监听容量改变
    private change_capacity(val){
    }
    //创建、
    private async create(){
        const {form_data:{customer_id,ecs_id,del_set,az,disk_list}} = this
        let res:any = await disk_service.create({
            customer_id,
            ecs_id,
            is_follow_delete:del_set ? '1' : '0',
            az_id:az,
            disk_list
        })
        if (res.code == 'Success') {
            this.$message.success("新增成功")
        }
        this.$router.push('/disk')
    }
}
</script>
<style lang="scss" scoped>
.root{
    .main_box{
        display: flex;
        .form_box{
            flex: 1;
            .card_inline{
                display: flex;
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
            .remark{
                font-size: 12px;
                color: #666;
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
            width: 380px;
            padding-left: 20px;
            .config-info{
                line-height: 36px;
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
        .button_box{
            position: fixed;
            bottom: 0;
            padding: 20px 0 20px 20px;
            width: 380px;
            right: 30px;
            .el-button{
                width: 100%;
                text-align: center;
            }
        }
    }
    

}
</style>