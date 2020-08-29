const { h } = require('preact')
const { html, render } = require(`htm/preact`)
const renderToString = require(`preact-render-to-string`)

module.exports = {
  fileExt: /\.jsx?$/,
  fileContent: /['"`]preact/,
  isHydratable: (Component) => !!Component.hydratable,
  dehydrate: (Component) => (props) =>
    renderToString(html`<${Component} ...${props} />`),
  rehydrate: (Component, props, $el) =>
    render(html`<${Component} ...${props} />`, $el.parentNode, $el),
  require: (fileName) => require(fileName),
}
