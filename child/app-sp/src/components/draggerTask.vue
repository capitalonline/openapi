<template>
  <div>
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
              <i class="el-icon-remove-outline" @click="FnDel(index)"></i>
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
  private FnShowRelSubTask() {
    this.main_task.push([])
  };
  private FnDel(index) {
    this.main_task.splice(index, 1);
    this.FnEmit();
  };
  private FnEmit() {
    this.$emit('fn-rel-task', this.main_task)
  }

  @Watch('rel_task')
  private FnWatchRel(newVal) {
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
  line-height: 32px;
}
</style>

<style lang="scss">
.btn-box {
  .el-button--text {
    font-size: 22px;
  }
}
</style>

