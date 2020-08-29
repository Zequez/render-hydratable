module.exports = (name, props, strategy) => {
  return `<script
      data-component=${JSON.stringify(name)}
      data-props=${JSON.stringify(props)}
      data-strategy=${JSON.stringify(strategy)}
    ></script>`
}
