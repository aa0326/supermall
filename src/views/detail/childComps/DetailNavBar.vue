<template>
    <div>
        <nav-bar>
            <template v-slot:left>
                <div class="back" @click="backClick">
                    <img src="~assets/img/common/back.svg" alt="">
                </div>
            </template>

            <template v-slot:content>
                <div class="title">
                    <div class="title-item" v-for="(item,key) in titles" 
                        :key="key" 
                        :class="{active:key === currentIndex}"
                        @click="titleClick(key)">{{item}}</div>
                </div>
            </template>

        </nav-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name:'DetailNavBar',
        data(){
            return {
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            titleClick(key){
                this.currentIndex = key;
                this.$emit('titleClick',key)
            },
            backClick(){
                this.$router.back()
            }
        },
        components:{
            NavBar
        }
    }
</script>

<style scoped>
    .title{
        display:flex;
    }
    .title-item{
        flex:1;
    }
    .active{
        color:var(--color-high-text)
    }
    .back img{
        vertical-align: middle;
    }
</style>