const fs = require("fs");
const fg = require("fast-glob");
const path = require("path");

const loaders = {
  // Uncomment the ones you want to use
  preact: require("./render/with-preact"),
  nunjucks: require("./render/with-nunjucks"),
};

const nameFromFile = (path) => path.split("/").reverse()[0].match(/[^.]+/)[0];

module.exports = (componentsPaths = []) => {
  return new Map(
    fg
      .sync(
        componentsPaths.map((p) => `${p}/*`),
        {
          ignore: ["**/index.js", "**/index.hydratable.js"],
        }
      )
      .map((file) => {
        let [loaderName, loader] =
          Object.entries(loaders).find(
            ([loaderName, loader]) =>
              loader.fileExt.test(file) &&
              (!loader.fileContent ||
                loader.fileContent.test(fs.readFileSync(file)))
          ) || [];
        if (!loader) return [file, null];

        let Comp = loader.require(file);

        return [
          nameFromFile(file),
          {
            path: file,
            strategy: loaderName,
            isHydratable: loader.isHydratable(Comp),
            dehydrated: loader.dehydrate(Comp),
          },
        ];
      })
  );
};
