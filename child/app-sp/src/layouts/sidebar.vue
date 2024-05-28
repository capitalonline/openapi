<template>
  <div>
  <el-menu :default-active="active_menu" mode="horizontal">
    <template v-for="item in menu">
      <el-menu-item
        @click="change(item)"
        :index="item.name"
        :key="item.name"
        :disabled="item.disabled"
        >
        <template #title>
          {{ item.label }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
    <template v-if="treeType === 'tree'">
      <left-tree :currentLivingId="current" :tree_data="treeData"></left-tree>
    </template>
    <template v-if="treeType === 'menu'">
     <new-menu :menu_list=menu_list :active_menu="current"></new-menu>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import storage from "@/store/storage";
import LeftTree from "@/layouts/LeftTree.vue";
import NewMenu from "@/layouts/newMenu.vue"
import EcsService from "@/https/instance/create";
import Service from "@/https/vmOp2/cluster/tree"
import store from "../../../app-op/src/store";

@Component({
  components: {
    LeftTree,
    NewMenu
  },
})
export default class Sidebar extends Vue {
  $router;
  $store;
  private active_menu: string = 'cluster';
  private current=''
  private treeType:string = 'tree'
  private menu: Array<object> = [
    {label:'集群',name:'cluster',type:'tree'},
    {label:'镜像',name:'mirror',disabled:true,type: 'menu'},
    {label:'存储',name:'storage',disabled:true,tree: false},
    {label:'网络',name:'network',disabled:true,tree: false}
  ];
  private menu_list=[
    {label:'公有镜像',name:'mirror_list'},
    {label:'私有镜像',name:'private_mirror_list'}
  ]
  private treeData:any = []
  created(){
    this.getTreeData()
  }
  //改变左侧头部menu时触发
  private change(item){
    this.active_menu = item.name
    this.treeType = item.type
    if(this.active_menu === 'mirror' && this.$route.name !== 'mirror_list'){
      this.current ='mirror_list'
      this.$router.push({name:'mirror_list'})
    }
    if(this.active_menu === 'cluster'){
      this.current = this.treeData[0].id
    }
  }
  //获取左侧树结构
  private async getTreeData(){
    if(!this.$store.state.az_id){
      return
    }
    let res:any = await Service.get_host_tree_data({
      az_id:this.$store.state.az_id
    })
    if(res.code === 'Success'){
      if(res.data.tree_data_list.length>0){
        this.treeData = this.transformData(res.data.tree_data_list)
      }else {
        this.treeData= []
        this.$router.push({name:'error'})
      }
    }
    this.current = this.treeData[0].id
  }
  private  transformData(data) {
    return data.map(pod => {
      const { pod_id, pod_name, type, children } = pod;
      const clusters = children.map(cluster => {
        const { cluster_id, cluster_name, type, children } = cluster;
        const hosts = children.map(host => {
          const { host_id, host_name,machine_status,power_status,ecs_count,machine_status_name,power_status_name, type } = host;
          return {
            id: host_id,
            label: host_name,
            type: type,
            machine_status:machine_status,
            power_status:power_status,
            ecs_count:ecs_count,
            machine_status_name:machine_status_name,
            power_status_name:power_status_name
          };
        });
        return {
          id: cluster_id,
          label: cluster_name,
          type: type,
          children: hosts,
        };
      });
      return {
        id: pod_id,
        label: pod_name,
        type: type,
        children: clusters,
      };
    });
  }

  @Watch('$store.state.az_id')
  private watch_pod(){
    this.getTreeData()
  }
}
</script>

<style lang="scss">
.el-menu-item{
  padding: 0 10px;
}
.left-content {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content:center;
  .el-input--suffix .el-input__inner{
    background: #F2F2F2;
  }
}

</style>

