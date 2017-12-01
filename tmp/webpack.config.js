//首先引入webpack
var webpack = require("webpack");
//引入路径管理模块
var path = require("path");
//引入html模板插件
var HtmlWebpackPlugin = require("html-webpack-plugin")
//引入js、css分离插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//配置webpack
module.exports = {
    //配置入口文件
    entry:path.resolve(__dirname,"src/js/app.js"),
    //配置输出文件
    output:{
        path:__dirname+"/build",
        filename:"bundle.js"
    },
    //配置默认的扩展名  引入时可以直接引入文件名而不带后缀
    resolve:{
        extensions:["",".web.js",".jsx",".js",".json"]
    },
    module:{
        loaders:[
            //js loader
            {
                test:/\.(js|jsx)$/,//设置要匹配的文件后缀名
                exclude:/node_modules/,// 设置匹配时忽略的文件夹，相反如果想要设置包含的文件夹用include
                loader:"babel",//要使用的loader
                query:{
                    //向loader传递额外的条件选项
                    plugins:[
                        ["import",[{"style":"css","libraryName":"antd"}]]
                    ],
                    presets:["es2015","react", 'stage-1']
                }
            },
            //css loader
            {
                test:/\.css$/,
                loader:"style!css!postcss"
            },
            //less loader
            {
                test:/\.less$/,
                loader:"style!css!less"
            },
            //img loader
            {
                test:/\.(png|jpe?g|gif)(\?\S*)?$/,
                loader:'file-loader',
                query:{
                    name:'[path][sha512:hash:base64:7].[ext]'
                }
            }
        ]
    },
    postcss:[
        require('autoprefixer')//自动添加css兼容前缀
    ],
    //js 报错提示
    eslint:{
        configFile:'.eslintrc' //Rules for eslint
    },
    plugins:[
        new webpack.BannerPlugin("Copyright by leslie."),
        //配置HTML模板文件
        new HtmlWebpackPlugin({
            template:__dirname + "/src/index.tmpl.html"
        }),
        //定义在业务代码中的变量去判断是开发环境还是生产环境，开发环境下可进行提示错误打印日志等操作
        new webpack.DefinePlugin({
            __DEV__:true
        }),
        //提供共用插件给每个js  不需要在单独require import等
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ],
    //配置开发环境下的接口转向
    devServer:{
        proxy:{
            "/":{
                target:"http://10.0.11.193:8080",
                changeOrigin:true
            }
        },
        colors:true,//终端输出彩色结果
        historyApiFallback:true,//异步  不跳转
        inline:true,//实时刷新
        hot:true //使用热加载插件 HotModuleReplacementPlugin
    }
    
}