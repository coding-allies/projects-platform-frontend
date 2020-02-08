const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  // change to .tsx if necessary
  entry: "./src/App.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
      {
        test: /\.(t|j)sx?$/,
        use: [{ loader: "awesome-typescript-loader" }],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.css$/i,
        loader: "css-loader"
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },

      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  // addition - add source-map support
  devtool: "source-map",
  mode: "development",
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
};
