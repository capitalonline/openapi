<template>
  <div>
    <action-block :search_option="search_con" create_btn="新建主任务配置" @fn-search="FnGetList" @fn-create="FnShowCreate"></action-block>
    <el-table :data="task_list" border>
      <el-table-column prop="id" label="ID">
        <template #default="scope">
          <el-button type="text" @click="FnDetail(scope.row.id)">{{ scope.row.id }}</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="maintask_type" label="类型"></el-table-column> -->
      <el-table-column prop="maintask_name" label="名称"></el-table-column>
      <el-table-column prop="priority" label="优先级"></el-table-column>
      <el-table-column prop="retry" label="重试次数"></el-table-column>
      <el-table-column prop="timeout" label="超时时间"></el-table-column>
      <el-table-column prop="callback_url" label="回退地址"></el-table-column>
      <el-table-column prop="is_valid" label="is_valid"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="FnShowUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="FnShowDel(scope.row.id, scope.row.maintask_name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialog_title"
      :visible.sync="create_dialog"
      width="50%">
      <div>
        <label-block label="主任务名称">
          <template #default>
            <el-input type="text" v-model="main_config.main_name"></el-input>
          </template>
        </label-block>
        <!-- <label-block label="主任务类型">
          <template #default>
            <el-input type="text" v-model="main_config.main_type"></el-input>
          </template>
        </label-block> -->
        <label-block label="主任务优先级">
          <template #default>
            <el-input-number v-model="main_config.priority" :min="1" :max="10"></el-input-number>
          </template>
        </label-block>
        <label-block label="主任务重试次数">
          <template #default>
            <el-input-number v-model="main_config.retry" :min="1" :max="10"></el-input-number> 次
          </template>
        </label-block>
        <label-block label="主任务超时时间">
          <template #default>
            <el-input-number v-model="main_config.timeout" :min="1" :max="600"></el-input-number> 秒
          </template>
        </label-block>
        <label-block label="主任务回退地址">
          <template #default>
            <el-input type="text" v-model="main_config.callback_url"></el-input>
          </template>
        </label-block>
        <label-block label="有效" v-if="default_id" class="switch-box">
          <template #default>
            <el-switch
              v-model="main_config.is_valid"
              active-color="#455cc6"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </label-block>
        <label-block label="子任务配置">
          <template #default>
            <dragger-task :sub_task="sub_task_list" :rel_task="default_sub_task" @fn-rel-task="FnGetRelTask"></dragger-task>
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
import LabelBlock from '../../components/labelBlock.vue';
import draggerTask from '../../components/draggerTask.vue';
import actionBlock from '../../components/actionBlock.vue';
import Service from '../../https/task/main-task';
import SubService from '../../https/task/sub-task';

@Component({
  components: {
    LabelBlock,
    draggerTask,
    actionBlock
  },
})
export default class App extends Vue {
  $message;
  $confirm;
  $router;
  private search_con = {
    id: { placeholder: '请输入任务ID' },
    // maintask_type: { placeholder: '请输入任务类型' },
    maintask_name: { placeholder: '请输入任务名称' }
  };
  private create_dialog :Boolean = false;
  private dialog_title :String = '';
  private task_list = [];
  private default_id = '';
  private default_sub_task = [];
  private main_config = {
    main_name: '',
    main_type: '',
    priority: 1,
    retry: 1,
    timeout: 60,
    callback_url: '',
    sub_task: [],
    is_valid: true,
  };
  private sub_task_list = []
  private FnShowCreate() {
    this.create_dialog = true;
    this.dialog_title = '新建主任务配置';
    this.FnGetSubList();
  };
  private async FnShowUpdate(row) {
    this.create_dialog = true;
    this.dialog_title = '更新主任务配置';
    await this.FnGetSubList();
    this.default_id = row.id;
    this.main_config.main_name = row.maintask_name;
    // this.main_config.main_type = row.maintask_type;
    this.main_config.retry = row.retry;
    this.main_config.priority = row.priority;
    this.main_config.timeout = row.timeout;
    this.main_config.callback_url = row.callback_url;
    this.main_config.is_valid = Boolean(row.is_valid);
    this.default_sub_task = JSON.parse(row.subtask_flow).map(list => {
      return list.map(item => {
        return item.subtask_index_id
      })
    });
  };
  private FnClose() {
    this.create_dialog = false;
    this.main_config.main_name = '';
    this.main_config.main_type = '';
    this.main_config.retry = 1;
    this.main_config.priority = 1;
    this.main_config.timeout = 60;
    this.main_config.callback_url = '';
    this.main_config.sub_task = [];
    this.main_config.is_valid = true;
    this.sub_task_list = [];
    this.default_id = '';
    this.default_sub_task = [];
  };
  private async FnGetList(data :any = {}) {
    let reqData :any = {};
    if(data.id) reqData.id = data.id;
    if(data.maintask_type) reqData.maintask_type = data.maintask_type;
    if(data.maintask_name) reqData.maintask_name = data.maintask_name;
    let resData :any = await Service.get_maintask_list(reqData);
    if(resData.code == 'Success') {
      this.task_list = resData.data.maintask_info;
    }
  };
  private async FnGetSubList() {
    let resData :any = await SubService.get_subtask_list();
    if(resData.code == 'Success') {
      this.sub_task_list =  resData.data.subtask_info;
    }
  };
  private FnGetRelTask(task_list) {
    this.main_config.sub_task = task_list.map(list => {
      return list.map(item => {
        return {'subtask_index_id': item}
      })
    })
  };
  private FnConfirm() {
    // TODO：数据校验
    let reqData = {
      // maintask_type: this.main_config.main_type,
      maintask_name: this.main_config.main_name,
      priority: this.main_config.priority,
      retry: this.main_config.retry,
      timeout: this.main_config.timeout,
      callback_url: this.main_config.callback_url,
      subtask_flow: JSON.stringify(this.main_config.sub_task),
      is_valid: Number(this.main_config.is_valid)
    }
    if(this.default_id) {
      this.FnUpdate(reqData);
    } else {
      this.FnCreate(reqData);
    }
  };
  private async FnCreate(reqData) {
    let resData :any = await Service.add_maintask(reqData);
    if(resData.code == 'Success') {
      this.FnClose();
      this.$message.success(resData.msg || '成功新建主任务配置！');
      this.FnGetList();
    }
  };
  private async FnUpdate(reqData) {
    let resData :any = await Service.update_maitask(Object.assign({}, reqData, {id: this.default_id}));
    if(resData.code == 'Success') {
      this.FnClose();
      this.$message.success(resData.msg || '成功更新主任务配置！');
      this.FnGetList();
    }
  };
  private FnShowDel(id, task_name) {
    this.$confirm(`确认删除主任务配置 -- ${task_name}`, '删除提示', {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      this.default_id = id;
      this.FnDel();
    }).catch();
  };
  private async FnDel() {
    let resData :any = await Service.delete_maintask({id: this.default_id});
    if(resData.code == 'Success') {
      this.$message.success(resData.msg || '成功删除主项目配置！');
      this.FnGetList();
    }
  };
  private FnDetail(id) {
    this.$router.push(`/mainTaskDetail/${id}`)
  };

  created() {
    this.FnGetList();
  };
}
</script>

<style lang="scss" scoped>
.sub-task-box {
  padding: 10px 20px 20px;
  background: #f2f2f2;
  border: 1px solid #e7e7e7;
}
.switch-box {
  line-height: 32px;
}
</style>
