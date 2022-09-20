<!-- <template>
  <el-tooltip 
    content="复制" 
    placement="bottom" 
    effect="light">
    <el-button type="text" v-clipboard:copy="content" v-clipboard:success="onCopy" v-clipboard:error="onError" :key="content">
      <svg-icon icon="copy"></svg-icon>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import svgIcon from './svgIcon/index.vue';

@Component({
  components: {
    svgIcon
  }
})
export default class Clipboard extends Vue {
  @Prop({default: ''}) readonly content!: string;
  private onCopy() {
    this.$message.success('复制成功')
  }
  private onError() {
    this.$message.error('复制失败')
  }
}
</script>
<style lang="scss" scoped>
.el-button--text {
  vertical-align: text-bottom;
}
</style> -->
<template>
    <el-tooltip class="item" effect="light" content="复制" placement="bottom">
        <el-button
            @click="copyText"
            type="text"
        >
            <svg-icon icon="copy"></svg-icon>
        </el-button>
      
    </el-tooltip>
</template>
<script lang="ts">
import {Vue,Component,Prop} from 'vue-property-decorator';
import SvgIcon from './svgIcon/index.vue'
@Component({
    components:{
        SvgIcon
    }
})
export default class Copy extends Vue{
    @Prop({default:''})content!:string
    private copyText () {
        this.$copyText(this.content).then(() => {
            this.$message.success({message:`复制成功`})
        }).catch(() => {
            this.$message.error({message:"复制失败"})
        })
    }
    // private onCopy() {
    //     this.$message.success("复制成功")
    // }
    // private onError(){
    //     this.$message.success("复制失败")
    // }
}
</script>
<style lang="scss" scoped>
.el-button--text {
  vertical-align: text-bottom;
}
</style>
