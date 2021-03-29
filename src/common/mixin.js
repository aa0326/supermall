import {debounce} from 'common/utils'

import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
    data(){
        return{
            itemImgListener:null,
        }
    },
    mounted(){
        let refresh=debounce(this.$refs.scroll.refresh,500)

        this.itemImgListener = () =>{
            refresh()
        }

        this.$bus.on('ItemImgLoad',this.itemImgListener)
    }
}

export const backTopMixin = {
    data(){
        return {
            isShowBackTop:false,
        }
    },
    components:{
        BackTop
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        },
        showBack(position){
            this.isShowBackTop = (-position.y)>1000
        }
    }
}