<template>
    <div class="total">
        <div class="used" :style="{height:hei===0 ? 0 : hei+'%',background:hei>=0 && hei< 50 ? '#67c23a' : hei < 80 ? 'yellow' : 'red'}"></div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, } from 'vue-property-decorator';
@Component({})
export default class CustomIcon extends Vue{
    @Prop(Number)hei!:Number;
    
}
</script>
<style lang="scss" scoped>
    .total{
        height: 32px;
        width:18px;
        background: rgb(241,241,241);
        position: relative;
        display: inline-block;
        margin:0 10px;
        margin-bottom: 5px;
        .used{
            width: 100%;
            position: absolute;
            z-index: 999;
            bottom: 0;
        }
    }
</style>