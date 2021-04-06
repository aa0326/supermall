<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name:"Toast",
        props:{
            message:{
                type:String,
                default:''
            },
            isShow:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            //未完成全局封装
            show(message = "",duraion = 1500){
                this.isShow = true;
                this.message = message

                setTimeout(()=>{
                    this.show = false;
                    this.message = ''
                },duraion)
            }
        },
        // setup(){
        //     const { proxy } = getCurrentInstance()
        //     const sysName = proxy.$systemName
        //     return {
        //         sysName
        //     }
        // }
    }
</script>

<style scoped>
    .toast{
        position: fixed;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        padding:8px 10px;
        color:#fff;
        background-color: rgba(0,0,0,0.6);
    }
</style>