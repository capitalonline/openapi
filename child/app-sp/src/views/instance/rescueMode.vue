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

      </div>
    </el-dialog>
  </div>

</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from "vue-property-decorator";
import Service from "../../https/instance/list";
@Component

export default class RescueMode extends Vue{
  @PropSync('visible')visibleSync!:boolean
  @Prop(String) ecs_id!:String;
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
    let res:any = await Service.get_rescue_image_list({
      ecs_id:this.ecs_id
    })
    if(res.code === 'Success'){
      this.image_type = res.data.image_types
      this.image_list = res.data.image_list
      this.FnInitImageList()
    }
  }
  private FnInitImageList(){
    this.image_type_list = this.image_list.filter(item => item.os_type === this.os_data.os_type)
  }
  private changeOsType(){

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
