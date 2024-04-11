<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visibleSync"
      width="50%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="cancel"
    >
      <div class="tip">
        <div> 产品定义：{{prod_def}}</div>
        <div style="font-weight: bold">不建议单独为某客户或实例手动调整限速，因IOPS超出会带来<span class="error">平台瘫痪</span>的风险，请操作前进行充分的风险评估。</div>
      </div>
      <el-table
        :data="mount_id"
        border
        max-height="230">
        <el-table-column label="云盘ID" prop="disk_id"></el-table-column>
        <el-table-column label="云盘名称" prop="disk_name"></el-table-column>
        <el-table-column v-if="oper_type === 'iops'" label="IOPS" prop="disk_iops">
          <template slot-scope="scope">
            <div>{{scope.row.disk_iops ? `${scope.row.disk_iops}${scope.row.iops_unit}` : ''}}</div>
          </template>
        </el-table-column>
        <el-table-column v-else label="吞吐量" prop="mbps">
          <template slot-scope="scope">
            <div>{{scope.row.band_mbps ? `${scope.row.band_mbps}${scope.row.mbps_unit}` : ''}}</div>
          </template>’
        </el-table-column>
      </el-table>
      <el-form
        ref="resetForm"
        :model="data"
        label-width="120px"
        label-position="left"
        style="margin-top: 20px">
        <el-form-item label="变更为：" prop="update_data" :rules="{required:true,message:'请输入变更值',trigger:'blur'}">
          <el-input-number
            :controls="false"
            style="width: 200px"
            v-model="data.update_data"
            :min="0"
            :max="26000"
          ></el-input-number>
        </el-form-item>
        <el-radio-group v-model="data.set">
          <el-radio label="1" style="margin-bottom: 10px">云盘变更（容量变更/重装系统）时，按默认规则更新限速值。</el-radio>
          <el-radio label="0">云盘变更（容量变更/重装系统）时，限速保持此设置值不变。</el-radio>
        </el-radio-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FnEmit">确定</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </span>
    </el-dialog>

<!--    二次确认弹框-->
    <el-dialog
    :title="second_confirm"
    :visible="second_visible"
    @close="second_visible = false">
      <el-form
        ref="confirmForm"
        :model="data"
        label-width="120px"
        label-position="left">
        <el-form-item label="修改原因：" prop="reason" :rules="{required:true,message:'请输入修改原因',trigger:'blur'}">
          <el-input type="textarea" :rows="2" v-model="data.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button type="default" @click="second_visible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit, Watch, PropSync} from "vue-property-decorator";
import Service from '../../https/disk/list'
import {Form} from "element-ui";
import th from "element-ui/src/locale/lang/th";
@Component({})

export default class Iops extends Vue{
  @PropSync('visible') visibleSync!:Boolean;
  @Prop(String) title:string
  @Prop({default:()=>[]}) mount_id!:any
  @Prop(String) oper_type!:string;
  private prod_def:string = ''
  private second_visible:boolean=false
  private second_confirm =this.oper_type === 'iops' ? '是否确认修改IOPS?': '是否确认修改吞吐量?'
  private data = {
    update_data: '',
    set:'1',
    reason:''
  }
  created() {
    this.prod_def = this.oper_type === 'iops' ? '单盘IOPS=min{1800+30*容量，26000}' : '单块云盘吞吐量=min{120,0.2*容量，260}'
  }
  private FnEmit(){
    const form = this.$refs.resetForm as Form
    form.validate( valid=> {
      if (valid) {
        this.second_visible = true
      }
    })
  }
  private async confirm(){
    const form = this.$refs.confirmForm as Form
    form.validate(async (valid)=> {
      if (valid) {
        console.log('====')
        let req = {
          disk_ids: this.mount_id.map(item => item.disk_id),
          customer_id: this.mount_id[0].customer_id
        }
        if(this.oper_type === 'iops'){
          req['disk_iops'] = this.data.update_data
          req['iops_is_default'] = this.data.set
        } else {
          req['band_mbps'] = this.data.update_data
          req['mbps_is_default'] = this.data.set
        }
        let res: any = await Service.change_iops_mbps(req)
        if (res.code === 'Success') {
          this.$message.success(res.message)
          this.back("1", 'iops')
        } else {
          this.back("0", 'iops')
        }
      }
    })
  }
  private cancel(){
    this.back("0",'iops')
  }
  @Emit("close")
  private back(val,type){
  }

}
</script>

<style scoped lang="scss">
.tip{
  padding: 10px;
  background: #f2fBfE;
  border: 1px solid #e7e7e7;
  margin-bottom: 10px;
  div{
    margin-top: 10px;
  }
}

</style>
