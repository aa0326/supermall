<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <template v-slot:content>
                <div>购物车({{length}})</div>
            </template>
        </nav-bar>

        <scroll class="content">
            <cart-list></cart-list>
        </scroll>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    import Scroll from "components/common/scroll/Scroll"
    import NavBar from 'components/common/navbar/NavBar'

    import CartList from './childComps/CartList'
    
    export default {
        name:'Cart',
        components:{
            Scroll,
            NavBar,
            CartList
        },
        computed:{
            // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
            //第一种用法填入数组引用gtters
            // ...mapGetters(['cartLength','cartList'])
            //第二种用法 填入对象更改getters名称
            ...mapGetters({
                length:"cartLength"
            })
        }
    }
</script>

<style scoped>
    .cart{
        height:100vh;
        position: relative;
    }
    .nav-bar{
        background-color: var(--color-tint);
        color:#fff;
        font-weight: 700;
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
</style>