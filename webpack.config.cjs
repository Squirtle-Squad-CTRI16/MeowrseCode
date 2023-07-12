const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    client: './src/index.tsx',
    server: './server/server.ts',
  },
  devServer: {
    proxy: {},
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // Output file for client bundle
    chunkFilename: '[name].bundle.js', // Output file for server bundle
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp3)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: 'static/[name].[hash].[ext]', // Output path and filename template
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
      url: require.resolve('url/'),
      buffer: require.resolve('buffer/'),
    },
  },
};
