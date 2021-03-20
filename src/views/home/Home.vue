<template>
    <div id="home" class="wrapper">

        <nav-bar class="home-nav">
            <template v-slot:content>
                <div>购物街</div>
            </template>
        </nav-bar>

        <tab-control 
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1" 
                class="tab-control1" v-show="isTabFixed"/>

        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">

            <home-swiper 
                :banners="banners" 
                @swiperImageLoad="swiperImageLoad"/>

            <recommend-view :recommends="recommend" />

            <feature-view />

            <tab-control 
                :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl2"/>

            <goods-list :goods="showGoods">

            </goods-list>
        </scroll>

        <back-top @click="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    /**
     * 公共组件引入
     */
    import Scroll from 'components/common/scroll/Scroll'
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backTop/BackTop'
    
    /**
     * 子组件引入
     */
    import HomeSwiper from './childComps/HomeSwiper'
    import recommendView from './childComps/recommendView'
    import FeatureView from './childComps/FeatureView'
    /**
     * 公共事件函数导入
    */
    import {debounce} from 'common/utils'
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
                },
                currentType:'pop',
                isShowBackTop:false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:0
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
        mounted(){
            let refresh=debounce(this.$refs.scroll.refresh,500)
            this.$bus.on('itemImageLoad',()=>{
                refresh()
            })
        },
        //监听keep-alive
        activated(){
            this.$refs.scroll.refresh()
            this.$refs.scroll.scrollTo(0,this.saveY)
        },
        deactivated(){
            this.saveY = this.$refs.scroll.getScrollY()
        },
        computed:{
            showGoods(){
                return this.goods[this.currentType].list
            }
        },
        methods:{
            /**
             * 事件监听相关的方法
             */
            tabClick(index){
                switch(index){
                    case 0:
                        this.currentType = "pop"
                    break

                    case 1:
                        this.currentType = "new"
                    break

                    case 2:
                        this.currentType = "sell"
                }
                //同步两个tabControl的信息
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },
            swiperImageLoad(){
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0)
            },
            contentScroll(position){
                //1.监听BackTop显示/隐藏
                this.isShowBackTop = (-position.y)>1000

                //2.监听tabControl是否吸顶
                this.isTabFixed = (-position.y)> this.tabOffsetTop
            },
            loadMore(){
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.finishPullUp()
            },
            /**
             * 网络请求相关的方法
             */
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    this.banners=res.data.banner.list;
                    this.recommend=res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                //动态获取页数
                const page = this.goods[type].page+1;
                getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page+=1;
                })
            },
        },
        components:{
            NavBar,
            HomeSwiper,
            recommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        }
    }
</script>

<style scoped>
    #home{
        padding-top:44px;
        height:100vh;
        position: relative;
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
    
    .content{
        /* height:300px; */
        overflow: hidden;
        position: absolute;
        top:44px;
        bottom: 44px;
        left:0;
        right:0;
    }
    .tab-control{
        position: relative; 
        z-index: 10;
    }
</style>