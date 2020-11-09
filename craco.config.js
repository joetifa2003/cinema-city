const PrerenderSPAPlugin = require("prerender-spa-plugin");
const path = require("path");

module.exports = {
  style: {
    modules: {},
    css: {
      loaderOptions: {},
    },
    postcss: {
      plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer"),
      ],
    },
  },
  webpack: {
    plugins:
      process.env.NODE_ENV === "production"
        ? [
            new PrerenderSPAPlugin({
              routes: ["/"],
              staticDir: path.join(__dirname, "build"),
            }),
          ]
        : [],
  },
};
