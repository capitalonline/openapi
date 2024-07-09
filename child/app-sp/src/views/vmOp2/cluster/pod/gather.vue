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
import ClusterList from '@/views/vmOp2/cluster/pod/cluster_list.vue'
import Info from "@/views/vmOp2/cluster/pod/info.vue";
import VmList from "@/views/vmOp2/cluster/pod/vm_list.vue"
import HostList from "@/views/vmOp2/cluster/pod/host_list.vue"
@Component({
  components:{
    ClusterList,
    Info,
    VmList,
    HostList
  }
})
export default class Pod extends Vue{
  private active_tab=''
  private pod_id = this.$route.params.id
  private tab_list = {
    pod_info: '概要',
    pod_cluster: '集群',
    pod_host: '主机',
    pod_vm: '虚拟机',
    //gpu:'GPU'
  }
  // private tab_list ={}
  private handleClick(tab, event) {
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

<style lang="scss">
.currentInfo{
  font-weight: bold;
  padding-top: 5px;
}

</style>
