<template>
  <div class="action-box">
      <div class="search-box">
        <div v-for="(value, key) in search_option" :key="key" class="search-input" :style="value.width ? {width:`${value.width}px`} : {}">
          <el-select v-model="search_value[key]" v-if="value.list && !value.type" :placeholder="value.placeholder" clearable>
            <el-option v-for="item in value.list" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
          <el-input v-model="search_value[key]" :placeholder="value.placeholder" v-if="(!value.list && !value.type) || value.type==='composite'" clearable class="composite" :style="value.width ? {width:`${value.width}px`} : {}">
            <el-select v-model="search_value[key+'sub']" slot="prepend" placeholder="请选择" v-if="value.type==='composite'">
              <el-option v-for="item in value.list" :key="item.type" :label="item.label" :value="item.type"></el-option>
            </el-select>
          </el-input>
          <el-date-picker
            v-if="value.type==='datetimerange'|| value.type==='daterange'"
            v-model="time"
            :type="value.type"
            :editable="false"
            range-separator="至"
            :picker-options="{
              disabledDate:dis_date,
              onPick:onPicker
              }"
            :clearable="value.clearable"
            @change="changeTime(key)"
            :start-placeholder="value.placeholder[0]"
            :end-placeholder="value.placeholder[1]">
          </el-date-picker>
        </div>
        
        <div class="m-bottom20">
          <el-button type="primary" @click="FnSearch">查 询</el-button>
          <el-button type="default" @click="FnClear">清空</el-button>
        </div>
      </div>
      <slot>
        <el-button type="primary" @click="FnShowCreate" v-if="create_btn" :disabled="disabled">{{ create_btn }}</el-button>
      </slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment'
@Component
export default class ActionBlock extends Vue {
  @Prop({ default: {} }) private search_option!: Object;
  @Prop({ default: "" }) private create_btn!: string;
  @Prop({ default: true }) private disabled!: boolean;

  private search_value = {};
  private time:any=null
  private date_key:string = ""
  private min_date:any = ""
  private day:number=0

  @Emit('fn-search')
  private FnSearch() {
    this.search_value[this.date_key]=this.time
    return this.search_value
  }
  @Emit('fn-create')
  private FnShowCreate() {
  }
  private FnClear(){
    for(let i in this.search_option){
      if(["datetimerange", "daterange"].includes(this.search_option[i].type)){
          this.time=[new Date(),new Date()]
      }else{
        this.search_value[i]=""
      }
    }
    this.FnSearch()
  }
  created() {
    for(let i in this.search_option){
      if(["datetimerange", "daterange"].includes(this.search_option[i].type)){
        this.time = this.search_option[i].defaultTime;
        this.day = (this.search_option[i].dis_day - 1) || 0
        this.date_key = i;
      }
    }
  }
  private dis_date(cur){
    const {day}=this
    if(day===0) return;
    let date = new Date()
    if(!this.min_date || this.min_date===""){
      return cur.getTime() > date.getTime()+1000*60*60*24*day
    }
    return cur.getTime() > this.min_date+1000*60*60*24*day || cur.getTime() < this.min_date-1000*60*60*24*day

  }
  private onPicker({ maxDate, minDate }){
    this.min_date = minDate.getTime()
  }
  changeTime(key){
    this.date_key=key
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
.search-box {
  display: flex;
  flex-wrap: wrap;
  .search-input {
    width: 200px;
    margin-right: 20px;
    margin-bottom: 20px;
    .el-range-editor.el-input__inner{
      width: 100% !important;
      padding: 0px 10px !important;
    }
  };
  
}


</style>
<style lang="scss">
.el-picker-panel__footer{
  .el-button--text{
    display: none !important;
  }
}
button.el-button.el-picker-panel__link-btn.el-button--default.el-button--mini.is-plain{
  color: #fff !important;
  background-color: #455cc6 !important;
  border-color: #455cc6 !important;
}

.composite{
  .el-select .el-input {
    width: 130px;
  }
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

</style>