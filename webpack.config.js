const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  // devtool: 'source-map',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: './dist',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: true,
      minify: true,
    }),
  ],
};
