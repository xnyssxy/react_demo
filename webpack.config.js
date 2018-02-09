/**
 * Webpack 可以提供给我们在项目里引用其他模块的能力，让我们可以直接使用React的模块
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  //配置webpack入口，为public文件夹内的index.js文件，这个文件跟web启动文件不是一个，
  //配置通常我们在项目里也会定义为app.js
  entry : ['webpack-hot-middleware/client','./src/index.js'],
  output : {
    //转换后生成的文件为public文件夹下的out.js文件，通常项目里会定义为bundle.js
    filename : 'out.js',
    path : path.resolve(__dirname,'public')
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
        test : /\.css$/,
        use : ['style-loader','css-loader']
      }
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
