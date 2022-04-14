<template>
    <el-dialog
        title="制作公共镜像"
        :visible.sync="visible_sync"
        width="500px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <el-form :model="form_data" ref="form_ecs" label-position="left" label-width="100px" label-suffix=":">
            <el-form-item label="实例名称/ID" class="content">
                <span>{{ form_data.ecs }}</span>
            </el-form-item>
            <el-form-item label="客户名称/ID" class="content">
                <span>{{ form_data.customer }}</span>
            </el-form-item>
            <el-form-item label="可用区" class="content">
                <span>{{ form_data.az }}</span>
            </el-form-item>
            <el-form-item label="实例规格" class="content">
                <span>{{ form_data.spec }}</span>
            </el-form-item>
            <el-form-item label="系统盘" class="content">
                <span>{{ form_data.system_disk }}</span>
            </el-form-item>
            <el-form-item label="镜像" class="content">
                <span>{{ form_data.mirror }}</span>
            </el-form-item>
            <el-form-item label="镜像名称" prop="name" :rules="{required: true, message:'请输入镜像名称',trigger:'blur'}">
                <el-input v-model=" form_data.name"></el-input>
            </el-form-item>
            <el-form-item label="测试账户ID" prop="test_id" :rules="{required: true, message:'请输入镜像名称',trigger:'blur'}">
                <el-input v-model=" form_data.test_id" class="test"></el-input>
                <el-tooltip content="请输入测试账户ID，待镜像制作完成进行测试" placement="right" effect="light">
                    <el-button type="text" class="m-left10"><svg-icon icon="info"></svg-icon></el-button>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
import SvgIcon from '../../components/svgIcon/index.vue';
@Component({
    components:{
        SvgIcon
    }
})
export default class AddCommonMirror extends Vue{
    @PropSync('visible')visible_sync!:boolean;
    private form_data={
        ecs:'',
        customer:'',
        az:'',
        spec:'',
        name:'',
        test_id:'',
    }
    private confirm(){
        this.visible_sync=false
    }
    private cancel(){
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.el-form-item.content{
    margin-bottom: 0;
}
.test{
    width: 280px;
}
</style>