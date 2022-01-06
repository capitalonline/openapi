<template>
  <div class="select-box" id="long_select" v-infinite-scroll="load">
    <!-- <li v-for="item in current_list" :key="item.id">{{ item.name }}</li> -->
    <el-select v-model="default_id" @visible-change="FnShowSelect">
      <el-option v-for="item in current_list" :key="item.id" :value="item.id" :label="item.id"></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LongSelect extends Vue {
  private list = new Array(10000);
  private default_id = '';
  private current_list = [];
  private current_index = 1;
  private created() {
    console.time('one')
    for (let i = 0; i < this.list.length; i++) {
      this.list[i] = {
        id: i,
        name: 'a' + i
      }
    }
    console.timeEnd('one')
    this.current_list = this.list.slice(0, this.current_index * 100)
  }
  private mounted() {
  }
  private FnShowSelect(val) {
    if (val) {
      this.$nextTick(() => {
        console.log(document.querySelector('.el-select-dropdown .el-scrollbar__wrap'))
        document.querySelector('.el-select-dropdown .el-scrollbar__wrap').addEventListener('scroll', this.FnSelectScroll(this.FnChangeCurrentList))
      })
    }
  }
  private FnSelectScroll(fn) {
    let canRun = true;
    return function(event) {
      if (!canRun) return
      canRun = false;
      setTimeout(() => {
        fn.apply(this, [this, event])
        canRun = true
      }, 1000)
    }
  }
  private FnChangeCurrentList(element, event) {
    if (this.current_index * 100 > this.list.length) {
      return
    }
    let index = Math.floor(element.scrollTop/1500) + 1;
    if (this.current_index < index) {
      this.current_index = index;
      this.current_list.push(...this.list.slice(this.current_index * 100, (this.current_index + 1) * 100))
    }
    console.log('current_index', this.current_index, this.current_list.length)
  }
  private load() {
    if (this.current_index * 100 > this.list.length) {
      return
    }
    this.current_list.push(...this.list.slice(this.current_index * 100, (this.current_index + 1) * 100))
    this.current_index++;
    console.log(this.current_index, this.current_list.length )
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  width: 200px;
  height: 200px;
  overflow: auto;
  background: #fff;
}
</style>
