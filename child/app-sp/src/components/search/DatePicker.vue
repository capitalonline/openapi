<template>
  <el-date-picker
    v-model="time"
    :type="time_option.type"
    :editable="false"
    range-separator="至"
    :picker-options="{
      disabledDate: dis_date,
      onPick: onPicker
    }"
    :clearable="time_option.clearable"
    @change="FnEmit"
    :start-placeholder="time_option.placeholder[0]"
    :end-placeholder="time_option.placeholder[1]">
  </el-date-picker>
</template>

<script lang="ts">
// import { min } from 'moment';
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
@Component
export default class DatePicker extends Vue {
  @Prop({ default: () => {
    return {
      placeholder: ['开始时间', '结束时间'],
      type: 'daterange',
      width: '360',
      clearable: false,
      dis_day: 31,
      min_date: '',
      defaultTime: [new Date(), new Date()]}
  } }) private time_option;
  @Prop({default: false}) readonly clear!: boolean;
  private time = [];
  private min_date: any = "";
  private day: number= 0;
  private dis_date(cur){
    const {day} = this;
    if(day===0) return;
    let one_day = 1000*60*60*24;
    let date = new Date().getTime();
    let min_date = new Date().getTime();
    let max_date = new Date().getTime();
    if (this.time_option.min_date) {
      min_date = new Date(this.time_option.min_date).getTime();
      return cur.getTime() > max_date || cur.getTime() < min_date - one_day
    }
    return cur.getTime() > max_date ||  cur.getTime() > (this.min_date || date)  + one_day * day  || (this.min_date && cur.getTime() < this.min_date - one_day * day)
  }
  private onPicker({ maxDate, minDate }){
    this.min_date = minDate.getTime();
  }
  private created() {
    this.day = (this.time_option.dis_day - 1) || 0;
    this.FnChangeDefaultTime(this.time_option.defaultTime);
  }
  public FnClear(): void {
    this.FnChangeDefaultTime(this.time_option.defaultTime);
  }
  @Watch('time_option.defaultTime')
  private FnChangeDefaultTime(newVal) {
    console.log('clear',newVal)
    if (newVal.length>0) {
      this.time = newVal;
      this.FnEmit()
    }else{
        this.time = newVal;
        this.FnEmit()
    }
  }

  @Emit('fn-emit')
  FnEmit() {
    this.min_date=""
    return this.time
  }
}
</script>
