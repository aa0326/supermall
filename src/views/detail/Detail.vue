<template>
    <div id="detail">
        <detail-nav-bar @titleClick="titleClick" ref="DetailNavBar"/>
        <scroll class="content" ref="scroll" :probeType="3" @scroll="scroll">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop" />
            <detail-goods-info :detail-info="detailInfo" @ImageLoad="ImageLoad"/>
            <detail-param-info  ref="params" :paramInfo="paramInfo"/>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
            <goods-list ref="recommend" :goods="recommendList"/>
        </scroll>
        <back-top @click="backClick" v-show="isShowBackTop"/>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <toast :is-show="show" :message="message"/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import { defineComponent, getCurrentInstance } from 'vue'
    import Scroll from 'components/common/scroll/Scroll'
    import Toast from 'components/common/toast/Toast'
    import GoodsList from 'components/content/goods/GoodsList'

    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'
    
    import {itemListenerMixin,backTopMixin} from 'common/mixin'
    import {debounce} from 'common/utils'
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
    export default {
        name:'Detail',
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommendList:[],
                themeTopYs:[],
                getThemeTopY:null,
                currentIndex:0,
                message:'',
                show:false
            }
        },
        created(){
           this._getDetailData();
           this._getRecommend();
           this.getThemeTopY = debounce(()=>{
                this.themeTopYs = [];
                this.themeTopYs.push([0]);
                this.themeTopYs.push([this.$refs.params.$el.offsetTop]);
                this.themeTopYs.push([this.$refs.comment.$el.offsetTop]);
                this.themeTopYs.push([this.$refs.recommend.$el.offsetTop]);
           },500);
        },
        mixins:[
            itemListenerMixin,
            backTopMixin
        ],
        mounted(){
            
        },
        methods:{
            ...mapActions(['addCart']),
            //请求商品信息
            _getDetailData(){
                 //1.保存传入的iid
                this.iid = this.$route.query.iid
                //2.根据iid请求详情数据
                getDetail(this.iid).then(res=>{
                    const data = res.result;
                    //获取轮播图数据
                    this.topImages = data.itemInfo.topImages
                    
                    //获取商品的基本信息
                    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                    //获取店铺信息
                    this.shop = new Shop(data.shopInfo);

                    //获取商品详情信息
                    this.detailInfo = data.detailInfo
                    
                    //获取参数信息
                    this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

                    //获取评价信息
                    if (data.rate.list) {
                        this.commentInfo = data.rate.list[0];
                    }
                })
            },
            _getRecommend(){
                getRecommend().then(res=>{
                    this.recommendList = res.data.list
                })
            },
            ImageLoad(){
                this.$refs.scroll.refresh()
                this.getThemeTopY();
            },
            titleClick(key){
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[key])
            },
            scroll(position){
                const positionY = -position.y

                let length = this.themeTopYs.length;
                for (let i = 0; i < length; i++) {
                    
                    if( this.currentIndex !== i && 
                        ( (i < length-1 && positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1]) 
                        || ( i===length-1 && positionY >= this.themeTopYs[i]) )){
                        this.currentIndex = i;
                        this.$refs.DetailNavBar.currentIndex = this.currentIndex;
                    }
                    
                }

                this.showBack(position);
            },
            addToCart(){
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this .detailInfo.desc;
                product.price = this.goods.lowNowPrice
                product.iid = this. iid;

                this.addCart(product).then(res=>{
                    // console.log(res);
                    this.show = true;
                    this.message = res;
                    setTimeout(()=>{
                        this.show = false;
                        this.message = ''
                    },1500)

                })
                // this.$store.dispatch('addCart',product).then(res=>{
                //     console.log(res);
                // })
            }
        },
        components:{
            Scroll,
            GoodsList,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Toast
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 10;
        background-color:#fff ;
        height:100vh;
    }
    .content{
        overflow: hidden;
        position: absolute;
        top:44px;
        bottom:49px;
        left:0;
        right:0;
    }
</style>