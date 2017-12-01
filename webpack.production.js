//引入webpack
const webpack = require("webpack");
//引入webpack 通用配置
const common = require("./webpack.common.js");
//引入merge
const merge = require("webpack-merge");
//引入清除文件插件
const cleanWebpackPlugin = require('clean-webpack-plugin');


const productionConfig = {
	devtool:"source-map",
	plugins:[
	    new webpack.DefinePlugin({
	      	'process.env.NODE_ENV': JSON.stringify('production')
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	   		sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
	    	parallel:true
	    }),
	    new webpack.LoaderOptionsPlugin({
	      	minimize: true,
	      	debug: false
	    }),
	    new CleanWebpackPlugin(
            ["build"],
            {
                root:__dirname,
                verbose:true,//开启控制台输出信息
                dry:false //启用删除文件
            }
        ),
        new webpack.HashedModuleIdsPlugin()
	]
}
module.exports = merge(common("production"),productionConfig);