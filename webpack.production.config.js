//首先引入webpack
var webpack = require("webpack");
//引入路径管理模块
var path = require("path");
//引入html模板插件
var HtmlWebpackPlugin = require("html-webpack-plugin")
//引入js、css分离插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入清除build文件下的css以及js插件
var CleanWebpackPlugin = require('clean-webpack-plugin');
//配置webpack
module.exports = {
    //配置入口文件
    entry:{
        app:path.resolve(__dirname,"src/js/app.js"),
        vendor:[
			"jquery"
		]//配置提取公共js文件
    },
    //配置输出文件
    output:{
        path:__dirname+"/build",
        filename:"[name].[chunkhash:8].js",//配置hash文件名,避免缓存
        publicPath:"/"
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
    plugins:[
        new webpack.BannerPlugin("Copyright by leslie."),
        //配置HTML模板文件
        new HtmlWebpackPlugin({
            template:__dirname + "/src/index.tmpl.html"
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        //分离css和js
        new ExtractTextPlugin('[name].[chunkhash:8].css'),
        //提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            filename:'js/[name].[chunkhash:8].js'
        }),
        //build时 删除存在的js css文件
        new CleanWebpackPlugin(
            ["build/app.*.js","build/app.*.css","build/js/vendor.*.js"],
            {
                root:__dirname,
                verbose:true,//开启控制台输出信息
                dry:false //启用删除文件
            }
        ),
        //定义在业务代码中的变量去判断是开发环境还是生产环境，开发环境下可进行提示错误打印日志等操作
        new webpack.DefinePlugin({
            __DEV__:false
        }),
        //提供共用插件给每个js  不需要在单独require import等
        new webpack.ProvidePlugin({
            $:'jquery'
        })
    ]
}