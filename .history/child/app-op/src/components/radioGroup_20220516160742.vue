<template>
    <div class="radio-btn">
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
    span.el-radio-button__inner {
        margin-right: 0 !important;
        border-right: none;
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .el-radio-button:first-child .el-radio-button__inner{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .el-radio-button:last-child .el-radio-button__inner{        
        border-right: 1px solid #DCDFE6;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .el-radio-button:first-child:last-child .el-radio-button__inner{
        border-radius:4px
    }
}
</style>
