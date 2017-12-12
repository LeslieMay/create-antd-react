const webpack = require("webpack");
//引入webpack通用配置
const common = require("./webpack.common.js");
//引入merge
const merge = require("webpack-merge");
//引入path
const path = require("path");
const devConfig = {
	devtool: 'source-map',
	devServer:{
        contentBase: path.resolve(__dirname, 'src'),
        host: "0.0.0.0",
        port:3333,
        open:true,
        historyApiFallback:true,//异步  不跳转
        inline:true,//实时刷新
        hot:true,//使用热加载插件 HotModuleReplacementPlugin
        compress:true //开启gzip压缩
   	},
   	plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = merge(common("dev"),devConfig);
