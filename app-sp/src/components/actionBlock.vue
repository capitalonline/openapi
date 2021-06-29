<template>
  <div class="action-box">
      <div class="search-box">
        <div v-for="(value, key) in search_option" :key="key" class="search-input">
          <el-select v-model="search_value[key]" v-if="value.list">
            <el-option v-for="item in value.list" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
          <el-input v-model="search_value[key]" :placeholder="value.placeholder" v-else></el-input>
        </div>
        <div><el-button type="primary" @click="FnSearch">查 询</el-button></div>
      </div>
      <slot>
        <el-button type="primary" @click="FnShowCreate" v-if="create_btn">{{ create_btn }}</el-button>
      </slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  
})
export default class extends Vue {
  @Prop({ default: {} }) private search_option!: Object;
  @Prop({ default: "" }) private create_btn!: String;

  $emit;
  private search_value = {
    id: '',
    maintask_name: '',
    maintask_type: '',
    subtask_type: '',
    subtask_name: ''
  };

  private FnSearch() {
    this.$emit("fn-search", this.search_value)
  };

  private FnShowCreate() {
    this.$emit("fn-create")
  };

  created() {
    // for(let key in this.search_option) {
    //   this.search_value[key] = '';
    // }
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
  }
}
</style>