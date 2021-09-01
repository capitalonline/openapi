<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="search">
            <!-- <template #default>
                <el-button type="primary" @click="create_mirror">创建镜像</el-button>
                <el-button type="primary" @click="operate('mount')">复制</el-button>
                <el-button type="primary" @click="operate('unInstall')">导入</el-button>
                <el-button type="primary" @click="operate('delete')">导出</el-button>
                <el-button type="primary" @click="operate('recover')">删除</el-button>
                <el-button type="primary" @click="create_instance">创建实例</el-button>
            </template> -->
        </action-block>
        <Common :search_data="search_data" ref="common" />
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="公共镜像" name="0">
                <Common />
            </el-tab-pane>
            <el-tab-pane label="自定义镜像" name="1">
                自定义镜像
            </el-tab-pane>
            <el-tab-pane label="共享镜像" name="2">
                共享镜像
            </el-tab-pane>
        </el-tabs> -->
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import ActionBlock from '../../components/actionBlock.vue'
import Common from './common.vue'
@Component({
    components:{
        ActionBlock,
        Common
    }
})
export default class Mirror extends Vue{
    private list=[
        {type:'os_name',label:'镜像名称'},
        {type:'os_id',label:'镜像id'},
    ]
    private search_dom:any={
        name:{placeholder:'请输入内容查询',list:this.list,type:'composite',width:340}
    }
    private activeName:string='0';
    private search_data:any = {}
    created() {
    }
    private search(data){
        this.search_data = data
        const common = this.$refs.common as any
        common.getMirrorList(data)
    }
    private create_mirror(){

    }
    private create_instance(){

    }
    private operate(){

    }
    private handleClick(){

    }
}
</script>