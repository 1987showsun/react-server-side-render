require('babel-register');
// 止CSS與prod中的webpack捆綁在一起
require.extensions['.css'] = _ => _;

const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const rendering  = require('./renderer.js');
const http       = require('http');
const path       = require('path');

const app        = express();
let server;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, '../assets/')));

if (process.env.NODE_ENV === 'development') {
  const chokidar          = require('chokidar');
  const webpack           = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const hotMiddleware     = require('webpack-hot-middleware');
  const config            = require('../webpack.config.js');
  const compiler          = webpack(config);

  app.use(hotMiddleware(compiler, {
    log              : console.log,
    heartbeat        : 10 * 1000,
  }));
  app.use(webpackMiddleware(compiler, {
    publicPath       : config.output.publicPath,
    serverSideRender : true,
  }));

  const watcher = chokidar.watch('./');

  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach((id) => {
        if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
      });
    });
  });

  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id];
    });
  });
}
else {
  app.use('/dist', express.static('./dist'));
}
// --> /server/renderer.js
app.use('*', rendering.handleRender);

server = http.createServer(app);
server.listen( process.env.PORT || 3000 );
