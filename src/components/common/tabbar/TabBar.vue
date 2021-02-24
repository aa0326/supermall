<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    
    export default {
        name:'TabBar',
        components:{
            
        }
    }
</script>

<style scoped>
    #tab-bar{
    display: flex;
    background-color:#F6F6F6;
    position: fixed;
    left:0;
    right:0;
    bottom:0;

    /**阴影 */
    box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
  }
</style>