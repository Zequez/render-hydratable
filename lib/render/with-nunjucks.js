const nunjucks = require('nunjucks')
const fs = require('fs')

module.exports = {
  fileExt: /\.njk$/,
  fileContent: null,
  isHydratable: (Component) => false,
  dehydrate: (Component) => (props) => Component.render(props),
  rehydrate: (Component, props, $el) => null,
  require: (filename) => {
    return nunjucks.compile(fs.readFileSync(filename, { encoding: 'utf8' }))
  },
}
