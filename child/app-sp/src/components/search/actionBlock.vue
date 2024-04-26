<template>
  <div class="action-box" :style="isShowBg ? {} : {background:'#fff',padding:0,margin:0,border:'none'}">
    <div class="search-box" ref="search" :class="{fold:!isOpen}">
      <div
        v-for="(value, key) in search_option"
        :key="key"
        class="search-input"
        :style="value.width ? { width: `${value.width}px` } : {}"
      >
        <el-select
          v-model="search_value[key]"
          v-if="value.list && !value.type"
          :placeholder="value.placeholder"
          :multiple="value.multiple"
          :filterable="value.filter"
          clearable
        >
          <el-option
            v-for="(item, id) in value.list"
            :key="Array.isArray(value.list) ? item.type : id"
            :label="Array.isArray(value.list) ? item.label : item"
            :value="Array.isArray(value.list) ? item.type : id"
          ></el-option>
        </el-select>
        <el-input
          v-model="search_value[key]"
          :placeholder="value.placeholder"
          v-if="(!value.list && !value.type) || value.type === 'composite'"
          clearable
          class="composite"
          :style="value.width ? { width: `${value.width}px` } : {}"
        >
          <el-select
            v-model="search_value[key + 'sub']"
            slot="prepend"
            placeholder="请选择"
            v-if="value.type === 'composite'"
          >
            <el-option
              v-for="item in value.list"
              :key="item.type"
              :label="item.label"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-input>
        <template
          v-if="value.type === 'datetimerange' || value.type === 'daterange'"
        >
          <date-picker
            ref="datepicker"
            :time_option="search_option[key]"
            @fn-emit="FnGetTime($event, key)"
          >
          </date-picker>
        </template>
      </div>
      <div class="m-bottom20" v-if="!type">
        <el-button type="primary" @click="FnSearch">查 询</el-button>
        <el-button type="default" @click="FnClear">清 空</el-button>
      </div>
    </div>
    <div class="m-bottom20" v-if="type">
      <el-button type="primary" @click="FnSearch">查 询</el-button>
      <el-button type="primary" v-if="type === 'physical'" @click="FnMultiSearch">批量查询</el-button>
      <el-button type="default" @click="FnClear">清 空</el-button>
      <el-button type="text" class="m-bottom10" @click="operate">{{isOpen ? '折叠' : '展开'}}</el-button>
    </div>
    <slot>
      <el-button
        type="primary"
        @click="FnShowCreate"
        v-if="create_btn"
        :disabled="disabled"
        >{{ create_btn }}</el-button
      >
    </slot>
      <el-dialog title="批量查询" :visible="syncVisible" width="500px" :destroy-on-close="true" :close-on-click-modal="false">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入主机ID/名称"
          v-model="search_value['host_info']">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="FnSearch">确认</el-button>
          <el-button @click="syncVisible=false">取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from "vue-property-decorator";
import DatePicker from "./DatePicker.vue";
import moment from "moment";

@Component({
  components: {
    DatePicker
  }
})
export default class ActionBlock extends Vue {
  @Prop({ default: {} }) private search_option!: Object;
  @Prop({ default: "" }) private create_btn!: string;
  @Prop({ default: true }) private disabled!: boolean;
  @Prop({ default: false }) private type!: boolean | string;
  @Prop({ default: true }) private isShowBg: boolean;
  private search_value = {};
  private time: any = null;
  private date_key: string = "";
  private syncVisible:boolean = false
  private isOpen:boolean=true;//默认展开


  private FnGetTime(time, key) {
    this.time = time;
    this.date_key = key;
  }

  @Emit("fn-search")
  private FnSearch() {
    this.syncVisible = false
    this.search_value[this.date_key] = this.time;
    return this.search_value;
  }
  @Watch('search_option',{immediate:true,deep:true})
  private watch_search_option(){
    if(!this.type){
      return;
    }
    this.$nextTick(()=>{
      let search = this.$refs.search as any
      let hei = window.getComputedStyle(search).height.replace('px','')
      if(parseInt(hei) >52 && this.isOpen){//超过一行，展开的情况下折叠
        this.isOpen=false;//折叠
      }
      this.FnOperate()
    })
  }
  private FnMultiSearch(){
    this.syncVisible= true
  }
  private operate(){
    this.isOpen = !this.isOpen;
    this.FnOperate()
  }
  @Emit("fn-operate")
  private FnOperate(){
  }
  @Emit('fn-create')
  private FnShowCreate() {
  }

  @Watch("search_value", { immediate: true, deep: true })
  private watch_search_value(newval, oldval) {}
  private FnClear() {
    for (let i in this.search_option) {
      if (["datetimerange", "daterange"].includes(this.search_option[i].type)) {
        (this.$refs.datepicker as any)[0].FnClear();
      }else {
        this.search_value = {};
      }
    }
    this.FnSearch();
  }
  private mounted() {
    let flag = 0;
    for (let key in this.search_option) {
      if (this.search_option[key].default_value) {
        this.$set(
          this.search_value,
          key,
          this.search_option[key].default_value
        );
        flag++;
      }
      if (this.search_option[key].type==='composite') {
        this.$set(
          this.search_value,
          key+'sub',
          this.search_option[key].list[0].type
        );
      }
    }

    if (flag > 0 || this.type==='physical') {
      setTimeout(()=>{
        this.FnSearch()
      },500)

    }
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
    .el-range-editor.el-input__inner {
      width: 100% !important;
      padding: 0px 10px !important;
    }
  }
  .el-select {
    width: 100%;
  }
}
.fold{
  height: 52px;
  overflow: hidden;
  // display: flex;
  // overflow: hidden;
  .search-input {
    width: 200px;
    margin-right: 20px;
    margin-bottom: 20px;
    .el-range-editor.el-input__inner{
      width: 100% !important;
      padding: 0px 10px !important;
    }
  }
  .el-select {
    width: 100%;
  }
}

</style>
<style lang="scss">
.el-picker-panel__footer {
  .el-button--text {
    display: none !important;
  }
}
button.el-button.el-picker-panel__link-btn.el-button--default.el-button--mini.is-plain {
  color: #fff !important;
  background-color: #455cc6 !important;
  border-color: #455cc6 !important;
}

.composite {
  .el-select .el-input {
    width: 130px;
  }
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
