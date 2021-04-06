import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutations_type"
export default {
    addCart(context,payload){

        return new Promise((resovle,reject)=>{
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
            if(oldProduct){
                context.commit(ADD_COUNTER,oldProduct);
                resovle('商品数量+1')
            }else{
                payload.count = 1;
                payload.checked = true;
                context.commit(ADD_TO_CART,payload);
                resovle('添加新的商品')
            }
        })
        
    }
}