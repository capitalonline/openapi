<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="GPU管理" name="first"></el-tab-pane>
      <el-tab-pane label="GPU故障记录" name="second"></el-tab-pane>
    </el-tabs>
    <div>
      <template v-if="activeName==='first'">
        <gpu_list />
      </template>
      <template v-else>
        <gpu_fault-record />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Gpu_list from "@/views/vmOp2/cluster/host/gpu_list.vue";
import Gpu_faultRecord from "@/views/vmOp2/cluster/host/gpu_faultRecord.vue";
@Component({
  components: {
    Gpu_faultRecord,
    Gpu_list,
  }
})
export default class Gpu extends Vue{
  private activeName='first'
  created(){
    console.log('-----')
  }
}
</script>

<style scoped>
.el-tabs {
  background: #fff;
}

</style>
