var express = require('express');
var app = express();
//分离config后
var config = require('../config/index.js');

app.use('/',require('connect-history-api-fallback')());//增加后端支持
//增加以上，达到的效果是：在浏览器直接输入http://localhost:2000/about,不会报404
//以上语句必须在下面这句之前写
//分离config后，改写如下
// app.use('/', express.static('public'));
app.use('/', express.static(config.staticPath));

if(process.env.NODE_ENV !== 'production'){
  var webpack = require('webpack');
  var webpackConfig = require('../config/webpack/webpack.dev.config.js');
  var webpackCompiled = webpack(webpackConfig);

  //配置运行时打包
  var webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(webpackCompiled,{
    // publicPath : "/",//必填项，out.js存放位置映射到服务器的URI路径是根('/')，这个是开始时候的配置
    publicPath: config.publicPath,
    stats: {colors : true},//console日志带颜色输出
    lazy : false,
    watchOptions : {
      aggregateTimeout : 300,
      poll : true
    },
  }));

  //配置热更新
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiled));
}

var server = app.listen(2000, function() {
  var port = server.address().port;
  console.log('Open http://localhost:%s', port);
});
