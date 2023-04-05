const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // ----------------- HTML -----------------
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),

    new CopyWebpackPlugin([
      { from: "./src/html/register.html", to: "register.html" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/html/property.html", to: "property.html" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/html/allProperties.html", to: "allProperties.html" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/html/Receipt.html", to: "Receipt.html" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/html/multiplefiles.html", to: "multiplefiles.html" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/html/retrieve.html", to: "retrieve.html" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/html/changeprice.html", to: "changeprice.html" },
    ]),

    // ----------------- CSS -----------------
    new CopyWebpackPlugin([
      { from: "./src/css/style.css", to: "css/style.css" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/css/registerStyle.css", to: "css/registerStyle.css" },
    ]),

    // ----------------- IMAGES -----------------
    new CopyWebpackPlugin([
      { from: "./src/images/logo1.png", to: "images/logo1.png" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/logo1.png", to: "images/logo_3.png" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/hero-banner.png", to: "images/hero-banner.png" },
    ]),
    new CopyWebpackPlugin([
      {
        from: "./src/images/about-banner-1.png",
        to: "images/about-banner-1.png",
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: "./src/images/about-banner-2.jpg",
        to: "images/about-banner-2.jpg",
      },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/inspection.png", to: "images/inspection.png" },
    ]),
    new CopyWebpackPlugin([
      {
        from: "./src/images/direct-marketing.png",
        to: "images/direct-marketing.png",
      },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/service-1.png", to: "images/service-1.png" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/service-2.png", to: "images/service-2.png" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/service-3.png", to: "images/service-3.png" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/property-1.jpg", to: "images/property-1.jpg" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/property-2.jpg", to: "images/property-2.jpg" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/property-3.jpg", to: "images/property-3.jpg" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/property-4.png", to: "images/property-4.png" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/blog-1.png", to: "images/blog-1.png" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/blog-2.jpg", to: "images/blog-2.jpg" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/blog-3.jpg", to: "images/blog-3.jpg" },
    ]),
    new CopyWebpackPlugin([
      { from: "./src/images/logo-btm1.png", to: "images/logo-btm1.png" },
    ]),
    new CopyWebpackPlugin([{ from: "./src/images/8.jpg", to: "images/8.jpg" }]),
    new CopyWebpackPlugin([{ from: "./src/images/9.jpg", to: "images/9.jpg" }]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
