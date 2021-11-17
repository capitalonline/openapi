<template>
    <el-dialog
      title="挂载云盘"
      :visible.sync="visible"
      width="600px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
        <div class="mount">
          <el-alert
            title="是否确定要对以下云盘执行 挂载 操作"
            type="warning"
            center
            :closable="false">
          </el-alert>

          <el-form :model="form_data" ref="form" label-width="100px" class="demo-ruleForm">
            <div class="table">
              <el-table
                :data="mount_id"
                max-height="161"
                border
              >
                <el-table-column prop="disk_id" label="待挂载云盘ID"></el-table-column>
                <el-table-column prop="az_name" label="地域及可用区">
                  <template slot-scope="scope">
                    <span>{{scope.row.region_name}}&nbsp;&nbsp;{{scope.row.az_name}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-form-item 
              label="目标实例" 
              prop="instance_id" 
              :rules="[
                {required:true,message:'请选择目标实例',trigger:'blur'},
              ]"
            >
              <el-select 
                v-model="form_data.instance_id" 
                filterable
                :filter-method="get_instance_list" 
                placeholder="请选择目标实例"
                @visible-change="change_ecs"
              >
                <el-option 
                  v-for="item in instance_list"
                  :key="item.ecs_id" 
                  :label="`${item.ecs_id} / ${item.ecs_name}`" 
                  :value="item.ecs_id"
                >
                </el-option>
              </el-select>
              <div class="ecs-error" v-if="form_data.instance_id==='' && judge_ecs">请选择或输入实例</div>

            </el-form-item>
            <el-form-item
              prop="del_set"
              label="删除设置"
            >
                <el-checkbox v-model="form_data.del_set">云盘随实例删除</el-checkbox>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确定挂载</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit,Watch} from "vue-property-decorator";
import {Form} from 'element-ui';
import Service from '../../https/disk/list'
import ServiceList from '../../https/instance/list';
import detail_service from '../../https/instance/record_detail'
import {getEcsStatus} from '../../utils/getStatusInfo'
@Component({})
export default class MountDisk extends Vue{
  $message;
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>[]}) mount_id!:any
    private form_data:any={
      instance_id:'',
      del_set:false,
    }
    private judge_ecs:Boolean=false
    private instance_list:any=[]

    created() {
      this.get_instance_list("")
    }
    @Watch("form_data.instance_id")
    private watch_instance_id(newVal){
      console.log("watch_instance_id",newVal)
      if(newVal==="" || !newVal){
        return;
      }
      this.judge_ecs = false
      this.get_mounted_num(newVal)
    }
    //关闭面板时重新获取实例列表
    private change_ecs(val){
        if(!val){
            this.get_instance_list("")
        }
        
    }
    //获取实例列表
    private async get_instance_list(val){
        const resData: any = await ServiceList.get_instance_list({
            page_index:1,
            page_size:20,
            keyword:val,
            customer_id:this.mount_id[0].customer_id,
            az_id:this.mount_id[0].az_id
        });
        if (resData.code == 'Success') {
            this.instance_list = resData.data.ecs_list.filter(item=>["running","shutdown"].includes(item.status) && !item.is_gpu) || [];
        }
    }
    //获取实例挂载数据盘数量
    private async get_mounted_num(id:string){
        const resData: any = await detail_service.get_detail({
            ecs_id:id
        });
        if (resData.code == 'Success') {
          const {data:{disk}}=resData
          console.log("data_disk_conf",disk.data_disk_conf.length,this.mount_id.length,disk.data_disk_conf.length<this.mount_id.length)
          if(16 - disk.data_disk_conf.length<this.mount_id.length){
            this.$message.warning("该实例可挂载云盘数量不足!")
            this.form_data.instance_id="";
            this.get_instance_list(this.form_data.instance_id)
          }
        }
    }
    //将状态码转变成状态内容
    transEcsStatus(type){
        return `状态${getEcsStatus(type)}不可挂载`
    }
    private confirm(){
      const form = this.$refs.form as Form
      if(this.form_data.instance_id===""){
            this.judge_ecs=true
            return;
        }
      form.validate(async (valid:boolean)=>{
        if(valid){
            const temp:Array<string> = []
            this.mount_id.forEach(ele=>{
              temp.push(ele.disk_id)
            })
            let res:any = await Service.mount({
              customer_id:this.mount_id[0].customer_id,
              disk_ids:temp,
              ecs_id:this.form_data.instance_id,
              is_follow_delete:this.form_data.del_set ? '1' : '0'
            })
            if (res.code == 'Success') {
                this.$message.success("云盘挂载任务下发成功！")
                this.back("1")
            }else{
              this.back("0")
            }
            
        }
      })
    }
    private cancel(){
      this.back("0")
    }
    @Emit("close")
    private back(val){
      const form = this.$refs.form as Form
      form.resetFields()
    }
}
</script>
<style lang="scss" scoped>
.mount{
  .table{
    margin: 20px 0;
  }
  .btn{
    padding: 20px;
    width: 100%;
    text-align: center;
  }
 .ecs-error{
    font-size: 12px;
    color: #F56C6C;
    position: absolute;
    top: 28px;
    left: 2px ;
  }
  
  
  
}

</style>