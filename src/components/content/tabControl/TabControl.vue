<template>
    <div class="tab-control" >
        <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active:index===currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'TabControl',
        data(){
            return{
                currentIndex : 0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex = index;
            }
        },
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
    }
</script>

<style>
    .tab-control{
        display:flex;
        text-align: center;
        height:40px;
        line-height: 40px;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item{
        flex:1;
    }
    .tab-control-item span{
        padding:5px;
    }
    .active span{
        color:var(--color-high-text);
        border-bottom:3px solid var(--color-tint);
    }
    .tab-control{
        position: sticky;
        top:44px;
    }
</style>