<template>
  <div>
     <el-dialog
      title="数据批量导入"
      :visible.sync="visible_sync"
      width="600px"
      :destroy-on-close="true"
      custom-class="upload"
      :close-on-click-modal="false"
      @close="back"
    >
        <div class="upload">
            <div class="m-bottom10">请选择需要导入的可用区</div>
            <el-select v-model="az" filterable :filter-method="getPodList" @visible-change="change_pod" placeholder="请选择">
                <el-option
                    v-for="item in az_list"
                    :key="item.pod_id"
                    :label="`${item.az_name} ( ${item.pod_name} ) `"
                    :value="item.pod_id">{{item.az_name}} ({{item.pod_name}})</el-option>
            </el-select>
            <span class="error_message m-left10" v-if="az.length===0">请选择可用区</span>
            <div class="flex-between m-top10 m-bottom20 down">
              <span>请选择需要上传的文件</span>
              <a class="clickble" @click="down">下载导入模板</a>
            </div>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="`/ecs_business/v1/host/import_host/?pod_id=${az}`"
              :before-upload="before_upload"
              :file-list="fileList"
              accept=".xls,.xlsx"
              name="host_template"
              :auto-upload="false"
              :on-success="FnSuccess"
              :headers="{
                'Access-Token':$store.state.token
              }"
            >
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="back('0')">取消</el-button>
        </span>
    </el-dialog>


    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue,PropSync } from 'vue-property-decorator';
import Service from '../../https/pod/index';
import moment from 'moment';

@Component({})
export default class Upload extends Vue{
  $message;
  @PropSync('visible') visible_sync!:Boolean;
  private fileList:any=[]
  private az_list = []
  private az:string=''
  created() {
    this.getPodList()
  }
  //关闭面板时重新获取实例列表
    private change_pod(val){
        if(!val){
            this.getPodList()
        }
        
    }
  private async getPodList(val:string=""){
    let res:any=await Service.get_pod_list({
      page_index:1,
      page_size:20,
      search_info:val
    })
    if(res.code==="Success"){
      this.az_list=res.data.pod_list.filter(item=>item.status)
      // this.az=this.az_list[0].pod_id
    }
  }
  private before_upload(file){
  
  }
  private FnSuccess(response, file, fileList){
    if(response.code==="Success"){
      if(response.data.fail_host_list.length>0){
        this.$message.warning(`物理机导入任务下发失败！`)
        this.back("1");
        return;
      }else{
        this.$message.success(`物理机导入任务下发成功！`)
        this.back("1")
      }
      // this.$message.success(response.message)
      // this.back("1")
    }else{
      this.$message.error(JSON.stringify(response.message))
      this.back("0")
    }
  }
  private down(){
    window.location.href="/ecs_business/v1/host/download_template/"
  }
  private async confirm(){
    if(!this.az){
        return;
    }
    const upload = this.$refs.upload as any;
    upload.submit()
    
  }
  @Emit("close")
  private back(val){
      this.visible_sync=false
  }
  
}
</script>
<style lang="scss" scope>
.upload{
  width: 80%;
  margin: auto;
  .el-select > .el-input{
    width:280px
  }
  .down{
    width: 280px;
  }
}
.upload{
  .el-dialog__body {
      border: 1px solid #DCDFE6;
  }
}

</style>