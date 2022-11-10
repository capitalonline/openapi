<!--<template>
  <el-dialog :visible.sync="visible" title="自定义列表项" :show-close="false" :close-on-click-modal="false">
    <div class="m-bottom10">清除缓存或者更换浏览器，自定义列表失效<span class="warning_message m-left10">(最少选择5项，最多选择25项)</span></div>
    <div class="item">
      <template v-for="n in all_item">
        <div class="label">{{n.name}}</div>
        <div class="checkbox-box">
          <el-checkbox-group v-model="select_item">
            <el-checkbox v-for="item in n.filed" :key="item.show_name" :label="item.show_name" :disabled="item.show_name==='主机名'"></el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
    </div>
    
    
    <span>已选择：<span class="num_message">{{select_item.length}}</span></span>
    
    <span slot="footer">
      <el-button type="primary" @click="FnConfirm">确 定</el-button>
      <el-button @click="FnClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
interface CustomItem {
  label: string,
  prop: string,
  readonly?: boolean
}
@Component
export default class CustomListItem extends Vue {
  @Prop({default: false}) private visible!: boolean;
  @Prop({default: () => []}) private all_column_item!: Array<CustomItem>;
  @Prop({default: () => []}) private all_item!: Array<any>;
  private select_item: Array<string> = [];
  private created() {
    this.FnHandleSelectItem(this.$store.state.custom_host)
  }
  private FnHandleSelectItem(item) {
    if (item.length>0) {
      this.select_item = [...item];
    } else {
      this.select_item = this.all_column_item.slice(0,25).map(item=>item.label)
    }
    // console.log("this.select_item",this.select_item)
    this.FnEmit()
  }
  private FnConfirm() {
    if(this.select_item.length<5 || this.select_item.length>25){
      this.$message.warning("自定义列表项最少为5项，最多为25项")
      return;
    }
    this.$store.commit('SET_CUSTOM_HOST', this.select_item)
    this.FnEmit()
    this.FnClose()
  }
  private FnClose() {
    this.$emit('update:visible', false)
  }
  @Emit('fn-custom')
  public FnEmit() {
    return this.select_item
  }
}
</script>

<style lang="scss" scoped>
.item{
  height: 400px;
  overflow: auto;
}
.label{
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}
.checkbox-box {
  display: flex;
  padding: 18px;
  margin-bottom: 18px;
  border: 1px solid #dde2ef;
  .el-checkbox {
    width: 26%;
    margin-bottom: 10px;
  }
}
</style>-->
<template>
  <el-dialog :visible.sync="visible" title="自定义列表项" :show-close="false" :close-on-click-modal="false">
    <div>清除缓存或者更换浏览器，自定义列表失效<span class="warning_message m-left10">(最少选择5项，最多选择25项)</span></div>
    <div class="item">
      <template v-for="n in all_item">
        <div class="label">{{n.name}}</div>
        <div class="checkbox-box">
          <el-checkbox-group v-model="select_item">
            <el-checkbox v-for="item in n.filed" :key="item.show_name" :label="item.show_name" :disabled="item.show_name==='主机名'"></el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
    </div>
    <span>已选择：<span class="num_message">{{select_item.length}}</span></span>
    
    <span slot="footer">
      <el-button type="primary" @click="FnConfirm">确 定</el-button>
      <el-button @click="FnClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
interface CustomItem {
  label: string,
  prop: string,
  readonly?: boolean
}
@Component
export default class CustomListItem extends Vue {
  @Prop({default: false}) private visible!: boolean;
  @Prop({default: 'host'}) private type!: string;
  @Prop({default: () => []}) private all_column_item!: Array<CustomItem>;
  @Prop({default: () => []}) private all_item!: Array<any>;
  private select_item: Array<string> = [];
  private typeObj={
    'host':{func:'SET_CUSTOM_HOST',value:'custom_host'},
    'nas':{func:'SET_NAS_HOST',value:'nas_host'},
  }
  private created() {
    console.log('this',this.type)
    this.FnHandleSelectItem(this.$store.state[this.typeObj[this.type].value])
  }
  private FnHandleSelectItem(item) {
    if (item.length>0) {
      this.select_item = [...item];
    } else {
      this.select_item = this.all_column_item.slice(0,25).map(item=>item.label)
    }
    // console.log("this.select_item",this.select_item)
    this.FnEmit()
  }
  private FnConfirm() {
    if(this.select_item.length<5 || this.select_item.length>25){
      this.$message.warning("自定义列表项最少为5项，最多为25项")
      return;
    }
    this.$store.commit(this.typeObj[this.type].func, this.select_item)
    this.FnEmit()
    this.FnClose()
  }
  private FnClose() {
    this.$emit('update:visible', false)
  }
  @Emit('fn-custom')
  public FnEmit() {
    return this.select_item
  }
}
</script>

<style lang="scss" scoped>
.item{
  height: 400px;
  overflow: auto;
}
.label{
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}
.checkbox-box {
  display: flex;
  padding: 18px;
  margin-bottom: 18px;
  border: 1px solid #dde2ef;
  .el-checkbox {
    width: 26%;
    margin-bottom: 10px;
  }
}
</style>
