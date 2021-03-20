module.exports = {
    configureWebpack: {
        resolve: {
            extensions: [],
            alias: {
                'assets': "@/assets",
                'components': '@/components',
                'network': "@/network",
                'views': "@/views",
                'common': "@/common"
            }
        }
    },
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'development', // 开发环境
          // config => config.devtool('cheap-source-map') // 转换过的源码-快
          config => config.devtool('source-map') // 源码-慢
        )
      }
}