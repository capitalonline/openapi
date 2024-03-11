<template>
  <div id="menu">
    <ul>
      <div class="tip"> 操作-{{multi_rows.length>1 ?  multi_rows.length+ '个对象' : name}}</div>
      <li
        v-for="(item, index) in menus"
        :key="index"
        v-if="(multi_rows.length>1 && !item.single) || multi_rows.length===1"
        @click.stop="FnClick(item,index)"
      >
        <span v-if="!item.disabled">
            {{ item.label }}
        </span>
        <el-tooltip v-else effect="light" placement="left" :content="disabledTooltipContent(item)">
          <span class="disabled">
            {{ item.label }}
          </span>
        </el-tooltip>
        <span v-if="item.list">
          <i style="float: right;margin-top: 7px;font-size: 15px;" class="el-icon-arrow-right"/>
          <ul>
            <li
            v-for="inn in item.list"
            :key="inn.value"
            @click.stop="FnClick(inn)"
            >
              <span v-if="!inn.disabled">
            {{ inn.label }}
              </span>
              <el-tooltip v-else effect="light" placement="left" :content="disabledTooltipContent(inn)">
                <span class="disabled">
                  {{ inn.label }}
                </span>
              </el-tooltip>
            </li>
          </ul>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import CreateCluster from "@/views/vmOp2/cluster/pod/createCluster.vue";
@Component({
  components: {CreateCluster}
})

export default class RightClick extends Vue{
  @Prop({default:()=>[]}) multi_rows!:any
  @Prop({default:()=>[]}) menus!:any
  @Prop({default:()=>{}}) error_msg!:any
  @Prop({default:''}) name!:any
  private operate_auth = [];
  private msg:any = {}
  @Watch('error_msg')
  private watch_error_msg(v){
    this.msg = v
  }
  created(){
    //this.operate_auth = this.$store.state.auth_info[this.$route.name];
    this.msg = this.error_msg
  }
  private disabledTooltipContent(item){
    if(this.msg[item.value]) {
      return  this.msg[item.value]
    } else {
      return '无操作权限'
    }
  }
  @Emit("fn-click")
  private FnClick(menu){
    return menu
  }

}
</script>

<style scoped lang="scss">
#menu {
  position: absolute;
  display: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  cursor: pointer;
  color: #606266;
  width: 200px;
  border: 1px solid #e4e7ed;
  font-size: 13px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      position: relative;
      box-sizing: border-box;
      text-indent: 8px;
      .iconfont {
        float: right;
      }

      ul {
        display: none;
        position: absolute;
        left: 200px;
        top: 0;
        width: 160px;
        border: 1px solid #e4e7ed;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        li {
          background: #ffffff;
        }
      }

      &:hover {
        background-color: #ecf5ff;

        ul {
          display: block;
        }
      }
    }
  }

  .tip {
    height: 30px;
    margin-bottom: 5px;
    background: #eceff2;
    padding-left: 17px;
    line-height: 30px;
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>

