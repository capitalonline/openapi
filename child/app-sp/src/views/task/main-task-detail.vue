<template>
  <div>
    <div class="name-title">{{ maintask_name }}</div>
    <div>
      <json-viewer :value="dependent_params" copyable></json-viewer>
    </div>
    <div class="flow-box">
      <div v-for="(flow, index) in subtask_list" :key="index">
        <div class="flow-task">
          <div v-for="item in flow" :key="item.subtask_index_id" class="item">
            <div class="row"><span class="left-title">子任务名称：</span>{{ item.subtask_name }}</div>
            <div class="row"><span class="left-title">子任务依赖参数：</span>{{ item.params }}</div>
            <div class="row"><span class="left-title">子任务优先级：</span>{{ item.priority }}</div>
            <div class="row"><span class="left-title">子任务重试次数：</span>{{ item.retry }}</div>
          </div>
        </div>
        <div class="flow-icon" v-if="index < subtask_list.length - 1 "><i class="el-icon-bottom"></i></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Service from '../../https/task/main-task';
import JsonViewer from 'vue-json-viewer';

@Component({
  components: {
    JsonViewer
  }
})
export default class extends Vue {
  $route;
  private maintask_name = '';
  private dependent_params = '';
  private subtask_list = [];
  private async FnGetDetail() {
    const resData: any = await Service.get_maintask_detail({id: this.$route.params.id})
    if ( resData.code === 'Success' ) {
      this.maintask_name = resData.data.maintask_info.maintask_name;
      this.dependent_params = JSON.parse(resData.data.maintask_info.dependent_params);
      this.subtask_list = JSON.parse(resData.data.maintask_info.subtask_flow_detail);
    }
  }

  created() {
    this.FnGetDetail()
  }
}
</script>

<style lang="scss" scoped>
.name-title {
  margin-bottom: 20px;
  font-size: 20px;
}
.flow-box {
  margin-top: 20px;
  font-size: 12px;
  .flow-task {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 20px 10px;
    background: #fff;
    border-radius: 4px;
    .item {
      width: 500px;
      padding: 20px;
      box-shadow: 2px 2px 2px 2px #455cc633;
      margin-bottom: 20px;
      .row {
        line-height: 22px;
      }
    }
  }
  .flow-icon {
    padding: 20px 0;
    text-align: center;
    font-size: 32px;
  }
}
</style>