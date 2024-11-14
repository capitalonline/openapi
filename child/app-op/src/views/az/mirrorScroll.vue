<script lang="ts">
import {Vue, Component, PropSync, Prop} from 'vue-property-decorator';
import Service from '../../https/az/list';

@Component({})
export default class mirrorScroll extends Vue {
  @PropSync('visible') syncVisible!:Boolean;
  @Prop({default:()=>{}})info!:any;
  private title:string=`镜像卷策略-${this.info.az_name}`
  private list:any=[]
  private form:any = {
    cycle: ['周一'],
    start_time: ['00:00'],
    is_enable: true,
  }
  private weeks= ['周一','周二','周三','周四','周五','周六','周日']
  private times= []
  mounted(){
    this.generateTimeOptions();
  }
  created(){
    this.getList()
  }
  private async getList(){
    let res:any = await Service.get_image_disk_list({
      az_id:this.info.az_id
    })
    if(res.code === 'Success'){
      this.list = res.data.image_disk_list
      if(Object.keys(res.data.snapshot_strategy_dict).length>0){
        this.form.cycle = res.data.snapshot_strategy_dict.repeating_date
        this.form.start_time = res.data.snapshot_strategy_dict.start_time
        this.form.is_enable = res.data.is_open_strategy
      }
    }
  }
  generateTimeOptions() {
    for (let i = 0; i <= 23; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      this.times.push(`${hour}:00`);
    }
  }
  private async confirm(){
    if(!this.list.length) {
      this.$message.warning('无可操作镜像卷')
      return
    }
    const disk_id_list = this.list.map(item=> item.disk_id)
    const res:any = await Service.set_image_disk_strategy({
      disk_id_list:disk_id_list,
      repeating_date_list:this.form.cycle,
      start_time_list:this.form.start_time,
      is_open_strategy:this.form.is_enable ? 1 : 0,
    })
    if(res.code === 'Success'){
      this.$message.success(res.message)
      this.syncVisible = false
    }
  }

}
</script>

<template>
  <div>
    <el-dialog
        :title=title
        :visible.sync="syncVisible"
        width="800px"
        :close-on-click-modal="false"
        :destroy-on-close="true"
    >
      <div class="w-bold m-bottom20">
        {{'镜像卷信息共 ( '+ list.length +' ) 条'}}
      </div>
      <el-table :data="list">
        <el-table-column prop="disk_id" label="镜像卷ID"></el-table-column>
        <el-table-column prop="disk_name" label="存储集群"></el-table-column>
        <el-table-column prop="disk_size" label="分配大小"></el-table-column>
        <el-table-column prop="used_size" label="已使用大小"></el-table-column>
        <el-table-column prop="snapshot_count" label="快照数量"></el-table-column>
        <el-table-column prop="snapshot_create_time" label="最新快照时间"></el-table-column>
      </el-table>
      <div class="m-top20 w-bold m-bottom10">快照策略</div>
      <el-form label-position="left" label-width="150px" :model="form">
        <el-form-item label="重复周期：">
          <el-select v-model="form.cycle" multiple style="width: 450px">
            <el-option
                v-for="week in weeks"
                :key="week"
                :label="week"
                :value="week">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-select v-model="form.start_time" multiple style="width: 450px">
            <el-option
                v-for="time in times"
                :key="time"
                :label="time"
                :value="time">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快照开关：">
          <el-switch
              v-model="form.is_enable"
              active-color="#455cc6"
              inactive-color="#ff4949"
              class="m-right10"
          ></el-switch>仅保留最新一个快照
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="syncVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.el-form-item{
  margin-bottom: 10px;
}

</style>