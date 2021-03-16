<template>
    <div class="detail-swiper">
        <swiper>
            <swiper-item class="swiper-item" v-for="(item,key) in topImages" :key="key">
                <img :src="item" alt="" srcset="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name:'DetailSwiper',
        components:{
            Swiper,
            SwiperItem
        },
        props:{
            topImages:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .swiper-item{
        height:300px;
        overflow: hidden;
    }
</style>