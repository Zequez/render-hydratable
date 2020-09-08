const { h, render } = require("preact");
const renderToString = require(`preact-render-to-string`);

module.exports = {
  fileExt: /\.jsx?$/,
  fileContent: /['"`]preact/,
  isHydratable: (Component) => !!Component.hydratable,
  dehydrate: (Component) => (props) => renderToString(h(Component, props)),
  rehydrate: (Component, props, $el) =>
    render(h(Component, props), $el.parentNode, $el),
  require: (fileName) => require(fileName),
};
