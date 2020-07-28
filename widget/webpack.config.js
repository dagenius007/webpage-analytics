const path = require("path");

module.exports = () => ({
  entry: {
    index: "./src/index",
  },
  output: {
    path: path.join(__dirname, "lib"),
    library: "hjFunnelCreator",
  },
  module: {
    rules: [

      {
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",

          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          }
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, '../api/api.js'),
    }
  },
  plugins: [],
  devServer: {
    port: process.env.PORT || 3000,
    compress: true,
  },
});
