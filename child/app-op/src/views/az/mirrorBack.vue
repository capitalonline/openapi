<script lang="ts">
import {Vue, Component, PropSync, Prop, Watch} from 'vue-property-decorator';
import { Form } from 'element-ui';
import Service from '../../https/az/list';

@Component({})
export default class mirrorBack extends Vue {
  @PropSync('visible') syncVisible!:Boolean;
  @Prop({default:''})az_id!:string;
  private form:any = {
    mirror_scroll:'',
    code:'',
  }
  private num1:number = 0;
  private num2:number = 0;
  private operator:string = '+';
  private correctAnswer:number = null;
  private mirror_list:any= []
  private code_success:boolean = false;
  private snapshot_id:string = ''
  private snapshot_name:string = ''
  mounted(){
    // 获取验证码图
    this.$nextTick(() => {
      this.generateCode();
    });
  }
  created(){
    this.getList()
  }
  @Watch('form.mirror_scroll')
  private change_mirror(n){
    if(n){
      this.get_rollback_info()
    }
  }
  private async getList(){
    let res:any = await Service.get_image_disk_list({
      az_id:this.az_id
    })
    if(res.code === 'Success'){
      this.mirror_list = res.data.image_disk_list
      this.form.mirror_scroll = this.mirror_list[0].disk_id
    }
  }
  private async get_rollback_info(){
    this.snapshot_id = ''
    this.snapshot_name = ''
    let req = {
      disk_id:this.form.mirror_scroll
    }
    let res:any = await Service.get_rollback_info(req)
    if(res.code === 'Success'){
      this.snapshot_id = res.data.snapshot_id
      this.snapshot_name = res.data.create_time
    }
  }
  // 生成随机数和运算符
  private generateCode() {
    this.num1 = Math.floor(Math.random() * 10);
    this.num2 = Math.floor(Math.random() * 10);
    const operators = ['+', '-', '*'];
    this.operator = operators[Math.floor(Math.random() * 3)];

    switch (this.operator){
      case '+':
        this.correctAnswer = this.num1 + this.num2;
        break;
      case '-':
        this.correctAnswer = this.num1 - this.num2;
        break;
      case '*':
        this.correctAnswer = this.num1 * this.num2;
        break;
    }
    this.drawCaptcha();
  }
  // 画出验证码
  private drawCaptcha() {
    const canvas = this.$refs.checkCode as HTMLCanvasElement;
    // 清除 canvas 上的内容
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 设置背景颜色
    ctx.fillStyle = '#CACACA'; // 设置为白色背景
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    //设置字体颜色
    ctx.font = '20px Arial';
    ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`
    ctx.fillText(`${this.num1} ${this.operator} ${this.num2} = ?`, 10, 20);
    // 画干扰线
    for(let i = 0; i < 5; i++){
      ctx.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`
      ctx.beginPath();
      ctx.moveTo(Math.random()*canvas.width,Math.random()*canvas.height);
      ctx.lineTo(Math.random()*canvas.width,Math.random()*canvas.height);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    // 添加噪点
    for (let i = 0; i < 100; i++) { // 生成 100 个噪点
      ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }
  }
  private checkMe() {
    this.code_success = false
    // 空、 错误、 正确 三个判断
    if (this.form.code) {
      if (parseInt(this.form.code) === this.correctAnswer) {
        this.code_success = true
      } else {
        this.$message.warning('验证码校验错误，请重新输入');
      }
      this.generateCode()
    }
  }
  private confirm(){
    if(!this.snapshot_id){
      this.$message.warning('当前无可回滚的快照')
      return
    }
    let form = this.$refs.ruleForm as Form;
    form.validate(async valid=>{
      if(valid){
        this.checkMe()
        if(this.code_success){
          let res = await Service.rollback_image_disk({
            disk_id:this.form.mirror_scroll,
            snapshot_id:this.snapshot_id,
          })
          if(res.code === 'Success'){
            this.$message.success(res.message)
            this.syncVisible = false
          }
        }
      }
    })

  }

}
</script>

<template>
  <div>
    <el-dialog
        title="镜像卷回滚"
        :visible.sync="syncVisible"
        width="800px"
        :close-on-click-modal="false"
        :destroy-on-close="true"
    >
      <div class="error_message">是否确认回滚镜像卷？回滚后将无法恢复到当前状态。</div>
      <el-form label-position="left" label-width="120px" :model="form" ref="ruleForm">
        <el-form-item label="选择镜像卷：">
          <el-select v-model="form.mirror_scroll" placeholder="请选择镜像卷" style="width: 260px">
            <el-option v-for="item in mirror_list" :key="item.disk_id" :label="item.disk_name" :value="item.disk_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快照ID：">{{snapshot_id ? snapshot_id : '-'}}</el-form-item>
        <el-form-item label="快照时间：">{{snapshot_name ? snapshot_name : '-'}}</el-form-item>
        <el-form-item label="验证码：" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <el-col :span="6">
            <el-input v-model="form.code" placeholder="请输入验证码" style="width: 120px;padding-right: 20px"></el-input>
          </el-col>
          <el-col :span="6">
            <canvas class="codeCanvas" ref="checkCode" height="32" width="100" @click="generateCode"></canvas>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="syncVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<style scoped lang="scss">
.codeCanvas{
  transform: translateY(6px);
}
.el-form-item{
  margin-bottom: 10px;
}

</style>