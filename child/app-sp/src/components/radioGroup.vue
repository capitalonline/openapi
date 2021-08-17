<template>
    <div class="radio-btn">
        <el-radio-group v-model="area_id" size="small">
            <el-radio-button v-for="item in list" :key="item.value" :label="item.label" ></el-radio-button>
        </el-radio-group>
    </div>
</template>
<script lang="ts">
import {Component, Vue,Prop} from 'vue-property-decorator';
// import store from '../store'
@Component({})
export default class Area extends Vue{
    @Prop({default:()=>[]}) private list!:any;
    private get area_id (){
        return this.$store.state.area_id
    }
    private set area_id (val){
        console.log("set",val)
        this.$store.commit("SET_AREA_ID",val)
    }
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
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .el-radio-button:last-child .el-radio-button__inner{        
        border-right: 1px solid #DCDFE6;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>
