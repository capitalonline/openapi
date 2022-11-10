<template>
  <div>
    <action-block :search_option="search_con"
      create_btn="新建子任务配置"
      @fn-search="FnGetList"
      @fn-create="FnShowCreate"
      :disabled="!operate_auth.includes('create')">
    </action-block>
    <el-table :data="task_list" border>
      <el-table-column type="expand">
        <template #default="scope">
          <el-form label-position="left">
            <el-form-item label="依赖参数">
              <span>{{ scope.row.dependent_params }}</span>
            </el-form-item>
            <el-form-item label="执行对象">
              <span>{{ scope.row.executor }}</span>
            </el-form-item>
            <el-form-item label="执行地址">
              <span>{{ scope.row.executor_path }}</span>
            </el-form-item>
            <el-form-item label="检查URL">
              <span>{{ scope.row.check_url }}</span>
            </el-form-item>
            <el-form-item label="回退URL">
              <span>{{ scope.row.callback_url }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="subtask_name" label="名称"></el-table-column>
      <el-table-column prop="is_series" label="重复配置">
        <template #default="scope">
          <div>{{ scope.row.is_series }}</div>
          <div v-if="scope.row.is_series">{{ scope.row.serial_set_key }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级"></el-table-column>
      <el-table-column prop="retry" label="重试次数"></el-table-column>
      <el-table-column prop="timeout" label="超时时间"></el-table-column>
      <el-table-column prop="is_period" label="周期性任务"></el-table-column>
      <el-table-column prop="is_async" label="异步任务"></el-table-column>
      <el-table-column prop="timeout" label="检查时间间隔"></el-table-column>
      <el-table-column prop="is_valid" label="is_valid"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="FnShowUpdate(scope.row)"
            :disabled="!operate_auth.includes('edit')">编辑</el-button>
          <el-button type="text"
            @click="FnShowDel(scope.row.id, scope.row.subtask_name)"
            :disabled="!operate_auth.includes('delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="FnGetList()"
      @current-change="FnGetList()"
      :current-page.sync="page_info.page_index"
      :page-sizes="page_info.page_sizes"
      :page-size.sync="page_info.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page_info.total">
    </el-pagination>

    <el-dialog
      :title="dialog_title"
      :visible.sync="create_dialog"
      @close="FnClose"
      width="60%">
      <div>
        <label-block label="子任务名称">
          <template #default>
            <el-input type="text" v-model="sub_config.subtask_name"></el-input>
          </template>
        </label-block>
        <label-block label="可重复配置" class="switch-box">
          <template #default>
            <el-switch
              v-model="sub_config.is_series"
              active-color="#455cc6"
              inactive-color="#ccc">
            </el-switch>
            <label-block label="重复配置主参数" v-if="sub_config.is_series">
              <template #default>
                <el-input type="text" v-model="sub_config.serial_set_key"></el-input>
              </template>
            </label-block>
            <label-block label="重复配置子参数" v-if="sub_config.is_series">
              <template #default>
                <params :params="FnHandleParam(default_serial_set_sub_params)" @fn-change="FnGetSerial"></params>
              </template>
            </label-block>
          </template>
        </label-block>
        <label-block label="子任务依赖参数">
          <template #default>
            <params :params="FnHandleParam(default_dependent_params)" @fn-change="FnGetDep"></params>
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
            <el-input-number v-model="sub_config.timeout" :min="1" :max="86400"></el-input-number> 秒
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
        <label-block label="资源调度" class="switch-box">
          <template #default>
            <el-switch
              v-model="sub_config.need_schedule"
              active-color="#455cc6"
              inactive-color="#ccc">
            </el-switch>
            <label-block label="调度参数" v-if="sub_config.need_schedule">
              <template #default>
                <Item :params="default_schedule_output_params" type="key" @fn-change="FnGetSchedule"></Item>
              </template>
            </label-block>
          </template>
        </label-block>
        <label-block label="子任务执行对象">
          <template #default>
            <el-select v-model="sub_config.executor">
              <el-option v-for="item in executor_list" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </template>
        </label-block>
        <label-block label="子任务执行地址">
          <template #default>
            <el-input type="text" v-model="sub_config.executor_path"></el-input>
          </template>
        </label-block>
        <label-block label="子任务检查URL">
          <template #default>
            <el-input type="text" v-model="sub_config.check_url"></el-input>
          </template>
        </label-block>
        <label-block label="子任务回退URL">
          <template #default>
            <el-input type="text" v-model="sub_config.callback_url"></el-input>
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
import ActionBlock from '../../components/search/actionBlock.vue';
import LabelBlock from '../../components/labelBlock.vue';
import Params from '../../components/params/index.vue';
import Item from '../../components/params/item.vue'
import Service from '../../https/task/sub-task';

@Component({
  components: {
    LabelBlock,
    ActionBlock,
    Params,
    Item
  },
})
export default class App extends Vue {
  $message;
  $confirm;
  $store;
  $route;
  private search_con = {
    id: { placeholder: '请输入任务ID' },
    subtask_name: { placeholder: '请输入任务名称' },
    executor: { placeholder: '请选择子任务执行对象', list: [] }
  };
  private create_dialog :Boolean = false;
  private dialog_title :String = '';
  private task_list = [];
  private operate_auth= [];
  private default_id = '';
  private default_dependent_params = {};
  private default_serial_set_sub_params = {};
  private default_schedule_output_params = [];
  private executor_list = ['kvm_ecs_controller', 'kvm_ebs_controller', 'kvm_images_controller', 'kvm_test_controller' , 'kvm_nas_controller','kvm_sec_controller'];
  private sub_config = {
    subtask_name: '',
    subtask_type: '',
    dependent_params: [],
    priority: 1,
    retry: 1,
    timeout: 60,
    is_series: false,
    serial_set_key: '',
    serial_set_sub_params: [],
    is_period: true,
    is_async: true,
    check_interval: 60,
    executor: '',
    executor_path: '',
    executor_path_body: [],
    check_url: '',
    callback_url: '',
    is_valid: true,
    need_schedule: false,
    schedule_output_params: []
  };
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  };
  private FnShowCreate() {
    this.create_dialog = true;
    this.dialog_title = '新建子任务配置'
  }
  private FnShowUpdate(row) {
    this.create_dialog = true;
    this.dialog_title = '更新子任务配置';
    this.default_id = row.id;
    this.sub_config.subtask_name = row.subtask_name;
    this.sub_config.is_series = Boolean(row.is_series);
    this.sub_config.serial_set_key = row.serial_set_key;
    this.sub_config.dependent_params = [];
    this.sub_config.serial_set_sub_params = [];
    this.default_serial_set_sub_params = {};
    let dependent_params = JSON.parse(row.dependent_params);
    this.default_dependent_params = {};
    let serial_set_sub_params = [];
    for (let key in dependent_params) {
      if (this.sub_config.serial_set_key === key && this.sub_config.is_series) {
        serial_set_sub_params = dependent_params[key];
      }
      else {
        this.default_dependent_params[key] = dependent_params[key];
      }
    }
    for (let key in serial_set_sub_params) {
      this.default_serial_set_sub_params[key] = serial_set_sub_params[key];
    }
    this.sub_config.priority = row.priority;
    this.sub_config.retry = row.retry;
    this.sub_config.timeout = row.timeout;
    this.sub_config.is_period = Boolean(row.is_period);
    this.sub_config.is_async = Boolean(row.is_async);
    this.sub_config.check_interval = row.check_interval;
    this.sub_config.executor = row.executor;
    this.sub_config.executor_path = row.executor_path;
    this.sub_config.executor_path_body = [];
    this.sub_config.check_url = row.check_url;
    this.sub_config.callback_url = row.callback_url;
    this.sub_config.is_valid = Boolean(row.is_valid);
    this.sub_config.need_schedule = Boolean(row.need_schedule);
    this.default_schedule_output_params = row.schedule_output_params.split(',').map(item => {
      return {
        key: item
      }
    })
  }
  private FnHandleParam(params) : Array<Object> {
    let type: string = '';
    let handle_params = [];
    for (let key in params){
      if ( params[key] instanceof Array ) {
        type = 'list';
      } else if ( params[key] instanceof Object && Object.keys(params[key]).length > 0 ) {
        type = typeof params[key];
        params[key] = this.FnHandleParam(params[key]);
      } else {
        type = typeof params[key];
      }
      let first_key = '';
      let second_key = '';
      if ( key.indexOf('.') > 0 ) {
        first_key = key.split('.')[0];
        second_key = key.split('.')[1];
      } else {
        first_key = key
      }
      handle_params.push({
        key: first_key,
        second_key: second_key,
        type: type,
        value: params[key]
      })
    }
    return handle_params
  }

  private FnGetDep(param) {
    this.sub_config.dependent_params = param;
  }
  private FnGetSerial(param) {
    this.sub_config.serial_set_sub_params = param;
  }
  private FnGetExec(param) {
    this.sub_config.executor_path_body = param;
  }
  private FnGetSchedule(param) {
    this.sub_config.schedule_output_params = param;
  }
  private FnClose() {
    this.create_dialog = false;
    this.default_id = '';
    this.sub_config.subtask_type = '';
    this.sub_config.subtask_name = '';
    this.sub_config.dependent_params = [];
    this.default_dependent_params = {};
    this.sub_config.priority = 1;
    this.sub_config.retry = 1;
    this.sub_config.timeout = 60;
    this.sub_config.is_series = false;
    this.sub_config.serial_set_key = '';
    this.sub_config.serial_set_sub_params = [];
    this.default_serial_set_sub_params = {};
    this.sub_config.is_period = true;
    this.sub_config.is_async = true;
    this.sub_config.check_interval = 60;
    this.sub_config.executor = '';
    this.sub_config.executor_path = '';
    this.sub_config.executor_path_body = [];
    this.sub_config.check_url = '';
    this.sub_config.callback_url = '';
  }
  private async FnGetList(data: any= {}) {
    let reqData: any = {};
    if (data.id) reqData.id = data.id;
    if (data.subtask_type) reqData.subtask_type = data.subtask_type;
    if (data.subtask_name) reqData.subtask_name = data.subtask_name;
    if (data.executor) reqData.executor = data.executor;
    reqData.page_number = this.page_info.page_index;
    reqData.page_size = this.page_info.page_size;
    const resData: any = await Service.get_subtask_list(reqData);
    if ( resData.code === 'Success' ) {
      this.task_list = resData.data.subtask_info;
      this.page_info.total = resData.data.total;
    }
  }
  private FnConfirm() {
    let dependent_params = {};
    let executor_path_body = {};
    let default_schedule_output_params = [];
    this.sub_config.dependent_params.forEach(item => {
      if (item.type === 'object') {
        let key = '';
        if (item.second_key) {
          key = item.key + `.${item.second_key}`;
        } else {
          key = item.key;
        }
        dependent_params[key] = {};
        if (item.value instanceof Array) {
          item.value.forEach(child => {
            dependent_params[key][child.key] = child.value;
          })
        }
      } else {
        dependent_params[item.key] = item.value;
      }
    })
    if (this.sub_config.is_series) {
      let sub_params = {};
      this.sub_config.serial_set_sub_params.forEach(item => {
        sub_params[item.key] = item.value;
      })
      if (this.sub_config.serial_set_key) {
        dependent_params[this.sub_config.serial_set_key] = sub_params;
      }
    }
    if (this.sub_config.need_schedule) {
      default_schedule_output_params = this.sub_config.schedule_output_params.map(item => {
        return item.key
      })
    }
    let reqData = {
      subtask_name: this.sub_config.subtask_name,
      dependent_params: JSON.stringify(dependent_params),
      priority: this.sub_config.priority,
      retry: this.sub_config.retry,
      timeout: this.sub_config.timeout,
      is_series: Number(this.sub_config.is_series),
      serial_set_key: this.sub_config.serial_set_key,
      is_period: Number(this.sub_config.is_period),
      is_async: Number(this.sub_config.is_async),
      check_interval: this.sub_config.check_interval,
      executor: this.sub_config.executor,
      executor_path: this.sub_config.executor_path,
      check_url: this.sub_config.check_url,
      callback_url: this.sub_config.callback_url,
      is_valid: Number(this.sub_config.is_valid),
      need_schedule: Number(this.sub_config.need_schedule),
      schedule_output_params: default_schedule_output_params.join()
    };
    if (this.default_id) {
      this.FnUpdate(reqData);
    } else {
      this.FnCreate(reqData);
    }
  }
  private async FnCreate(reqData) {
    const resData: any = await Service.add_subtask(reqData);
    if ( resData.code === 'Success' ) {
      this.FnClose();
      this.$message.success(resData.msg || '成功新建子任务配置！');
      this.FnGetList();
    }
  }
  private async FnUpdate(reqData) {
    const resData: any = await Service.update_subtask(Object.assign({}, reqData, {id: this.default_id}));
    if ( resData.code === 'Success' ) {
      this.FnClose();
      this.$message.success(resData.msg || '成功新建子任务配置！');
      this.FnGetList();
    }
  }
  private FnShowDel(id, task_name) {
    this.$confirm(`确认删除子任务配置 -- ${task_name}`, '删除提示', {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      this.default_id = id;
      this.FnDel();
    }).catch();
  }
  private async FnDel() {
    const resData: any = await Service.delete_subtask({id: this.default_id});
    if ( resData.code === 'Success' ) {
      this.$message.success(resData.msg || '成功删除子项目配置！');
      this.FnGetList();
    }
  }

  created() {
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
    this.search_con.executor.list = this.executor_list.map(item => {
      return {
        label: item,
        type: item
      }
    })
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
