<template>
  <div class="header">
    <div class="left-content">
      <el-select
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
<!--    特殊账号不展示下面的三个按钮-->
    <div class="right-content" v-if="!$store.state.is_special_user">
      <el-button type="text" @click="FnToWiki('public')">公网设置问题排查sop</el-button>
      <el-button type="text" @click="FnToWiki('')" class="m-right10">运维OP使用手册V1.0</el-button>
      <el-button @click="changeLayout()" type="info" round><i class="el-icon-sort"></i>切换新页面</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import { logout,getPodList } from '../https/public';
import storage from '../store/storage';
@Component
export default class Header extends Vue {
  private default_pod = '';
  private pod_list = {}
  created(){
    this.getPodList();

  }
  private changeLayout(){
    this.$router.push({name:'new_op'})
    console.log(this.$router)
  }
  private async getPodList(val:String=""){
    let res = await getPodList({
      az_pod_name:val
    });
    if(res.code==='Success'){
      this.pod_list = res.data;
      let employee_no = this.$store.state.employee_no;
      let dz_key = 'd1a3ebbe-c780-11f0-9ed3-92b1371aaa35';
      // 如果是达州用户DZ0003，节点只显示达州节点
      if(employee_no === 'DZ0003'){
        this.pod_list = { [dz_key]: this.pod_list[dz_key] };
      }
      this.default_pod = this.$store.state.pod_id ? this.$store.state.pod_id : Object.keys(this.pod_list).length>0 ? Object.keys(this.pod_list)[0] : '';
    }
  }
  private change_pod(val){
    if(!val){
        this.getPodList()
    }
  }
  @Watch('default_pod')
  private watch_pod(){
    this.$store.commit('SET_POD',this.default_pod);
    storage.set('pod_name',this.pod_list[this.default_pod])
  }
  private FnToWiki(type) {
    if (type === 'public') {
      window.open('http://wiki-private.capitalonline.net:8090/pages/viewpage.action?pageId=310018114')
    } else {
      window.open('http://wiki-private.capitalonline.net:8090/pages/viewpage.action?pageId=310018098')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #e7e7e7;
  .left-content {
    display: flex;
    align-items: center;
  }
  svg {
    width: 60px;
  }
  .right-content {
    display: flex;
    align-items: center;
  }
}
</style>
