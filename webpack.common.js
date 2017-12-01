//引入webpack
const webpack = require("webpack");
//引入webpack-merge
const merge = require("webpack-merge");
//引入path
const path = require("path");
//引入html模板插件
const htmlWebpackPlugin = require("html-webpack-plugin");
//引入manifest
const manifestPlugin = require("webpack-manifest-plugin")
//获取分离css插件
const extractTextPlugin = require("extract-text-webpack-plugin")
//获取dependency
const pkg = require("./package.json");
module.exports = function(env){
	return {
		entry:{
			app:path.resolve(__dirname,"src/js/app.js"),
			vendor:Object.keys(pkg.dependencies)
		},
		output:{
			path:__dirname+"/build",
			filename:"[name].[chunkhash:8].js",
			publicPath:"/"
		},
		resolve: {
	        extensions: ['.js', '.jsx', '.json'],
	    },
		module:{
			rules:[{
				test:/\.(js|jsx)?$/,
				exclude:/node_modules/,
				use:{
			        loader: 'babel-loader',
			        options: {
			          	presets: ['env',"react","stage-1"],
			          	plugins: [
					  		'transform-runtime',["import",{"style": "css","libraryName": "antd"}],["transform-decorators-legacy"]
					    ]
			        }
			    }
			},
			{
	        	test: /\.css$/,
	        	use:extractTextPlugin.extract({
	          		fallback: "style-loader",
	          		use: ['css-loader', 'postcss-loader']
	        	})
	      	},
	       	{
	            test:/\.(png|jpe?g|gif)(\?\S*)?$/,
	            use:[{
	            	loader:'file-loader',
	            	options:{
	            		name:'[path][sha512:hash:base64:7].[ext]'
	            	}
	            }]
	        }]
		},
		plugins:[
			new htmlWebpackPlugin({
				template:path.resolve(__dirname,"src/index.tmpl.html")
			}),
			new manifestPlugin(),
		    new webpack.DefinePlugin({
			  	'process.env.NODE_ENV': JSON.stringify(env)
			}),
			new webpack.optimize.CommonsChunkPlugin({
	       		name: 'vendor',
		    }),
		    new webpack.optimize.CommonsChunkPlugin({
	       		name: 'runtime'
	     	}),
	     	new extractTextPlugin({
	     		filename:'[name].[contenthash:8].css',
	     		allChunks:true
	     	}),
	     	new webpack.SourceMapDevToolPlugin({
			  	filename: '[name].js.map',
			  	exclude: /vendor.*.js$/
			})
		]
	}
}
