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
                                <el-select v-model="form_data.ecs_id" filterable placeholder="请选择ECS实例名称（实例ID)">
                                    <el-option v-for="item in ECS_instance_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                                    <div class="area">地域及可用区：{{form_data.area}}&nbsp;&nbsp;{{form_data.az}}</div>
                                    <div class="area">实例规格:{{form_data.ecs_id}}</div>
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
                                prop="type"
                                label="类型/容量"
                            >
                                <el-select v-model="inn.type">
                                    <el-option v-for="item in disk_type_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                prop="capacity"
                                label=""
                            >
                                <el-input-number v-model="inn.capacity" :step="100" :min="100" :max="2000" @change="change_capacity"></el-input-number>&nbsp;GB
                            </el-form-item>
                        </div>
                        <el-form-item
                            prop="quantity"
                            label="数量"
                        >
                            <el-input-number v-model="inn.quantity" :step="1" :min="0" :max="dis_change ? inn.quantity : disk_total" @change="changeNum(index,$event)"></el-input-number>&nbsp;块
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
                        <div>--</div>
                    </div>
                    <div class="config-info">
                        <div>挂载实例规格：</div>
                        <div>--</div>
                    </div>
                    <div class="config-info" v-for="(item,index) in form_data.disk_list" :key="index">
                        <div>规格：</div>
                        <div>--</div>
                    </div>
                    <div class="config-info">
                        <div>购买数量：</div>
                        <div>--</div>
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
import Service from '../../https/instance/create'
import { Form } from "element-ui";
@Component({
  components: { 
      backHeader,
      Area,
    },

})
export default class CreateDisk extends Vue{
    $router;
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
                type:'hdd',
                capacity:100,
                quantity:0
            }
        ],
        fee:''
        
    }
    private disk_total:number=16;//云盘限制数量
    private total:number=0;//已选择云盘数量
    private disk_validate_msg:string="2-60个字符，可包含大小写字母、中文、数字、点号、下划线、半角冒号、连字符、英文括号等常用字符"
    private area_list=[
        {
            label:'中国大陆',
            value:'zh',
            children:[
                {
                    label:'北京',
                    value:'bj'
                },
                {
                    label:'广州',
                    value:'gz'
                },
                {
                    label:'上海',
                    value:'sh'
                },
                {
                    label:'无锡',
                    value:'wx'
                },
            ]

        },
        {
            label:'亚太地区',
            value:'ytdq',
            children:[
                {
                    label:'新加披',
                    value:'xjp'
                },
                {
                    label:'孟买',
                    value:'mm'
                },
                {
                    label:'香港',
                    value:'hk'
                },
            ]

        },
        {
            label:'北美地区',
            value:'bmdq',
            children:[
                {
                    label:'达拉斯',
                    value:'dls'
                },
                {
                    label:'弗吉尼亚',
                    value:'fjny'
                },
            ]

        },
        {
            label:'欧洲地区',
            value:'eroup',
            children:[
                {
                    label:'法兰克福',
                    value:'franch'
                },
            ]

        }
    ]
    private ECS_instance_list=[
        {
            label:'实例1',
            value:'beijing'
        },
        {
            label:'实例2',
            value:'beijing2'
        }
    ]
    private az_list=[
        {
            label:'可用区1',
            value:'1'
        },
        {
            label:'可用区2',
            value:'2'
        },
        {
            label:'可用区3',
            value:'3'
        },
        {
            label:'可用区4',
            value:'4'
        },
        {
            label:'可用区5',
            value:'5'
        },
    ]
    private disk_type_list=[
        {
            value:'hdd',
            label:'性能型（HDD)'
        },
        {
            value:'ssd',
            label:'高性能型（SSD）'
        }
    ]
    private validate_customer:any = (rule:any, value:string, callback:any)=>{
        console.log("value",value)
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
            console.log("valid",valid)
            if(valid){
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
        // if (this.default_region.region_id == this.region_list[0].region_id) {
        //         this.FnChangeAz(this.default_az.az_id)
        //     } else {
        //         this.default_region = this.region_list[0];
        //     }
        }
    }
    //监听云盘名称
    @Watch("form_data.disk_list",{ immediate: true, deep: true })
    private watch_disk_name(newVal){
        console.log("newVal",newVal)
    }
    //设置挂载
    private mount(value:string){
        this.disk_total=value==="1" ? 16 : 50
        this.get_disk_quantity()
        const {form_data:{isMounted,disk_list}}=this
        if(value==="1" && isMounted==='0'){
            this.dis_change=false
            this.form_data={...this.form_data,disk_list:disk_list.map(item=>{
                item.quantity=0
                return item
            })}
        }
        this.form_data={...this.form_data,isMounted:value}
    }
    private dis_change=false//判断挂载总数是否达到16
    //设置可用区ID
    private get_az(id:string){
        console.log("id",id)
        this.form_data={...this.form_data,use_area:id}
    }
    //设置区域ID
    private get_area_id (val:string){
        console.log("get_area_id",val)
        const {area_list}=this
        const fil:any = area_list.filter((item:any)=>item.region_name===val)
        this.az_list = fil[0].az_list
        this.form_data={...this.form_data,area:val}
    }
    //新增云盘配置
    private add(){
        if(this.form_data.disk_list.length===this.disk_total){
            return;
        }
        // console.log("add")
        this.form_data={...this.form_data,disk_list:[...this.form_data.disk_list,{
            disk_name:'',
            type:'hdd',
            capacity:100,
            quantity:0
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
            return pre+cur.quantity
        },0)
        if(this.total>=this.disk_total){
            this.dis_change=true
            
        }else{
            this.dis_change=false
        }
    }
    //监听容量改变
    private change_capacity(val){
        console.log("val",val)
    }
    //创建、
    private create(){
        console.log("form_data",this.form_data)
    }
    // private create(){
    //     console.log("#####",this.form_data)
    // }
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