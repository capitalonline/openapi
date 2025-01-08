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
  private origin_tree_data:any = []
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
  private menuMapping = {
    mirror: {
      current: 'mirror',
      menu_list: [
        {label: '公有镜像', name: 'mirror'},
        {label: '私有镜像', name: 'private_mirror'}
      ],
      auth_menu: []
    },
    storage: {
      current: 'disk',
      menu_list: [
        {label: '云盘管理', name: 'disk'},
        {label: '操作记录', name: 'diskRecord'},
        {label: '云盘-卷', name: 'diskVolume'}
      ],
      auth_menu: []
    },
    log: {
      current: 'task_list',
      menu_list: [
        {label: '任务管理', name: 'task_list'},
        {label: '操作日志审计', name: 'operate_log'},
        {label: '已销毁资源', name: 'ecs_destroyed_list'}
      ],
      auth_menu: []
    },
    cluster: {
      current: () => this.treeData[0].id, // 用函数返回动态值
    },
    config: {
      current: 'anomaly_event',
      menu_list: [
        {name: 'anomaly_event', label: '异常任务处理'},
        {name: 'repair_event', label: '异常任务处理2'},
        {
          name: 'alarm_manage',
          label: '报警管理',
          children: [
            {name: 'alarm_shield', label: '屏蔽管理'},
            {name: 'alarm_strategy_list', label: '报警策略'},
            {name: 'alarm_contact_list', label: '报警联系人'}
          ]
        },
        {
          name: "task_config",
          label: "底层任务配置",
          children: [
            {name: 'config_main_task', label: "主任务配置"},
            {name: 'config_sub_task', label: "子任务配置"},
            {name: 'project', label: "项目管理"}
          ]
        },
        {
          name: 'dict_manage',
          label: '字典管理',
          children: [
            {name: 'dict_cpu_list',label: 'CPU字典管理'},
            {name: 'dict_gpu_list', label: 'GPU字典管理'}
          ]
        }
      ],
      auth_menu: []
    }
  };
  created(){
    this.getTreeData()
  }
  mounted(){
    bus.$on('getTreeData',e=>{
      this.refresh = e
      this.getTreeData()
    })
  }
  /**
   * @description 当前新OP路由均未配置权限，等配置后放开下面逻辑：判断菜单类型为menu的导航项是否有显示权限，与tree类型的菜单权限无关
   */
  // private getPermission(config){
  //   const auth_info = this.$store.state.auth_info;
  //   // 过滤出有权限的菜单项
  //   if (config.menu_list && config.menu_list.length > 0) {
  //     config.auth_menu = config.menu_list.filter(menuItem =>
  //       auth_info[menuItem.name] ||
  //       (menuItem.children && menuItem.children.some(child => auth_info[child.name]))
  //     )
  //     // 如果有子菜单，则也需要过滤子菜单
  //     config.auth_menu.forEach(menuItem => {
  //       if (menuItem.children) {
  //         menuItem.children = menuItem.children.filter(child => auth_info[child.name])
  //       }
  //     });
  //   }
  // }
  //改变左侧头部menu时触发,用于menu的显示和路由跳转
  private change(item) {
    this.active_menu = item.name;
    this.treeType = item.type;
    const config = this.menuMapping[this.active_menu];
    if (config) {
      this.current = typeof config.current === 'function' ? config.current() : config.current;
      //this.getPermission(config);
      // 设置 current 为有权限的第一项菜单的 name
      // if (config.auth_menu && config.auth_menu.length > 0) {
      //   if (config.auth_menu[0].children && config.auth_menu[0].children.length > 0) {
      //     this.current = config.auth_menu[0].children[0].name;
      //   } else {
      //     this.current = config.auth_menu[0].name;
      //   }
      // } else {
      //   this.current = typeof config.current === 'function' ? config.current() : config.current;
      // }
      this.menu_list = config.menu_list || [];
      if (this.current) {
        this.$router.push({name: this.current});
      }
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
      this.origin_tree_data = res.data.tree_data_list
      if(this.origin_tree_data.length>0){
        this.$store.commit('SET_TREE_LIST',this.origin_tree_data);
        this.treeData = this.transformData(this.origin_tree_data)
      }else if(this.origin_tree_data.length ===0 && this.active_menu === 'cluster'){
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
        const { cluster_id,pod_id, cluster_name, type, children,cpu_brand,cpu_type_id,gpu_type_id,storage_type,max_host_count,storage_cluster_id,storage_cluster_name,host_count } = cluster;
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
          cpu_brand,
          cpu_type_id,
          gpu_type_id,
          backend_type:storage_type,
          max_host_count,
          storage_cluster_id,
          storage_cluster_name,
          host_count
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
  @Watch('active_menu')
  private watch_active_menu(newVal,oldVal){
    if(newVal === 'cluster' && this.origin_tree_data.length === 0){
      this.treeData= []
      this.$router.push({name:'error'})
    }
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

