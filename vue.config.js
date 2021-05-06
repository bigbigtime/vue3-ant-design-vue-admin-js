const path = require("path");
// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    // 构建项目生成的目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devDist',
    // 关闭语法的自动检测
    lintOnSave: false,
    chainWebpack: config => {
        config.module.rules.delete('svg'); //重点:删除默认配置中处理svg,
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include.add(path.resolve('src/assets/svg')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            });
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            }
        }
    },
    devServer: {
        open: false,    // 运行项目后是否自动打开
        host: "0.0.0.0",   // 可以让外部访问
        port: 8000,
        proxy: {
            [process.env.VUE_APP_FLAG]: {
                target: process.env.VUE_APP_APIURL,
                ws: false,            // webstock
                changeOrigin: true,    // 是否开启跨域
                pathRewrite: {
                    [`^${process.env.VUE_APP_FLAG}`]: ''        // 查找开头为/api的字符替换成“空字符串”   /api/getCode
                } 
            }
        }
    }
}