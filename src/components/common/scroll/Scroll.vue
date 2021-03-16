<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name:'scroll',
        data(){
            return {
                scroll:null,
            }
        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            //创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                observeDOM:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad,
                observeImage:true
            })
            //监听滚动的位置
            this.scroll.on('scroll',position=>{
                this.$emit('scroll',position)
            })
            //监听scroll滚动到底部
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })
        },
        methods:{
            scrollTo(x,y,time=300){
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll && this.scroll.scrollTo && this.scroll.finishPullUp()
            },
            refresh(){
                this.scroll && this.scroll.scrollTo && this.scroll.refresh()
            },
            getScrollY(){
                return this.scroll ? this.scroll.y : 0;
            }
            
        }
    }
</script>

<style scoped>
  
</style>