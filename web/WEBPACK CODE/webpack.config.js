const path = require("path"); //nodejs核心,专门处理路径问题
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader-plugin");
/**
 * @type {import('webpack').Configuration}//代码提示
 */
module.exports = {
  entry: "./src/main.js", //入口
  output: {
    path: path.resolve(__dirname, "dist"), //输出路径
    filename: "static/js/main.js", //输出文件名
    clean:true,//自动清空上次打包结果,在打包前将path目录清空后再重新打包
  },
  mode: "development", //输出模式
  //加载器
  module: {
    rules: [
      {
        test: /\.css$/, //正则表达式匹配css文件
        use: [
          //执行顺序从下到上
          "style-loader", //将js中的css创建style标签添加到html文件中生效
          "css-loader", //将css编译到commonjs的模块到js中
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // less 编译成css文件
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset",
      },
      {
        test: /\.(png|jpe?g|svg|wepp|gif)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片转换成base64,优点减少请求数量
          },
        },
        generator: {
        //改变图片输出路径
        //[hash:10]代表只取前十位
          filename: "static/images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)/,
        type: "asset/resource",
        generator: {
        //改变图片输出路径
        //[hash:10]代表只取前十位
          filename: "static/media/[hash:10][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除node_modules里面的js文件不处理
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ],
  },
  //插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  //开发服务器不会输出资源,在内存中编译打包的
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
};
