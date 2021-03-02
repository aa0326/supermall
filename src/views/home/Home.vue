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

        <goods-list :goods="goods['pop'].list">

        </goods-list>
    </div>
</template>

<script>
    /**
     * 公共组件引入
     */
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    
    /**
     * 子组件引入
     */
    import HomeSwiper from './childComps/HomeSwiper'
    import recommendView from './childComps/recommendView'
    import FeatureView from './childComps/FeatureView'

    /**
     * 方法引入
     */
    import {getHomeMultidata,getHomeGoods} from 'network/home.js'
    export default {
        name:'Home',
        data(){
            return{
                banners:[],
                recommend:[],
                goods:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]},
                }
            }
        },
        created(){
            //1.请求多个数据
                this.getHomeMultidata();
            //2.请求商品数据
                this.getHomeGoods('pop');
                this.getHomeGoods('new');
                this.getHomeGoods('sell');
        },
        methods:{
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    // console.log(res);
                    this.banners=res.data.banner.list;
                    this.recommend=res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                //动态获取页数
                const page = this.goods[type].page+1;
                getHomeGoods(type,page).then(res=>{
                    console.log(res);
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page+=1;
                })
            }
            
        },
        components:{
            NavBar,
            HomeSwiper,
            recommendView,
            FeatureView,
            TabControl,
            GoodsList,
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