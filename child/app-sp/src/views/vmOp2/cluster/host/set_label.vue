<script lang="ts">
import {Vue, Component, PropSync, Watch, Prop, Emit} from 'vue-property-decorator';
import Service from "@/https/vmOp2/cluster/pod";
@Component({})
export default class set_label extends Vue {
  @PropSync('visible') visibleSync!:Boolean;
  @Prop({default:()=>({})})rows!:any
  private target_data:any = []
  private source_data:any = []
  private inputLabel:string = ''
  private checkAll:boolean = false
  private checkAll1:boolean = false
  private isIndeterminate:boolean = false
  private target_isIndeterminate:boolean = false
  //输入框回车后添加标签
  private addLabel(){
    if(this.source_data.length>=30){
      return
    }
    const trimmedLabel = this.inputLabel.trim();
    if (trimmedLabel) {
      const all_labels = [...this.source_data,...this.target_data]
      if (all_labels.some(item => item.label_name === trimmedLabel)) {
        this.$message.warning('标签已存在')
        return;
      }
      this.source_data.unshift({ label_name: trimmedLabel, check: false });
      this.inputLabel = '';
    }
  }
  private  checkall(){
    this.source_data.forEach(v=>v.check = this.checkAll)
    this.isIndeterminate = false;
  }
  private checkall1(){
    this.target_data.forEach(v=>v.check = this.checkAll1)
    this.target_isIndeterminate = false;
  }
  private get num(){//统计选中的标签个数
    return data =>  data.filter(item=>item.check).length
  }
  private curcheck(){
    let checkedCount = this.num(this.source_data)
    this.checkAll = this.source_data.every(v =>v.check)
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.source_data.length;
  }
  private curcheck1(){
    let checkedCount = this.num(this.target_data)
    this.checkAll1 = this.target_data.every(v =>v.check)
    this.target_isIndeterminate = checkedCount > 0 && checkedCount < this.target_data.length;
  }
  //删除选中的标签
  private deleteLabel(){
    this.source_data = this.source_data.filter(v =>!v.check)
  }
  //将左边数据放到右边
  toright(){
    if(this.target_data.length===3 || this.num(this.source_data) + this.target_data.length>3){
      this.$message.warning('最多只能选择3个标签')
      return
    }
    let selectdata = this.source_data.filter(item => item.check == true)
    this.target_data = [...this.target_data, ...selectdata.map(item => ({ ...item, check: false }))];//将过滤后的数组需要添加到右边的数组中
    this.source_data = this.source_data.filter(v =>!v.check)//留下左边数组没有没选中的数组
  }
  //将右边数据放到左边
  toleft(){
    let selectdata = this.target_data.filter(item => item.check == true)
    this.source_data = [...this.source_data, ...selectdata.map(item => ({ ...item, check: false }))];
    this.target_data = this.target_data.filter(v =>!v.check)
  }
  created(){
    this.get_host_label()
    if(this.rows.label.length>0){
      this.target_data = this.rows.label.map(item=>({label_name:item,check:false}))
    }
  }
  private async get_host_label() {
    let res:any = await Service.get_label_list({
      host_id:this.rows.host_id
    })
    if(res.code==='Success'){
      this.source_data = res.data.label_list.map(v=>({label_name:v.label_name,check:false}))
    }
  }
  private async confirm(){
    let all_label_list = [...this.source_data,...this.target_data].map(v=>v.label_name)
    let res:any = await Service.add_host_label({
      host_id:this.rows.host_id,
      host_label_list:this.target_data.map(v=>v.label_name),
      all_label_list:all_label_list
    })
    if(res.code==='Success'){
      this.$message.success(res.message);
      this.back('1')
    }else {
      this.back('0')
    }
  }
  @Emit("close")
  private back(val){
    this.visibleSync=false
  }
  @Watch('source_data')
  private watchcheck(newVal){
    if(this.num(newVal) === 0 ){
      this.checkAll = false
      this.isIndeterminate = false
    }else if(this.num(newVal) === newVal.length){
      this.checkAll = true
      this.isIndeterminate = false
    }else{
      this.checkAll = false
      this.isIndeterminate = this.num(newVal) > 0 && this.num(newVal) < newVal.length
    }

  }
  @Watch('target_data')
  private watchcheck1(newVal){
    if(this.num(newVal) === 0 ){
      this.checkAll1 = false
      this.target_isIndeterminate = false
    }else if(this.num(newVal) === newVal.length){
      this.checkAll1 = true
      this.target_isIndeterminate = false
    }else{
      this.checkAll1 = false
      this.target_isIndeterminate = this.num(newVal) > 0 && this.num(newVal) < newVal.length
    }
  }

}
</script>

<template>
  <div>
    <el-dialog
    :title="'标签设置'"
    :visible.sync="visibleSync"
    width="800px"
    :destroy-on-close="true"
    :close-on-click-modal="false">
<!--      <div style="text-align: center">-->
<!--        <el-transfer-->
<!--          style="text-align: left; display: inline-block"-->
<!--          v-model="target_data"-->
<!--          :data="source_data"-->
<!--          :titles="['标签','已选择']">-->
<!--          <template #left-footer>-->
<!--            <el-button type="primary" plain style="width: 100%">删除</el-button>-->
<!--          </template>-->
<!--        </el-transfer>-->
<!--      </div>-->
      <div class="text-align: center;">
        <div style="text-align: center">
<!--          穿梭框左边-->
          <div class="el-transfer" style="text-align: left; display: inline-block;">
            <div class="el-transfer-panel">
              <p class="el-transfer-panel__header">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkall">标签
                  <span>
                  {{num(source_data)}}/{{source_data.length}}
                </span>
                </el-checkbox>
              </p>
              <div class="el-transfer-panel__body is-with-footer">
                <div>
                  <el-input placeholder="请输入标签内容" v-model="inputLabel" @keyup.enter.native="addLabel()" maxlength="4"></el-input>
                </div>
                <div class="el-transfer-panel__list check-box">
                  <div v-for="(item,index) in source_data" :key="index">
                    <el-checkbox v-model="item.check" value="item.check" @change="curcheck()" class="el-checkbox el-transfer-panel__item">
                    <span>{{item.label_name}}</span>
                    </el-checkbox>
                  </div>
                  <div v-if="source_data.length === 0" style="text-align: center">暂无数据</div>
                </div>
              </div>
              <p class="el-transfer-panel__footer">
                <el-button type="primary" plain style="width: 100%" @click="deleteLabel">删除</el-button>
              </p>
            </div>
          </div>
          <div class="el-transfer__buttons">
            <el-button
              @click="toleft"
              type="primary"
              icon="el-icon-arrow-left"
              :disabled="num(target_data)===0"
            ></el-button>
            <el-button
              @click="toright"
              type="primary"
              icon="el-icon-arrow-right"
              :disabled="num(source_data)===0">
            </el-button>
          </div>
<!--          穿梭框右边-->
          <div class="el-transfer" style="text-align: left; display: inline-block;">
            <div class="el-transfer-panel">
              <p class="el-transfer-panel__header">
                <el-checkbox :indeterminate="target_isIndeterminate" v-model="checkAll1" @change="checkall1">已选择
                  <span>
                  {{num(target_data)}}/{{target_data.length}}
                </span>
                </el-checkbox></p>
              <div class="el-transfer-panel__body">
                <div class="el-transfer-panel__list check-box">
                  <div v-for="(item,index) in target_data" :key="index">
                    <el-checkbox v-model="item.check" value="item.check" @change="curcheck1()" class="el-checkbox el-transfer-panel__item">
                      <span>{{item.label_name}}</span>
                    </el-checkbox>
                  </div>
                  <div v-if="target_data.length === 0" style="text-align: center">暂无数据</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="visibleSync=false">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.check-box.el-transfer-panel__list{
  height: 209px;
}

</style>
