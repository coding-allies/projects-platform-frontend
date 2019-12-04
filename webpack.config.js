const path = require("path");

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
  mode: "development"
};
