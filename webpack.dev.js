
/*
 * @Author: chenweizhi
 * @Date: 2018-11-15 16:22:44
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-27 07:38:29
 */

const path = require('path');
const webpack = require('webpack');
// 抽离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清空目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 模版tpl
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 多进程打包
const HappyPack = require('happypack');

module.exports = {
  // 当前编译环境
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
  },
  stats: { children: false },
  // 入口文件
  entry: {
    main: './src/index.js',
  },
  // 输出目录配置
  output: {
    filename: '[name]-[hash:8].js',
    path: path.resolve(__dirname, 'dist/static'),
    chunkFilename: '[name]-[hash:8].js',
    publicPath: '/',
  },
  // 加载文件规则
  module: {
    rules: [
      // 解析 jsx,js文件
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=babel',
      },
      // 解析css文件
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
        ],
      },
      // 解析sass,scss文件
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader?sourceMap',
        ],
      },
      // 解析less文件
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'less-loader?sourceMap',
        ],

      },
      // 解析css图片
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:8].[ext]',
              outputPath: 'imgs/',
            },
          },
        ],
      },
      // 解析字体以及svg文件
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:8].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  // 公共资源
  resolve: {
    // 设置别名
    alias: {
      // 组件常用依赖
      '@components': path.resolve(__dirname, 'src/components'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@constant': path.resolve(__dirname, 'src/constant'),
    },
    // 省略后缀
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3002,
    hot: true,
    proxy: {
      '*': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /\.js|jsx$/,
          // test: /[\\/]node_modules[\\/]/,
          chunks: 'all', // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          name: 'vendor', // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
          enforce: true,
        },
      },
    },
  },
  // 处理插件
  plugins: [
    // 清空打包目录
    new CleanWebpackPlugin('static', {
      root: path.resolve(__dirname, 'dist'),
    }),
    // 处理jsx|js
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
    }),
    // 输出css
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].css',
    }),

    // 打包模版
    new HtmlWebpackPlugin({
      // 用 .hbs文件作为模板
      template: path.join(__dirname, 'src/index.html'),
      // 打包的模版目录
      filename: 'index.html',
      // 会在打包好的bundle.js后面加上hash串
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
