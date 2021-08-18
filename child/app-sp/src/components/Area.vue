<template>
    <div>
        <el-select v-model="label">
            <el-option v-for="item in list" :key="item.region_id" :label="item.region_name" :value="item.region_id" class="item">
                <div>
                    <span class="label">{{item.region_name}}</span>
                    <radio-group :list="item.children" :value.sync="value"></radio-group>
                </div>
                
            </el-option>
        </el-select>
    </div>
</template>
<script lang="ts">
import {Component, Vue,Prop,Emit,Watch} from 'vue-property-decorator';
import RadioGroup from './radioGroup.vue'
@Component({
    components:{
        RadioGroup,
    }
})
export default class Area extends Vue{
    @Prop({default:()=>[]}) private list!:any;
    @Prop({default:''}) private area!:any;
    private label:string=this.area
    private value:string=this.area
    @Watch("value")
    private watch_val(newVal){
        this.label=newVal
        this.get_area_id(newVal)
    }
    @Emit("get_area_id")
    get_area_id(val){

    }
}
</script>
<style lang="scss">
li.el-select-dropdown__item.item {
    height: 80px !important;
}
</style>
<style lang="scss" scoped>
.label{
    font-size: 12px;
    color: #909399;
}
</style>