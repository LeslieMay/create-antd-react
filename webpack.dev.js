const webpack = require("webpack");
//引入webpack通用配置
const common = require("./webpack.common.js");
//引入merge
const merge = require("webpack-merge");
//引入path
const path = require("path");
// 获取本地网络ip
//const os = require('os');
//let IPv4
//for(var i = 0;i < os.networkInterfaces().en4.length;i ++) {
//  if(os.networkInterfaces().en4[i].family === 'IPv4') {
//      IPv4 = os.networkInterfaces().en4[i].address
//      break
//  }
//}
const devConfig = {
	devtool: 'source-map',
	devServer:{
		contentBase: path.resolve(__dirname, 'src'),
        proxy:{
            "/":{
                target:"http://10.0.11.193:8080",
                changeOrigin:true
            }
        },
        host: '10.0.11.98',
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
