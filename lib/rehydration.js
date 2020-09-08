/*
  This file gets run by Webpack to make the bundle for distribution
  it imports only the hydrated files that are used as components in the site.
*/

const whenVisible = require(`./when-visible`);

module.exports = (strategies, componentsMap) => {
  const $componentMarkers = document.querySelectorAll(`[data-component]`);

  Array.from($componentMarkers).forEach(($marker) => {
    const $component = $marker.nextElementSibling;

    whenVisible($component, () => {
      const { component, props, strategy } = $marker.dataset;
      if (strategies[strategy]) {
        if (componentsMap[component]) {
          strategies[strategy](
            componentsMap[component],
            props ? JSON.parse(props) : {},
            $component
          );
        } else {
          console.error(`No component "${component}" registered`);
        }
      } else {
        console.error(`No hydration strategy "${strategy}" for "${component}"`);
      }
    });
  });
};
