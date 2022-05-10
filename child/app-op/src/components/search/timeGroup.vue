<template>
  <div class="time-box">
    <el-radio-group v-model="default_time" @change="FnChangeTime" class="m-right20">
      <el-radio-button
        v-for="(value, key) in time_list"
        :key="key"
        :label="key">
        {{ value.label }}
      </el-radio-button>
    </el-radio-group>

    <span class="m-left20 m-right10">选择时间范围:</span>
    <date-picker :time_option="time_option" @fn-emit="FnChangeDateTimer"></date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import DatePicker from './DatePicker.vue';

@Component({
  components: {
    DatePicker
  }
})
export default class TimeGroup extends Vue {
  @Prop({default: ''}) private start_time!: string;
  private time_option = {
    placeholder: ['开始时间', '结束时间'],
    type: 'datetimerange',
    width: '360',
    clearable: false,
    dis_day: 31,
    min_date: this.start_time,
    defaultTime: []
  };
  private time_list = {
    hour: {label: '1小时', time: 1000 * 60 * 60},
    '6_hour': {label: '6小时', time: 1000 * 60 * 60 * 6},
    '12_hour': {label: '12小时', time: 1000 * 60 * 60 * 12},
    day: {label: '1天', time: 1000 * 60 * 60 * 24},
    '3_day': {label: '3天', time: 1000 * 60 * 60 * 24 * 3},
    week: {label: '7天', time: 1000 * 60 * 60* 24 * 7},
    '14_day': {label: '14天', time: 1000 * 60 * 60* 24 * 14}
  };
  private default_time = '';
  private FnChangeTime() {
    let time = this.time_list[this.default_time].time;
    let now = new Date().getTime();
    let start_time = new Date(now - time);
    if (this.start_time && new Date(this.start_time) > start_time) {
      start_time = new Date(this.start_time)
    }
    this.time_option.defaultTime = [start_time, new Date(now)];
    this.FnEmit(this.time_option.defaultTime)
  }
  private FnChangeDateTimer(default_date_timer) {
    this.default_time = '';
    if (default_date_timer.length === 0) {
      return
    }
    let time = default_date_timer[1].getTime() - default_date_timer[0].getTime();
    for (let key in this.time_list) {
      if (this.time_list[key].time === time) {
        this.default_time = key;
      }
    }
    this.FnEmit(default_date_timer)
  }
  @Emit('fn-emit')
  public FnEmit(default_date_timer) {}
  private created() {
    this.default_time = Object.keys(this.time_list)[0];
    this.FnChangeTime();
  }
}
</script>

<style lang="scss" scoped>
.time-box {
  display: flex;
  align-items: center;
  font-size: 12px;
}
.el-range-editor.el-input__inner{
  padding: 0px 10px !important;
}
</style>
<style lang="scss">
.time-box {
  .el-radio-button__inner {
    width: 60px;
    margin-right: -1px;
    border-radius: 0;
  }
  .el-radio-button:last-child .el-radio-button__inner,
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }
}
</style>
