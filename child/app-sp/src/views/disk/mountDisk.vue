<template>
    <el-dialog
      title="挂载云盘"
      :visible.sync="visible"
      width="600px"
      :destroy-on-close="true"
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
              >
                <el-option 
                  v-for="item in instance_list"
                  :key="item.ecs_id" 
                  :label="`${item.ecs_id} / ${item.ecs_name}`" 
                  :value="item.ecs_id"
                  :disabled="item.az_id!==mount_id[0].az_id || (item.status!=='running' && item.status!=='shutdown') ||item.num<mount_id.length"
                ></el-option>

              </el-select>
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
@Component({})
export default class MountDisk extends Vue{
  $message;
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>[]}) mount_id!:any
    private form_data:any={
      instance_id:'',
      del_set:false,
    }
    private mounted_disk:number=0
    private list:any= []
    
    private instance_list:any=[]
    created() {
      this.get_instance_list("")
    }
    @Watch("instance_list",{deep:true,immediate:true})
    private watch_instance_list(newVal){
      console.log("watch_instance_list",newVal)
    }
    private set_disable(item){
      console.log("set_disable",item)
      let bool = item.az_id!==this.mount_id[0].az_id || (item.status!=='running' && item.status!=='shutdown') ||item.num<this.mount_id.length
      let bool1 = item.az_id!==this.mount_id[0].az_id
      let bool2 = (item.status!=='running' && item.status!=='shutdown')
      let bool3 = item.num<this.mount_id.length
      console.log("bool",bool1,bool2,bool3,bool)
      return bool
    }
    @Watch("list",{immediate:true,deep:true})
    private watch_list(newVal){
      console.log("watch_num",newVal)
      if(newVal.length>0){
          newVal.map((item,index)=>{
            this.instance_list[index].num = item
          })
          console.log("this.instance_list",this.instance_list)
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
            this.instance_list = resData.data.ecs_list || [];
            this.instance_list.map(async (item)=>{
              let num = await this.get_mounted_num(item.ecs_id)
              this.list.push(num)
          })
        }
    }
    //获取实例挂载数据盘数量
    private async get_mounted_num(id:string){
        const resData: any = await detail_service.get_detail({
            ecs_id:id
        });
        if (resData.code == 'Success') {
          const {data:{disk}}=resData
          return disk.data_disk_conf ? disk.data_disk_conf.length : 0
        }else{
          return 0
        }
    }
    private confirm(){
      const form = this.$refs.form as Form
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
                this.$message.success("挂载成功")
                
            }
            this.back("1")
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
}

</style>