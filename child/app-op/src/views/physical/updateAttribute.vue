<template>
    <el-dialog
        title="设置属性"
        :visible.sync="visible_sync"
        width="600px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <el-form ref="form" :model="form_data" label-width="120px" class="demo-ruleForm">
            <el-form-item label="主机用途">
              <el-cascader
                  class="w-410"
                  v-model="form_data.host_purpose"
                  :options="host_types"
                  :props="{ label:'type_name',value:'type',children:'list',expandTrigger: 'hover' }"
                  clearable
                  placeholder="保持不变"
                  >
              </el-cascader>
            </el-form-item>
            <el-form-item label="切分粒度"  v-if="form_data.host_purpose.includes('vGPU')">
                <el-input class="w-380" placeholder="若输入多个值，用英文逗号隔开" v-model="particle"></el-input> GB
                <el-tooltip popper-class="tooltip-width" content="每块GPU仅能按照一种显存大小和切分类型进行切分；同物理机不同显卡切分粒度/切分类型可以不同；故一台物理机切分粒度/切分类型的数量不能多于物理机GPU数量。最多支持设置4种值。" placement="bottom" effect="light">
                    <el-button type="text">
                        <svg-icon icon="info" class="info"></svg-icon>
                    </el-button>
                </el-tooltip>
            </el-form-item>


            <div class="error_message tip" v-if="particle.split(',').length>4">最多支持设置4种值</div>
            <div class="error_message tip" v-else-if="particle.includes('，')">请用英文逗号隔开</div>
            <el-form-item label="切分类型" v-if="form_data.host_purpose.includes('vGPU')">
                <el-select class="w-410" v-model="vgpu_segment_type">
                    <el-option
                        v-for="item in particleList"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="专属客户">
            <el-select v-model="customer" placeholder="保持不变" clearable>
              <el-option label="全部客户" value="all"></el-option>
              <el-option label="专属客户" value="select"></el-option>
            </el-select>
            <el-select
                style="margin-left: 10px"
                v-model="form_data.customer_ids"
                multiple
                filterable
                remote
                :remote-method="getCustomerList"
                @visible-change="changeCustomer"
                :disabled="customer!=='select'"
            >
              <el-option v-for="item in customerList" :key="item.id" :value="item.id" :label="`${item.id}(${item.name})`">{{`${item.id}(${item.name})`}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品规格族">
            <el-cascader
                class="w-410"
                v-model="form_data.spec_family_ids"
                :options="familyOption"
                :props="{ label:'name',value:'spec_family_id',expandTrigger: 'hover' ,multiple:true}"
                clearable
                :filter-method="getFamilyList"
                @visible-change="changeFamily"
                placeholder="保持不变"
                @change="change"
            >
            </el-cascader>
          </el-form-item>
            <el-form-item label="支持存储类型" prop="backend">
                <el-select
                    class="w-410"
                    v-model="form_data.backend_type"
                    clearable
                    placeholder="保持不变"
                >
                    <el-option v-for="item in backendList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="客户黑名单">
            <el-select v-model="black_customer" placeholder="保持不变" clearable>
              <el-option label="不设置客户黑名单" value="all"></el-option>
              <el-option label="设置客户黑名单" value="select"></el-option>
            </el-select>
            <el-select
                style="margin-left: 10px"
                v-model="form_data.black_customer_ids"
                multiple
                filterable
                remote
                :remote-method="getBlackCustomerList"
                @visible-change="changeBlackCustomer"
                :disabled="black_customer!=='select'"
            >
              <el-option v-for="item in blackCustomerList" :key="item.id" :value="item.id" :label="`${item.id}(${item.name})`">{{`${item.id}(${item.name})`}}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="back('0')">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,PropSync,Emit,Prop,Watch} from 'vue-property-decorator';
import Service from '../../https/physical/list'
import svgIcon from '@/components/svgIcon/index.vue';
import el from "element-ui/src/locale/lang/el";
import th from "element-ui/src/locale/lang/th";
@Component({
    components:{
        svgIcon
    }
})

export default class UpdateAttribute extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>[]}) rows!:any;
    private form_data:any={
        host_type:'',
        host_purpose:'',
        backend_type:'',
        customer_ids:[],
        black_customer_ids:[],
        spec_family_ids:[]
    }
    private type:String="";
    private backend:string=''
    private particle:string=''
    private host_types=[]
    private host_uses=[];
    private customer_id:any=[];
    private black_customer_id:any=[];
    private customerList:any=this.rows[0]?.exclusive_customers;
    private blackCustomerList:any=this.rows[0]?.exclusive_black_customers;
    private family=[];
    private familyList=[]
    private flag:boolean=true;
    private flagFamily:boolean=true
    private particleList =['Q','B','C','A']
    private vgpu_segment_type = this.particleList[0]
    private familyOption = []
    private customerOption = []
    private blackCustomerOption = []
    private customer = ''
    private black_customer = ''
    private backendList:any=[
        {id:'block',name:'云盘'},
        {id:'local',name:'本地盘'},
        {id:'local,block',name:'云盘/本地盘'}
    ]
    created() {
        this.getHostTypes();
        this.getCustomerList('',true);
        this.getFamilyList()
    }
    @Watch('customer')
    private watch(val){
      if(val !== 'select'){
        this.form_data.customer_ids = []
      }
    }
  @Watch('black_customer')
  private watch_black(val){
    if(val !== 'select'){
      this.form_data.black_customer_ids = []
    }
  }

    private async getHostTypes(){
        let res:any =await Service.get_host_type({})
        if(res.code==='Success'){
            this.host_types = res.data;
            this.host_types.forEach((item,index) => {
            let children = []
            item.list.forEach((Item,Index) => {
              children[Index] = {type : Item.use_type,type_name : Item.use_name}
            })
            this.host_types[index] = {type:item.type,type_name:item.type_name,list:children}
          })
        }
        
    }
    private changeFamily(val){
        if(!val){
            this.getFamilyList()
        }
    }
    private changeCustomer(val){
        if(val){
            this.customerList=[]
            // this.getCustomerList()
        }
    }
    private changeBlackCustomer(val){
        if(val){
            this.blackCustomerList=[]
            // this.getCustomerList()
        }
    }
    private change(item) {
      let tag = item.at(-1)
      let arr = item.filter((e) => {
        return e[0] === tag[0]
      })
        this.form_data.spec_family_ids = arr
    }
    private async getFamilyList(val:string=""){
        let res:any=await Service.getFamilyList({
            host_ids:this.rows.map(item=>item.host_id),
            spec_family_name:val
        })
        if (res.code == 'Success'){
            this.familyList=res.data.spec_family_list;
            this.familyOption = [
              {spec_family_id: 'none', name: '不设置规格族'},
              {spec_family_id: 'set', name: '设置规格族', children: this.familyList}
              ]
            // if(this.flagFamily)this.form_data.family = res.data.old_family_data_list;
            // this.flagFamily=false;
        }
    }
    // @Watch("customer_id")
    // private watch_customer_id(nv){
    // }
    private async getCustomerList(val:string="",loading:boolean=false){
        if(!val && !loading){
            return
        }
        let res:any=await Service.getCustomerList({
            host_ids:this.rows.map(item=>item.host_id),
            customer_id:val
        })
        if (res.code == 'Success'){
            this.customerList=res.data.customer_list;
        }
    }
    private async getBlackCustomerList(val:string="",loading:boolean=false){
        if(!val && !loading){
            return
        }
        let res:any=await Service.getCustomerList({
            host_ids:this.rows.map(item=>item.host_id),
            customer_id:val
        })
        if (res.code == 'Success'){
            this.blackCustomerList=res.data.customer_list;
        }
    }
    private async confirm() {
      const spec_id = this.form_data.spec_family_ids.map(item => item[1])
      let req: any = {
        host_ids:this.rows.map(item=>item.host_id),
        host_type:this.form_data.host_purpose.length>0 ? this.form_data.host_purpose[0] : undefined,
        host_purpose:this.form_data.host_purpose.length>1 ? this.form_data.host_purpose[1] : undefined,
        backend_type:this.form_data.backend_type !== '' ? this.form_data.backend_type : undefined,
        customer_ids: this.form_data.customer_ids.length > 0 ? this.form_data.customer_ids : (this.customer === 'all' ? [] : undefined),
        black_customer_ids:this.form_data.black_customer_ids.length > 0 ? this.form_data.black_customer_ids : (this.black_customer === 'all' ? [] : undefined),
        spec_family_ids: this.form_data.spec_family_ids.length > 0 ? (this.form_data.spec_family_ids[0][0] === 'none' ? [] : spec_id) : undefined,
      }
      let res: any = await Service.update_attribute(req)
      if (res.code === 'Success') {
        if (res.data.fail_host_list.length > 0) {
          this.$message.warning(res.message)
          this.back("0");
          return;
        }
        this.$message.success(res.message)
        this.back("1")
      } else {
        this.back("0")
      }
    }
    @Emit("close")
    private back(val){
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.main-edit{
    span{
        width: 120px;
        display: inline-block;
        margin-right: 20px;
        text-align: right;
    }
    .el-select,.el-input{
        width: 340px;
    }
    .tip{
        margin-left: 140px;
        margin-top: -20px;

    }
}
</style>
<style lang="scss">
.main-edit{
    .el-select .el-tag{
        width: 100% !important;
    }
}
</style>