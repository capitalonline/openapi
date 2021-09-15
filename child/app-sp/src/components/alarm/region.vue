<template>
  <div class="apply">
    <el-popover
        placement="bottom"
        width="400"
        trigger="click"
        v-model="visible"
    >
        <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div v-for="item in area_list" :key="item.region_group_id">
                <el-divider content-position="left" class="divider">{{item.region_group_name}}</el-divider>
                <el-checkbox :indeterminate="item.isIndeterminate_group" v-model="item.check" @change="handleCheckGroupChange($event,item.region_group_id)" class="group-all">全选</el-checkbox>
                <el-checkbox-group v-model="region" @change="handleCheckedRegionChange($event,item.region_group_id)" class="group">
                    <el-checkbox v-for="area in item.region_list" :label="area.region_id" :key="area.region_id">{{area.region_name}}</el-checkbox>
                </el-checkbox-group>
                
            </div>
            
                
        </div>
        <el-select
            v-model="selected_key"
            ref="select"
            slot="reference"
            popper-class="select-area"
        >

        </el-select>
            
            <!-- <el-input placeholder="请选择地域" />
            <i class="el-icon-arrow-down"></i> -->
            <!-- <i class="el-icon-arrow-up" v-show="visible"></i> -->
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import {area_list} from './data'
import { Form } from "element-ui";
import moment from 'moment';

@Component({})
export default class Region extends Vue{
  private visible:boolean=false
  private selected_key:string="";
  private area_list:any = area_list.map(item=>{
      item = Object.assign({},item,{check:false,isIndeterminate_group:false})
      return item;
  })
  private checkAll:boolean=false;
  private isIndeterminate:boolean=false
  private region:Array<string>=[];
  private check_obj:any={}
  private handleCheckAllChange(val){
      this.area_list.map(item=>{
          this.handleCheckGroupChange(val,item.id)
          return item;
      })
  }
  private handleCheckGroupChange(check:boolean,id:string){
      this.area_list.map(item=>{
          if(item.region_group_id === id){
              item.check = check
              const ids = this.get_ids(item.region_list,'region_id')
              if(check){
                  this.region =  [...new Set([...ids,...this.region])]
              }else{
                  const fil = this.region.filter(id=>!ids.includes(id))
                  this.region = fil
              }
          }
          return item;
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
        const ids = this.get_ids(item.region_list,'region_id')
        this.region.map(inn=>{
            if(ids.includes(inn)){
                if(this.check_obj[id]){
                    this.check_obj={[id]:[...new Set([...this.check_obj[id],inn])]}
                }else{
                    this.check_obj=Object.assign({},this.check_obj,{[id]:[inn]})
                }
            }
        })
        if(!this.check_obj[id] || this.check_obj[id].length===0){
            item.check = false
            item.isIndeterminate_group = false
        }
        if(this.check_obj[id].length>0){
            item.isIndeterminate_group = true
        }
        if(this.check_obj[id].length===ids.length){
            item.isIndeterminate_group = false
            item.check=true
        }
      })
      
      if(this.region.length===0){
          this.checkAll = false
          this.isIndeterminate = false
      }
      if(this.region.length>0){
          this.isIndeterminate = true
      }
      let len:number = 0;
      this.area_list.map(item=>{
          len +=this.get_ids(item.region_list,'region_id').length
      })
      if(this.region.length===len){
          this.checkAll=true
          this.isIndeterminate = false
      }

  }
  private check_area(check:boolean,id:string=""){
    this.area_list.map(item=>{
        if(item.region_group_id===id || id===""){
            item.check = check
            item.isIndeterminate_group=false
            
            let ids = item.region_list.map(item=>item.region_id)
            this.region =check ? [...new Set([...this.region,...ids])] : this.region.filter(id=>!ids.includes(id))
        }
    })
    console.log("this.region",this.region)
  }
  //获取一个数组中对象的所有ID
  private get_ids(arr:any,id:string){
      return arr.map(item=>item[id])
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
</style>