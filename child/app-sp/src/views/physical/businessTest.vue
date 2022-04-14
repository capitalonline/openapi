<template>
    <el-dialog
        title="业务测试"
        :visible.sync="visible_sync"
        width="500px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <div>
            
        </div>
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
}