const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = function override(config, env) {
  // Less loader configuration
  config.module.rules[1].oneOf.splice(2, 0, {
    test: /\.less$/i,
    exclude: /\.module\.(less)$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  });

  // Service Worker configuration for production
  if (env === 'production') {
    config.plugins.push(
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
        exclude: [/\.map$/, /manifest$/, /\.htaccess$/],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      })
    );
  }

  return config;
};
