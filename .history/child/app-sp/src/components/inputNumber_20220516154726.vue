<template>
    <el-input-number 
        v-model="size_info.size" 
        :disabled="disable"
        :step="size_info.disk_step" 
        :min="size_info.disk_min" 
        :max="size_info.disk_max" 
        @blur="FnChange"
        @change="FnChange"
    >
    </el-input-number>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit,Watch} from 'vue-property-decorator';
@Component({})
export default class InputNumber extends Vue{
    @Prop({default:false})private disable!:Boolean;
    @Prop({default:()=>({
        disk_step:1,
        disk_min:1,
        disk_max:1,
    })}) info!:any;
    private size_info = {...this.info,size : NaN};
    @Watch("info",{deep:true,immediate:true})
    private watch_info(nv){
        this.size_info={...this.size_info,...this.info}
        this.FnChange()  
    }
    private async FnChange(){
        if(!this.size_info.size){
            console.log("aaaa",this.size_info.size)
            this.size_info.size = this.size_info.disk_min
        }else{
            this.$nextTick(()=>{
                let newStep = Math.floor((this.size_info.size-this.size_info.disk_min)/this.size_info.disk_step)
                this.size_info.size = newStep*this.size_info.disk_step+this.size_info.disk_min;
            });
        }
        this.returnValue()
    }
    @Emit("func")
    private returnValue(){
        return this.size_info
    }
}
</script>