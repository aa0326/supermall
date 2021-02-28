<template>
    <div class="recommend">
        <div v-for="item in recommends" :key="item" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name:'recommendView',
        props:{
            recommends:{
                type:Array,
                default(){
                    return[]
                }
            }
        }
    }
</script>

<style>
    .recommend{
        display: flex;
        width:100%;
        text-align: center;
        font-size:12px;
        padding:10px 0 20px;
        border-bottom:10px solid #eee;
    }
    .recommend-item{
        flex: 1;
    }
    .recommend-item img{
        height:70px;
        width:70px;
        margin-top:10px;
    }
</style>