/**
 * Webpack 可以提供给我们在项目里引用其他模块的能力，让我们可以直接使用React的模块
 */
var path = require('path');
var webpack = require('webpack');
//引入ExtractTextPlugin插件，把css代码分离js,作为独立资源导出
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//引入插件HtmlWebpackPlugin ,能够自动的把编译好的js，css文件自动引入index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //配置webpack入口，为public文件夹内的index.js文件，这个文件跟web启动文件不是一个，
  //配置通常我们在项目里也会定义为app.js
  entry : ['webpack-hot-middleware/client','./src/index.js'],
  context : config.rootPath,
  output : {
    //转换后生成的文件为public文件夹下的out.js文件，通常项目里会定义为bundle.js
    // filename : 'out.js',
    // path : path.resolve(__dirname,'public')

    filename : '[name].[hash:8].js',
    chunkFilename : 'chunk.[id].[hash:8].js',
    publicPath: config.publicPath
  },
  // 配置Babel
  module : {
    rules : [//匹配到node_modules以外的js文件就用babel-loader 转换
      {//对js文件的规则
        test : /\.js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader',
          options : {//转换过程依次使用plugins和presets指定的扩展
            presets : ['env', 'stage-0','react'],//处理顺序为从右到左
            //配置按需加载插件 babel-plugin-import，
            //配置按需加载插件 这样就可以去掉应用组件的js页面文件中导入的 css文件了
            plugins :[
              ['react-hot-loader/babel'],
              ['import',{"libraryName" : "antd","style": "css"}]
            ]
          }
        }
      },
      {//对样式css的规则，这个地方要注意，通常我们引用了UI库，
        //样式是在node_modules中的，这个时候不要exclude掉
        //添加ExtractTextPlugin插件，修改css rules
        // test : /\.css$/,
        // use : ['style-loader','css-loader']

        test: /-m\.css$/,
        use: ExtractTextPlugin.extract({
          fallback : 'style-loader',
          use : [
            {
              loader : 'css-loader',
              options : {
                modules : true,
                localIdentName : '[path][name]-[local]-[hash:base64:5]'
              }
            }
          ]
        })
      },
      {//增加ExtractTextPlugin后新加的
        test : /^((?!(-m)).)*\.css$/,
        use : ExtractTextPlugin.extract({
          fallback : 'style-loader',
          use : 'css-loader'
        })
      },
      {
        test : /\.less$/,
        include : [config.srcPath],
        exclude : [config.libPath],
        use : ExtractTextPlugin.extract({
          fallback : "style-loader",
          use : [
            {
              loader : 'css-loader',
              options : {
                modules : true,
                importLiaders : 3,
                localIdentName : '[path][name]-[local]-[hash:base64:5]'
              }
            },
            {
              //一个自定义的loader，是为了解决less-loader在启用模块化时无法正确解析
              //在less文件中引用的外部地址的问题。请参考less-loader的这个issue
              loader : path.resolve(__dirname,'..','loader/less-css-modules-assets-fix-loader.js')
            },
            {
                loader : 'postcss-loader',
                options : {
                  plugins : [
                    require('auoprefixer')()
                  ]
                }
            },
            {
              loader : 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.woff(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=font/opentype'
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?.*)?$/,
        use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'url-loader?limit=8192'
      }
    ],
  },
  plugins:[
    //增加ExtractTextPlugin后新加的,指定css输出文件的名称
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()

    //
    new HtmlWebpackPlugin({
      template : './template/index.html'
    }),

    new ExtractTextPlugin({
      filename : 'styles.[contenthash].css'
    })
  ]
};
