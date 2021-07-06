<template>
  <div>
    <div class="name-title">{{ maintask_name }}</div>
    <div class="flow-box">
      <div v-for="flow in subtask_list" :key="flow" class="flow">
        <div v-for="item in flow" :key="item" class="item">
          <div class="row"><span class="left-title">子任务名称：</span>{{ item.subtask_name }}</div>
          <div class="row"><span class="left-title">子任务类型：</span>{{ item.subtask_type }}</div>
          <div class="row"><span class="left-title">子任务依赖参数：</span>{{ item.params }}</div>
          <div class="row"><span class="left-title">子任务优先级：</span>{{ item.priority }}</div>
          <div class="row"><span class="left-title">子任务重试次数：</span>{{ item.retry }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Service from '../../https/task/main-task'

@Component({
  
})
export default class extends Vue {
  $route;
  private maintask_name = '';
  private subtask_list = [];
  private async FnGetDetail() {
    let resData :any = await Service.get_maintask_detail({id: this.$route.params.id})
    if(resData.code == 'Success') {
      this.maintask_name = resData.data.maintask_name;
      this.subtask_list = JSON.parse(resData.data.subtask_flow_detail);
      console.log("subtask_list", this.subtask_list)
    }
  };

  created() {
    this.FnGetDetail()
  }
}
</script>

<style lang="scss" scoped>
.name-title {
  margin-bottom: 20px;
}
.flow-box {
  display: flex;
  font-size: 12px;
  justify-content: space-around;
  .flow {
    width: 500px;
    padding: 20px 20px 10px;
    background: #fff;
    border-radius: 4px;
    .item {
      padding: 20px;
      box-shadow: 2px 2px 2px 2px #455cc633;
      margin-bottom: 20px;
      .row {
        line-height: 22px;
      }
    }
  }
}
</style>