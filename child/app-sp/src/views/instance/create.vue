<template>
  <div>
    <el-card>
      <label-block label="客户ID">
        <div class="input-box">
          <el-input v-model="customer_id"></el-input>
        </div>
      </label-block>
      <label-block label="客户名称">
        {{ customer_name }}
      </label-block>
    </el-card>

    <el-card>
      <label-block label="可用区">
        <el-select>
          <el-option></el-option>
        </el-select>
        <el-select>
          <el-option></el-option>
        </el-select>
      </label-block>
    </el-card>

    <el-card>
      <label-block label="网络">
          <el-select>
            <el-option></el-option>
          </el-select>
          <el-select>
            <el-option></el-option>
          </el-select>
      </label-block>
    </el-card>

    <el-card>
      <label-block label="计算规格">
          <label-block label="vCPU">
            <el-select>
              <el-option></el-option>
            </el-select>
          </label-block>
          <label-block label="内存">
            <el-select>
              <el-option></el-option>
            </el-select>
          </label-block>
      </label-block>
    </el-card>

    <el-card>
      <label-block label="镜像">
          <el-select>
            <el-option></el-option>
          </el-select>
      </label-block>
    </el-card>

    <el-card>
      <label-block label="系统盘">
        
      </label-block>
      <label-block label="数据盘">
        
      </label-block>
    </el-card>

    <el-card>
      <label-block label="购买数量">
        <el-input-number :min="1" :max="100"></el-input-number>
      </label-block>
    </el-card>

    <el-card>
      <label-block label="名称">
        <div class="input-box">
          <el-input></el-input>
        </div>
      </label-block>
      <label-block label="用户名">
        root
      </label-block>
      <label-block label="密码">
        <template #default>
          <div class="input-box">
            <el-input placeholder="请输入密码"></el-input>
          </div>
          <div>8-30个字符，且同时包含三项（大写字母、小写字母、数字、()`~!@#$%^&*-+=_|{}[]:;,.?/中的特殊字符）</div>
          <div class="input-box">
            <el-input placeholder="请确认密码"></el-input>
          </div>
        </template>
      </label-block>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LabelBlock from '../../components/labelBlock.vue';

@Component({
  components: {
    LabelBlock
  },
})

export default class App extends Vue {
  private customer_id = '';
  private customer_name = '完美世界';

}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
  .input-box {
    width: 420px;
  }
  .el-select {
    margin-right: 20px;
  }
}
</style>

