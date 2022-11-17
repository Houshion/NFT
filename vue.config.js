const path = require('path');
let filePath = 'static/js/';// 打包后 js 文件保存目录
let timeStamp = new Date().getTime();// 当前时间戳
const config = {
	// webpack 相关配置
	// filenameHashing: false, // 文件名是否加上hash值
    // 配置路径别名
    configureWebpack: {
        devServer: {
            // 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
            // disableHostCheck: true
        }
    },
    devServer: {
        host: '0.0.0.0',
        // port: 10086,
        // open: true,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/api': {
                target: `http://localhost:8081`,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        disableHostCheck: true
    },
    configureWebpack: {
        resolve: {
            alias: {
                '~img': path.join(__dirname, '@/static/images'),
            }
        }
    },
    // productionSourceMap: false,
}

if (process.env.UNI_PLATFORM === 'h5') {
    // 由于这种方式的打包，会导致编译生成微信小程序（只验证了微信小程序）无法正常使用，所以判断只针对 h5 发行的情况采用重构
    module.exports = {
        configureWebpack: {
            // webpack 配置 解决js缓存的问题
            output: {
                // 输出重构  打包编译后的 文件目录 文件名称 【模块名称.时间戳】，更多参数参考 vue webpack 配置
                filename: `${filePath}[name].${timeStamp}.js`,
                chunkFilename: `${filePath}[name].${timeStamp}.js`
            },
        },
		...config,
    }
} else {
    // 其他打包需要的相关配置
    module.exports = {
		...config,
    }
}