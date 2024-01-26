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
        v-model="default_pod"
        filterable
        :filter-method="getPodList"
        @visible-change="change_pod"
      >
        <el-option
          v-for="(item,key) in pod_list"
          :key="key"
          :value="key"
          :label="item"
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
import { getPodList } from '../https/public';
import storage from "@/store/storage";
import LeftTree from "@/layouts/LeftTree.vue";
import NewMenu from "@/layouts/newMenu.vue"

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
  private default_pod = '';
  private current='1'
  private treeType:string = 'tree'
  private pod_list = {}
  private menu: Array<object> = [
    {label:'集群',name:'cluster',type:'tree'},
    {label:'镜像',name:'mirror',type: 'menu'},
    {label:'存储',name:'storage',disabled:true,tree: false},
    {label:'网络',name:'network',disabled:true,tree: false}
  ];
  private menu_list=[
    {label:'公有镜像',name:'mirror_list'},
    {label:'私有镜像',name:'private_mirror_list'}
  ]
  private treeData:any = [{
    id: 1,
    label: '一级 2',
    type:'pod',
    children: [{
      id: 3,
      label: '二级 2-1',
      type:'cluster',
      children: [{
        id: 4,
        label: '三级 3-1-1',
        type:'host',
      }, {
        id: 5,
        label: '三级 3-1-2',
        type:'host',
      }]
    }, {
      id: 2,
      label: '二级 2-2',
      type:'cluster',
      children: [{
        id: 6,
        label: '三级 3-2-1',
        type:'host',
      }, {
        id: 7,
        label: '三级 3-2-2',
        type:'host',
      }]
    }]
  }]
  created(){
    this.getPodList();
    this.getTreeData()
  }
  //获取pod列表
  private async getPodList(val:String=""){
    let res = await getPodList({
      az_pod_name:val
    });
    if(res.code==='Success'){
      this.pod_list = res.data;
      this.default_pod = this.$store.state.pod_id ? this.$store.state.pod_id : Object.keys(this.pod_list).length>0 ? Object.keys(this.pod_list)[0] : '';
    }
  }
  private change_pod(val){
    if(!val){
      this.getPodList()
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
      this.current = '1'
    }
  }
  //获取左侧树结构
  private getTreeData(){
    this.current = this.treeData[0].id
  }
  @Watch('default_pod')
  private watch_pod(){
    this.$store.commit('SET_POD',this.default_pod);
    storage.set('pod_name',this.pod_list[this.default_pod])
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

