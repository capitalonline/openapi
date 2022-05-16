<template>
    <div class="radio-btn-sp">
        <el-radio-group v-model="syncValue" size="mini" >
            <el-radio-button v-for="item in list" :key="item.region_id" :label="item.region_name" ></el-radio-button>
        </el-radio-group>
    </div>
</template>
<script lang="ts">
import {Component, Vue,Prop, PropSync, Watch} from 'vue-property-decorator';
@Component({})
export default class Area extends Vue{
    @Prop({default:()=>[]}) private list!:any;
    @PropSync('value',{type:String}) syncValue!:string;

}
</script>
<style lang="scss">
.radio-btn{
    .el-radio-button__inner {
      min-width: 100px;
      padding: 8px 12px;
      margin-right: 10px;
      border-left: 1px solid #DCDFE6;
      border-radius: 4px;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .el-radio-button:last-child .el-radio-button__inner,
    .el-radio-button:first-child .el-radio-button__inner {
      border-radius: 4px;
    }
}
</style>
