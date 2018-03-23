var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const uglify = require("uglifyjs-webpack-plugin");
var path = require("path");
var entries = {};
var rootPath = path.resolve(__dirname, "../src");
entries.app = [rootPath + "/index.js"];
entries.message = [
	rootPath + "/assets/less/message.less",
	rootPath + "/assets/js/message.js"
];
// entries.pace = [
// 	rootPath + "/assets/less/pace.theme.less",
// 	rootPath + "/assets/js/pace.js"
// ];
entries.vendor = [
	"babel-polyfill",
	rootPath + "/assets/less/common.less",
	"react",
	"react-router-dom",
	"redux",
	"react-redux",
	"redux-actions",
	"react-router-redux"
];
var webpackConfig = {
	entry: entries,
	resolve: {
		extensions: [".web.js", ".mjs", ".js", ".json", ".jsx"],
		alias: {}
	},
	devServer: {
		historyApiFallback: true,
		host: "0.0.0.0"
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: "underscore-template-loader"
				}
			},

			{
				test: /\.css|less$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},

			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				include: rootPath
			},
			{
				test: /\.(js|jsx|mjs)$/,
				include: /node_modules/,
				loader: require.resolve("babel-loader"),
				options: {
					cacheDirectory: true,
					plugins: [
						["react-html-attrs"],
						["import", { libraryName: "antd", style: "css" }],
						["import", { libraryName: "antd", style: true }]
					]
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/img/[name].[hash:9].[ext]"
							// publicPath:
							// 	process.env.NODE_ENV === "development"
							// 		? config.dev.assetsPublicPath
							// 		: config.build.assetsPublicPath
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/font/[name].[hash:9].[ext]"
							// publicPath:
							// 	process.env.NODE_ENV === "development"
							// 		? config.dev.assetsPublicPath
							// 		: config.build.assetsPublicPath
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: rootPath + "/index.html",
			favicon: rootPath + "/assets/images/favicon.ico"
		})
	]
};

module.exports = webpackConfig;
