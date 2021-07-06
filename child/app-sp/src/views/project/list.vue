<template>
  <div>
    <div class="action-box">
      <el-button type="primary" @click="FnShowCreate">新建项目</el-button>
    </div> 
    <el-table :data="project_list" border>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="project_id" label="项目ID"></el-table-column>
      <el-table-column prop="project_name" label="项目名称"></el-table-column>
      <el-table-column prop="project_domain" label="项目地址"></el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button type="text" @click="FnShowUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="FnConfirmDel(scope.row.id, scope.row.project_name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialog_title"
      :visible.sync="create_dialog"
      width="60%">
      <div>
        <label-block label="项目ID">
          <template #default>
            <el-input type="text" v-model="project_config.project_id"></el-input>
          </template>
        </label-block>
        <label-block label="项目名称">
          <template #default>
            <el-input type="text" v-model="project_config.project_name"></el-input>
          </template>
        </label-block>
        <label-block label="项目地址">
          <template #default>
            <el-input type="text" v-model="project_config.project_domain"></el-input>
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

import Service from '../../https/project';

@Component({
  components: {
    LabelBlock,
    draggerTask
  },
})
export default class App extends Vue {
  $message;
  $confirm;
  private create_dialog :Boolean = false;
  private dialog_title :String = '';
  private project_list = [];
  private default_id = "";
  private project_config = {
    project_id: '', 
    project_name: '',
    project_domain: '',
  }
  private FnShowCreate() {
    this.create_dialog = true;
    this.dialog_title = '新建项目';
  };
  private FnClose() {
    this.create_dialog = false;
    this.default_id = "";
    this.project_config.project_id = '';
    this.project_config.project_name = '';
    this.project_config.project_domain = '';
  };
  private FnShowUpdate(row) {
    this.create_dialog = true;
    this.dialog_title = '更新项目' + row.project_name;
    this.default_id = row.id;
    this.project_config.project_id = row.project_id;
    this.project_config.project_name = row.project_name;
    this.project_config.project_domain = row.project_domain;
  };
  private async FnGetList() {
    let resData :any = await Service.get_project_list();
    if(resData.code == 'Success') {
      this.project_list = resData.data.project_info;
    }
  };
  private FnConfirm() {
    // TODO: 数据校验
    if(this.default_id) {
      this.FnUpdate();
    } else {
      this.FnCreate();
    }
  };
  private async FnCreate() {
    let resData :any = await Service.create_project(this.project_config);
    if(resData.code == 'Success') {
      this.FnClose();
      this.$message.success(resData.msg || '成功创建项目！');
      this.FnGetList();
    }
  };
  private async FnUpdate() {
    let resData :any = await Service.update_project(Object.assign({}, this.project_config, {id: this.default_id}));
    if(resData.code == 'Success') {
      this.FnClose();
      this.$message.success(resData.msg || '成功更新项目！');
      this.FnGetList();
    }
  };
  private FnConfirmDel(id, project_name) {
    this.$confirm(`确认删除项目 -- ${project_name}`, '删除提示', {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      this.default_id = id;
      this.FnDel();
    }).catch();
  };
  private async FnDel() {
    let resData :any = await Service.delete_project({id: this.default_id});
    if(resData.code == 'Success') {
      this.default_id = '';
      this.$message.success(resData.msg || '成功删除项目！');
      this.FnGetList();
    }
  }


  created() {
    this.FnGetList()
  };
}
</script>

<style lang="scss" scoped>
.action-box {
  padding: 20px;
  background: #f2f2f2;
  border: 1px solid #e7e7e7;
  margin-bottom: 20px;
}
</style>
