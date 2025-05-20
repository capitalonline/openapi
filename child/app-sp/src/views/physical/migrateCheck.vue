<template>
  <div>
    <el-dialog
      :visible.sync="visible_sync"
      title="检查结果"
      width="40%"
      :destroy-on-close="true"
      custom-class="upload"
      append-to-body>
      <div class="recommend" v-if="recommend.length>0">
        <div v-for="item in recommend" :key="item.host_id" class="item">
          {{item.host_name}}<br/>
          QEMU：{{item.qemu_version}}<br/>
          OVS：{{item.ovs_version}}
          <el-tooltip :content="item.cpu_usage ? (parseFloat(item.cpu_usage)).toFixed(2)+'%' : '0.00%'" placement="bottom" effect="light">
            <div class="title">
              <CustomIcon :hei="item.cpu_usage" />
              <div>CPU</div>
            </div>
          </el-tooltip>
          <el-tooltip :content="item.memory_usage ? (parseFloat(item.memory_usage)).toFixed(2)+'%' : '0.00%'" placement="bottom" effect="light">
            <div class="title">
              <CustomIcon :hei="item.memory_usage" />
              <div>内存</div>
            </div>
          </el-tooltip>
          <el-tooltip :content="item.local_storage_usage ? (parseFloat(item.local_storage_usage)).toFixed(2)+'%' : '0.00%'" placement="bottom" effect="light">
            <div class="title">
              <CustomIcon :hei="item.local_storage_usage" />
              <div>本地存储</div>
            </div>
          </el-tooltip>
          <el-tooltip :content="`${item.used_gpu_num ? item.used_gpu_num : 0} / ${item.total_gpu_num ? item.total_gpu_num : 0}`" placement="bottom" effect="light">
            <div class="title">
              <CustomIcon :hei="item.total_gpu_num===0 ? 0 : Number((item.used_gpu_num / item.total_gpu_num).toFixed(2))*100" />
              <div>显卡</div>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="recommend" v-else>
        <div class="item">
          无合适的物理机，无法迁移
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="visible_sync=false">返回</el-button>
        </span>
    </el-dialog>
  </div>

</template>
<script lang="ts">
import {Vue, Component, PropSync, Prop} from 'vue-property-decorator';
import CustomIcon from "@/views/physical/customIcon.vue";
import Service from "@/https/physical/list";

@Component({
  components: {CustomIcon}
})
export default class migrateCheck extends Vue {
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>{}})row!:any
  @Prop({default:()=>{}})host_info!:any
  @Prop(String) status!:string
  private recommend=[];

  created(){
    this.get_recommended_host(this.row.host_name)
  }
  private async get_recommended_host(val:string=""){
    this.$store.commit("SET_LOADING", false);
    let res:any=await Service.recommended_host({
      host_id:this.host_info.host_id,
      ecs_ids:[this.row.ecs_id],
      is_gpu:this.host_info.host_purpose==='GPU' ? '1' : '0',
      gpu_card_name:this.host_info.gpu_real_name,
      migration_check_flag:this.status
    })
    if(res.code==="Success"){
      this.recommend = res.data.data;
    }
  }
}
</script>


<style scoped lang="scss">
.recommend{
  max-height: 400px;
  overflow-y: auto;
  .item{
    padding: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    background: rgb(248,248,248);
    cursor: pointer;
    .title{
      display: flex;
      flex-direction: column;
      margin: 0 5px;
      align-items: center;
    }
  }
  .active{
    background: rgb(240,249,235);
  }
}

</style>
