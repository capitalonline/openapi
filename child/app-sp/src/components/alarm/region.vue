<template>
  <div class="apply">
    <el-popover
        placement="bottom"
        width="400"
        trigger="click"
        v-model="visible"
    >
        <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" v-if="area_list.length>0">全选</el-checkbox>
            <div v-for="item in area_list" :key="item.region_group_id">
                <el-divider content-position="left" class="divider">{{item.region_group_name}}</el-divider>
                <el-checkbox :indeterminate="item.isIndeterminate_group" v-model="item.check" @change="handleCheckGroupChange($event,item.region_group_id)" class="group-all">全选</el-checkbox>
                <el-checkbox-group v-model="item.region" @change="handleCheckedRegionChange($event,item.region_group_id)" class="group">
                    <el-checkbox v-for="area in item.region_list" :label="area.region_id" :key="area.region_id">{{area.region_name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div v-if="area_list.length===0" class="no-data">暂无数据</div>
        </div>
        <el-select
            v-model="selected_key"
            :disabled="disabled"
            multiple
            allow-create
            ref="region-select"
            class="region"
            slot="reference"
            popper-class="select-area"
        >

        </el-select>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form } from "element-ui";
import moment from 'moment';

@Component({})
export default class Region extends Vue{
  @Prop({default:()=>{}}) list!:any
  @Prop(Boolean) disabled!:Boolean
  private visible:boolean=false
  private selected_key:Array<string>=[];
  private area_list:any = []
  private checkAll:boolean=false;
  private isIndeterminate:boolean=false
  created() {
  }
  @Watch("list",{immediate:true,deep:true})
  private watch_list(newVal){
      this.area_list = newVal.map(item=>{
        item = Object.assign({},item,{check:false,isIndeterminate_group:false,region:[]})
        return item;
    })
  }

  @Watch("area_list",{immediate:true,deep:true})
  private watch_area_list(newVal){
      console.log("newVal",newVal)
      this.selected_key=[]
      let region_info:any={}
      let region_key:any=[]
      newVal.map(item=>{
          region_key=[...region_key,...item.region]
          region_info={...region_info,[item.region_group_id]:item.region}
          this.selected_key = [...this.selected_key,...this.trans(item.region,item.region_group_id)]
      })
      this.get_area_id({region_info,region_key})
  }
  @Emit("get_area_id")
  private get_area_id(val:any){

  }
  private handleCheckAllChange(val){
      this.area_list.map(item=>{
          this.handleCheckGroupChange(val,item.region_group_id)
          return item;
      })
  }
  private handleCheckGroupChange(check:boolean,id:string){
      this.area_list.map(item=>{
          if(item.region_group_id === id){
              item.region =check ? item.region_list.map(inn=>inn.region_id) : []
              item.isIndeterminate_group = false
              item.check = check
          }
      })
      if(this.area_list.every(item=>item.check) || this.area_list.every(item=>!item.check)){
          this.isIndeterminate = false
          this.checkAll = this.area_list[0].check
      }else{
          this.isIndeterminate = true
      }
  }
  private handleCheckedRegionChange(list:any,id:string){
      this.area_list.map(item=>{
          if(item.region.length===0){
              item.isIndeterminate_group = false
              item.check = false
          }else if(item.region.length>0 && item.region.length<item.region_list.length){
              item.isIndeterminate_group = true
              item.check = false
          }else{
              item.isIndeterminate_group = false
              item.check = true
          }
          return item;
      })
        if(this.area_list.some(item=>item.isIndeterminate_group)){
            this.isIndeterminate = true
            this.checkAll = false
        }else if(this.area_list.every(item=>item.check)){
            this.isIndeterminate = false
            this.checkAll = true
        }else {
            this.isIndeterminate=false
            this.checkAll = this.area_list[0].check
        }
  }
  //将ID转成name
  private trans(list,id){
      let temp:Array<string>=[]
      this.area_list.map(item=>{
          if(item.region_group_id===id){
              item.region_list.map(inn=>{
                  if(list.includes(inn.region_id)){
                      temp.push(inn.region_name)
                  }
              })
          }
      })
      return temp
  }
  
}
</script>
<style lang="scss" scoped>
.apply{
    .group-title{
        display: flex;
        align-items: center;
    }
    
    .foot-btn{
        width:100%;
        text-align: right;
        .el-button:first-child{
            margin-right: 10px;
        }
    }
    .check-group{
        display: flex;
    }
    
    
}
.no-data{
    text-align: center;
    color: #666;
}
</style>
<style lang="scss">
.el-select-dropdown.el-popper.select-area{
    display: none !important;
}
.el-checkbox-group.group {
    display: inline !important;
}
label.el-checkbox.group-all{
    margin-right: 30px;
}
.divider.el-divider.el-divider--horizontal{
    .el-divider__text.is-left{
        color: #828899 !important;
    }
}
.el-select.region.el-popover__reference{
    .el-tag.el-tag--info .el-tag__close{
        display: none !important;
    }
}
</style>