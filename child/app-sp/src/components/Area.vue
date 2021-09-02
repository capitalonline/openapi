<template>
    <div>
        <el-select v-model="value">
            <el-option v-for="item in area_list" :key="item.region_group_id" :label="value" :value="value" class="item">
                <div>
                    <span class="label">{{item.region_group_name}}</span>
                    <radio-group :list="item.region_list" :value.sync="value"></radio-group>
                    
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
    private value:string=this.area
    private area_id:string=""
    private area_list:any =this.list.length>0 ? JSON.parse(JSON.stringify(this.list)) : []
    created() {
    }
    @Watch("list",{immediate:true,deep:true})
    private watch_list(newVal){
        this.area_list= newVal.length>0 ? JSON.parse(JSON.stringify(newVal)) : []
    }
    @Watch("value")
    private watch_val(newVal){
        this.area_list.forEach(item=>{
            item.region_list && item.region_list.forEach(inn=>{
                if(inn.region_name===newVal){
                    this.area_id=inn.region_id
                }
            })
        })
        console.log("newVal",newVal,this.area_id)
        this.get_area_id(this.area_id)
    }
    //返回所选区域ID
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