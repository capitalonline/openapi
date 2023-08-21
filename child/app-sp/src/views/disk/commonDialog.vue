<template>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="960px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
        <div class="mount">
            <el-alert
                :title="alert_title"
                type="warning"
                center
                :closable="false">
            </el-alert>
            <el-table
                :data="mount_id"
                max-height="220"
                border
            >
                <el-table-column prop="customer_id" label="客户ID1"></el-table-column>
                <el-table-column prop="customer_name" label="客户名称"></el-table-column>
                <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
                <el-table-column prop="disk_name" label="云盘名称">
                  <template slot-scope="scope">
                    <pre>{{scope.row.disk_name}}</pre>
                  </template>
                </el-table-column>
                <el-table-column prop="status_name" label="状态"></el-table-column>
                <el-table-column prop="fee" label="费用" v-if="title==='开启计费'">
                  <template slot-scope="scope">
                    <span class="num_message">{{scope.row.fee}}</span>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit} from "vue-property-decorator";
import Service from '../../https/disk/list'
@Component({})
export default class MountDisk extends Vue{
    $message;
    @Prop(Boolean) visible!:Boolean;
    @Prop({default:()=>[]}) mount_id!:any
    @Prop(String) title!:string;
    private alert_title:string = `是否确定要对以下云盘执行 ${this.title} 操作`;
    created() {
      this.title==='开启计费' && this.getFee()
    }
    private async getFee(){
      let resource_ids = this.mount_id.map(item=>item.disk_id)
      let res = await Service.get_fee({
          customer_id:this.mount_id[0].customer_id,
          az_id:this.mount_id[0].az_id,
          resource_ids,
          billing_method:'0',
          resource_type:'ebs'
      })
      if(res.code === 'Success'){
        await this.$nextTick(()=>{
          this.mount_id.map(item=>{
            let fee:string=Object.keys(res.data.total_price).length>0 ? `${res.data.price_symbol}${res.data.total_price[item.disk_id].toFixed(2)}/${res.data.price_unit}` : '￥0.00/天';
            this.$set(item, 'fee', fee);
            return item;
          })
        });
      }
    }
    private async confirm(){
      let res:any;
      const temp:Array<string> = []
        this.mount_id.forEach(ele=>{
            temp.push(ele.disk_id)
      })
      const req_data:any={
        customer_id:this.mount_id[0].customer_id,
        disk_ids:temp,
      }
      if(this.title==="逻辑删除"){
        res = await Service.del_disk({...req_data})
      }else if(this.title==="恢复"){
        res = await Service.recover({...req_data})
      }else if(this.title==="销毁"){
        res = await Service.destroy({...req_data})
      }else if(this.title==="开启计费"){
        let resource_ids = this.mount_id.map(item=>item.disk_id)
        res =await Service.open_bill({
          customer_id:this.mount_id[0].customer_id,
          resource_ids,
          billing_method:'0',
          resource_type:'ebs'
        })
      }else{
        return;
      }
      if (res.code === 'Success') {
          this.$message.success(`云盘${this.title}任务下发成功！`)
          this.back("1")
      }else{
        this.back("0")
      }
      
    }
    private cancel(){
      this.back("0")
    }
    @Emit("close")
    private back(val){
      
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