<template>
    <div id="detail">
        <detail-nav-bar/>
        <scroll class="content">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop" />
            <detail-goods-info :detail-info="detailInfo" @ImageLoad="ImageLoad"/>
            <detail-param-info :paramInfo="paramInfo"/>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'components/common/scroll/Scroll'

    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    
    import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
    export default {
        name:'Detail',
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{}
            }
        },
        created(){
           this._getDetailData();
        },
        methods:{
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
                })
            },
            ImageLoad(){
                this.$refs.scroll.refresh()
            }
        },
        components:{
            Scroll,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo
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
        bottom: 44px;
        left:0;
        right:0;
    }
</style>