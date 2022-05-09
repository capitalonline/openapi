<template>
  <div class="header">
    <div class="left-content">
      <el-select v-model="default_pod">
        <el-option
          v-for="(item,key) in pod_list"
          :key="key"
          :value="key"
          :label="item"
        ></el-option>
      </el-select>
    </div>
    <div class="right-content">
      <el-button type="text" @click="FnToWiki('public')">公网设置问题排查sop</el-button>
      <el-button type="text" @click="FnToWiki('')" class="m-right10">运维OP使用手册V1.0</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import { logout,getPodList } from '../https/public';
@Component
export default class Header extends Vue {
  private default_pod = ''
  private pod_list = {
    "8da6bcb4-8ee7-11ec-aa0c-7a74fbaf3280": "POD206(东莞A)",
    "700c5158-992a-11ec-bf8e-1ac2878efae2": "POD206(宿迁A)"
  }
  created(){
    this.getPodList();
    this.default_pod = this.$store.state.pod_id ?this.$store.state.pod_id : Object.keys(this.pod_list).length>0 ? Object.keys(this.pod_list)[0] : ''
  }
  private async getPodList(){
    let res = await getPodList();
    if(res.code==='Success'){
      this.pod_list = res.data;
      this.default_pod = Object.keys(this.pod_list).length>0 ? Object.keys(this.pod_list)[0] : ''
    }
  }
  @Watch('default_pod')
  private watch_pod(){
    this.$store.commit('SET_POD',this.default_pod)
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
