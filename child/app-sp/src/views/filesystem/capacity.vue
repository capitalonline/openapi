<template>
    <el-dialog
        title="扩容"
        :visible.sync="visibleSync"
        width="700px"
        :close-on-click-modal="false">
        <div v-for="(item,i) in configInfo" :key="i" class="m-bottom10">
            <span class="label">{{item.label}}</span>
            <span class="label">{{item.value}}</span>
        </div>
        <div>
            <span class="label">扩容后容量:</span>
            <span>
                <el-input-number v-model="size" :min="min" :max="unit==='TB' ? 64 : 64*1024" @change="change" @blur="change"></el-input-number>
                <el-select v-model="unit" @change="changeUnit" :disabled="configInfo.total.value && configInfo.total.value.slice(-2)==='TB'" >
                    <el-option v-for="item in unitList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="visibleSync = false">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync,Emit} from 'vue-property-decorator';
import Service from '../../https/filesystem/list';
import moment from 'moment';

@Component({
    components:{}
})
export default class RollBack extends Vue{
    @PropSync('visible')visibleSync!:Boolean;
    @Prop({default:()=>{}})info!:any;
    private configInfo:any={
        customer_id:{label:'客户ID:',value:''},
        customer_name:{label:'客户名称:',value:''},
        nas_id:{label:'文件系统ID:',value:''},
        nas_name:{label:'文件系统名称:',value:''},
        total:{label:'当前容量:',value:''},
        used:{label:'当前使用量:',value:''},
    }
    private size:number=0;
    private unit:string=''
    private unitList:any=['GB','TB'];
    private units=['B','KB','MB','GB','TB','PB','EB','ZB']
    private clear=null;
    private min:number=0
    created() {
        for(let i in this.configInfo){
            this.configInfo[i].value = this.info[i]
        }
        this.getFileUse()
    }
    beforeDestroy() {
        this.FnClearTimer()
    }
    private FnSetTimer(){
      if(this.clear){
        this.FnClearTimer()
      }
      this.clear = setTimeout(()=>{
        this.getFileUse(false)
      },1000*60)
    }
    private FnClearTimer(){
      if(this.clear){
        clearTimeout(this.clear)
      }
    }
    private async getFileUse(loading:boolean=true){
      if(!loading){
        this.$store.commit("SET_LOADING",false)
      }
      let res:any = await Service.get_file_use({
        region_id:this.info.region_id,
        volume_ids:[this.info.nas_id]
      })
      if(res.code==='Success'){
            let id:string = this.info.nas_id
            this.configInfo.used.value  = this.computeUnit(res.data[id]&& res.data[id].used ? res.data[id].used : 0);
            this.configInfo.total.value = this.computeUnit(res.data[id]&& res.data[id].total ? (res.data[id].total) : 0);
            let oldUnit:string = this.configInfo.total.value.slice(-2)
            this.size = Math.ceil(Number(this.configInfo.total.value.slice(0,-2)))
            this.min=this.size
            console.log('###',oldUnit,this.size,this.configInfo.total.value.slice)
            if(['GB','TB'].includes(oldUnit)){
                this.unit = oldUnit
            }else{
                this.unit = 'GB'
            }
            
        } 
        this.FnSetTimer();
    }
    /**
     
     */
    // private get min(){
    //     let oldUnit:string = this.configInfo.total.value.slice(-2)
    //     let size = Math.ceil(Number(this.configInfo.total.value.slice(0,-2)))
    //     if(oldUnit===this.unit){
    //         return size
    //     }else if(this.unit==='TB'){//不等的情况下，原来的总量单位一定比TB小
    //         return oldUnit==='GB' ? Math.ceil(Number(size)/1024) : 0
    //     }else{//this.unit==='GB',如果原来总量的单位是TB，那已经不允许更改单位，那就符合第一种条件
    //         return size
    //     }
    // }
    private change(){
        if(!this.size){
            this.size = this.min
        }
    }
    private changeUnit(){
        let oldUnit:string = this.configInfo.total.value.slice(-2);
        let originSize:number = Number(this.configInfo.total.value.slice(0,-2))
        if(this.unit==='TB'){
            if(oldUnit==='TB'){
                this.size = Math.min(this.size,64);
                this.min = Math.ceil(originSize)//min不用变
            }else{//那一定比TB小,size的容量不用改
                this.size = oldUnit==='GB' ? Math.ceil(originSize/1024) : 1;
                this.min = this.size
            }
        }else{//GB
            if(oldUnit==='TB'){//原来容量为TB，改变后的单位为GB，不可能为这个单位
                
            }else{//原来的单位比GB小或是一样
                this.size = Math.max(this.size,Math.ceil(originSize))
                this.min = oldUnit==='GB' ? Math.ceil(originSize) : 1
            }
        }
    }
    private computeUnit(value,num=0){
        if(value>=1024){
            return this.computeUnit(value/1024,++num)
        }else{
            return value.toFixed(2) + this.units[num];
        }        
    }
    private async confirm(){
        if(!this.unit){
            return;
        }
        const {region_id,az_id,nas_id,customer_id}=this.info
        let res:any = await Service.capacity({
            region_id,
            az_id,
            nas_id,
            size:this.size,
            unit:this.unit,
            customer_id
        })
        if(res.code==='Success'){
            this.$message.success(res.message)
            this.visibleSync=false;
        }
    }
    @Emit('fn-create')
    private create(){
        
    }
}
</script>
<style lang="scss" scoped>
.weight{
    font-weight: bold;
    font-size: 14px;
    margin: 0 5px;
}
</style>