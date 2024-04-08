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
    <div class="left-content">
      <el-select
        style="width: 230px"
        v-model="default_az"
        filterable
        :filter-method="get_az_list"
        @visible-change="change_pod"
      >
        <el-option
          v-for="item in az_list"
          :key="item.az_id"
          :value="item.az_id"
          :label="item.az_name"
        ></el-option>
      </el-select>
    </div>
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
  private default_az = '';
  private current=''
  private treeType:string = 'tree'
  private az_list = []
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
    this.get_az_list();
    this.getTreeData()
  }
  //获取az列表
  private async get_az_list(){
    this.az_list=[]
    let res:any=await EcsService.get_region_az_list({})
    if(res.code==="Success"){
      res.data.forEach(item=>{
        item.region_list.forEach(inn=>{
          this.az_list=[...this.az_list,...inn.az_list]
        })
      })
      this.default_az = this.$store.state.az_id ? this.$store.state.az_id :this.az_list[0].az_id
    }
  }
  private change_pod(val){
    if(!val){
      this.get_az_list()
    }
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
      this.treeData = this.transformData(res.data.tree_data_list)
    }
    this.current = this.treeData[0].id
  }
  private  transformData(data) {
    return data.map(pod => {
      const { pod_id, pod_name, type, children } = pod;
      const clusters = children.map(cluster => {
        const { cluster_id, cluster_name, type, children } = cluster;
        const hosts = children.map(host => {
          const { host_id, host_name, type } = host;
          return {
            id: host_id,
            label: host_name,
            type: type,
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

  @Watch('default_az')
  private watch_pod(){
    this.$store.commit('SET_AZ',this.default_az);
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

