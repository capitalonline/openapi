<template>
  <div>
    <action-block :search_option="search_con" create_btn="新建子任务配置" @fn-search="FnGetList" @fn-create="FnShowCreate"></action-block>
    <el-table :data="task_list" border>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="subtask_name" label="名称"></el-table-column>
      <el-table-column prop="subtask_type" label="类型"></el-table-column>
      <el-table-column prop="dependent_params" label="依赖参数"></el-table-column>
      <el-table-column prop="priority" label="优先级"></el-table-column>
      <el-table-column prop="retry" label="重试次数"></el-table-column>
      <el-table-column prop="timeout" label="超时时间"></el-table-column>
      <el-table-column prop="is_period" label="周期性任务"></el-table-column>
      <el-table-column prop="is_async" label="异步任务"></el-table-column>
      <el-table-column prop="timeout" label="检查时间间隔"></el-table-column>
      <el-table-column prop="exec_url" label="执行URL"></el-table-column>
      <el-table-column prop="check_url" label="检查URL"></el-table-column>
      <el-table-column prop="fallback_url" label="回退URL"></el-table-column>
      <el-table-column prop="is_valid" label="is_valid"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="FnShowUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="FnShowDel(scope.row.id, scope.row.subtask_name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialog_title"
      :visible.sync="create_dialog"
      width="60%">
      <div>
        <label-block label="子任务名称">
          <template #default>
            <el-input type="text" v-model="sub_config.subtask_name"></el-input>
          </template>
        </label-block>
        <label-block label="子任务类型">
          <template #default>
            <el-input type="text" v-model="sub_config.subtask_type"></el-input>
          </template>
        </label-block>
        <label-block label="子任务依赖参数">
          <template #default>
            <params :params="default_dependent_params" @fn-change="FnGetDep"></params>
          </template>
        </label-block>
        <label-block label="子任务优先级">
          <template #default>
            <el-input-number v-model="sub_config.priority" :min="1" :max="10"></el-input-number>
          </template>
        </label-block>
        <label-block label="子任务重试次数">
          <template #default>
            <el-input-number v-model="sub_config.retry" :min="1" :max="10"></el-input-number> 次
          </template>
        </label-block>
        <label-block label="子任务超时时间">
          <template #default>
            <el-input-number v-model="sub_config.timeout" :min="1" :max="600"></el-input-number> 秒
          </template>
        </label-block>
        <label-block label="周期性任务" class="switch-box">
          <template #default>
            <el-switch
              v-model="sub_config.is_period"
              active-color="#455cc6"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </label-block>
        <label-block label="异步任务" class="switch-box">
          <template #default>
            <el-switch
              v-model="sub_config.is_async"
              active-color="#455cc6"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </label-block>
        <label-block label="检查时间间隔">
          <template #default>
            <el-input-number v-model="sub_config.check_interval" :min="1" :max="600"></el-input-number> 秒
          </template>
        </label-block>
        <label-block label="子任务执行URL">
          <template #default>
            <el-input type="text" v-model="sub_config.exec_url"></el-input>
          </template>
        </label-block>
        <label-block label="子任务执行参数">
          <template #default>
            <params :params="default_dependent_params" @fn-change="FnGetExec"></params>
          </template>
        </label-block>
        <label-block label="子任务检查URL">
          <template #default>
            <el-input type="text" v-model="sub_config.check_url"></el-input>
          </template>
        </label-block>
        <label-block label="子任务回退URL">
          <template #default>
            <el-input type="text" v-model="sub_config.fallback_url"></el-input>
          </template>
        </label-block>
        <label-block label="有效" v-if="default_id" class="switch-box">
          <template #default>
            <el-switch
              v-model="sub_config.is_valid"
              active-color="#455cc6"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </label-block>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FnConfirm">确 定</el-button>
        <el-button @click="FnClose">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue';
import LabelBlock from '../../components/labelBlock.vue';
import Params from '../../components/params.vue';
import Service from '../../https/task/sub-task';

@Component({
  components: {
    LabelBlock,
    ActionBlock,
    Params
  },
})
export default class App extends Vue {
  $message;
  $confirm;
  private search_con = {
    id: '请输入任务ID',
    subtask_type: '请输入任务类型',
    subtask_name: '请输入任务名称'
  };
  private create_dialog :Boolean = false;
  private dialog_title :String = '';
  private task_list = [];
  private default_id = '';
  private default_dependent_params = [];
  private default_exec_url_body = [];
  private sub_config = {
    subtask_name: '',
    subtask_type: '',
    dependent_params: [],
    priority: 1,
    retry: 1,
    timeout: 60,
    is_period: true,
    is_async: true,
    check_interval: 60,
    exec_url: '',
    exec_url_body: [],
    check_url: '',
    fallback_url: '',
    is_valid: true,
  };
  private FnShowCreate() {
    this.create_dialog = true;
    this.dialog_title = '新建子任务配置'
  };
  private FnShowUpdate(row) {
    this.create_dialog = true;
    this.dialog_title = '更新子任务配置';
    this.default_id = row.id;
    this.sub_config.subtask_type = row.subtask_type;
    this.sub_config.subtask_name = row.subtask_name;
    this.sub_config.dependent_params = [];
    let dependent_params = JSON.parse(row.dependent_params);
    for(let key in dependent_params) {
      this.default_dependent_params.push({key: key, value: dependent_params[key]})
    }
    this.sub_config.priority = row.priority;
    this.sub_config.retry = row.retry;
    this.sub_config.timeout = row.timeout;
    this.sub_config.is_period = Boolean(row.is_period);
    this.sub_config.is_async = Boolean(row.is_async);
    this.sub_config.check_interval = row.check_interval;
    this.sub_config.exec_url = row.exec_url;
    this.sub_config.exec_url_body = [];
    let exec_url_body = JSON.parse(row.exec_url_body)
    for(let key in exec_url_body) {
      this.default_exec_url_body.push({key: key, value: exec_url_body[key]})
    }
    this.sub_config.check_url = row.check_url;
    this.sub_config.fallback_url = row.fallback_url;
    this.sub_config.is_valid = Boolean(row.is_valid);
  };

  private FnGetDep(param) {
    this.sub_config.dependent_params = param;
  };
  private FnGetExec(param) {
    this.sub_config.exec_url_body = param;
  };
  private FnClose() {
    this.create_dialog = false;
    this.default_id = '';
    this.sub_config.subtask_type = '';
    this.sub_config.subtask_name = '';
    this.sub_config.dependent_params = [];
    this.sub_config.priority = 1;
    this.sub_config.retry = 1;
    this.sub_config.timeout = 60;
    this.sub_config.is_period = true;
    this.sub_config.is_async = true;
    this.sub_config.check_interval = 60;
    this.sub_config.exec_url = '';
    this.sub_config.exec_url_body = [];
    this.sub_config.check_url = '';
    this.sub_config.fallback_url = '';
  };
  private async FnGetList(data :any= {}) {
    let reqData :any = {};
    if(data.id) reqData.id = data.id;
    if(data.subtask_type) reqData.subtask_type = data.subtask_type;
    if(data.subtask_name) reqData.subtask_name = data.subtask_name;
    let resData :any = await Service.get_subtask_list(reqData);
    if(resData.code == 200) {
      this.task_list = resData.data.subtask_info;
    }
  };
  private FnConfirm() {
    let dependent_params = {};
    let exec_url_body = {};
    this.sub_config.dependent_params.forEach(item => {
      dependent_params[item.key] = item.value
    });
    this.sub_config.exec_url_body.forEach(item => {
      exec_url_body[item.key] = item.value
    });
    let reqData = {
      subtask_type: this.sub_config.subtask_type,
      subtask_name: this.sub_config.subtask_name,
      dependent_params: JSON.stringify(dependent_params),
      priority: this.sub_config.priority,
      retry: this.sub_config.retry,
      timeout: this.sub_config.timeout,
      is_period: Number(this.sub_config.is_period),
      is_async: Number(this.sub_config.is_async),
      check_interval: this.sub_config.check_interval,
      exec_url: this.sub_config.exec_url,
      exec_url_body: JSON.stringify(exec_url_body),
      check_url: this.sub_config.check_url,
      fallback_url: this.sub_config.fallback_url,
      id_valid: Number(this.sub_config.is_valid)
    };
    if(this.default_id) {
      this.FnUpdate(reqData);
    }else {
      this.FnCreate(reqData);
    }
  };
  private async FnCreate(reqData) {
    let resData :any = await Service.add_subtask(reqData);
    if(resData.code == 200) {
      this.FnClose();
      this.$message.success(resData.msg || '成功新建子任务配置！');
      this.FnGetList();
    }
  };
  private async FnUpdate(reqData) {
    let resData :any = await Service.update_subtask(Object.assign({}, reqData, {id: this.default_id}));
    if(resData.code == 200) {
      this.FnClose();
      this.$message.success(resData.msg || '成功新建子任务配置！');
      this.FnGetList();
    }
  };
  private FnShowDel(id, task_name) {
    this.$confirm(`确认删除子任务配置 -- ${task_name}`, '删除提示', {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      this.default_id = id;
      this.FnDel();
    }).catch();
  };
  private async FnDel() {
    let resData :any = await Service.delete_subtask({id: this.default_id});
    if(resData.code == 200) {
      this.$message.success(resData.msg || '成功删除子项目配置！');
      this.FnGetList();
    }
  };

  created() {
    this.FnGetList();
  }
}
</script>

<style lang="scss" scoped>
.action-box {
  padding: 20px;
  background: #f2f2f2;
  border: 1px solid #e7e7e7;
  margin-bottom: 20px;
}
.sub-task-box {
  padding: 10px 20px 20px;
  background: #f2f2f2;
  border: 1px solid #e7e7e7;
}
.switch-box {
  line-height: 30px;
}
.sure-btn {
  margin-top: 10px;
  text-align: center;
}
</style>
