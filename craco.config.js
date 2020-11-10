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
    plugins: [],
  },
};
