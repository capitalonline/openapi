<template>
    <div>
        <el-select v-model="text">
            <el-option label="" value="">
                <el-radio-group v-model="value" size="mini">
                    <el-radio-button v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-radio-button>
                    
                </el-radio-group>
                
            </el-option>
        </el-select>
    </div>
</template>
<script lang="ts">
import {Component, Vue,Prop,Emit,Watch} from 'vue-property-decorator';
@Component({})
export default class Az extends Vue{
    @Prop({default:()=>[]}) private list!:any;
    @Prop({default:''}) private az!:any;
    private value:string=this.az
    private text:string=this.value
    @Watch("value")
    private get_value(newVal){
        this.text = newVal
        this.get_az(newVal)
    }

    @Emit("get_az")
    private get_az(val){

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