<template>
  <div>
    <!-- <div class="wrapper-group">
      <vuedraggable class="left-wrapper" v-model="main_task" :group='{name: "maintask"}'>
        <div v-for="(list, index) in main_task" :key="index" class="list-box" :class="{'active': index == default_index}">
          <vuedraggable class="wrapper" v-model="main_task[index]" :group='{name: "task"+index, put: true}'>
            <div v-for="item in main_task[index]" :key="item.id" class="item"> 
              <div>{{ item.subtask_name }}</div>
            </div>
          </vuedraggable>
          <div class="btn-box">
            <el-button type="text" @click="FnAddRelTask(index)">
              <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <el-button type="text">
              <i class="el-icon-remove-outline"></i>
            </el-button>
          </div>
        </div>
        <p slot="header" class="title">关联任务：</p>
      </vuedraggable>


      <vuedraggable class="right-wrapper" v-model="default_sub_task" :group='{name: "task"+default_index, put: true}'>
        <div v-for="item in default_sub_task" :key="item.id" class="list-box">
          {{ item.subtask_name }}
        </div>
        <p slot="header" class="title">已有子任务：</p>
      </vuedraggable>
    </div> -->

    <div class="wrapper-group">
      <vuedraggable class="left-wrapper" v-model="main_task" @end="FnEmit">
        <div v-for="(list, index) in main_task" :key="index" class="list-box">
          <div class="wrapper">
            <el-select v-model="main_task[index]" multiple placeholder="请选择子任务" @change="FnEmit">
              <el-option
                v-for="item in sub_task"
                :key="item.id"
                :label="item.subtask_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="btn-box">
            <el-button type="text">
              <i class="el-icon-remove-outline"></i>
            </el-button>
          </div>
        </div>
      </vuedraggable>
    </div>

    

    <div class="add-btn">
      <el-button type="text" @click="FnShowRelSubTask">
        关联子任务 <i class="el-icon-plus"></i>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import vuedraggable from 'vuedraggable';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    vuedraggable
  },
})
export default class App extends Vue {
  $emit;
  @Prop({ default: [] }) private sub_task!: Array<any>;
  @Prop({ default: [] }) private rel_task!: Array<any>;
  private main_task = [];
  private default_main_task = [];
  private sub_task_list = [];
  private default_sub_task = [];
  private default_index = 0;

  private FnShowRelSubTask() {
    this.main_task.push([])
  };
  private FnAddRelTask(index) {
    if(this.sub_task_list[index]) {
      this.default_sub_task = this.sub_task_list[index];
    } else {
      this.default_sub_task = JSON.parse(JSON.stringify(this.sub_task));
      this.sub_task_list.push(this.default_sub_task);
    }
    this.default_index = index;
  };
  private FnEmit() {
    this.$emit('fn-rel-task', this.main_task)
  }

  @Watch('rel_task')
  private FnWatchRel(newVal, oldVal) {
    console.log("newVal", newVal)
    this.main_task = newVal;
  }
}
</script>

<style lang="scss" scoped>
.wrapper-group {
  display: flex;
  font-size: 12px;
}
.left-wrapper {
  margin-right: 30px;
  .title {
    margin-bottom: 10px;
  }
  .list-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 280px;
    padding: 20px 20px;
    line-height: 28px;
    border: 1px solid #e7e7e7;
    box-shadow: 2px 2px 6px #e7e7e7;
    border-radius: 6px;
    margin-bottom: 10px;
    cursor: move;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 6px;
      border: 1px solid #e7e7e7;
      box-shadow: 1px 1px 1px #e7e7e7;
    }
  }
  .active {
    background: #a7b6fb;
    color: #fff;
  }
}
.right-wrapper {
  .title {
    margin-bottom: 10px;
  }
  .list-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    padding: 2px 20px;
    line-height: 28px;
    border: 1px solid #e7e7e7;
    margin-bottom: 10px;
    cursor: move;
  }
}
.add-btn {
  line-height: 40px;
}
</style>

<style lang="scss">
.btn-box {
  .el-button--text {
    font-size: 22px;
  }
}
</style>

