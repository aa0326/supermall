<template>
    <div id="home">
        <nav-bar class="home-nav">
            <template v-slot:content>
                <div>购物街</div>
            </template>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>

        <recommend-view :recommends="recommend" />

        <feature-view />

        <tab-control :titles="['流行','新款','精选']"/>
        
    </div>
</template>

<script>
    /**
     * 公共组件引入
     */
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    /**
     * 子组件引入
     */
    import HomeSwiper from './childComps/HomeSwiper'
    import recommendView from './childComps/recommendView'
    import FeatureView from './childComps/FeatureView'

    /**
     * 方法引入
     */
    import {getHomeMultidata} from 'network/home.js'
    export default {
        name:'Home',
        data(){
            return{
                banners:[],
                recommend:[]
            }
        },
        created(){
            //1.请求多个数据
            getHomeMultidata().then(res=>{
                console.log(res);
                this.banners=res.data.banner.list;
                this.recommend=res.data.recommend.list;
            })
        },
        components:{
            NavBar,
            HomeSwiper,
            recommendView,
            FeatureView,
            TabControl,
        }
    }
</script>

<style scoped>
    #home{
        padding-top:44px;
    }
    .home-nav{
        background-color:var(--color-tint);
        color:#fff;
        position: fixed;
        left:0;
        right:0;
        top:0;
        z-index:10;
    }
</style>