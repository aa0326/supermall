<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" 
                :is-Checked="isSelectAll"
                @click="checkClick"/>
            <span>全选</span>
        </div>

        <div class="price">
            合计:{{totalPrice}}
        </div>
        
        <div class="calculate">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/common/checkbutton/CheckButton'

    import {mapGetters} from 'vuex'
    export default {
        name:"CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(['cartList']),

            totalPrice(){
                return '￥' + this.$store.state.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue,item)=>{
                    return preValue + item.price * item.count
                },0).toFixed(2)
            },
            checkLength(){
                return this.$store.state.cartList.filter(item=>item.checked).length
            },
            isSelectAll(){
                if(this.cartList.length === 0) return false;
                return !(this.cartList.filter(item => !item.checked).length)
            }
        },
        methods:{
            checkClick(){
                if(this.isSelectAll){
                    return this.cartList.forEach(item => item.checked = false);
                }else{
                    return this.cartList.forEach(item => item.checked = true);
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        display: flex;
        position: fixed;
        left: 0;
        right: 0;
        bottom:44px;
        height:40px;
        background-color:#eee;
        line-height: 40px;
    }
    .check-content{
        display: flex;
        align-items: center;
        width:60px;
    }
    .check-button{
        width:20px;
        height:20px;
        line-height:20px;
        margin-right:5px;
    }
    .price{
        margin-left:20px;
        flex:1;
    }
    .calculate{
        width:90px;
        background: red;
        color:#fff;
        text-align: center;
    }
</style>