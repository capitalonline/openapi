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
      <left-tree :refresh="refresh" :tree_data="treeData"></left-tree>
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
import bus from "@/utils/vmOp2/eventBus"

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
  private refresh:boolean = false
  private menu: Array<object> = [
    {label:'集群',name:'cluster',type:'tree'},
    {label:'镜像',name:'mirror',type: 'menu'},
    {label:'存储',name:'storage',type: 'menu'},
    // {label:'网络',name:'network',disabled:true,tree: false},
    {label:'审计',name:'log',type: 'menu'},
    {label: '配置',name: 'config',type: 'menu'}
  ];
  private menu_list=[]
  private treeData:any = []
  created(){
    this.getTreeData()
  }
  mounted(){
    bus.$on('getTreeData',e=>{
      this.refresh = e
      this.getTreeData()
    })
  }
  //改变左侧头部menu时触发
  private change(item){
    this.active_menu = item.name
    this.treeType = item.type
    console.log('treeType',this.treeType)
    if(this.active_menu === 'mirror' && this.$route.name !== 'mirror'){
      this.current ='mirror'
      this.menu_list=[
        {label:'公有镜像',name:'mirror'},
        {label:'私有镜像',name:'private_mirror'}
      ]
      this.$router.push({name:'mirror'})
    }
    if(this.active_menu === 'storage'){
      this.current ='disk'
      this.menu_list=[
        {label:'云盘管理',name:'disk'},
      ]
      this.$router.push({name:'disk'})
    }
    if(this.active_menu === 'log'){
      this.current ='operate_log'
      this.menu_list=[
        {label:'操作日志审计',name:'operate_log'},
        {label:'已销毁资源',name:'ecs_destroyed_list'},
      ]
      this.$router.push({name:'operate_log'})
    }
    if(this.active_menu === 'cluster'){
      this.current = this.treeData[0].id
    }
    if(this.active_menu === 'config'){
      this.current ='alarm_shield'
      this.menu_list=[
        {
          name:'alarm_manage',
          label:'报警管理',
          children:[
            {name:'alarm_shield',label:'屏蔽管理'},
            {name:'alarm_strategy_list',label:'报警策略'},
            {name:'alarm_contact_list',label:'报警联系人'},
          ]
        },
        {
          name: "task_config",
          label: "底层任务配置",
          children: [
            { name: 'config_main_task', label: "主任务配置" },
            { name: 'config_sub_task', label: "子任务配置" },
            { name: 'project', label: "项目管理" },
          ]
        },
      ]
      this.$router.push({name:'alarm_shield'})
    }
  }
  //获取左侧树结构
  public async getTreeData(){
    if(!this.$store.state.az_id){
      return
    }
    let res:any = await Service.get_host_tree_data({
      az_id:this.$store.state.az_id
    })
    if(res.code === 'Success'){
      if(res.data.tree_data_list.length>0){
        this.$store.commit('SET_TREE_LIST',res.data.tree_data_list);
        this.treeData = this.transformData(res.data.tree_data_list)
      }else {
        this.treeData= []
        this.$router.push({name:'error'})
      }
    }
    // this.current = this.treeData[0].id
  }
  private  transformData(data) {
    return data.map(pod => {
      const { pod_id, pod_name, type, children } = pod;
      const clusters = children.map(cluster => {
        const { cluster_id,pod_id, cluster_name, type, children } = cluster;
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
          id: pod_id ? `${pod_id}-` : cluster_id,
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
    //切换az的时候，需要根据新az下的树跳转路由
    this.refresh = true
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

