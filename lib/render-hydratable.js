const hydrationMarker = require("./hydration-marker");
const componentsStores = require("./components-store");

module.exports = (componentsPaths = []) => {
  const components = componentsStores(componentsPaths);
  return (name, props) => {
    let comp = components.get(name);
    if (comp) {
      return (
        (comp.isHydratable ? hydrationMarker(name, props, comp.strategy) : "") +
        comp.dehydrated(props)
      );
    } else {
      throw new Error(`No component ${name} available`);
    }
  };
};
