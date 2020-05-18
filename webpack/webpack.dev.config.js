var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var routers = require('./routers.dev.json').routers;
var index = '/' + require('./routers.dev.json').index;
var layout = require('./layout');

var entry = {
  ...layout.entry,
  style: './_common/style'
};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: ['style', r.name],
  inject: 'body',
  templateParameters: {
    ...layout.templateParameters,
    ...r.templateParameters,
  },
}));
layout.devEntry.forEach((de) => {
  plugins.push(new HtmlWebpackPlugin({
    template: de.template,
    filename: de.filename,
    chunks: ['style'],
    inject: 'body',
    templateParameters: {
      ...layout.templateParameters,
    },
  }));
})
var rewrites = routers.map(r => ({
  from: new RegExp('\\/' + r.name),
  to: '/' + r.filename,
}));

var config = {
  mode: 'development',
  context: path.join(__dirname, '..', '/src'),
  entry,
  devServer: {
    inline: true,
    hot: true,
    // host: '0.0.0.0',
    historyApiFallback: {
      index,
      rewrites,
    },
    proxy: {
      '/assets/*': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/api/v2/markets': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/session.json': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/identities.json': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/reset_passwords.json': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/reset_passwords/*': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/reset_phone_passwords.json': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/i18n/home/*.json': {
        target: 'https://voice-staging.bitrabbit.io/',
        // changeOrigin: true,
        secure: false
      },
      '/rucaptcha': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/captchas/new': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/web': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/web/banners.json': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/web/cms/intro.json': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/captchas/new': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      },
      '/raise': {
        target: 'https://voice-staging.bitrabbit.io/',
        changeOrigin: true,
        secure: false
      }
    }
  },
  output: {
    path: path.join(__dirname, '..', '/build'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(plugins),
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, '..', 'src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
      ],
    }, {
      test: /\.less$/,
      use: [{
          loader: 'style-loader'
        }, // creates style nodes from JS strings
        {
          loader: 'css-loader'
        }, // translates CSS into CommonJS
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }, // compiles Less to CSS
      ],
    }, {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        },
      ],
    }, {
      test: /\.(png|jpg|gif|svg|mp3|mp4|blob)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }, ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, '..', '/src'),
    }
  },
  externals: {
    lodash: "_",
    jquery: "jQuery",
    '@editorjs/editorjs': "EditorJS",
  },
};

module.exports = config;
