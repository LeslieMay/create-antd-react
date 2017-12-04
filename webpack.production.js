//引入webpack
const webpack = require("webpack");
//引入webpack 通用配置
const common = require("./webpack.common.js");
//引入merge
const merge = require("webpack-merge");
//引入清除文件插件
const cleanWebpackPlugin = require('clean-webpack-plugin');
//获取分离css插件
const extractTextPlugin = require("extract-text-webpack-plugin")

const productionConfig = {
	plugins:[
	    new webpack.DefinePlugin({
	      	'process.env.NODE_ENV': JSON.stringify('production')
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	   		sourceMap: true,
	    	parallel:true,
	    	compress: {
                warnings: false, // Suppress uglification warnings
            },
	    }),
	    new webpack.LoaderOptionsPlugin({
	      	minimize: true,
	      	debug: false
	    }),
	    new cleanWebpackPlugin(
            ["build"],
            {
                root:__dirname,
                verbose:true,//开启控制台输出信息
                dry:false //启用删除文件
            }
        ),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
	       	name: 'vendor',
	       	filename:'js/[name].[hash:8].js'
		}),
	    new extractTextPlugin({
	     	filename:'[name].[hash:8].css',
	     	allChunks:true
	    })
	]
}
module.exports = merge(common("production"),productionConfig);