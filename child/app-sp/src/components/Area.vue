<template>
    <div>
        <el-select v-model="area_id">
            <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value" class="item">
                <div>
                    <span class="label">{{item.label}}</span>
                    <radio-group :list="item.children"></radio-group>
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
    private selected_id:string=""
    private selected_name:string=""
    private get area_id (){
        console.log("area_id",this.$store.state.area_id)
        return this.$store.state.area_id
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