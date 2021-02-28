//在我们网络请求的过程中可能会有多个实例所以我们这里私用export而不是export default
import axios from 'axios'
export function request(config) {
    //2.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5/',
        timeout: 500
    });

    //3.axios拦截器
    //请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        /**
         * 使用情况：1.当我们config中的一些信息不符合服务器的要求，对我们config中的数据做一些处理
         * 2.每次发送网络请求的时，都希望在界面中显示一个请求图标
         * 3.某些网络请求(比如登录(toten))，必须携带一些特殊信息
         */
        //必须返回config不然我们拦截了请求没有返回config，请求的界面拿不到数据
        return config;
    }, err => {
        console.log(err);
        // return err;
    });
    //响应拦截
    instance.interceptors.response.use(config => {
        // console.log(config);
        //必须返回不然我们拦截了请求没有返回，请求的界面拿不到数据
        return config.data
    }, err => {
        // console.log(err);
        return err;
    });
    //4.发送真正的网络请求
    return instance(config);
}