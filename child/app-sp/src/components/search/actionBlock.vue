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
          <template v-if="value.type==='datetimerange'|| value.type==='daterange'" >
            <date-picker ref="datepicker"
              :time_option="search_option[key]" 
              @fn-emit="FnGetTime($event, key)">
            </date-picker>
          </template>
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
import DatePicker from './DatePicker.vue'
import moment from 'moment'

@Component({
  components: {
    DatePicker
  }
})
export default class ActionBlock extends Vue {
  @Prop({ default: {} }) private search_option!: Object;
  @Prop({ default: "" }) private create_btn!: string;
  @Prop({ default: true }) private disabled!: boolean;

  private search_value = {};
  private time: any = null;
  private date_key: string = "";
  
  private FnGetTime(time, key) {
    this.time = time;
    this.date_key = key;
  }

  @Emit('fn-search')
  private FnSearch() {
    this.search_value[this.date_key]=this.time
    return this.search_value
  }
  @Watch("search_value",{immediate:true,deep:true})
  private watch_search_value(newval,oldval){
    console.log("watch_search_value",newval,oldval)
  }
  @Emit('fn-create')
  private FnShowCreate() {
  }
  private FnClear(){
    for(let i in this.search_option){
      if(["datetimerange", "daterange"].includes(this.search_option[i].type)) {
        (this.$refs.datepicker as any)[0].FnClear();
      } else {
        this.search_value[i]=""
      }
    }
    this.FnSearch()
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