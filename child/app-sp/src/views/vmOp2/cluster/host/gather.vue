<template>
  <div class="tabBox">
    <div class="currentInfo">
      {{$store.state.display}}
    </div>
    <el-tabs v-model="active_tab" @tab-click="handleClick">
      <el-tab-pane v-for="(value,key) in tab_list" :key="key" :label="value" :name="key"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Info from "@/views/vmOp2/cluster/host/info.vue";
import Monitor from "@/views/physical/monitor.vue";
@Component({
  components:{
    Info,
    Monitor
  }
})

export default class List extends Vue{
  private active_tab=''
  private pod_id = this.$route.params.id
  private tab_list = {
    host_info: '概要',
    host_vm:'虚拟机',
    host_monitor: '监控',
    host_storage: '存储',
    host_gpu:'GPU'
  }
  private handleClick(tab) {
    if(this.$route.name!== tab.name){
      this.$router.push({
        name:tab.name,
        params:{id:this.pod_id},
      })
    }
  }
  created(){
    this.active_tab = this.$route.name
  }
}
</script>

<style scoped>

</style>
