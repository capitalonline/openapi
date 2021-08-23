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
              <el-select v-model="form_data.instance_id" filterable placeholder="请选择目标实例">
                <el-option 
                  v-for="item in instance_list" 
                  :key="item.value" 
                  :label="item.label" 
                  :value="item.value"
                  :disabled="item.az_name!==mount_id[0].az_name || (item.status!=='运行中' && item.status!=='已关机')"
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
import {Vue,Component,Prop,Emit} from "vue-property-decorator";
import {Form} from 'element-ui';
import Service from '../../https/disk/list'
@Component({})
export default class MountDisk extends Vue{
  $message;
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>[]}) mount_id!:any
    private form_data:any={
      instance_id:'',
      del_set:false,
    }
    private instance_list:any=[
      {
          label:'实例1',
          value:'beijing',
          az_name:'可用区A',
          status:'运行中'
      },
      {
          label:'实例2',
          value:'beijing2',
          az_name:'可用区2',
          status:'已关机'
      },
      {
          label:'实例3',
          value:'beijing3',
          az_name:'可用区A',
          status:'创建中',
      }
    ]
    
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
            this.back()
        }
      })
    }
    private cancel(){
      this.back()
    }
    @Emit("close")
    private back(){
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