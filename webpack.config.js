// 导入path核心模块
const path = require('path')
// 导入 HtmlWebpackPlugin模块，自动生成html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入自动清除dist目录里面文件的模块
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); // 第一步引入webpack 

module.exports = {
  mode: 'development', 
  // 配置入口文件信息(单页面应用程序spa)
  entry: './src/main.js',
  // 将用webpack-dev-server以服务器的形式开启一个网站
  devServer: {
    contentBase: './dist', // 生成的网站目录为dist，其默认打开index.html，所以记得设置默认filename: 'index.html'
    hot: true // 第二步设置热更新
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', 'css'], // 将来引入文件时，不需要添加后缀的文件
    alias: {
        '@': path.resolve(__dirname, "src") // 给src路径设置一个别名
    }
  },
  // 在生产环境（mode: 'production'）打包后，浏览器控制台可以显示错误信息
  devtool: 'source-map',
  // 配置webpack的插件
  plugins: [
    // 注册组件，自动清除dist目录
    new CleanWebpackPlugin(['dist']),
    // 官网：https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({ // 使用插件自动在dist目录生成一个html文件，并自定引用js文件
      title: 'Output Management', // 生成html文件的标题
      filename: 'index.html', // 用来设置生成html文件的名称
      template: path.resolve(__dirname, "index.html")
    }),
    // 注册热加载插件
    new webpack.HotModuleReplacementPlugin()
  ],
  // 配置出口文件信息
  output: {
    // 配置将文件打包好的输出路径
    // __dirname: 当前打包目录
    path: path.resolve(__dirname, "dist"),
    // 将来打包好的文件名称
    filename: "bundle.js"
  },
  // 配置当前webpack打包的文件
  module: {
    rules: [ // 打包规则
      // 打包css
      {
        test: /\.css$/, // 正则，打包以".css"结尾的文件
        use: [
          // 这里有先后顺序，从后向前
          'style-loader', // 第二步：将打包好的css以style的形式放到html页面中
          'css-loader' // 第一步：将main.js中引入的css进行打包进js文件中
        ]
      },
      // 打包图片
      {
        test: /\.(png|svg|jpg|fif)$/,
        use: [
          'file-loader'
        ]
      },
      // 打包字体
      // 可以npm i bootstrap@3.3.7 ,在main.js中引入bootstrap.css，这个css会包含字体
      // import '../node_modules/bootstrap/dist/css/bootstrap.css';
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // es6转es5
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // 排除这些文件夹不用转es5
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};