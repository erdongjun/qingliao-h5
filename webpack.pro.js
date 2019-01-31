
/*
 * @Author: chenweizhi
 * @Date: 2018-11-15 16:23:40
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-23 15:40:22
 */

const path = require('path');
// 抽离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清空目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 模版tpl
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 多进程打包
const HappyPack = require('happypack');
// 七牛上传插件
const QiniuPlugin = require('qiniu-webpack-plugin');

// 七牛配置文件
const QN = require('./src/libs/qiniu');


module.exports = {
  // 当前编译环境
  mode: 'production',
  context: __dirname,
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
    publicPath: '/static',
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
          'css-loader',
          'postcss-loader',
        ],
      },
      // 解析sass,scss文件
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 解析less文件
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
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
              outputPath: '/imgs/',
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
              outputPath: '/fonts/',
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
      '@components': path.resolve(__dirname, 'src/components'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@constant': path.resolve(__dirname, 'src/constant'),
    },
    // 省略后缀
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'],
  },
  // 处理插件
  plugins: [
    // 上传到七牛
    // new QiniuPlugin({
    //   ACCESS_KEY: QN.accessKey,
    //   SECRET_KEY: QN.secretKey,
    //   bucket: QN.bucket,
    //   path: 'webapp/hd/',
    //   // 支持上传的文件
    //   include: [
    //     /\.js$/,
    //     /\.js.gz$/,
    //     /\.css$/,
    //     /\.css.gz$/,
    //     /\.(gif|png|jpe?g|svg)$/,
    //     /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0.9]\.[0-9])?$/,
    //   ],
    // }),
    // 清空打包目录
    new CleanWebpackPlugin('*', {
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
      filename: '../index.html',
      // chunks: ['main', 'vendor'],
    }),

  ],
};
