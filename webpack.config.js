const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');


const main       = ['./app/index.js'];
let plugins      = [];
let cssLoaders   = [];
let handleJS     = {};

if (process.argv.includes('NODE_ENV=production')) {
  // Production bundle includes ExtractText to prevent FOUC 
  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER   : true,
        NODE_ENV  : JSON.stringify('production'),
        PORT      : 3000,
      },
      '__DEV__'   : false,
    }),
    new ExtractTextPlugin({
      filename  : 'main.css',
      disable   : process.env.NODE_ENV === "development"
    }),
  ];

  cssLoaders = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use     : ['css-loader','sass-loader'],
  });

  handleJS = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'es2015', 'stage-0', 'react'],
      },
    },
  };
}
else {
  // Dev bundle includes HMR
  main.push('./server/renderer.js');
  main.unshift('webpack-hot-middleware/client');

  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true,
        NODE_ENV: JSON.stringify('development'),
        PORT: 3000,
      },
      '__DEV__': true,
    }),
  ];

  cssLoaders = [
    'style-loader',
    'css-loader',
    'sass-loader'
  ];

  handleJS = {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'server/renderer.js')
    ],
    query: {
      env: {
        development: {
          presets: ['react-hmre'],
          plugins: [
            [
              'react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                }],
              }
            ],
          ],
        },
      },
    },
  };
}

// Standard webpack config... nothing too fancy
module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    main,
  },
  module: {
    rules: [
      handleJS,
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      }
    ],
  },
  plugins,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
};
