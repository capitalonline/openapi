<template>
  <div>
    <el-dialog
      title="进入救援模式"
      :visible.sync="visibleSync"
      width="700px"
      :destroy-on-close="true">
      <div class="tip_box">
        <div>1. 进入救援模式需要在实例关机状态下进行，建议主动关机，强制关机可能会造成数据丢失或文件损坏</div>
        <div>2. Linux系统的实例默认使用Ubuntu22.04的引导文件，Windows系统默认使用Windows 10的引导文件</div>
        <div>3. 处于救援模式的实例不能执行开关机操作</div>
        <div>4. 退出救援模式后，实例恢复到进入救援模式之前的状态。</div>
      </div>
      <div>
        <el-form ref="form" class="m-top10" :model="os_data" label-width="100px" label-position="left">
          <el-form-item label="镜像:">
            <el-select
              v-model="os_data.os_type"
              class="m-r-12"
              @change="changeOsType">
              <el-option
                v-for="item in image_type"
                :key="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select
              v-model="os_data.os_id"
              class="m-left10"
              @change="changeOsType">
              <el-option
                v-for="item in image_type_list"
                :key="item.os_id"
                :value="item.os_id"
                :label="item.display_name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="confirm">进入救援模式</el-button>
                <el-button type="default" @click="visibleSync=false">取消</el-button>
            </span>
    </el-dialog>
  </div>

</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from "vue-property-decorator";
import Service from "@/https/instance/list";
import {findPodIdByClusterId, findPodIdByHostId} from "@/utils/vmOp2/findPodId";
@Component

export default class RescueMode extends Vue{
  @PropSync('visible')visibleSync!:boolean
  @Prop(String) ecs_id!:String;
  @Prop(String) customer_id!:String;
  private os_data:any = {
    os_type:"",
    os_id:''
  }
  private image_type:any =[]
  private image_list:any =[]
  private image_type_list:any =[]
  created(){
    this.FnGetImage()
  }
  private async FnGetImage(){
    let req = {
      ecs_id:this.ecs_id
    }
    if (this.$route.name === 'pod_vm') {
      req['pod_id'] = this.$route.params.id;
    } else if (this.$route.name === 'cluster_vm') {
      req['pod_id'] = findPodIdByClusterId(this.$route.params.id);
    } else if (this.$route.name === 'host_vm') {
      req['pod_id'] = findPodIdByHostId(this.$route.params.id);
    }
    let res:any = await Service.get_rescue_image_list(req)
    if(res.code === 'Success'){
      this.image_type = res.data.image_types
      this.image_list = res.data.image_list
      this.os_data.os_type = this.image_type[0]
      this.FnInitImageList()
    }
  }
  private changeOsType(){
    this.FnInitImageList()
  }
  private FnInitImageList(){
    this.image_type_list = this.image_list.filter(item => item.os_type === this.os_data.os_type)
    this.os_data.os_id = this.image_type_list[0].os_id
  }
  private async confirm(){
    let req = {
      customer_id:this.customer_id,
      ecs_id:this.ecs_id,
      os_id:this.os_data.os_id
    }
    let res:any = await Service.enter_rescue(req)
    if(res.code === 'Success'){
      this.$message.success(res.message)
      this.visibleSync = false
    }
  }
}
</script>

<style scoped lang="scss">
.tip_box{
  background-color: #F2F2F2;
  height: 110px;
  line-height: 25px;
}

</style>
