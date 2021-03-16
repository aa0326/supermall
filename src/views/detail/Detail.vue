<template>
    <div id="detail">
        <detail-nav-bar/>
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop" />
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import {getDetail,Goods,Shop} from 'network/detail'
    export default {
        name:'Detail',
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                Shop:{}
            }
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
                })
            }
        },
        created(){
           this._getDetailData();
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo
        }
    }
</script>

<style scoped>

</style>